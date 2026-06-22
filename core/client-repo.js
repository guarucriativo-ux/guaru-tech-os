import { readdir, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const PROJECTS_DIR = path.join(ROOT, 'Projetos');
export const TEMPLATE_DIR = path.join(ROOT, 'template-client-base');

export function slugify(name) {
  return name
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // remove acentos
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function clientPath(slug) {
  return path.join(PROJECTS_DIR, slug);
}

// Entradas que um cliente conforme deve ter, derivadas do template (fonte da verdade).
export async function templateEntries() {
  return (await readdir(TEMPLATE_DIR)).sort();
}

export async function listClients() {
  if (!existsSync(PROJECTS_DIR)) return [];
  const entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
  return entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
}

export async function cloneTemplate(name) {
  const slug = slugify(name);
  if (!slug) throw new Error(`Nome inválido: "${name}"`);
  const dest = clientPath(slug);
  if (existsSync(dest)) throw new Error(`Cliente já existe: Projetos/${slug}`);
  await cp(TEMPLATE_DIR, dest, { recursive: true });
  return { slug, dest };
}

// Conformidade = todas as entradas do template existem na pasta do cliente.
export async function checkConformance(slug) {
  if (!existsSync(clientPath(slug))) throw new Error(`Cliente não encontrado: Projetos/${slug}`);
  const required = await templateEntries();
  const missing = required.filter((entry) => !existsSync(path.join(clientPath(slug), entry)));
  return { conformant: missing.length === 0, missing, required };
}
