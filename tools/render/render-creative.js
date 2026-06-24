// render-creative.js — RENDERIZADOR COMPARTILHADO (HTML+SVG -> PNG via Puppeteer).
// Infra compartilhada (como core/ e niches-library/) — NÃO mora dentro de cliente, NÃO duplica.
// Uso: node tools/render/render-creative.js <html> <png-saida> [largura] [altura]
//   (aceita caminhos ABSOLUTOS para html e png — recomendado.)
// Carrega o HTML por file:// (resolve assets/fontes relativos), espera fontes + rede, e tira
// screenshot do #post. Método autoral — ver niches-library/design-principles/metodo-criativo.md
import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const [, , htmlArg, outArg, wArg, hArg] = process.argv;

if (!htmlArg || !outArg) {
  console.error("Uso: node render-creative.js <html> <png-saida> [largura] [altura]");
  process.exit(1);
}

const width = Number(wArg) || 1080;
const height = Number(hArg) || 1350;
const htmlPath = path.resolve(__dirname, htmlArg);
const outPath = path.resolve(__dirname, outArg);

const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
try {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle0", timeout: 30000 });
  await page.evaluateHandle("document.fonts.ready");
  const post = await page.$("#post");
  if (!post) throw new Error('Elemento "#post" não encontrado no HTML.');
  await mkdir(path.dirname(outPath), { recursive: true });
  await post.screenshot({ path: outPath });
  console.log("PNG salvo em " + outPath);
} finally {
  await browser.close();
}
