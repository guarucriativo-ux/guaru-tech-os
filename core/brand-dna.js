import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { clientPath } from './client-repo.js';

function dnaFile(slug) {
  return path.join(clientPath(slug), 'brand-dna.json');
}

export async function readDna(slug) {
  const file = dnaFile(slug);
  if (!existsSync(file)) throw new Error(`brand-dna.json não encontrado para ${slug}`);
  return JSON.parse(await readFile(file, 'utf8'));
}

export async function writeDna(slug, dna) {
  await writeFile(dnaFile(slug), JSON.stringify(dna, null, 2) + '\n', 'utf8');
}

// Acesso por caminho com ponto: "palette.primary".
export function getField(dna, dotted) {
  return dotted.split('.').reduce((o, k) => (o == null ? o : o[k]), dna);
}

// Só permite escrever campos que já existem no schema do brand-dna.json,
// evitando criar chaves fora do padrão definido no template.
export function setField(dna, dotted, value) {
  const keys = dotted.split('.');
  const last = keys.pop();
  let target = dna;
  for (const k of keys) {
    if (typeof target[k] !== 'object' || target[k] === null) {
      throw new Error(`Campo inválido: "${dotted}" ("${k}" não é um objeto no schema)`);
    }
    target = target[k];
  }
  if (!(last in target)) throw new Error(`Campo inexistente no schema: "${dotted}"`);
  target[last] = value;
  return dna;
}
