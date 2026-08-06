#!/usr/bin/env node
// fonte-auto.mjs — busca a fonte CERTA sob demanda (como a foto-auto faz com a imagem).
// NÃO existe lista fixa de fontes. O especialista decide a tipografia que AQUELA marca pede,
// nomeia a família aqui → ISTO baixa o(s) .ttf do Google Fonts → salva no cache local de fontes
// (tools/render/fonts/) → o render instala e o Chromium acha pelo nome. Sem prateleira, sem régua.
//
// Uso: node tools/fonte-auto.mjs "Bebas Neue" [--weights=400,700] [--italic] [--out=tools/render/fonts]
//   Vários de uma vez: node tools/fonte-auto.mjs "Familia A" "Familia B" ...
//
// Rede: precisa de fonts.googleapis.com + fonts.gstatic.com liberados (na nuvem: Network→Custom).
// É cache: baixa uma vez, fica salvo; o próximo job que usar a mesma fonte não rebaixa.
import { writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const arg = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.split("=").slice(1).join("=") : d; };
const families = args.filter((a) => !a.startsWith("--"));
const weights = arg("weights", "400,700").split(",").map((w) => w.trim()).filter(Boolean);
const wantItalic = args.includes("--italic");
const outDir = path.resolve(arg("out", path.join(__dirname, "render", "fonts")));

if (!families.length) {
  console.error('Uso: node tools/fonte-auto.mjs "<Família>" [...] [--weights=400,700] [--italic] [--out=dir]');
  process.exit(1);
}

// Google Fonts CSS API entrega TTF cru pra este UA (Android 4.3: sem woff2, sem EOT/IE).
const TTF_UA = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0";

function buildCssUrl(family) {
  const fam = family.trim().replace(/\s+/g, "+");
  // monta o eixo de pesos (+ itálico, se pedido) no formato css2
  if (wantItalic) {
    const tuples = weights.flatMap((w) => [`0,${w}`, `1,${w}`]).join(";");
    return `https://fonts.googleapis.com/css2?family=${fam}:ital,wght@${tuples}&display=swap`;
  }
  const tuples = weights.join(";");
  return `https://fonts.googleapis.com/css2?family=${fam}:wght@${tuples}&display=swap`;
}

async function fetchText(url) {
  const r = await fetch(url, { headers: { "User-Agent": TTF_UA } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} em ${url}`);
  return r.text();
}
async function fetchBuf(url) {
  const r = await fetch(url, { headers: { "User-Agent": TTF_UA } });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} em ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

async function instalarCache() {
  const dest = path.join(homedir(), ".fonts");
  await mkdir(dest, { recursive: true });
  await new Promise((r) => execFile("fc-cache", ["-f", dest, outDir], () => r()));
}

await mkdir(outDir, { recursive: true });
let total = 0;
for (const family of families) {
  try {
    const css = await fetchText(buildCssUrl(family));
    // com UA antigo o Google entrega TTF — às vezes em url(...ttf), às vezes no endpoint /l/font?kit=
    // (sem extensão, mas é TTF). Captura qualquer url() de src do gstatic.
    const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]);
    if (!urls.length) { console.error(`✗ ${family}: nenhuma fonte retornada (família existe no Google Fonts? confira o nome exato)`); continue; }
    let i = 0;
    for (const u of urls) {
      const buf = await fetchBuf(u);
      const name = `${slug(family)}-${i ? i : "r"}.ttf`;
      const file = path.join(outDir, name);
      if (!existsSync(file)) { await writeFile(file, buf); total++; }
      i++;
    }
    console.log(`✓ ${family}  (${urls.length} arquivo[s]) → use font-family:"${family}"`);
  } catch (e) {
    console.error(`✗ ${family}: ${e.message}`);
  }
}
if (total) await instalarCache();
console.log(`\n[fonte-auto] ${total} arquivo(s) novo(s) no cache (${path.relative(process.cwd(), outDir)}). A fonte que a MARCA pede — não uma lista fixa.`);
