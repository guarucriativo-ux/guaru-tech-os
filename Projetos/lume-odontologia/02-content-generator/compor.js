// compor.js — MOTOR DE COMPOSIÇÃO da Lume Odontologia · estrutura "conteudo-direto".
// MESMO cérebro/maquinaria do designer da fábrica; muda só a config (DNA odonto) e o registro visual,
// destilado do MERCADO VALIDADO (Behance/Pinterest + Instagram do nicho — ver niches-library/odontologia/).
// Lições da faculdade embutidas: alinhamento LEFT intencional (eixo coerente), destaque em FRASE com
// sentido (highlight mint, nunca letra solta), SEM botão de app (CTA tipográfico), setas certas
// (ARRASTA → · comenta ↓ · "agende/direct" SEM seta), margens seguras (anti-corte mobile), NADA de preto.
// Consome conteudo.json. Render via tools/render (HTML→imagem 1080x1350 JPEG leve). Uso: node compor.js --in=conteudo.json
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
// marcadores: <hl> = highlight (frase-âncora em destaque mint — assinatura de frescor do nicho); <b> = bold.
const r = (t = "") => String(t)
  .replace(/<hl>/g, '<span class="hl">').replace(/<\/hl>/g, "</span>")
  .replace(/<b>/g, '<strong>').replace(/<\/b>/g, "</strong>");

async function lerDNA() {
  const dna = JSON.parse(await readFile(path.resolve(__dirname, "../brand-dna.json"), "utf-8"));
  const p = dna.paleta_lume || {};
  return {
    tinta: hex(p.tinta) || "#10303A", azul: hex(p.azul) || "#1789C6",
    mint: hex(p.mint) || "#8FE3D0", papel: hex(p.papel) || "#F2FAFB",
  };
}

function css(d) {
  return `
:root{--tinta:${d.tinta};--azul:${d.azul};--mint:${d.mint};--papel:${d.papel};
 --pop:'Poppins',sans-serif;--inter:'Inter',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#dfe7e9}
#post{width:1080px}
/* margens seguras generosas (anti-corte mobile): nada crítico nos ~110px de borda */
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:var(--inter);
 display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left;padding:150px 110px}
.slide.paper{background:var(--papel);color:var(--tinta)}
.slide.azul{background:var(--azul);color:#fff}
.slide.mint{background:var(--mint);color:var(--tinta)}
.slide.tinta{background:var(--tinta);color:var(--papel)}
/* blob mint suave (acento de frescor, função de âncora visual — não botão) */
.blob{position:absolute;border-radius:46% 54% 58% 42%/52% 44% 56% 48%;z-index:1;filter:blur(.5px)}
.paper .blob{background:var(--mint);opacity:.5}
.azul .blob{background:#ffffff;opacity:.10}
.tinta .blob{background:var(--azul);opacity:.30}
.mint .blob{background:#fff;opacity:.35}
/* kicker (wordmark) topo-esquerda + sparkle */
.kick{position:absolute;top:96px;left:110px;z-index:6;font-family:var(--pop);font-weight:600;
 font-size:25px;letter-spacing:5px;text-transform:uppercase;display:flex;align-items:center;gap:12px}
.paper .kick{color:var(--azul)}.azul .kick{color:#eafaff}.mint .kick{color:var(--tinta)}.tinta .kick{color:var(--mint)}
.kick .spark{font-size:26px}
.z{position:relative;z-index:6;max-width:840px}
/* tipografia: Poppins bold amigável, confiante; alinhamento LEFT com eixo coerente */
.headline{font-family:var(--pop);font-weight:700;font-size:82px;line-height:1.1;letter-spacing:-1.5px}
.headline.lg{font-size:92px}
strong{font-weight:800}
/* highlight = frase-âncora (mint sobre claro; azul sobre mint; branco sobre azul/tinta). Box-decoration p/ multilinha */
.hl{padding:.02em .18em;border-radius:10px;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.paper .hl{background:var(--mint);color:var(--tinta)}
.azul .hl{background:#fff;color:var(--azul)}
.mint .hl{background:var(--azul);color:#fff}
.tinta .hl{background:var(--mint);color:var(--tinta)}
.sub{font-family:var(--inter);font-weight:400;font-size:36px;line-height:1.45;margin-top:34px;max-width:780px}
.paper .sub{color:#3c5860}.azul .sub{color:#eafaff}.mint .sub{color:#1f4a55}.tinta .sub{color:#cfe6ec}
.sub strong{font-weight:700}
/* filete só com função (divisor curto antes do CTA) */
.rule{width:72px;height:4px;border-radius:4px;margin-top:40px}
.paper .rule{background:var(--azul)}.azul .rule{background:#fff}.mint .rule{background:var(--azul)}.tinta .rule{background:var(--mint)}
/* CTA tipográfico (sem botão). seta só quando há direção real (↓ comentário) */
.cta{font-family:var(--pop);font-weight:800;font-size:54px;line-height:1.12;margin-top:22px}
.ctasub{font-family:var(--inter);font-weight:400;font-size:32px;margin-top:18px;max-width:760px}
.mint .ctasub{color:#1f4a55}
/* rodapé inferior-esquerda */
.foot{position:absolute;bottom:96px;left:110px;z-index:6;font-family:var(--pop);font-weight:600;
 font-size:24px;letter-spacing:3px;text-transform:uppercase}
.paper .foot{color:#8fb0b8}.azul .foot{color:#cdeefb}.mint .foot{color:#3f6a73}.tinta .foot{color:#7fb6c4}
`;
}

