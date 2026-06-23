// kb-query.js — consulta a base de conhecimento (a "Faculdade"): dado uma pergunta, retorna os
// trechos mais relevantes de knowledge-base/ pra injetar como contexto na geração ("o sistema
// estuda antes de criar"). v1: busca por palavra-chave, zero dependências. Evolui pra embeddings.
//
// Uso:  node core/kb-query.js "como diagramar um carrossel" [--top=5] [--area=design]
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KB_DIR = path.resolve(__dirname, "../knowledge-base");

const STOPWORDS = new Set(
  ("a o e de da do das dos um uma para por com que se na no em as os ao à é como qual quais " +
   "the of and to in for on is").split(/\s+/),
);

function tokenize(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // tira acentos
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

async function walk(dir) {
  let files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files = files.concat(await walk(full));
    else if (/\.(md|txt)$/i.test(entry.name) && entry.name.toLowerCase() !== "readme.md") {
      files.push(full);
    }
  }
  return files;
}

// Quebra um arquivo em chunks por parágrafo (linhas em branco), descartando os curtos demais.
function chunkify(text) {
  return text
    .split(/\n\s*\n/)
    .map((c) => c.trim())
    .filter((c) => c.length >= 80);
}

function scoreChunk(queryTerms, chunkTerms) {
  const freq = new Map();
  for (const t of chunkTerms) freq.set(t, (freq.get(t) ?? 0) + 1);
  let score = 0;
  let distinct = 0;
  for (const q of queryTerms) {
    const f = freq.get(q) ?? 0;
    if (f > 0) { score += f; distinct += 1; }
  }
  return score + distinct * 2; // bônus por cobrir termos distintos da pergunta
}

// Função reutilizável: retorna os trechos mais relevantes da base para uma pergunta.
// Degrada gracioso: base ausente/vazia ou query vazia → retorna [] (nunca lança por isso).
// É o que o content-generator importa para "estudar antes de criar".
export async function queryKnowledgeBase(query, { top = 5, area = null } = {}) {
  const queryTerms = tokenize(query ?? "");
  if (queryTerms.length === 0) return [];
  try { await stat(KB_DIR); } catch { return []; }

  const root = area ? path.join(KB_DIR, area) : KB_DIR;
  let files;
  try { files = await walk(root); } catch { return []; }

  const results = [];
  for (const file of files) {
    const text = await readFile(file, "utf-8");
    for (const chunk of chunkify(text)) {
      const score = scoreChunk(queryTerms, tokenize(chunk));
      if (score > 0) results.push({ score, file: path.relative(KB_DIR, file), chunk });
    }
  }
  results.sort((a, b) => b.score - a.score);
  return results.slice(0, top);
}

async function main() {
  const args = process.argv.slice(2);
  const query = args.filter((a) => !a.startsWith("--")).join(" ");
  const top = Number((args.find((a) => a.startsWith("--top=")) ?? "").split("=")[1]) || 5;
  const area = (args.find((a) => a.startsWith("--area=")) ?? "").split("=")[1] || null;
  if (!query) {
    console.error('Uso: node core/kb-query.js "sua pergunta" [--top=5] [--area=design]');
    process.exit(1);
  }
  const hits = await queryKnowledgeBase(query, { top, area });
  if (hits.length === 0) {
    console.log(`Nada relevante encontrado para: "${query}". (A base ainda está magra? Alimente-a.)`);
    return;
  }
  console.log(`\nTop ${hits.length} trechos para: "${query}"\n`);
  for (const [i, h] of hits.entries()) {
    const snippet = h.chunk.length > 600 ? h.chunk.slice(0, 600) + "…" : h.chunk;
    console.log(`#${i + 1}  [score ${h.score}]  (${h.file})`);
    console.log(snippet);
    console.log("—".repeat(60));
  }
}

// Só roda o CLI quando executado direto (node core/kb-query.js ...), não quando importado.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error("Falha na consulta:", e.message); process.exit(1); });
}
