import puppeteer from "puppeteer";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const slides = [
  {
    num: "1 / 4",
    label: "",
    headline: "SEUS ALUNOS<br>SABEM DE ONDE<br>VEM O HIP HOP?",
    body: "",
    swipeCue: "arraste para o lado →",
  },
  {
    num: "2 / 4",
    label: "01. o problema",
    headline: "A RUA VIROU<br>RÓTULO,<br>NÃO RAIZ.",
    body: "Jovens crescem rodeados pela estética do hip hop, mas sem acesso à história, à técnica e ao propósito por trás dela.",
  },
  {
    num: "3 / 4",
    label: "02. a virada",
    headline: "TÉCNICA.<br>HISTÓRIA.<br>PERTENCIMENTO.",
    body: "Quando o grafite entra como aula de verdade, o spray para de ser rebeldia e passa a ser ferramenta de identidade.",
  },
  {
    num: "4 / 4",
    label: "03. vem com a gente",
    headline: "PINTE SUA<br>PRÓPRIA<br>HISTÓRIA.",
    body: "Raíz Urbana — curso de grafite. Turmas abertas. Inscreva-se no link da bio.",
  },
];

const templateHtml = await readFile(path.join(__dirname, "template.html"), "utf-8");
const outDir = path.join(__dirname, "outputs");
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080 });

for (let i = 0; i < slides.length; i++) {
  const slide = slides[i];
  const swipeCueHtml = slide.swipeCue ? `<div id="swipe-cue">${slide.swipeCue}</div>` : "";
  const html = templateHtml
    .split("{{SLIDE_NUM}}").join(slide.num)
    .split("{{LABEL}}").join(slide.label)
    .split("{{HEADLINE}}").join(slide.headline)
    .split("{{BODY}}").join(slide.body)
    .split("{{SWIPE_CUE}}").join(swipeCueHtml);

  const tmpPath = path.join(__dirname, `_slide-${i + 1}.html`);
  await writeFile(tmpPath, html, "utf-8");
  await page.goto(`file://${tmpPath.replace(/\\/g, "/")}`, {
    waitUntil: "networkidle0",
    timeout: 15000,
  });
  const post = await page.$("#post");
  await post.screenshot({ path: path.join(outDir, `slide-${i + 1}.png`) });
  console.log(`Slide ${i + 1} salvo.`);
}

await browser.close();
console.log("Carrossel completo em sandbox/curso-grafite/outputs/");
