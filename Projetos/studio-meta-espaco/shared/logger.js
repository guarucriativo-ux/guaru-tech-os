// Utilitário compartilhado: qualquer módulo (content-generator, ads-engine, automation-bridge)
// importa logEvent() e grava um registro em data/ledger.jsonl ao terminar um job. Esse ledger
// não é o CRM — é o rastro de dados que um CRM/dashboard futuro vai ler (ver client-context.md
// e a conversa de roadmap em learned-lessons.md). Formato estritamente JSONL: uma linha, um
// objeto JSON por evento, sem indentação — leitura trivial por qualquer parser de linha (Excel,
// BI, ou um `tail -f` simples).
import { appendFile, mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEDGER_PATH = path.resolve(__dirname, "../data/ledger.jsonl");

/**
 * @param {{
 *   modulo: string,
 *   client?: string,
 *   week?: string|null,
 *   registro?: string|null,
 *   angulo?: string|null,
 *   etapa_funil?: string,
 *   arquivos?: string[],
 * }} event
 */
export async function logEvent(event) {
  if (!event?.modulo) {
    throw new Error('logEvent: campo "modulo" é obrigatório.');
  }

  const record = {
    id: randomUUID(),
    criado_em: new Date().toISOString(),
    client: event.client ?? "guaru-estudio",
    modulo: event.modulo,
    week: event.week ?? null,
    registro: event.registro ?? null,
    angulo: event.angulo ?? null,
    etapa_funil: event.etapa_funil ?? "atracao",
    // Normaliza pra forward-slash aqui, centralizado — nenhum módulo precisa se preocupar com
    // path.sep do Windows. Formato precisa ser portável pra dashboard Web/Excel/BI.
    arquivos: (event.arquivos ?? []).map((file) => file.split(path.sep).join("/")),
  };

  await mkdir(path.dirname(LEDGER_PATH), { recursive: true });
  await appendFile(LEDGER_PATH, JSON.stringify(record) + "\n", "utf-8");

  return record;
}
