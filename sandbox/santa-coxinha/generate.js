import puppeteer from "puppeteer";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// v2 — revisado após feedback: (1) tipografia divertida (Baloo 2 + Caveat script) em vez de
// bold genérico; (2) nunca tirar a comida de cena (regra transversal #6 do nicho alimentação:
// niches-library/alimentacao/visual-references/design-rules.md) — o slide 3 antes não tinha
// foto, agora usa a 2ª foto real (cenário/prato); (3) mais de uma foto, não só crops da mesma.
const slides = [
  {
    num: "1 / 4",
    label: "",
    labelDisplay: "none",
    headline: "ISSO NÃO É COXINHA.<br><span class=\"accent\">É UMA REFEIÇÃO.</span>",
    scriptLine: "arraste e veja por quê →",
    scriptTop: 400,
    body: "",
    photo: "assets/coxinha-grande.png",
    objectPosition: "50% 35%",
    zoom: "1",
    scrim: "linear-gradient(180deg, rgba(20,10,2,0.15) 0%, rgba(20,10,2,0.75) 100%)",
  },
  {
    num: "2 / 4",
    label: "diferencial 01 · tamanho",
    labelDisplay: "block",
    headline: "ENQUANTO A CONCORRÊNCIA<br>DIMINUI O TAMANHO,<br><span class=\"accent\">A NOSSA NÃO CABE NA MÃO.</span>",
    scriptLine: "(sério, a gente pesou.)",
    scriptTop: 480,
    body: "Coxinha grande de verdade — peso e tamanho de refeição, não de salgadinho de festa.",
    photo: "assets/coxinha-grande.png",
    objectPosition: "50% 70%",
    zoom: "1.6",
    scrim: "linear-gradient(180deg, rgba(20,10,2,0.55) 0%, rgba(20,10,2,0.85) 100%)",
  },
  {
    num: "3 / 4",
    label: "diferencial 02 · recheio",
    labelDisplay: "block",
    headline: "RECHEIO QUE NÃO<br>SE ESCONDE.<br><span class=\"accent\">FRANGO DESFIADO DE VERDADE.</span>",
    scriptLine: "dá pra ver, né?",
    scriptTop: 480,
    body: "Sem miolo de pão pra completar. Cada mordida tem mais frango do que massa.",
    // 2ª foto real, com cenário (prato, papel manteiga, mesa de madeira) — corrige o slide
    // anterior que tinha ficado sem nenhuma comida na tela.
    photo: "assets/coxinha-prato-real.png",
    objectPosition: "50% 60%",
    zoom: "1.15",
    scrim: "linear-gradient(180deg, rgba(20,10,2,0.35) 0%, rgba(20,10,2,0.88) 100%)",
  },
  {
    num: "4 / 4",
    label: "diferencial 03 · frescor",
    labelDisplay: "block",
    headline: "FRITA NA HORA.<br>NUNCA ANTES.<br><span class=\"accent\">SAI DIRETO DA FRITADEIRA.</span>",
    scriptLine: "bora pedir?",
    scriptTop: 480,
    body: "Santa Coxinha — peça agora pelo link da bio.",
    photo: "assets/coxinha-grande.png",
    objectPosition: "50% 10%",
    zoom: "1.15",
    scrim: "linear-gradient(0deg, rgba(20,10,2,0.85) 0%, rgba(20,10,2,0.3) 60%)",
  },
];

const templateHtml = await readFile(path.join(__dirname, "template.html"), "utf-8");
const outDir = path.join(__dirname, "outputs");
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080 });

for (let i = 0; i < slides.length; i++) {
  const s = slides[i];
  const html = templateHtml
    .split("{{SLIDE_NUM}}").join(s.num)
    .split("{{LABEL_DISPLAY}}").join(s.labelDisplay)
    .split("{{LABEL}}").join(s.label)
    .split("{{HEADLINE}}").join(s.headline)
    .split("{{SCRIPT_DISPLAY}}").join(s.scriptLine ? "block" : "none")
    .split("{{SCRIPT_LINE}}").join(s.scriptLine ?? "")
    .split("{{SCRIPT_TOP}}").join(String(s.scriptTop ?? 480))
    .split("{{BODY}}").join(s.body)
    .split("{{PHOTO_SRC}}").join(s.photo)
    .split("{{OBJECT_POSITION}}").join(s.objectPosition)
    .split("{{ZOOM}}").join(s.zoom)
    .split("{{SCRIM}}").join(s.scrim);

  const tmpPath = path.join(__dirname, `_slide-${i + 1}.html`);
  await writeFile(tmpPath, html, "utf-8");
  await page.goto(`file://${tmpPath.replace(/\\/g, "/")}`, { waitUntil: "networkidle0", timeout: 15000 });
  const post = await page.$("#post");
  await post.screenshot({ path: path.join(outDir, `slide-${i + 1}.png`) });
  console.log(`Slide ${i + 1} salvo.`);
}

await browser.close();
console.log("Carrossel v2 completo em sandbox/santa-coxinha/outputs/");
