import { readDna, writeDna, getField, setField } from '../../core/brand-dna.js';

export const summary = 'Lê ou escreve campos do brand-dna.json';
export const usage = `guaru dna <cliente>                 → mostra o brand-dna.json inteiro
guaru dna <cliente> <campo>         → mostra um campo (ex: palette.primary)
guaru dna <cliente> <campo>=<valor> → define um campo existente no schema`;

export async function run({ positionals }) {
  const [slug, expr] = positionals;
  if (!slug) throw new Error('Informe o cliente: guaru dna <cliente> [campo[=valor]]');

  const dna = await readDna(slug);

  if (!expr) {
    console.log(JSON.stringify(dna, null, 2));
    return;
  }

  const eq = expr.indexOf('=');
  if (eq === -1) {
    const val = getField(dna, expr);
    if (val === undefined) throw new Error(`Campo inexistente: ${expr}`);
    console.log(typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val));
    return;
  }

  const field = expr.slice(0, eq);
  const value = expr.slice(eq + 1);
  setField(dna, field, value);
  await writeDna(slug, dna);
  console.log(`✔ ${slug}: ${field} = "${value}"`);
}
