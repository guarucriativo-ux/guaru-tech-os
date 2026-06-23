// Consulta de histórico do data/ledger.jsonl — "o sistema pensa antes de agir".
// Usado pra (a) decidir o próximo ângulo de copy por rotação e (b) evitar repetir
// registro/asset nos últimos N outputs antes de montar um Job novo.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEDGER_PATH = path.resolve(__dirname, "../data/ledger.jsonl");

export async function readLedger() {
  try {
    const raw = await readFile(LEDGER_PATH, "utf-8");
    return raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch {
    return []; // ledger ainda não existe — primeira execução, não é erro.
  }
}

export async function recentEvents({ modulo, client, limit = 5 } = {}) {
  const all = await readLedger();
  let filtered = all;
  if (modulo) filtered = filtered.filter((e) => e.modulo === modulo);
  if (client) filtered = filtered.filter((e) => e.client === client);
  return filtered.slice(-limit);
}

// Rotação de ângulo de abordagem — usada pelo content-generator a cada nova semana/post.
export const ANGULOS = [
  { id: "dor", label: "Dor do cliente" },
  { id: "beneficio", label: "Benefício direto" },
  { id: "autoridade", label: "Autoridade / Prova" },
];

export async function nextAngulo({ client, limit = 5 } = {}) {
  const recent = await recentEvents({ modulo: "content-generator", client, limit });
  const lastWithAngulo = [...recent].reverse().find((e) => e.angulo);
  const lastIndex = lastWithAngulo ? ANGULOS.findIndex((a) => a.id === lastWithAngulo.angulo) : -1;
  return ANGULOS[(lastIndex + 1) % ANGULOS.length];
}

// Anti-repetição: dado uma lista de candidatos (registros, por ex.), recomenda os que NÃO
// apareceram nos últimos N outputs do automation-bridge pra aquele cliente.
export async function avoidRepeats({ client, candidates, limit = 5 }) {
  const recent = await recentEvents({ modulo: "automation-bridge", client, limit });
  const usedRegistros = new Set(recent.map((e) => e.registro).filter(Boolean));
  const fresh = candidates.filter((c) => !usedRegistros.has(c));
  return {
    usedRegistros: [...usedRegistros],
    recommended: fresh.length ? fresh : candidates,
  };
}
