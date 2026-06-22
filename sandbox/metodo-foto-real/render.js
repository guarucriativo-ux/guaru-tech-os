import puppeteer from "puppeteer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080 });
// page.setContent() roda em origem about:blank, que o Chromium bloqueia de carregar
// file:// — por isso navega direto pro arquivo, assim a foto local resolve via path relativo.
await page.goto(`file://${path.join(__dirname, "index.html").replace(/\\/g, "/")}`, {
  waitUntil: "domcontentloaded",
  timeout: 15000,
});
const post = await page.$("#post");
await post.screenshot({ path: path.join(__dirname, "resultado.png") });
await browser.close();
console.log("Salvo em sandbox/metodo-foto-real/resultado.png");
