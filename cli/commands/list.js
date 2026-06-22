import { listClients, checkConformance } from '../../core/client-repo.js';

export const summary = 'Lista clientes em Projetos/ com status de conformidade';
export const usage = `guaru list

Lista as pastas de Projetos/ e indica se cada uma segue o template-client-base.`;

export async function run() {
  const clients = await listClients();
  if (clients.length === 0) {
    console.log('Nenhum cliente em Projetos/.');
    return;
  }
  for (const slug of clients) {
    const { conformant, missing } = await checkConformance(slug);
    const mark = conformant ? '✔' : '⚠';
    const note = conformant ? 'conforme' : `diverge (faltam: ${missing.join(', ')})`;
    console.log(`${mark} ${slug.padEnd(20)} ${note}`);
  }
}
