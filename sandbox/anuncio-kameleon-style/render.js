import puppeteer from "puppeteer";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const html = await readFile(path.join(__dirname, "index.html"), "utf-8");
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1080 });
await page.setContent(html, { waitUntil: "domcontentloaded", timeout: 15000 });
const post = await page.$("#post");
await post.screenshot({ path: path.join(__dirname, "anuncio.png") });
await browser.close();
console.log("Salvo em sandbox/anuncio-kameleon-style/anuncio.png");
