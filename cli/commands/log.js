import { appendDesignLog } from '../../core/learning.js';

export const summary = 'Registra feedback de design em learning-log.md';
export const usage = `guaru log <cliente> --peca "..." --feedback "..." --acao "..."

Anexa uma entrada de feedback de design por peça gerada (post, anúncio).`;

const REQUIRED = ['peca', 'feedback', 'acao'];

export async function run({ positionals, flags }) {
  const slug = positionals[0];
  if (!slug) throw new Error('Informe o cliente: guaru log <cliente> --peca ... --feedback ... --acao ...');

  const faltam = REQUIRED.filter((f) => !flags[f] || flags[f] === true);
  if (faltam.length) throw new Error(`Faltam flags: ${faltam.map((f) => '--' + f).join(', ')}`);

  const file = await appendDesignLog(slug, {
    peca: flags.peca,
    feedback: flags.feedback,
    acao: flags.acao,
  });
  console.log(`✔ Feedback de design registrado em ${file}`);
}
