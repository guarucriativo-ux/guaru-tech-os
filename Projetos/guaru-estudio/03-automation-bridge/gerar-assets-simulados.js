// Script de apoio, não faz parte do motor: gera placeholders CLARAMENTE rotulados como
// simulados, pra testar a lógica de variabilidade de assets sem confundir com foto real
// (lição da peça "Guaru Tech Factory" — nunca mais misturar asset de teste sem rotular).
import puppeteer from "puppeteer";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "assets", "simulados");
await mkdir(outDir, { recursive: true });

const placeholders = [
  { file: "academia-treino-personalizado.png", bg: "#1f3d2b", label: "ASSET SIMULADO #1", sub: "treino personalizado" },
  { file: "academia-resultado-aluno.png", bg: "#3d1f1f", label: "ASSET SIMULADO #2", sub: "resultado de aluno" },
];

function html({ bg, label, sub }) {
  return `<!DOCTYPE html><html><head><style>
    body{margin:0;width:1080px;height:1350px;background:${bg};display:flex;flex-direction:column;
      align-items:center;justify-content:center;font-family:Arial,sans-serif;color:#fff;}
    .label{font-size:54px;font-weight:900;letter-spacing:2px;}
    .sub{font-size:32px;opacity:0.7;margin-top:14px;}
    .stripe{position:absolute;inset:0;background:repeating-linear-gradient(45deg,rgba(255,255,255,0.04) 0 40px,transparent 40px 80px);}
  </style></head><body><div class="stripe"></div>
    <div class="label">${label}</div><div class="sub">${sub}</div>
  </body></html>`;
}

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1350 });
for (const p of placeholders) {
  await page.setContent(html(p), { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: path.join(outDir, p.file) });
  console.log(`Gerado: assets/simulados/${p.file}`);
}
await browser.close();
