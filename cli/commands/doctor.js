import { checkConformance } from '../../core/client-repo.js';

export const summary = 'Valida se um cliente segue a estrutura do template';
export const usage = `guaru doctor <cliente>

Verifica se Projetos/<cliente> tem todas as entradas do template-client-base.
Sai com código 1 se divergir (útil para automação).`;

export async function run({ positionals }) {
  const slug = positionals[0];
  if (!slug) throw new Error('Informe o cliente: guaru doctor <cliente>');

  const { conformant, missing } = await checkConformance(slug);
  if (conformant) {
    console.log(`✔ ${slug} está conforme o template.`);
    return;
  }
  console.log(`⚠ ${slug} diverge do template. Faltam:`);
  for (const m of missing) console.log(`  - ${m}`);
  process.exitCode = 1;
}
