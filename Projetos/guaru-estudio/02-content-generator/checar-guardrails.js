// checar-guardrails.js — PORTÃO DE GUARDRAIL do Guaru Estúdio (teste de regressão de marca).
// Reprova (exit 1) se a copy ferir as regras inquebráveis do Estúdio (ver brand-dna.json / client-context.md).
// Uso: node checar-guardrails.js [arquivo.json|.txt ...]   (default: outputs/conteudo.json | conteudo.exemplo.json)
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Regra de marca do Estúdio: a fábrica é INVISÍVEL. Vender BENEFÍCIO + toque humano, NUNCA "IA"/"automático".
const REGRAS = [
  { re: /feito (por|pela)\s+ia\b|nossa\s+ia\b|gerad[oa]s?\s+por\s+ia|intelig[êe]ncia artificial|\bchatbot\b/i,
    motivo: "menção a 'IA' — o Estúdio vende toque HUMANO; a fábrica é segredo interno. Protege o premium." },
  { re: /no autom[áa]tico|posts? autom[áa]tico|na intelig[êe]ncia/i,
    motivo: "'no automático' como bordão — derruba o premium e vira cara de leigo. Vender dor+benefício." },
  { re: /(garant\w+|promet\w+)[^.]{0,30}(resultado|venda|sucesso)/i,
    motivo: "promessa vazia/garantia de resultado — fere a confiança. Vender o trabalho, não milagre." },
];

function coletarStrings(v, caminho, acc) {
  if (typeof v === "string") acc.push([caminho, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => coletarStrings(x, `${caminho}[${i}]`, acc));
  else if (v && typeof v === "object") for (const k of Object.keys(v)) coletarStrings(v[k], caminho ? `${caminho}.${k}` : k, acc);
  return acc;
}

async function checar(file) {
  const raw = await readFile(file, "utf-8");
  let pares;
  try { pares = coletarStrings(JSON.parse(raw), "", []); } catch { pares = [["(texto)", raw]]; }
  const v = [];
  for (const [campo, texto] of pares) {
    if (campo.split(".").some((p) => p.startsWith("_"))) continue; // ignora campos meta (_aviso etc.)
    for (const regra of REGRAS) { const m = texto.match(regra.re); if (m) v.push({ campo, trecho: m[0], motivo: regra.motivo }); }
  }
  return v;
}

async function main() {
  let files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (files.length === 0) {
    const def = path.resolve(__dirname, "outputs/conteudo.json");
    files = [existsSync(def) ? def : path.resolve(__dirname, "conteudo.exemplo.json")];
  }
  let total = 0;
  for (const f of files) {
    const rel = path.relative(process.cwd(), path.resolve(f));
    let v; try { v = await checar(path.resolve(f)); } catch (e) { console.error(`✖ não li ${rel}: ${e.message}`); process.exitCode = 1; continue; }
    if (v.length === 0) console.log(`✓ ${rel} — passou (nenhuma frase proibida).`);
    else { total += v.length; console.log(`✖ ${rel} — ${v.length} violação(ões):`); for (const x of v) console.log(`   • "${x.campo}": achou "${x.trecho}"\n     → ${x.motivo}`); }
  }
  if (total > 0) { console.error(`\n⛔ GUARDRAIL REPROVOU (${total}). Corrigir antes de renderizar/publicar.`); process.exit(1); }
  console.log("\n✅ Guardrails do Estúdio OK. Pode seguir.");
}
main().catch((e) => { console.error("Falha no checador:", e.message); process.exit(1); });
