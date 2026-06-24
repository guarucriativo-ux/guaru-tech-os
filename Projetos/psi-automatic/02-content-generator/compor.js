// compor.js v2 — MOTOR DE COMPOSIÇÃO da vitrine @psi.automatic.
// Graduação das regras curadas pelo Marcos (jun/2026) PRA DENTRO do motor — pra a produção automática
// sair com a qualidade que validamos na mão, sem o motor ficar pra trás. Encapsula:
//  - composição CENTRALIZADA/premium (o registro 5⭐), uma cor GOVERNA cada slide (hierarquia 60-30-10);
//  - foto do banco em DUOTONE (hero no hook + textura no miolo), opcional — sem foto cai no tipográfico;
//  - tipografia: Archivo (marca two-tone) · Fraunces (serifa da prova) · Poppins (corpo); kicker ~24px;
//  - setas certas (ARRASTA → no hook · COMENTA ↓ no último slide); gradiente SÓ acento (nunca fundo);
//  - ROTAÇÃO DE ASSINATURA por tema → hook e pitch mudam de carrossel pra carrossel (anti-repetição).
// Consome o schema v2 (ver conteudo.exemplo.json) + brand-dna.json. Render via tools/render (HTML→PNG).
// Uso: node compor.js --in=outputs/conteudo.json [--foto=arq.jpg] [--variant=N] [--out=outputs/carrossel.jpg]
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RENDERER = path.resolve(__dirname, "../../../tools/render/render-creative.js");
const OUT_DIR = path.resolve(__dirname, "outputs");
const ASSET_REL = "../../03-automation-bridge/creativos/assets/";

