// compor.js — MOTOR DE COMPOSIÇÃO da Lapidar (joalheria autoral) · estrutura "conteudo-direto".
// MESMO cérebro/maquinaria do designer da fábrica; muda só a config (DNA joalheria) e dois tipos de slide:
//  - "hero"    = foto-herói em COR CHEIA full-bleed (ouro tem que ler como ouro; nada de duotone no produto).
//  - "detalhe" = CROP MACRO da MESMA foto-fonte GRANDE (zoom via background-size/position) + texto por cima.
//                É a demonstração da DOUTRINA DO CROP (Base Mãe): fonte grande → recorte de detalhe em alta.
// Veste o DNA da Lapidar (charcoal + dourado de acento + marfim; serifa display de alto contraste; filete dourado).
// Consome conteudo.json (ver conteudo.exemplo.json). Render via tools/render (HTML→imagem 1080x1350 JPEG leve).
// Uso: node compor.js --in=conteudo.json [--foto=lapidar-hero.jpg] [--q=88]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RENDERER = path.resolve(__dirname, "../../../tools/render/render-creative.js");
const OUT_DIR = path.resolve(__dirname, "outputs");
const ASSET_REL = "../assets/"; // o HTML mora em outputs/; a foto-fonte grande mora em ../assets/

const arg = (n, d) => (process.argv.slice(2).find((x) => x.startsWith(`--${n}=`)) || `--${n}=${d ?? ""}`).split("=").slice(1).join("=");
const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hex = (s) => { const m = String(s).match(/#[0-9A-Fa-f]{6}/); return m ? m[0] : null; };
// marcadores autorais → spans. <serif> = serifa itálica de acento (palavra de afeto); <gold> = destaque dourado.
const r = (t = "") => String(t)
  .replace(/<serif>/g, '<span class="ac">').replace(/<\/serif>/g, "</span>")
  .replace(/<gold>/g, '<span class="gd">').replace(/<\/gold>/g, "</span>");
const bg = (f) => `url('${ASSET_REL}${f}')`;

async function lerDNA() {
  const dna = JSON.parse(await readFile(path.resolve(__dirname, "../brand-dna.json"), "utf-8"));
  const p = dna.paleta_lapidar || {};
  return { ink: hex(p.tinta) || "#16130F", gold: hex(p.dourado) || "#C8A45D", paper: hex(p.papel) || "#F3EDE2" };
}

function css(d) {
  return `
:root{--ink:${d.ink};--gold:${d.gold};--paper:${d.paper};
 --disp:'Cormorant Garamond',serif;--sans:'Inter',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#cfcabd}
#post{width:1080px}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:var(--sans);
 display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:150px 120px}
.slide.ink{background:var(--ink);color:var(--paper)}
.slide.paper{background:var(--paper);color:var(--ink)}
.slide.foto,.slide.crop{justify-content:flex-end;color:#fff;padding-bottom:180px}
/* grão sutil premium */
.slide::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.04;mix-blend-mode:multiply;z-index:9;
 background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
/* FOTO: cor cheia full-bleed; CROP: zoom num detalhe da MESMA fonte grande (via inline style) */
.ph{position:absolute;inset:0;background-size:cover;background-position:center;z-index:1}
/* scrim escuro só na base, pra texto ler sem matar o brilho da joia no topo */
.scrim{position:absolute;inset:0;z-index:2;background:linear-gradient(to top,rgba(12,10,8,.82) 0%,rgba(12,10,8,.45) 32%,rgba(12,10,8,0) 60%)}
.z{position:relative;z-index:6;max-width:860px}
/* kicker (wordmark) + rodapé */
.kick{position:absolute;top:88px;left:0;right:0;text-align:center;z-index:6;
 font-family:var(--sans);font-size:24px;letter-spacing:9px;font-weight:500;text-transform:uppercase}
.ink .kick{color:var(--gold)}.paper .kick{color:#8a7d63}.foto .kick,.crop .kick{color:#e7d9b9}
.foot{position:absolute;bottom:90px;left:0;right:0;text-align:center;z-index:6;
 font-family:var(--sans);font-size:22px;letter-spacing:5px;font-weight:400;text-transform:uppercase}
.ink .foot{color:#8f877a}.paper .foot{color:#a99c83}.foto .foot,.crop .foot{color:#cdbf9f}
/* tipografia: serifa display de alto contraste protagonista */
.headline{font-family:var(--disp);font-weight:600;font-size:104px;line-height:1.02;letter-spacing:-1px}
.foto .headline,.crop .headline{font-size:96px;text-shadow:0 2px 30px rgba(0,0,0,.45)}
.ac{font-style:italic;font-weight:500}
.gd{color:var(--gold)}
.sub{font-family:var(--sans);font-size:36px;font-weight:300;line-height:1.4;margin-top:34px;max-width:760px}
.ink .sub{color:#d8cfbe}.paper .sub{color:#5a5346}.foto .sub,.crop .sub{color:#ece3d0;text-shadow:0 1px 16px rgba(0,0,0,.5)}
/* filete dourado — assinatura do nicho */
.rule{width:84px;height:1px;background:var(--gold);margin:38px auto 0;opacity:.9}
.foto .rule,.crop .rule{margin:30px auto 0}
/* CTA tipográfico (sem botão de app — Base Mãe): frase + filete + seta */
.cta{font-family:var(--disp);font-style:italic;font-weight:600;font-size:62px;margin-top:30px}
.ink .cta,.foto .cta,.crop .cta{color:var(--gold)}.paper .cta{color:var(--ink)}
.ctasub{font-family:var(--sans);font-size:26px;font-weight:300;letter-spacing:1px;margin-top:18px}
.ink .ctasub{color:#cabf9f}.paper .ctasub{color:#6a6253}.foto .ctasub,.crop .ctasub{color:#d8cdb3}
/* selo monograma L */
.selo{position:absolute;top:84px;right:96px;z-index:7;width:84px;height:84px;border:1px solid var(--gold);border-radius:50%;
 display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-weight:600;font-size:46px;color:var(--gold)}
.paper .selo{opacity:.85}
`;
}

function slideHTML(s, d, foto) {
  const isFoto = s.tipo === "hero" || s.tipo === "detalhe";
  // slide de texto: o fundo é o próprio tipo ("ink"/"paper"); foto/detalhe têm classe própria.
  const cls = s.tipo === "hero" ? "foto" : s.tipo === "detalhe" ? "crop" : (s.tipo || s.bg || "ink");
  // CROP: zoom num detalhe da MESMA foto-fonte grande. zoom/crop vêm do conteúdo (default = detalhe central-baixo).
  let phStyle = "";
  if (isFoto && foto) {
    if (s.tipo === "detalhe") {
      const zoom = s.zoom || "240%";
      const pos = s.crop || "58% 42%";
      phStyle = `background-image:${bg(foto)};background-size:${zoom};background-position:${pos}`;
    } else {
      phStyle = `background-image:${bg(foto)}`;
    }
  }
  const ph = isFoto && foto ? `<div class="ph" style="${phStyle}"></div><div class="scrim"></div>` : "";
  const selo = s.selo ? `<div class="selo">L</div>` : "";
  const head = s.headline ? `<h1 class="headline">${r(s.headline)}</h1>` : "";
  const sub = s.sub ? `<p class="sub">${r(s.sub)}</p>` : "";
  const rule = s.rule === false ? "" : `<div class="rule"></div>`;
  const cta = s.cta ? `<div class="cta">${r(s.cta)}</div>${s.cta_sub ? `<p class="ctasub">${r(s.cta_sub)}</p>` : ""}` : "";
  return `<section class="slide ${cls}">
   ${ph}${selo}
   <div class="kick">LAPIDAR</div>
   <div class="z">${head}${sub}${rule}${cta}</div>
   ${s.foot ? `<div class="foot">${s.foot}</div>` : ""}
  </section>`;
}

async function main() {
  const d = await lerDNA();
  const c = JSON.parse(await readFile(path.resolve(__dirname, arg("in", "conteudo.json")), "utf-8"));
  const foto = arg("foto", c.foto || "");
  const quality = arg("q", "88"); // padrão Instagram: JPEG leve (a fonte grande NÃO vai pro post)
  const slides = c.slides.map((s) => slideHTML(s, d, foto)).join("\n");
  const html = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
   <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
   <style>${css(d)}</style></head><body><div id="post">${slides}</div></body></html>`;
  await mkdir(OUT_DIR, { recursive: true });
  const htmlPath = path.join(OUT_DIR, `compor-${slug(c.tema)}.html`);
  await writeFile(htmlPath, html, "utf-8");
  if (c.legenda) await writeFile(path.join(OUT_DIR, `legenda-${slug(c.tema)}.txt`), c.legenda, "utf-8");
  console.log(`[compor] HTML da Lapidar pronto: ${path.relative(process.cwd(), htmlPath)}`);

  const out = path.resolve(__dirname, arg("out", `outputs/carrossel-${slug(c.tema)}.jpg`));
  try {
    const { stdout } = await execFileP("node", [RENDERER, htmlPath, out, "1080", "1350", "--slides", `--q=${quality}`]);
    console.log(stdout.trim().split("\n").pop());
    console.log(`[compor] "${c.tema}" renderizado (conteudo-direto, DNA Lapidar, foto=${foto || "—"}, JPEG q${quality}).`);
  } catch (e) {
    console.log(`[compor] Render pulado neste ambiente (${e.message.split("\n")[0]}). HTML pronto pra renderizar.`);
  }
}
main().catch((e) => { console.error("Falha ao compor:", e.message); process.exit(1); });
