#!/usr/bin/env node
// gerar-snapshot.mjs — achata o repositório inteiro (código + docs, só texto) num único arquivo
// Markdown que pode ser anexado a uma IA externa (ex.: Gemini) pra ela ver a "parte interna" do
// projeto de uma vez. NÃO inclui binários, lockfiles, segredos nem config de editor.
//
// Uso:  node tools/gerar-snapshot.mjs
// Saída: SNAPSHOT-REPO.md na raiz do repositório.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_NAME = "SNAPSHOT-REPO.md";

// Só texto: extensões que valem a pena despejar. O resto (imagem, pdf, ai, psd...) fica de fora.
const TEXT_EXT = new Set([
  ".md", ".txt", ".js", ".mjs", ".cjs", ".json", ".jsonl",
  ".html", ".css", ".yml", ".yaml",
]);
// Nomes sem extensão que ainda queremos incluir.
const ALLOW_NAMES = new Set([".gitignore", ".env.example"]);

// Fora por segurança/ruído: segredos, lockfiles, despejos de imagem, config de ferramenta/editor.
function isExcluded(rel) {
  const p = rel.replace(/\\/g, "/");
  const base = path.basename(p);
  if (base === OUT_NAME || base === "DOSSIE-GEMINI.md") return true; // não se auto-incluir
  if (base === "package-lock.json") return true;
  if (/(^|\/)\.env$/.test(p)) return true;                    // .env real (segredo) — nunca
  if (p.startsWith(".claude/") || p.startsWith(".vscode/")) return true;
  if (p === ".mcp.json") return true;
  if (p.includes("/references/")) return true;                // pastas de despejo de imagem do cliente
  return false;
}

function isText(rel) {
  const base = path.basename(rel);
  if (ALLOW_NAMES.has(base)) return true;
  return TEXT_EXT.has(path.extname(rel).toLowerCase());
}

const LANG = {
  ".js": "javascript", ".mjs": "javascript", ".cjs": "javascript",
  ".json": "json", ".jsonl": "json", ".md": "markdown", ".txt": "text",
  ".html": "html", ".css": "css", ".yml": "yaml", ".yaml": "yaml",
};
const langFor = (rel) => LANG[path.extname(rel).toLowerCase()] ?? "";

// Lista de arquivos versionados (respeita o que está no Git; ignora untracked/node_modules).
// -z = separador nulo, pra aguentar espaços e acentos nos caminhos.
const tracked = execFileSync("git", ["ls-files", "-z"], { cwd: ROOT })
  .toString("utf-8")
  .split("\0")
  .filter(Boolean);

const MAX_BYTES = 200 * 1024; // pula arquivo gigante isolado (lockfile já saiu)
const included = [];
const skippedBig = [];

for (const rel of tracked.sort()) {
  if (isExcluded(rel) || !isText(rel)) continue;
  const abs = path.join(ROOT, rel);
  let size;
  try { size = statSync(abs).size; } catch { continue; }
  if (size > MAX_BYTES) { skippedBig.push(rel); continue; }
  included.push(rel.replace(/\\/g, "/"));
}

// Árvore de pastas simples a partir da lista de arquivos incluídos.
function buildTree(files) {
  const root = {};
  for (const f of files) {
    let node = root;
    for (const part of f.split("/")) node = (node[part] ??= {});
  }
  const lines = [];
  const walk = (node, prefix) => {
    const keys = Object.keys(node).sort();
    keys.forEach((k, i) => {
      const last = i === keys.length - 1;
      lines.push(prefix + (last ? "└── " : "├── ") + k);
      walk(node[k], prefix + (last ? "    " : "│   "));
    });
  };
  walk(root, "");
  return lines.join("\n");
}

const now = new Date().toISOString().slice(0, 16).replace("T", " ");
const parts = [];

parts.push(`# SNAPSHOT DO REPOSITÓRIO — Guaru Tech

> Despejo achatado de TODO o código e documentação do projeto (só texto), gerado automaticamente
> em ${now} por \`tools/gerar-snapshot.mjs\`. É a "parte interna" do sistema num arquivo só, pra
> uma IA externa (ex.: Gemini) ler de uma vez. **Leia o \`DOSSIE-GEMINI.md\` primeiro** — ele é o
> guia; este aqui é o detalhe completo.
>
> ⚠️ NÃO contém segredos (\`.env\`, chaves de API), binários (imagens/PDF), lockfiles nem config de
> editor. Contém ${included.length} arquivos de texto.

---

## Árvore de arquivos (só o que está neste snapshot)

\`\`\`
${buildTree(included)}
\`\`\`
${skippedBig.length ? `\n> Pulados por tamanho (>200KB): ${skippedBig.join(", ")}\n` : ""}
---

## Conteúdo dos arquivos
`);

for (const rel of included) {
  const content = readFileSync(path.join(ROOT, rel), "utf-8").replace(/\r\n/g, "\n");
  const fence = content.includes("```") ? "~~~" : "```"; // evita quebrar o code fence
  parts.push(`\n### \`${rel}\`\n\n${fence}${langFor(rel)}\n${content}\n${fence}\n`);
}

const out = parts.join("\n");
writeFileSync(path.join(ROOT, OUT_NAME), out, "utf-8");

console.log(`✓ ${OUT_NAME} gerado: ${included.length} arquivos, ${(out.length / 1024).toFixed(0)} KB.`);
if (skippedBig.length) console.log(`  (${skippedBig.length} pulado(s) por tamanho)`);
console.log(`  Anexe esse arquivo + DOSSIE-GEMINI.md no chat do Gemini.`);
