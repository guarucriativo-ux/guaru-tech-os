// image-engine.js — dois modos:
//   --week=NN   fluxo semanal de sempre (texto do generate.js + brand-dna.json + template fixo)
//   --job=path  fluxo por Registro (ver registros.json): JSON descreve {registro, asset, text}
//               e o engine resolve sozinho qual template/paleta usar — sem ajuste manual.
import puppeteer from "puppeteer";
import { mkdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logEvent } from "../shared/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = {
    week: null,
    job: null,
    content: null,
    template: "./templates-html/post-template.html",
    brand: "../brand-dna.json",
    out: null,
  };
  for (const arg of argv) {
    const [key, value] = arg.replace(/^--/, "").split("=");
    if (key in args) args[key] = value;
  }
  return args;
}

function usageAndExit() {
  console.error(
    "Uso:\n" +
      "  node image-engine.js --week=02 [--content=<path>] [--template=<path>] [--brand=<path>] [--out=<path>]\n" +
      "  node image-engine.js --job=<path-para-job.json>",
  );
  process.exit(1);
}

function toFileUrl(absolutePath) {
  return "file:///" + absolutePath.replace(/\\/g, "/").split("/").map(encodeURIComponent).join("/");
}

// O formato do bloco varia entre gerações da IA (blockquote "> texto", ``` fence com legenda
// em itálico) — filtra fences/legendas em vez de assumir um formato fixo.
function extractCreativeText(markdown) {
  const match = markdown.match(/\*\*Texto no criativo:\*\*\s*\n([\s\S]*?)\n\s*\n-{3,}/);
  if (!match) {
    throw new Error('Não encontrei a seção "Texto no criativo" no markdown da semana.');
  }
  return match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .filter((line) => !line.startsWith("```"))
    .filter((line) => !/^\*\(.*\)\*$/.test(line))
    .map((line) => line.replace(/^>\s*/, "").replace(/\*\*/g, "").trim())
    .join("\n");
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// VALIDAÇÃO MANUAL (temporária, ver learning-log.md): generate.js ainda não rotula
// setup/payoff. Heurística: última linha = payoff (o gancho), resto = setup (contexto).
function splitSetupPayoff(creativeText) {
  const lines = creativeText.split("\n").filter(Boolean);
  if (lines.length < 2) {
    return { setup: "", payoff: lines[0] ?? "" };
  }
  return { setup: lines.slice(0, -1).join("\n"), payoff: lines[lines.length - 1] };
}

// Único guard que sobrevive: cor de texto idêntica à cor de fundo nunca é estilo, é bug.
// Tudo o resto (margem, centro, sangria) é decisão de composição, não de código.
function assertNoIdenticalColorPairs(brandDna) {
  const palette = brandDna.palette ?? {};
  const pairs = [
    ["palette.text_on_box sobre palette.text_box_bg", palette.text_on_box, palette.text_box_bg],
    ["palette.text sobre palette.primary", palette.text, palette.primary],
  ];
  for (const [label, fg, bg] of pairs) {
    if (fg && bg && fg.toLowerCase() === bg.toLowerCase()) {
      throw new Error(`Cores idênticas em brand-dna.json: ${label} usam ${fg} — bug, não estilo.`);
    }
  }
}

// brand-dna.json fornece SÓ cor/fonte — quem decide onde cada coisa vai é o template HTML.
function injectBrandDna(templateHtml, brandDna, setupText, payoffText) {
  const palette = brandDna.palette ?? {};
  const tokens = {
    "{{SETUP_TEXT}}": escapeHtml(setupText).replace(/\n/g, "<br>"),
    "{{PAYOFF_TEXT}}": escapeHtml(payoffText).replace(/\n/g, "<br>"),
    "{{BG_COLOR}}": palette.primary || "#FFFFFF",
    "{{TEXT_COLOR}}": palette.text || "#000000",
    "{{TEXT_BOX_BG}}": palette.text_box_bg || "#000000",
    "{{TEXT_ON_BOX}}": palette.text_on_box || "#FFFFFF",
    "{{ACCENT_ON_BOX}}": palette.accent_on_box || palette.primary || "#FFFF00",
    "{{FONT_FAMILY}}": brandDna.typography?.font_family || "Arial Black, Arial, Helvetica, sans-serif",
    "{{BRAND_NAME}}": brandDna.client || "",
  };
  return Object.entries(tokens).reduce(
    (html, [token, value]) => html.split(token).join(value),
    templateHtml,
  );
}

// Renderiza HTML já pronto (#post) numa imagem. setContent() roda em origem about:blank, que o
// Chromium bloqueia de carregar file:// — por isso quando há imagem local (job mode), escreve
// um arquivo temporário e navega direto pra ele, em vez de usar setContent.
async function renderHtmlToImage(html, outputPath, { width, height, useLocalFile = false }) {
  const browser = await puppeteer.launch();
  let tmpPath = null;
  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height });

    if (useLocalFile) {
      tmpPath = path.join(__dirname, `_tmp-render-${Date.now()}.html`);
      await writeFile(tmpPath, html, "utf-8");
      await page.goto(toFileUrl(tmpPath), { waitUntil: "networkidle0", timeout: 20000 });
    } else {
      await page.setContent(html, { waitUntil: "networkidle0" });
    }

    const postElement = await page.$("#post");
    if (!postElement) {
      throw new Error('Elemento "#post" não encontrado no template HTML.');
    }

    await mkdir(path.dirname(outputPath), { recursive: true });
    await postElement.screenshot({ path: outputPath });
  } finally {
    await browser.close();
    if (tmpPath) await unlink(tmpPath).catch(() => {});
  }
}

