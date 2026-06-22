import Anthropic from "@anthropic-ai/sdk";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logEvent } from "../shared/logger.js";
import { nextAngulo } from "../shared/ledger-query.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { week: null, focus: null, context: "../client-context.md", engine: "./engine-content.md" };
  for (const arg of argv) {
    const [key, value] = arg.replace(/^--/, "").split("=");
    if (key in args) args[key] = value;
  }
  return args;
}

function usageAndExit() {
  console.error(
    'Uso: node generate.js --week=02 --focus="<foco comercial da semana>" [--context=<path>] [--engine=<path>]',
  );
  process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.week || !args.focus) usageAndExit();

  const contextPath = path.resolve(__dirname, args.context);
  const enginePath = path.resolve(__dirname, args.engine);
  const outputDir = path.resolve(__dirname, "outputs");
  const outputPath = path.join(outputDir, `semana-${args.week}.md`);

  const [clientContext, engineTemplate] = await Promise.all([
    readFile(contextPath, "utf-8"),
    readFile(enginePath, "utf-8"),
  ]);

  // Gestão de variáveis: antes de gerar, consulta o ledger e decide o próximo ângulo de
  // abordagem por rotação (dor -> benefício -> autoridade -> dor...) — ver shared/ledger-query.js.
  const angulo = await nextAngulo({ client: "guaru-estudio" });
  console.log(`[generate] Ângulo desta semana (rotação automática): ${angulo.id} — ${angulo.label}`);

  const prompt = `Você é o motor de geração de conteúdo da Guaru Tech, operando no molde abaixo
para o cliente descrito no contexto. Siga exatamente a estrutura do molde e o tom de voz do
contexto do cliente. Responda só com o Markdown final do pacote, sem comentários sobre o que
você está fazendo.

## Contexto do cliente
${clientContext}

## Molde do pacote semanal
${engineTemplate}

## Ângulo de abordagem desta semana (rotação automática, não repetir o da semana anterior)
${angulo.label} (id: ${angulo.id})

## Tarefa
Gere o pacote de conteúdo da Semana ${args.week}, usando o ângulo de abordagem indicado acima.
Foco comercial desta semana: ${args.focus}`;

  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n");

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, text, "utf-8");

  await logEvent({
    modulo: "content-generator",
    week: args.week,
    angulo: angulo.id,
    etapa_funil: "atracao",
    arquivos: [path.relative(path.resolve(__dirname, ".."), outputPath)],
  });

  console.log(`Pacote da Semana ${args.week} salvo em ${outputPath}`);
}

main().catch((error) => {
  console.error("Falha ao gerar conteúdo:", error.message);
  process.exit(1);
});
