// compor.js — MOTOR DE COMPOSIÇÃO do Guaru Estúdio (estrutura "conteudo-direto").
// MESMO cérebro/maquinaria do designer da fábrica; o que muda é a ESTRUTURA (o "botão"):
//  - psi.automatic  = "vitrine-bracket" (dor do psicólogo → prova → PITCH de venda)
//  - guaru-estudio  = "conteudo-direto" (hook → agita → virada → prova → mecanismo → CTA) — SEM pitch.
// Veste o DNA do Estúdio (lime #CCFF00 + preto + branco; grotesca caixa-alta + serifa itálica de acento;
// marca-texto lime; swoosh). Régua do Estúdio está em curadoria → por ora usa Base Mãe + DNA (sem a régua).
// Consome conteudo.json (ver conteudo.exemplo.json). Render via tools/render (HTML→imagem 1080x1350).
// Uso: node compor.js --in=conteudo.exemplo.json
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RENDERER = path.resolve(__dirname, "../../../tools/render/render-creative.js");
const OUT_DIR = path.resolve(__dirname, "outputs");

const arg = (n, d) => (process.argv.slice(2).find((x) => x.startsWith(`--${n}=`)) || `--${n}=${d ?? ""}`).split("=").slice(1).join("=");
const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hex = (s) => { const m = String(s).match(/#[0-9A-Fa-f]{6}/); return m ? m[0] : null; };
// marcadores autorais → spans. <lime> = marca-texto (caixa lime, lê em qualquer fundo); <serif> = serifa itálica.
const r = (t = "") => String(t)
  .replace(/<lime>/g, '<span class="lime">').replace(/<\/lime>/g, "</span>")
  .replace(/<serif>/g, '<span class="serif">').replace(/<\/serif>/g, "</span>");

async function lerDNA() {
  const dna = JSON.parse(await readFile(path.resolve(__dirname, "../brand-dna.json"), "utf-8"));
  const p = dna.paleta_guaru_estudio || {};
  return { lime: hex(p.primaria) || "#CCFF00", ink: hex(p.tinta) || "#0A0A0A", paper: hex(p.papel) || "#FFFFFF" };
}

function css(d) {
  return `
:root{--lime:${d.lime};--ink:${d.ink};--paper:${d.paper};
 --anton:'Anton',sans-serif;--serif:'Fraunces',serif;--sans:'Inter',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#d9d9d9}
#post{width:1080px}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:var(--sans);
 display:flex;flex-direction:column;justify-content:center;padding:150px 96px}
.slide.ink{background:var(--ink);color:#fff}
.slide.paper{background:var(--paper);color:var(--ink)}
.slide.lime{background:var(--lime);color:var(--ink)}
/* grão sutil pra dar premium */
.slide::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.04;mix-blend-mode:multiply;z-index:9;
 background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
/* wordmark / kicker */
.kick{position:absolute;top:84px;left:96px;display:flex;align-items:center;gap:16px;z-index:6;
 font-family:var(--anton);font-size:30px;letter-spacing:3px;text-transform:uppercase}
.kick .dot{width:26px;height:26px;background:var(--lime);border-radius:4px;transform:rotate(45deg)}
.slide.lime .kick .dot{background:var(--ink)}
.ink .kick{color:#fff}.paper .kick{color:var(--ink)}.lime .kick{color:var(--ink)}
/* swoosh lime no canto */
.swoosh{position:absolute;right:-60px;bottom:-60px;width:520px;height:520px;z-index:1;opacity:.9}
.slide.lime .swoosh{opacity:.18}
/* tipografia */
.z{position:relative;z-index:6;max-width:888px}
.headline{font-family:var(--anton);font-weight:400;font-size:118px;line-height:1.0;text-transform:uppercase;letter-spacing:-1px}
.serif{font-family:var(--serif);font-style:italic;font-weight:500;text-transform:none;letter-spacing:-1px}
.lime{background:var(--lime);color:var(--ink);padding:0 .1em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.slide.lime .lime{background:var(--ink);color:var(--lime)}
.sub{font-size:42px;font-weight:400;line-height:1.32;margin-top:40px;max-width:840px;opacity:.92}
.ink .sub{color:#e8e8e8}
.cta{display:inline-block;margin-top:48px;font-family:var(--anton);font-size:60px;letter-spacing:1px;text-transform:uppercase;
 background:var(--ink);color:var(--lime);padding:14px 36px}
.foot{position:absolute;bottom:84px;left:96px;z-index:6;font-family:var(--anton);font-size:28px;letter-spacing:3px;text-transform:uppercase;opacity:.85}
`;
}

const SWOOSH = (c) => `<svg class="swoosh" viewBox="0 0 200 200" fill="none">
 <path d="M30 150 C 30 70, 90 30, 170 40 C 110 50, 70 90, 80 160 C 60 170, 40 165, 30 150 Z" fill="${c}"/></svg>`;

function slideHTML(s, d) {
  const limeGraf = s.bg === "lime" ? d.ink : d.lime;
  const cta = s.cta ? `<div class="cta">${r(s.cta)}</div>` : "";
  return `<section class="slide ${s.bg}">
   <div class="kick"><span class="dot"></span>GUARU&nbsp;ESTÚDIO</div>
   ${SWOOSH(limeGraf)}
   <div class="z">
     <h1 class="headline">${r(s.headline)}</h1>
     <p class="sub">${r(s.sub)}</p>
     ${cta}
   </div>
   ${s.foot ? `<div class="foot">${s.foot}</div>` : ""}
  </section>`;
}

async function main() {
  const d = await lerDNA();
  const c = JSON.parse(await readFile(path.resolve(__dirname, arg("in", "conteudo.exemplo.json")), "utf-8"));
  const slides = c.slides.map((s) => slideHTML(s, d)).join("\n");
  const html = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
   <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,wght@1,400;1,500;1,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
   <style>${css(d)}</style></head><body><div id="post">${slides}</div></body></html>`;
  await mkdir(OUT_DIR, { recursive: true });
  const htmlPath = path.join(OUT_DIR, `compor-${slug(c.tema)}.html`);
  await writeFile(htmlPath, html, "utf-8");
  if (c.legenda) await writeFile(path.join(OUT_DIR, `legenda-${slug(c.tema)}.txt`), c.legenda, "utf-8");
  console.log(`[compor] HTML do Estúdio pronto: ${path.relative(process.cwd(), htmlPath)}`);

  const out = path.resolve(__dirname, arg("out", `outputs/carrossel-${slug(c.tema)}.jpg`));
  try {
    const { stdout } = await execFileP("node", [RENDERER, htmlPath, out, "1080", "1350", "--slides"]);
    console.log(stdout.trim().split("\n").pop());
    console.log(`[compor] "${c.tema}" renderizado (estrutura conteudo-direto, DNA do Estúdio).`);
  } catch (e) {
    console.log(`[compor] Render pulado neste ambiente (${e.message.split("\n")[0]}). HTML está pronto pra renderizar.`);
  }
}
main().catch((e) => { console.error("Falha ao compor:", e.message); process.exit(1); });