const arg = (n, d) => (process.argv.slice(2).find((x) => x.startsWith(`--${n}=`)) || `--${n}=${d ?? ""}`).split("=").slice(1).join("=");
const slug = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const hex = (s, all) => { const m = String(s).match(/#[0-9A-Fa-f]{6}/g) || []; return all ? m : m[0]; };
const hash = (s) => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
// marcadores autorais → spans (o cérebro escreve <grad>/<gold>/<br>/<b> no conteúdo)
const r = (t = "") => String(t).replace(/<grad>/g, '<span class="grad">').replace(/<\/grad>/g, "</span>").replace(/<gold>/g, '<span class="gold">').replace(/<\/gold>/g, "</span>");
const bg = (f) => `url('${ASSET_REL}${f}')`;

async function lerDNA() {
  const dna = JSON.parse(await readFile(path.resolve(__dirname, "../brand-dna.json"), "utf-8"));
  const p = dna.paleta_marca_psi_automatic;
  const g = hex(p.gradiente_assinatura, true);
  return { ink: hex(p.neutro_escuro) || "#0A0A0A", paper: hex(p.neutro_claro) || "#F2F1EE", grad: g.length >= 3 ? g : ["#FF1E8C", "#FF6A1A", "#8B2FE0"] };
}
// paleta da PROVA (psicologia) — o miolo calmo que o bracket emoldura
const PV = { navy: "#1F3B52", navySoft: "#3A5570", cream: "#EFE8DB", gold: "#B5905A" };

function css(d) {
  return `
:root{--ink:${d.ink};--paper:${d.paper};--navy:${PV.navy};--navy-soft:${PV.navySoft};--cream:${PV.cream};--gold:${PV.gold};
 --sans:'Poppins',sans-serif;--fr:'Fraunces',serif;--ag:'Archivo',sans-serif;--g1:${d.grad[0]};--g2:${d.grad[1]};--g3:${d.grad[2]};}
*{margin:0;padding:0;box-sizing:border-box}html,body{background:#cfcabd}#post{width:1080px}
.slide{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:var(--sans);
 display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 120px}
.ink{background:var(--ink);color:#fff}.paper{background:var(--paper);color:var(--ink)}
.navy{background:var(--navy);color:var(--cream)}.cream{background:var(--cream);color:var(--navy)}
.slide::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.05;mix-blend-mode:multiply;z-index:9;
 background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
.ph{position:absolute;inset:0;background-size:cover;background-position:center;filter:grayscale(1) contrast(1.05);z-index:1}
.ph.tex{opacity:.13;filter:grayscale(1) brightness(1.1)}
.duo-ink{position:absolute;inset:0;background:var(--ink);mix-blend-mode:multiply;opacity:.74;z-index:2}
.duo-navy{position:absolute;inset:0;background:var(--navy);mix-blend-mode:multiply;opacity:.8;z-index:2}
.vig{position:absolute;inset:0;z-index:3;background:radial-gradient(ellipse at center,transparent 38%,rgba(10,10,10,.72))}
.z{position:relative;z-index:6}
/* kicker/rodapé no PONTO-DOCE ~24px (legível, sem gritar) */
.kick{position:absolute;top:80px;left:0;right:0;text-align:center;z-index:6;font-family:var(--ag);font-size:24px;letter-spacing:4px;font-weight:400;text-transform:uppercase;color:#8a8a8a}
.kick b{font-weight:800}
.paper .kick{color:#8f8a82}.paper .kick b{color:#2a2a2a}.ink .kick{color:#9a9a9a}.ink .kick b{color:#ededed}
.navy .kick{color:#9fb0bf}.navy .kick b{color:#eee7da}.cream .kick{color:#8f8a82}.cream .kick b{color:#2a2a2a}
.foot{position:absolute;bottom:80px;left:0;right:0;text-align:center;z-index:6;font-family:var(--ag);font-size:22px;letter-spacing:4px;font-weight:700}
.ink .foot,.paper .foot{color:#9a9a9a}.navy .foot{color:#D9C49C}.cream .foot{color:var(--navy-soft);opacity:.6}
.grad{background:linear-gradient(100deg,var(--g1),var(--g2),var(--g3));-webkit-background-clip:text;background-clip:text;color:transparent}
.gold{color:var(--gold)}
.ah{font-family:var(--ag);font-weight:800;line-height:1.06;letter-spacing:-1.5px}
.fr{font-family:var(--fr);font-style:italic;font-weight:500;line-height:1.05}
/* MARCA hook */
.marca-h{font-size:76px;max-width:880px}.ink .marca-h{color:#fff}.paper .marca-h{color:var(--ink)}
.marca-sub{display:block;font-size:34px;font-weight:300;margin-top:30px;letter-spacing:0;line-height:1.4}
.ink .marca-sub{color:#dcdcdc}.paper .marca-sub{color:#4a4a4a}.marca-sub b{font-weight:600}.ink .marca-sub b{color:#fff}.paper .marca-sub b{color:#1a1a1a}
/* PROVA */
.pv-eyebrow{font-size:40px;font-weight:300}.navy .pv-eyebrow{color:#C9D4DE}.cream .pv-eyebrow{color:var(--navy-soft)}
.pv-fr{font-size:92px}.navy .pv-fr{color:#fff}.cream .pv-fr{color:var(--navy)}
.pv-sub{font-size:37px;font-weight:300;margin-top:30px;max-width:740px;line-height:1.4}.navy .pv-sub{color:#C9D4DE}.cream .pv-sub{color:var(--navy-soft)}.pv-sub b{font-weight:500}.navy .pv-sub b{color:#fff}.cream .pv-sub b{color:var(--navy)}
.pv-big{font-size:100px;color:var(--gold)}
.pv-body{font-size:35px;font-weight:300;line-height:1.5;max-width:800px}.navy .pv-body{color:#C9D4DE}.cream .pv-body{color:var(--navy-soft)}.pv-body b{font-weight:500}.navy .pv-body b{color:#fff}.cream .pv-body b{color:var(--navy)}
.rule{width:120px;height:2px;background:var(--gold);margin:34px auto;opacity:.85}
/* MARCA pitch */
.pitch-h{font-size:74px;max-width:880px}.paper .pitch-h{color:var(--ink)}.ink .pitch-h{color:#fff}
.pitch-body{font-size:34px;font-weight:300;margin-top:24px;max-width:780px;line-height:1.4}.paper .pitch-body{color:#4a4a4a}.ink .pitch-body{color:#d6d6d6}.pitch-body b{font-weight:600}.paper .pitch-body b{color:var(--ink)}.ink .pitch-body b{color:#fff}
.cta{font-family:var(--ag);font-size:50px;font-weight:800;margin-top:36px}.paper .cta{color:var(--ink)}.ink .cta{color:#fff}
.ctasub{font-size:30px;font-weight:300;margin-top:10px}.paper .ctasub{color:#4a4a4a}.ink .ctasub{color:#d6d6d6}
.sign{position:absolute;left:0;right:0;bottom:58px;text-align:center;font-family:var(--ag);font-size:22px;z-index:6}.paper .sign{color:#9a958c}.ink .sign{color:#8a8a8a}.sign b{font-weight:800}.paper .sign b{color:var(--ink)}.ink .sign b{color:#fff}`;
}
const kick = (c) => `<div class="kick">${c.kicker}</div>`;
const selo = (g) => `<svg style="position:absolute;top:96px;right:96px;z-index:7" width="116" height="116" viewBox="0 0 100 100">
 <defs><path id="sr" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0"/><linearGradient id="sg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[0]}"/><stop offset=".5" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[2]}"/></linearGradient></defs>
 <circle cx="50" cy="50" r="48" fill="none" stroke="#fff" stroke-width=".8" opacity=".45"/>
 <text font-family="Archivo,sans-serif" font-weight="600" font-size="7" letter-spacing="2.1" fill="#fff" opacity=".7"><textPath href="#sr" startOffset="0%">PSI.AUTOMATIC · MARKETING NO SEU BOLSO · </textPath></text>
 <text x="50" y="63" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="900" font-size="38" fill="url(#sg)">&#8734;</text></svg>`;

// ===================== SLIDES (por papel; cor/foto vêm da ASSINATURA) =====================
const hookFoto = (c, { foto }) => `<section class="slide ink">
  <div class="ph" style="background-image:${bg(foto)}"></div><div class="duo-ink"></div><div class="vig"></div>${kick(c)}
  <h1 class="ah marca-h z">${r(c.hook.headline)}<span class="marca-sub">${r(c.hook.sub)}</span></h1>
  <div class="foot">ARRASTA&nbsp;&#8594;</div></section>`;
const hookTipo = (c) => `<section class="slide paper">${kick(c)}
  <h1 class="ah marca-h z">${r(c.hook.headline)}<span class="marca-sub">${r(c.hook.sub)}</span></h1>
  <div class="foot">ARRASTA&nbsp;&#8594;</div></section>`;
const capa = (c, { sbg, foto }) => `<section class="slide ${sbg}">
  ${foto ? `<div class="ph" style="background-image:${bg(foto)}"></div><div class="duo-navy"></div><div class="vig"></div>` : ""}${kick(c)}
  <div class="pv-fr fr z">${r(c.prova.capa.headline)}</div>
  <p class="pv-sub z">${r(c.prova.capa.sub)}</p>
  <div class="foot">2 / 6</div></section>`;
const reframe = (c, { sbg }) => `<section class="slide ${sbg}">${kick(c)}
  <p class="pv-eyebrow z">${r(c.prova.reframe.eyebrow)}</p>
  <div class="pv-fr fr z">${r(c.prova.reframe.headline)}</div>
  <div class="rule"></div>
  <p class="pv-body z">${r(c.prova.reframe.corpo)}</p>
  <div class="foot">3 / 6</div></section>`;
const aprofunda = (c, { sbg, foto }) => `<section class="slide ${sbg}">
  ${foto ? `<div class="ph tex" style="background-image:${bg(foto)}"></div>` : ""}${kick(c)}
  <div class="pv-fr fr z" style="font-size:74px;max-width:880px">${r(c.prova.aprofunda.headline)}</div>
  <p class="pv-body z" style="margin-top:32px">${r(c.prova.aprofunda.corpo)}</p>
  <div class="foot">4 / 6</div></section>`;
const acolhimento = (c, { sbg }) => `<section class="slide ${sbg}">${kick(c)}
  <p class="pv-eyebrow z">${r(c.prova.acolhimento.eyebrow)}</p>
  <div class="pv-big fr z">${r(c.prova.acolhimento.headline)}</div>
  <div class="rule"></div>
  <p class="pv-body z">${r(c.prova.acolhimento.corpo)}</p>
  <div class="foot">5 / 6</div></section>`;
const pitchCorpo = (c) => `${kick(c)}
  <h2 class="ah pitch-h z">${r(c.pitch.headline)}</h2>
  <p class="pitch-body z">${r(c.pitch.corpo)}</p>
  <div class="cta z">Comenta <span class="grad">${c.pitch.cta_kw}</span>&nbsp;&#8595;</div>
  <p class="ctasub z">${r(c.pitch.cta_sub)}</p>
  <div class="sign"><b>@psi.automatic</b>&nbsp;&middot;&nbsp;sua equipe de marketing no bolso</div>`;
const pitchClaro = (c) => `<section class="slide paper">${pitchCorpo(c)}</section>`;
const pitchPreto = (c, { d }) => `<section class="slide ink">${selo(d.grad)}${pitchCorpo(c)}</section>`;

// ===================== ASSINATURAS (rotacionam por tema → anti-repetição entre carrosséis) =====================
// arc = cor que GOVERNA cada slide de prova (alterna navy/creme p/ ritmo). foto = em quais slots a foto entra.
const ARC_A = { capa: "navy", reframe: "cream", aprofunda: "navy", acolhimento: "cream" };
const ARC_B = { capa: "cream", reframe: "navy", aprofunda: "cream", acolhimento: "navy" };
const SIGNATURES = [
  { nome: "Noturno", hook: "foto", pitch: "claro", arc: ARC_A, foto: { hook: true, aprofunda: true } },
  { nome: "Aurora", hook: "tipo", pitch: "preto", arc: ARC_B, foto: { capa: true } },
  { nome: "Vértice", hook: "foto", pitch: "preto", arc: ARC_B, foto: { hook: true } },
];

async function main() {
  const d = await lerDNA();
  const c = JSON.parse(await readFile(path.resolve(__dirname, arg("in", "outputs/conteudo.json")), "utf-8"));
  c.kicker = c.kicker || "<b>PSI.AUTOMATIC</b> &middot; MARKETING PARA PSICÓLOGOS";
  const foto = arg("foto", c.foto || "");
  const vArg = arg("variant", "");
  const sig = SIGNATURES[(vArg !== "" ? Number(vArg) : hash(slug(c.tema || "x"))) % SIGNATURES.length];
  const arc = { ...sig.arc };
  if (foto && sig.foto.capa) arc.capa = "navy"; // foto na capa pede duotone navy

  const useFotoHook = sig.hook === "foto" && foto;
  const slides = [
    useFotoHook ? hookFoto(c, { foto }) : hookTipo(c),
    capa(c, { sbg: arc.capa, foto: sig.foto.capa && foto ? foto : "" }),
    reframe(c, { sbg: arc.reframe }),
    aprofunda(c, { sbg: arc.aprofunda, foto: sig.foto.aprofunda && foto ? foto : "" }),
    acolhimento(c, { sbg: arc.acolhimento }),
    sig.pitch === "claro" ? pitchClaro(c) : pitchPreto(c, { d }),
  ].join("\n");

  const html = `<!doctype html><html lang="pt-br"><head><meta charset="utf-8">
   <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Archivo:wght@400;700;800;900&display=swap" rel="stylesheet">
   <style>${css(d)}</style></head><body><div id="post">${slides}</div></body></html>`;
  await mkdir(OUT_DIR, { recursive: true });
  const htmlPath = path.join(OUT_DIR, `compor-${slug(c.tema)}.html`);
  await writeFile(htmlPath, html, "utf-8");
  const out = path.resolve(__dirname, arg("out", `outputs/carrossel-${slug(c.tema)}.jpg`));
  const { stdout } = await execFileP("node", [RENDERER, htmlPath, out, "1080", "1350", "--slides"]);
  console.log(stdout.trim().split("\n").pop());
  console.log(`[compor] "${c.tema}" pronto · assinatura "${sig.nome}" (hook=${useFotoHook ? "foto" : "tipo"}, pitch=${sig.pitch}, foto=${foto || "—"}).`);
}
main().catch((e) => { console.error("Falha ao compor:", e.message); process.exit(1); });
