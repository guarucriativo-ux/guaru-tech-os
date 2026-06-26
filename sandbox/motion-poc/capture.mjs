// capture.mjs — POC do motor de MOTION (Tier 1): anima HTML/CSS de forma determinística e captura N frames
// via Puppeteer. É o "designer still + eixo do tempo" (mesma ideia do Remotion: seek por frame + screenshot).
// Reusa o Chromium do ambiente (achado como no render-creative) e a marca da Lume.
// Uso: node capture.mjs   → gera frames/f0000.png … no diretório deste arquivo.
// Depois, juntar os frames num vídeo com ffmpeg (ver README — no ambiente da nuvem o ffmpeg é enxuto, só VP8;
//   encode H.264/MP4 roda no PC / com ffmpeg completo:
//   ffmpeg -framerate 30 -i frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart out.mp4).
// Precisa de puppeteer instalado (ex.: tools/render/node_modules) — rodar com NODE_PATH apontando pra lá, ou
// instalar puppeteer aqui. Ex.: NODE_PATH=../../tools/render/node_modules node capture.mjs
import puppeteer from "puppeteer";
import { mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DUR = 3.0, FPS = 30, N = Math.round(DUR * FPS);
const W = 1080, H = 1350; // feed 4:5 (Reel seria 1080x1920)

// mesmo truque do render-creative: achar o Chromium do ambiente
async function acharChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  try { const p = puppeteer.executablePath(); if (p && existsSync(p)) return p; } catch {}
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  try {
    for (const d of (await readdir(base)).filter((x) => x.startsWith("chromium-")).sort().reverse()) {
      const cand = path.join(base, d, "chrome-linux", "chrome");
      if (existsSync(cand)) return cand;
    }
  } catch {}
  return undefined;
}

const executablePath = await acharChromium();
const framesDir = path.join(__dirname, "frames");
await mkdir(framesDir, { recursive: true });
const b = await puppeteer.launch({ args: ["--no-sandbox"], ...(executablePath ? { executablePath } : {}) });
const p = await b.newPage();
await p.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
await p.goto(pathToFileURL(path.join(__dirname, "poc.html")).href, { waitUntil: "networkidle0", timeout: 30000 });
await p.evaluateHandle("document.fonts.ready");
const stage = await p.$("#stage");
for (let i = 0; i < N; i++) {
  const t = i / FPS;
  await p.evaluate((t) => window.setTime(t), t); // animação DETERMINÍSTICA (não depende de wall-clock)
  await stage.screenshot({ path: path.join(framesDir, `f${String(i).padStart(4, "0")}.png`) });
}
await b.close();
console.log(`captured ${N} frames @ ${FPS}fps (${DUR}s) → ${path.relative(process.cwd(), framesDir)}`);