async function runWeekMode(args) {
  const contentPath = path.resolve(
    __dirname,
    args.content ?? `../02-content-generator/outputs/semana-${args.week}.md`,
  );
  const templatePath = path.resolve(__dirname, args.template);
  const brandPath = path.resolve(__dirname, args.brand);
  const outputPath = path.resolve(__dirname, "outputs", args.out ?? `post-semana-${args.week}.png`);

  const [markdown, templateHtml, brandRaw] = await Promise.all([
    readFile(contentPath, "utf-8"),
    readFile(templatePath, "utf-8"),
    readFile(brandPath, "utf-8"),
  ]);

  const brandDna = JSON.parse(brandRaw);
  assertNoIdenticalColorPairs(brandDna);

  const postText = extractCreativeText(markdown);
  const { setup, payoff } = splitSetupPayoff(postText);
  const html = injectBrandDna(templateHtml, brandDna, setup, payoff);

  await renderHtmlToImage(html, outputPath, { width: 1080, height: 1080 });

  await logEvent({
    modulo: "automation-bridge",
    week: args.week,
    registro: "post-template",
    etapa_funil: "atracao",
    arquivos: [path.relative(path.resolve(__dirname, ".."), outputPath)],
  });

  console.log(`Imagem da Semana ${args.week} salva em ${outputPath}`);
}

// Modo --job: lê {registro, asset, text, brand} e resolve sozinho qual template/paleta usar,
// consultando registros.json — ver niches-library/design-principles/catalogo-referencias.md.
async function runJobMode(args) {
  const jobPath = path.resolve(process.cwd(), args.job);
  const job = JSON.parse(await readFile(jobPath, "utf-8"));

  const registrosPath = path.resolve(__dirname, "registros.json");
  const { registros } = JSON.parse(await readFile(registrosPath, "utf-8"));
  const entry = registros[job.registro];
  if (!entry) {
    throw new Error(
      `Registro "${job.registro}" não encontrado em registros.json. ` +
        `Disponíveis: ${Object.keys(registros).join(", ")}`,
    );
  }
  if (entry.requiresAsset && !job.asset) {
    throw new Error(`Registro "${job.registro}" exige "asset" no job — nenhum foi informado.`);
  }

  const templatePath = path.resolve(__dirname, "templates-html", entry.template);
  let templateHtml = await readFile(templatePath, "utf-8");

  const tokens = { ...(job.text ?? {}) };

  if (entry.paletteSource === "brand-dna" || entry.paletteSource === "hybrid") {
    const brandPath = path.resolve(__dirname, job.brand ?? "../brand-dna.json");
    const brandDna = JSON.parse(await readFile(brandPath, "utf-8"));
    assertNoIdenticalColorPairs(brandDna);
    const palette = brandDna.palette ?? {};
    Object.assign(tokens, {
      BG_COLOR: palette.primary || "#FFFFFF",
      TEXT_COLOR: palette.text || "#000000",
      TEXT_ON_BOX: palette.text_on_box || "#FFFFFF",
      ACCENT_ON_BOX: palette.accent_on_box || palette.primary || "#FFFF00",
      FONT_FAMILY: brandDna.typography?.font_family || "Arial Black, Arial, Helvetica, sans-serif",
      BRAND_NAME: brandDna.client || "",
    });
  }

  if (job.asset) {
    tokens.ASSET_PATH = toFileUrl(path.resolve(path.dirname(jobPath), job.asset));
  }

  for (const [token, value] of Object.entries(tokens)) {
    templateHtml = templateHtml.split(`{{${token}}}`).join(value ?? "");
  }

  const outputPath = path.resolve(
    __dirname,
    "outputs",
    args.out ?? `${job.registro}-${Date.now()}.png`,
  );
  const { width, height } = entry.canvas ?? { width: 1080, height: 1080 };
  await renderHtmlToImage(templateHtml, outputPath, { width, height, useLocalFile: Boolean(job.asset) });

  await logEvent({
    modulo: "automation-bridge",
    client: job.client,
    week: job.week ?? null,
    registro: job.registro,
    angulo: job.angulo ?? null,
    etapa_funil: job.etapa_funil ?? "atracao",
    arquivos: [path.relative(path.resolve(__dirname, ".."), outputPath)],
  });

  console.log(`Imagem do registro "${job.registro}" salva em ${outputPath}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.job) {
    await runJobMode(args);
  } else if (args.week) {
    await runWeekMode(args);
  } else {
    usageAndExit();
  }
}

main().catch((error) => {
  console.error("Falha ao gerar imagem:", error.message);
  process.exit(1);
});
