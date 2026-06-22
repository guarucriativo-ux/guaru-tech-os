// Protocolo de Criação Sequencial: consulta o histórico (data/ledger.jsonl) ANTES de montar
// os Jobs, decide registro + ângulo evitando repetição, e só então escreve os 3 jobs.json.
// "O sistema pensa antes de agir" — o raciocínio é impresso, não escondido.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { avoidRepeats, recentEvents, ANGULOS } from "../shared/ledger-query.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT = "performance-box";

console.log("=== Consulta de histórico (anti-repetição) ===");
const recent = await recentEvents({ modulo: "automation-bridge", limit: 5 });
console.log(`Últimos ${recent.length} outputs do automation-bridge (qualquer cliente):`);
for (const e of recent) {
  console.log(`  - registro="${e.registro}" client="${e.client}" criado_em=${e.criado_em}`);
}

const candidatos = ["mona", "kameleon-organico", "cafe-aconchegante"];
const { usedRegistros, recommended } = await avoidRepeats({ client: CLIENT, candidates: candidatos, limit: 5 });
console.log(`\nRegistros já usados recentemente por "${CLIENT}": ${usedRegistros.length ? usedRegistros.join(", ") : "(nenhum — primeira sequência deste cliente)"}`);
console.log(`Candidatos recomendados (sem repetição): ${recommended.join(", ")}`);

// Dentro deste lote de 3 posts, cada um usa um registro E um ângulo diferente — não é a
// rotação histórica (essa é pro generate.js, ao longo do tempo), é "não repetir DENTRO do lote".
const sequencia = [
  {
    registro: "mona",
    angulo: ANGULOS[0], // dor
    asset: null,
    text: {
      LABEL_TOP: "performance box",
      TAG_TOP: "ângulo · dor",
      HEADLINE_LINE_1: "TREINO",
      HEADLINE_LINE_2: "SEM",
      HEADLINE_LINE_3: "ACOMPANHAMENTO",
      SUB_TEXT: "não é treino.<br>é aposta.",
      CAPTION_TEXT: "toda academia genérica te entrega<br>equipamento. nenhuma entrega plano.",
    },
  },
  {
    registro: "kameleon-organico",
    angulo: ANGULOS[1], // beneficio
    asset: "assets/simulados/academia-treino-personalizado.png",
    text: {
      HEADLINE_HTML: "Resultado real em <b>90 dias</b><br>com plano <b>sob medida</b>",
      CAPTION_TEXT: "Acompanhamento profissional, todo dia.",
    },
  },
  {
    registro: "cafe-aconchegante",
    angulo: ANGULOS[2], // autoridade
    asset: "assets/simulados/academia-resultado-aluno.png",
    brand: "jobs/academia-brand-dna-teste.json",
    text: {
      TOP_SMALL_1: "o que separa um aluno",
      TOP_BIG: "QUE EVOLUI<br>DE VERDADE",
      TOP_SMALL_2: "de quem só frequenta?",
      SCRIPT_TEXT: "8 anos formando atletas.",
      FOOTER_LABEL: "prova social",
      FOOTER_BIG: "+300 alunos transformados:",
      FOOTER_DETAIL: "metodologia validada, não achismo de instrutor.",
    },
  },
];

console.log("\n=== Decisão da sequência (3 posts, sem repetir registro nem ângulo entre eles) ===");
const jobFiles = [];
for (let i = 0; i < sequencia.length; i++) {
  const item = sequencia[i];
  console.log(`Post ${i + 1}: registro="${item.registro}" ângulo="${item.angulo.id}" (${item.angulo.label}) asset=${item.asset ?? "(nenhum)"}`);

  const job = {
    registro: item.registro,
    client: CLIENT,
    angulo: item.angulo.id,
    week: `academia-seq-${i + 1}`,
    ...(item.asset ? { asset: `../${item.asset}` } : {}),
    ...(item.brand ? { brand: item.brand } : {}),
    text: item.text,
  };

  const filename = `academia-0${i + 1}-${item.registro}.json`;
  const filepath = path.join(__dirname, "jobs", filename);
  await writeFile(filepath, JSON.stringify(job, null, 2), "utf-8");
  jobFiles.push(`jobs/${filename}`);
  console.log(`  -> salvo em jobs/${filename}`);
}

console.log("\n=== Jobs prontos ===");
console.log(jobFiles.join("\n"));
