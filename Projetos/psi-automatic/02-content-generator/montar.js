// montar.js — MOLDE-ENGINE da psi.automatic (o "corpo" da fábrica).
// Recebe um conteudo.json (vindo do cérebro/API via gerar-peca.js, ou um exemplo) e ENTREGA TUDO:
// monta o HTML do carrossel na identidade da marca + renderiza os slides postáveis + escreve a legenda.
// Não precisa de API key (essa parte é determinística). Uso:
//   node montar.js --in=conteudo.exemplo.json
//
// Bracket da marca: frames psi.automatic (preto + gradiente, slides 1 e final) emoldurando a PROVA
// de psicologia (navy/creme). Design capturado em knowledge-base/design/dna-agencia-trafego-pago.md.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RENDERER = path.resolve(__dirname, "../../../tools/render/render-creative.js");
const OUT_DIR = path.resolve(__dirname, "outputs");
const ASSET_REL = "../../03-automation-bridge/creativos/assets/"; // relativo ao HTML em outputs/

function arg(name, def) {
  const a = process.argv.slice(2).find((x) => x.startsWith(`--${name}=`));
  return a ? a.split("=")[1] : def;
}
// "Sobrecarga e Burnout" -> "sobrecarga-e-burnout" (nome de arquivo limpo, sem espaço/acento)
const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// --- TIPOGRAFIA DIAGNÓSTICA (doutrina-de-motor-decisao.md §1 + §"texto que estoura a caixa") ---
// Headline de tamanho FIXO estoura o slide quando a copy é longa — a armadilha-mãe do molde-engine:
// mesma caixa, strings de comprimentos muito diferentes. Aqui o tamanho REAGE ao comprimento real:
// copy curta mantém o tamanho aprovado (max); copy longa encolhe até um piso (min) em vez de vazar.
// k = largura média do glifo em frações do font-size, por família — AFERIDO do exemplo aprovado pelo
// Marcos (conteudo.exemplo.json) de modo que toda peça dentro do orçamento fica IDÊNTICA à de hoje.
const K = { agency: 0.45, display: 0.58, sans: 0.52 };
const BOX_W = 888; // 1080 − 96px de padding em cada lado (.slide)
// texto "puro" pra contar glifos: <br> vira quebra, tags somem, qualquer entidade conta como 1 glifo
const plain = (s) => String(s)
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<[^>]+>/g, "")
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/&[#a-z0-9]+;/gi, "x")
  .trim();
const longestLine = (s) => plain(s).split("\n").reduce((m, l) => Math.max(m, l.trim().length), 0);
// maior tamanho (≤max) que faz a linha mais longa caber em boxW; nunca abaixo de min.
function fit(texts, { max, min, font, boxW = BOX_W }) {
  const len = Math.max(1, ...texts.map(longestLine));
  const ideal = boxW / (K[font] * max); // nº de chars que cabem em UMA linha no tamanho max
  if (len <= ideal) return max;          // copy dentro do orçamento → tamanho aprovado, intocado
  return Math.max(min, Math.round((max * ideal) / len));
}

const CSS = `
:root{
  --cream:#EFE8DB; --navy:#1F3B52; --navy-soft:#3A5570; --gold:#B5905A;
  --ink:#0A0A0A; --paper:#F2F1EE; --magenta:#FF1E8C;
  --sans:'Poppins',sans-serif; --display:'Cormorant Garamond',serif; --agency:'Archivo',sans-serif;
}
*{margin:0;padding:0;box-sizing:border-box}
html,body{background:#cfcabd}
#post{width:1080px}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:var(--sans);
  display:flex;flex-direction:column;justify-content:space-between;padding:92px 96px 100px}
.slide.cream{background:var(--cream);color:var(--navy)}
.slide.navy{background:var(--navy);color:var(--cream)}
.slide.ink{background:var(--ink);color:#fff}
.slide::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.05;mix-blend-mode:multiply;z-index:1;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.slide>.layer{position:relative;z-index:2}
/* foto duotone */
.ph .bg{position:absolute;inset:0;z-index:0;background-position:center;background-size:cover;filter:grayscale(1) contrast(1.04)}
.ph .tint{position:absolute;inset:0;z-index:0;mix-blend-mode:multiply;opacity:.82;background:var(--navy)}
.ph.ink .tint{background:var(--ink);opacity:.86}
.ph .grad{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(10,10,10,.30) 0%,rgba(10,10,10,.05) 36%,rgba(10,10,10,.92) 100%)}
.ph.psy .grad{background:linear-gradient(180deg,rgba(20,40,55,.25) 0%,rgba(20,40,55,.06) 36%,rgba(20,40,55,.9) 100%)}
/* kicker (assinatura no topo) */
.kicker{text-align:center;font-family:var(--agency);font-size:19px;letter-spacing:5px;font-weight:400;color:#8a8a8a;text-transform:uppercase}
.kicker b{font-weight:800;color:#cfcfcf}
.cream .kicker{color:#9a958c} .cream .kicker b{color:#3a3a3a}
.foot{text-align:center;font-family:var(--agency);font-size:17px;letter-spacing:4px;font-weight:700;color:#7a7a7a}
.navy .foot,.psy .foot{color:#D9C49C}
/* tipografia agência (frames marca) */
.ah{font-family:var(--agency);font-weight:800;line-height:1.03;letter-spacing:-1px;font-size:78px;color:#fff;text-transform:none}
.grad-text{background:linear-gradient(100deg,#FF1E8C,#FF6A1A,#8B2FE0);-webkit-background-clip:text;background-clip:text;color:transparent}
.ah .mag{color:var(--magenta)}
.lead{font-size:30px;font-weight:300;line-height:1.45;color:#cfcfcf;margin-top:26px;max-width:780px}
.lead b{font-weight:600;color:#fff}
.mid{display:flex;flex-direction:column;justify-content:center;flex:1}
.ph .mid{justify-content:flex-end;padding-bottom:6px}
/* tipografia psicologia (prova) */
.sans-lg{font-size:50px;font-weight:300;line-height:1.25;color:var(--navy-soft)}
.navy .sans-lg{color:#C9D4DE}.psy .sans-lg{color:#E7E1D5}
.disp{font-family:var(--display);font-style:italic;font-weight:600;line-height:1.0;color:var(--navy)}
.navy .disp,.psy .disp{color:#fff}
.gold{color:var(--gold)}
.body{font-size:32px;font-weight:300;line-height:1.45;color:var(--navy-soft)}
.navy .body{color:#BFCBD6}.psy .body{color:#D7CDBC}
.body b{font-weight:600;color:var(--navy)}
.rule{width:120px;height:2px;background:var(--gold);margin:26px 0;opacity:.8}
.quote{font-family:var(--display);font-style:italic;font-weight:600;font-size:200px;line-height:.6;color:var(--gold);opacity:.22;height:96px}
.item{font-size:34px;font-weight:300;line-height:1.75;color:#C9D4DE}
.item b{font-weight:500;color:#fff}
.item .mk{color:var(--gold);font-family:var(--display);font-style:italic;font-size:40px;margin-right:14px}
/* CTA tipográfico (sem botão) */
.cta{font-family:var(--agency);font-size:46px;font-weight:800;color:#fff;display:flex;align-items:center;gap:18px}
.cta .kw{background:linear-gradient(100deg,#FF1E8C,#FF6A1A,#8B2FE0);-webkit-background-clip:text;background-clip:text;color:transparent}
.cta-sub{font-size:28px;font-weight:300;color:#cfcfcf;margin-top:16px}
.sign{font-family:var(--agency);font-size:22px;letter-spacing:.5px;text-align:center;color:#9a9a9a}
.sign b{font-weight:800;color:#fff}
`;

const kicker = (c) => `<div class="kicker layer">${c.kicker}</div>`;

// --- frames da MARCA (preto + gradiente) ---
function slideHook(c) {
  const h = c.hook;
  const sz = fit([h.linha1, `${h.linha2} ${h.destaque}`], { max: 78, min: 54, font: "agency" });
  return `<section class="slide ink ph">
    <div class="bg" style="background-image:url('${ASSET_REL}${c.hook.foto}')"></div><div class="tint"></div><div class="grad"></div>
    ${kicker(c)}
    <div class="mid layer">
      <div class="ah" style="font-size:${sz}px">${h.linha1}</div>
      <div class="ah" style="font-size:${sz}px">${h.linha2} <span class="grad-text">${h.destaque}</span></div>
      <div class="lead">${h.sub}</div>
    </div>
    <div class="foot layer">ARRASTA &#8594;</div>
  </section>`;
}
function slidePitch(c) {
  const p = c.pitch;
  const sz = fit([p.linha1, `${p.linha2} ${p.destaque}`], { max: 64, min: 46, font: "agency" });
  return `<section class="slide ink">
    ${kicker(c)}
    <div class="mid layer">
      <div class="ah" style="font-size:${sz}px">${p.linha1}</div>
      <div class="ah" style="font-size:${sz}px">${p.linha2} <span class="grad-text">${p.destaque}</span></div>
      <div class="lead">${p.corpo}</div>
      <div class="cta" style="margin-top:42px">Comenta <span class="kw">${p.cta_kw}</span>
        <svg width="30" height="40" viewBox="0 0 30 40" fill="none"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF1E8C"/><stop offset=".5" stop-color="#FF6A1A"/><stop offset="1" stop-color="#8B2FE0"/></linearGradient></defs><path d="M15 2 V32 M5 23 L15 34 L25 23" stroke="url(#g)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div class="cta-sub">${p.cta_sub}</div>
    </div>
    <div class="sign layer"><b>@psi.automatic</b> &#183; a agência de marketing no seu bolso</div>
  </section>`;
}

// --- PROVA (psicologia, navy/creme) ---
function slideCapa(c) {
  const v = c.prova.capa;
  const sz = fit([v.disp, v.destaque], { max: 108, min: 74, font: "display" });
  return `<section class="slide psy ph">
    <div class="bg" style="background-image:url('${ASSET_REL}${v.foto}')"></div><div class="tint"></div><div class="grad"></div>
    ${kicker(c)}
    <div class="mid layer">
      <div class="sans-lg">${v.pre}</div>
      <div class="disp" style="font-size:${sz}px;margin-top:8px">${v.disp}</div>
      <div class="disp gold" style="font-size:${sz}px;margin-top:-4px">${v.destaque}</div>
    </div>
    <div class="foot layer">2 / 6</div>
  </section>`;
}
function slideConceito(c) {
  const v = c.prova.conceito;
  const sz = fit([v.titulo], { max: 78, min: 54, font: "display" });
  return `<section class="slide cream">
    ${kicker(c)}
    <div class="mid layer">
      <div class="quote">&#8220;</div>
      <div class="disp" style="font-size:${sz}px;margin-top:6px">${v.titulo}</div>
      <div class="rule"></div>
      <div class="body" style="font-size:40px;max-width:800px">${v.corpo}</div>
    </div>
    <div class="foot layer" style="color:var(--navy-soft);opacity:.55">3 / 6</div>
  </section>`;
}
function slideSinais(c) {
  const v = c.prova.sinais;
  const itens = v.itens.map((i) => `<div class="item"><span class="mk">&#8212;</span>${i}</div>`).join("");
  return `<section class="slide navy">
    ${kicker(c)}
    <div class="mid layer">
      <div class="sans-lg" style="margin-bottom:34px">${v.intro}</div>
      ${itens}
    </div>
    <div class="foot layer">4 / 6</div>
  </section>`;
}
function slideAcolhimento(c) {
  const v = c.prova.acolhimento;
  const sz = fit([v.disp, v.destaque], { max: 96, min: 66, font: "display" });
  return `<section class="slide psy ph">
    <div class="bg" style="background-image:url('${ASSET_REL}${v.foto}')"></div><div class="tint"></div><div class="grad"></div>
    ${kicker(c)}
    <div class="mid layer">
      <div class="sans-lg">${v.pre}</div>
      <div class="disp" style="font-size:${sz}px;margin-top:8px">${v.disp}</div>
      <div class="disp gold" style="font-size:${sz}px;margin-top:-4px">${v.destaque}</div>
      <div class="body" style="margin-top:24px;max-width:760px">${v.corpo}</div>
    </div>
    <div class="foot layer">5 / 6</div>
  </section>`;
}

function buildHTML(c) {
  const slides = [slideHook(c), slideCapa(c), slideConceito(c), slideSinais(c), slideAcolhimento(c), slidePitch(c)].join("\n");
  return `<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Archivo:wght@400;700;800;900&display=swap" rel="stylesheet">
<style>${CSS}</style></head><body><div id="post">${slides}</div></body></html>`;
}

async function main() {
  const inPath = path.resolve(__dirname, arg("in", "conteudo.exemplo.json"));
  const conteudo = JSON.parse(await readFile(inPath, "utf-8"));
  await mkdir(OUT_DIR, { recursive: true });

  const htmlPath = path.join(OUT_DIR, "molde-render.html");
  await writeFile(htmlPath, buildHTML(conteudo), "utf-8");

  const nome = slug(conteudo.tema);
  const imgPath = path.join(OUT_DIR, `peca-${nome}.jpg`);
  await writeFile(path.join(OUT_DIR, `legenda-${nome}.txt`), conteudo.legenda ?? "", "utf-8");

  console.log(`[montar] HTML montado. Renderizando 6 slides via tools/render...`);
  const { stdout } = await execFileP("node", [RENDERER, htmlPath, imgPath, "1080", "1350", "--slides"]);
  console.log(stdout.trim());
  console.log(`[montar] Pronto: peça "${conteudo.tema}" + legenda entregues em ${path.relative(process.cwd(), OUT_DIR)}`);
}

main().catch((e) => { console.error("Falha ao montar:", e.message); process.exit(1); });
