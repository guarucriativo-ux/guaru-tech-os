#!/usr/bin/env node
/* Hook PostToolUse (Write): toda vez que um carrossel é gerado em
   Projetos/<cliente>/outputs/carrossel-*.html, registra um evento FACTUAL de
   geração em learning-log.md do cliente — "aguardando validação do Marcos".
   Não carimba "sucesso": sucesso é validado depois, via `guaru learn` (ver CLAUDE.md,
   Ciclo de Aprendizado). O hook nunca bloqueia: sai sempre com código 0. */

import { existsSync, readFileSync, appendFileSync } from 'node:fs';
import path from 'node:path';

function readStdin() {
  try {
    return readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

try {
  const raw = readStdin();
  if (!raw.trim()) process.exit(0);

  const payload = JSON.parse(raw);
  const filePath = payload?.tool_input?.file_path ?? '';

  const m = filePath.match(/^(.*[\\/]Projetos[\\/][^\\/]+)[\\/]outputs[\\/](carrossel-.+\.html)$/i);
  if (!m) process.exit(0); // não é um carrossel — ignora silenciosamente

  const clientDir = m[1];
  const peca = `outputs/${m[2]}`;
  const logFile = path.join(clientDir, 'learning-log.md');
  if (!existsSync(logFile)) process.exit(0);

  // Idempotência: não duplica entrada para a mesma peça no mesmo dia.
  const today = new Date().toISOString().slice(0, 10);
  const marker = `<!-- auto:${today}:${peca} -->`;
  if (readFileSync(logFile, 'utf8').includes(marker)) process.exit(0);

  const entry = [
    ``,
    `## [${today}] ${m[2]} (geração automática)`,
    marker,
    `- **Peça:** ${peca}`,
    `- **Evento:** carrossel gerado pelo pipeline — aguardando feedback do Marcos`,
    `- **Status:** pendente de validação (promover com \`guaru learn\` após aprovação)`,
    ``,
  ].join('\n');

  appendFileSync(logFile, entry, 'utf8');
} catch {
  // Hook nunca deve quebrar a geração.
}
process.exit(0);