function slideHTML(s) {
  const bg = s.bg || "paper";
  // blob posicionado por slide (variedade) — default canto inferior-direito
  const blobPos = s.blob || "right:-160px;bottom:-160px;width:560px;height:560px";
  const head = s.headline ? `<h1 class="headline${s.lg ? " lg" : ""}">${r(s.headline)}</h1>` : "";
  const sub = s.sub ? `<p class="sub">${r(s.sub)}</p>` : "";
  const rule = s.cta ? `<div class="rule"></div>` : "";
  const cta = s.cta ? `<div class="cta">${r(s.cta)}</div>${s.cta_sub ? `<p class="ctasub">${r(s.cta_sub)}</p>` : ""}` : "";
  return `<section class="slide ${bg}">
   <div class="blob" style="${blobPos}"></div>
   <div class="kick"><span class="spark">&#10022;</span>LUME ODONTOLOGIA</div>
   <div class="z">${head}${sub}${rule}${cta}</div>
   ${s.foot ? `<div class="foot">${s.foot}</div>` : ""}
  </section>`;
}

async function main() {
  const d = await lerDNA();
  const c = JSON.parse(await readFile(path.resolve(__dirname, arg("in", "conteudo.json")), "utf-8"));
  const quality = arg("q", "88");
  const slides = c.slides.map(slideHTML).join("\n");
  const html = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
   <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
   <style>${css(d)}</style></head><body><div id="post">${slides}</div></body></html>`;
  await mkdir(OUT_DIR, { recursive: true });
  const htmlPath = path.join(OUT_DIR, `compor-${slug(c.tema)}.html`);
  await writeFile(htmlPath, html, "utf-8");
  if (c.legenda) await writeFile(path.join(OUT_DIR, `legenda-${slug(c.tema)}.txt`), c.legenda, "utf-8");
  console.log(`[compor] HTML da Lume pronto: ${path.relative(process.cwd(), htmlPath)}`);

  const out = path.resolve(__dirname, arg("out", `outputs/carrossel-${slug(c.tema)}.jpg`));
  try {
    const { stdout } = await execFileP("node", [RENDERER, htmlPath, out, "1080", "1350", "--slides", `--q=${quality}`]);
    console.log(stdout.trim().split("\n").pop());
    console.log(`[compor] "${c.tema}" renderizado (conteudo-direto, DNA Lume, JPEG q${quality}).`);
  } catch (e) {
    console.log(`[compor] Render pulado neste ambiente (${e.message.split("\n")[0]}). HTML pronto.`);
  }
}
main().catch((e) => { console.error("Falha ao compor:", e.message); process.exit(1); });
