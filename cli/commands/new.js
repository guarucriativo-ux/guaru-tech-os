import { cloneTemplate } from '../../core/client-repo.js';
import { readDna, writeDna } from '../../core/brand-dna.js';

export const summary = 'Cria um cliente clonando o template em Projetos/<slug>';
export const usage = `guaru new <nome>

Clona template-client-base/ em Projetos/<slug> e preenche o campo "client"
do brand-dna.json. Ex: guaru new "Padaria do Zé"`;

export async function run({ positionals }) {
  const name = positionals.join(' ').trim();
  if (!name) throw new Error('Informe o nome do cliente: guaru new "<nome>"');

  const { slug } = await cloneTemplate(name);
  const dna = await readDna(slug);
  dna.client = name;
  await writeDna(slug, dna);

  console.log(`✔ Cliente criado: Projetos/${slug}`);
  console.log(`  brand-dna.json → client = "${name}"`);
  console.log('  Próximo: preencher brand-dna.json e client-context.md.');
}
