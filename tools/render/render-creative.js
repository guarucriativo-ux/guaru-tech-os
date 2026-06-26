// render-creative.js — RENDERIZADOR COMPARTILHADO (HTML+SVG -> PNG via Puppeteer).
// Infra compartilhada (como core/ e niches-library/) — NÃO mora dentro de cliente, NÃO duplica.
// Uso: node tools/render/render-creative.js <html> <png-saida> [largura] [altura] [--slides]
//   (aceita caminhos ABSOLUTOS para html e png — recomendado.)
// Por padrão tira screenshot do #post (peça única / folha de revisão).
// Com --slides: recorta CADA elemento .slide em um PNG separado (formato postável do carrossel:
//   uma imagem 1080x1350 por slide → saida-1.png, saida-2.png, ...).
// Carrega o HTML por file:// (resolve assets/fontes relativos), espera fontes + rede.
// Método autoral — ver niches-library/design-principles/metodo-criativo.md
import puppeteer from "puppeteer";
import { mkdir, readdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// FONTES INSTALADAS (como um designer tem): a fábrica carrega a própria biblioteca de fontes (tools/render/
// fonts/*.ttf) pro fontconfig em TODA sessão — assim o Chromium acha as fontes do DNA LOCALMENTE, sem depender
// do Google Fonts via rede (que flapa e cai em serifa errada). "Design gráfico sem fontes não faz nada."
async function instalarFontes(fontsDir) {
  try {
    if (!existsSync(fontsDir)) return;
    const dest = path.join(homedir(), ".fonts");
    await mkdir(dest, { recursive: true });
    let copiou = 0;
    for (const f of await readdir(fontsDir)) {
      if (!/\.(ttf|otf)$/i.test(f)) continue;
      const d = path.join(dest, f);
      if (!existsSync(d)) { await copyFile(path.join(fontsDir, f), d); copiou++; }
    }
    if (copiou) await new Promise((r) => execFile("fc-cache", ["-f", dest], () => r())); // idempotente; ignora se não houver fc-cache
  } catch {}
}

// Acha o Chromium do ambiente quando o puppeteer não baixou o próprio (ex.: nuvem usa o pré-instalado em
// /opt/pw-browsers, com nº de versão que muda). Sem isso, render falha na nuvem ("Could not find Chrome").
// Ordem: PUPPETEER_EXECUTABLE_PATH explícito → bundle do puppeteer → varredura do PLAYWRIGHT_BROWSERS_PATH.
async function acharChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  try { const p = puppeteer.executablePath(); if (p && existsSync(p)) return p; } catch {}
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    for (const dir of (await readdir(base)).filter((d) => d.startsWith("chromium-")).sort().reverse()) {
      const cand = path.join(base, dir, "chrome-linux", "chrome");
      if (existsSync(cand)) return cand;
    }
  } catch {}
  return undefined; // deixa o puppeteer tentar do jeito padrão
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const slidesMode = args.includes("--slides");
const scaleArg = args.find((a) => a.startsWith("--scale="));
const qArg = args.find((a) => a.startsWith("--q="));
// scale 1 = 1080x1350 nativo (= tamanho de tela exato que a Meta exibe; não fazer oversize). Ver
// knowledge-base/design/specs-imagem-redes.md. quality 85-95 ideal pra JPEG (100 piora na Meta).
const scale = scaleArg ? Number(scaleArg.split("=")[1]) : 1;
const quality = qArg ? Number(qArg.split("=")[1]) : 90;
const [htmlArg, outArg, wArg, hArg] = args.filter((a) => !a.startsWith("--"));

if (!htmlArg || !outArg) {
  console.error("Uso: node render-creative.js <html> <saida.jpg|.png> [largura] [altura] [--slides] [--scale=N] [--q=NN]");
  process.exit(1);
}

const width = Number(wArg) || 1080;
const height = Number(hArg) || 1350;
const htmlPath = path.resolve(__dirname, htmlArg);
const outPath = path.resolve(__dirname, outArg);
// formato por extensão: .jpg/.jpeg => JPEG sRGB (entrega Meta, mais leve); senão PNG (texto puro/transparência)
const shotOpts = (p) => (/\.jpe?g$/i.test(p) ? { path: p, type: "jpeg", quality } : { path: p });

await instalarFontes(path.join(__dirname, "fonts")); // carrega a biblioteca de fontes da fábrica (local, sem rede)
const executablePath = await acharChromium();
const browser = await puppeteer.launch({ args: ["--no-sandbox"], ...(executablePath ? { executablePath } : {}) });
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: scale });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluateHandle("document.fonts.ready");
  await mkdir(path.dirname(outPath), { recursive: true });

  if (slidesMode) {
    const slides = await page.$$(".slide");
    if (!slides.length) throw new Error('Nenhum elemento ".slide" encontrado no HTML.');
    const ext = path.extname(outPath);
    const base = outPath.slice(0, -ext.length);
    let i = 1;
    for (const slide of slides) {
      const file = `${base}-${i}${ext}`;
      await slide.screenshot(shotOpts(file));
      console.log("Imagem salva em " + file);
      i++;
    }
    console.log(`${slides.length} slides recortados (formato postável 1080x1350).`);
  } else {
    const post = await page.$("#post");
    if (!post) throw new Error('Elemento "#post" não encontrado no HTML.');
    await post.screenshot(shotOpts(outPath));
    console.log("Imagem salva em " + outPath);
  }
} finally {
  await browser.close();
}
