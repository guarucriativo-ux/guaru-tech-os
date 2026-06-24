// checar-guardrails.js — PORTÃO DE GUARDRAIL da fábrica (teste automático de regressão).
// Lê o conteúdo gerado (JSON ou txt) e REPROVA (exit 1) se achar frase proibida pelas regras de marca.
// É o "human-on-the-loop" automatizado: a máquina pega o próprio escorregão ANTES de virar arte.
// Uso:  node checar-guardrails.js [arquivo1 arquivo2 ...]   (default: outputs/conteudo.json)
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cada regra = um padrão proibido + o porquê. Adicione regras conforme o Marcos cravar.
const REGRAS = [
  { re: /no autom[áa]tico/i, motivo: "'no automático' como bordão de venda (pesa pro lado IA). Regra de marca 2026-06-24. Vender dor+economia. O nome psi.automatic é OK; o bordão NÃO." },
  { re: /feito (por|pela)\s+ia\b|nossa\s+ia\b|gerad[oa]s?\s+por\s+ia|intelig[êe]ncia artificial/i, motivo: "menção a 'feito por IA' — vender o benefício, nunca o mecanismo." },
  { re: /(promet\w*|garant\w*)[^.]{0,30}(cura|result\w*)|cura garantida|result\w* garantid\w*/i, motivo: "promessa de cura/resultado garantido — fere o guardrail ético CFP." },
  { re: /\bdiagn[óo]stic\w+\b/i, motivo: "linguagem de diagnóstico — conteúdo educa, não diagnostica (CFP)." },
];

// Anda em qualquer JSON coletando (caminho, string).
function coletarStrings(valor, caminho, acc) {
  if (typeof valor === "string") acc.push([caminho, valor]);
  else if (Array.isArray(valor)) valor.forEach((v, i) => coletarStrings(v, `${caminho}[${i}]`, acc));
  else if (valor && typeof valor === "object") for (const k of Object.keys(valor)) coletarStrings(valor[k], caminho ? `${caminho}.${k}` : k, acc);
  return acc;
}

async function checarArquivo(file) {
  const raw = await readFile(file, "utf-8");
  let pares;
  try { pares = coletarStrings(JSON.parse(raw), "", []); }
  catch { pares = [["(texto)", raw]]; } // não é JSON → checa o texto inteiro

  const violacoes = [];
  for (const [campo, texto] of pares) {
    // ignora campos meta de controle (ex.: _aviso)
    if (campo.split(".").some((p) => p.startsWith("_"))) continue;
    for (const regra of REGRAS) {
      const m = texto.match(regra.re);
      if (m) violacoes.push({ campo, trecho: m[0], motivo: regra.motivo });
    }
  }
  return violacoes;
}

async function main() {
  const files = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (files.length === 0) files.push(path.resolve(__dirname, "outputs/conteudo.json"));

  let total = 0;
  for (const f of files) {
    const rel = path.relative(process.cwd(), path.resolve(f));
    let violacoes;
    try { violacoes = await checarArquivo(path.resolve(f)); }
    catch (e) { console.error(`✖ não consegui ler ${rel}: ${e.message}`); process.exitCode = 1; continue; }

    if (violacoes.length === 0) {
      console.log(`✓ ${rel} — passou (nenhuma frase proibida).`);
    } else {
      total += violacoes.length;
      console.log(`✖ ${rel} — ${violacoes.length} violação(ões):`);
      for (const v of violacoes) console.log(`   • campo "${v.campo}": achou "${v.trecho}"\n     → ${v.motivo}`);
    }
  }

  if (total > 0) {
    console.error(`\n⛔ GUARDRAIL REPROVOU (${total}). A peça NÃO deve ser renderizada/publicada até corrigir.`);
    process.exit(1);
  }
  console.log("\n✅ Guardrails OK. Pode seguir.");
}

main().catch((e) => { console.error("Falha no checador:", e.message); process.exit(1); });
