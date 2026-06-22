import { appendLesson } from '../../core/learning.js';

export const summary = 'Registra um aprendizado em learned-lessons.md';
export const usage = `guaru learn <cliente> --titulo "..." --contexto "..." --resultado "..." --licao "..." [--promovido "..."]

Anexa uma entrada no formato do CLAUDE.md (Ciclo de Aprendizado).`;

const REQUIRED = ['titulo', 'contexto', 'resultado', 'licao'];

export async function run({ positionals, flags }) {
  const slug = positionals[0];
  if (!slug) throw new Error('Informe o cliente: guaru learn <cliente> --titulo ... --contexto ... --resultado ... --licao ...');

  const faltam = REQUIRED.filter((f) => !flags[f] || flags[f] === true);
  if (faltam.length) throw new Error(`Faltam flags: ${faltam.map((f) => '--' + f).join(', ')}`);

  const file = await appendLesson(slug, {
    titulo: flags.titulo,
    contexto: flags.contexto,
    resultado: flags.resultado,
    licao: flags.licao,
    promovido: flags.promovido && flags.promovido !== true ? flags.promovido : 'não',
  });
  console.log(`✔ Aprendizado registrado em ${file}`);
}
