import { appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { clientPath } from './client-repo.js';

function today() {
  return new Date().toISOString().slice(0, 10);
}

// Formato definido no CLAUDE.md → Ciclo de Aprendizado do Agente.
function formatLesson({ titulo, contexto, resultado, licao, promovido }) {
  return [
    ``,
    `## [${today()}] ${titulo}`,
    `- **Contexto:** ${contexto}`,
    `- **Resultado:** ${resultado}`,
    `- **Lição:** ${licao}`,
    `- **Promovido para nicho?** ${promovido}`,
    ``,
  ].join('\n');
}

export async function appendLesson(slug, fields) {
  const file = path.join(clientPath(slug), 'learned-lessons.md');
  if (!existsSync(file)) throw new Error(`learned-lessons.md não encontrado para ${slug}`);
  await appendFile(file, formatLesson({ promovido: 'não', ...fields }), 'utf8');
  return file;
}

export async function appendDesignLog(slug, { peca, feedback, acao }) {
  const file = path.join(clientPath(slug), 'learning-log.md');
  if (!existsSync(file)) throw new Error(`learning-log.md não encontrado para ${slug}`);
  const entry = [
    ``,
    `## [${today()}] ${peca}`,
    `- **Feedback do Marcos:** ${feedback}`,
    `- **Ação:** ${acao}`,
    ``,
  ].join('\n');
  await appendFile(file, entry, 'utf8');
  return file;
}
