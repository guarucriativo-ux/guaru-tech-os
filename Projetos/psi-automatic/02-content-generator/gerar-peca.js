// gerar-peca.js — o "CÉREBRO" da fábrica psi.automatic.
// Lê o brand-DNA + pautas do nicho + consulta a FACULDADE (kb-query) e pede pra API da Anthropic
// PRODUZIR o conteudo.json estruturado de um carrossel (mesmo schema do conteudo.exemplo.json),
// com os guardrails da marca. Depois o montar.js transforma esse JSON em arte + legenda.
//
// Precisa de ANTHROPIC_API_KEY no .env da raiz. Uso:
//   node gerar-peca.js --tema=ansiedade        (ou sem --tema p/ a própria IA escolher pela pauta)
import Anthropic from "@anthropic-ai/sdk";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../..");

function arg(name, def) {
  const a = process.argv.slice(2).find((x) => x.startsWith(`--${name}=`));
  return a ? a.split("=")[1] : def;
}
async function readSafe(p) { try { return await readFile(p, "utf-8"); } catch { return ""; } }

// Carregador de .env mínimo (zero dep): popula process.env a partir da raiz, sem sobrescrever o que já existe.
async function loadEnv() {
  const raw = await readSafe(path.resolve(ROOT, ".env"));
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

async function main() {
  await loadEnv();
  if (!process.env.ANTHROPIC_API_KEY || /sua_chave_aqui/i.test(process.env.ANTHROPIC_API_KEY)) {
    console.error("⚠️  ANTHROPIC_API_KEY não configurada no .env da raiz. Cole sua chave em .env e rode de novo.");
    process.exit(1);
  }
  const tema = arg("tema", "");

  const brandDna = await readSafe(path.resolve(__dirname, "../brand-dna.json"));
  const pautas = await readSafe(path.resolve(ROOT, "niches-library/psicologia/pautas-conteudo.md"));
  const legendaModelo = await readSafe(path.resolve(ROOT, "niches-library/psicologia/legenda-modelo.md"));
  const schema = await readSafe(path.resolve(__dirname, "conteudo.exemplo.json"));

  // Faculdade: estuda antes de criar (frameworks de copy + gatilhos + nível de consciência + guardrail).
  let fundamentos = "";
  try {
    const { queryKnowledgeBase } = await import(pathToFileURL(path.resolve(ROOT, "core/kb-query.js")).href);
    const q = `hook copy carrossel ${tema} fórmula de hook open loop concreto nível de consciência fundamentada sem jargão`;
    const hits = await queryKnowledgeBase(q, { top: 6 });
    if (hits.length) fundamentos = hits.map((h) => `- (${h.file}) ${h.chunk.slice(0, 400).replace(/\s+/g, " ").trim()}`).join("\n");
  } catch (e) { console.warn(`[gerar] Faculdade indisponível (${e.message}).`); }

  const prompt = `Você é o estrategista de conteúdo da vitrine @psi.automatic (marca-AGÊNCIA que vende marketing
para PSICÓLOGOS). Produza o conteúdo de UM carrossel de venda no SCHEMA v2 do exemplo abaixo (mesmas chaves),
retornando SÓ um JSON VÁLIDO, sem texto fora do JSON.

# Estrutura (bracket: MARCA emoldura a PROVA) — 6 slides
- hook (MARCA → fala com o PSICÓLOGO): a dor/objeção dele + open loop ("te provo, arrasta"). headline (com <br>
  pensados + UMA palavra-chave em <grad>...</grad>) e sub curto. NÃO é sobre o paciente.
- prova (post de PSICOLOGIA exemplo sobre o TEMA, falando com o PACIENTE — demonstra qualidade):
  · capa = o HOOK da prova: CONCRETO (uma cena que a pessoa reconhece, "isso sou eu") + OPEN LOOP que só
    fecha arrastando. NUNCA vago. Rotacione a fórmula (pergunta / pattern-break / mito / estatística humana / POV).
  · reframe = a virada/insight (corrige o mito): eyebrow + headline (serifa, UMA palavra em <gold>) + corpo.
  · aprofunda = o mecanismo/porquê (1 ideia forte): headline + corpo.
  · acolhimento = a esperança (a terapia AJUDA — sem prometer cura): eyebrow + headline (palavra-payoff) + corpo.
- pitch (MARCA → vende a psi.automatic): headline (UMA palavra em <grad>) + corpo dor+economia
  ("sua equipe por menos de R$ 4 por dia, sem agência cara") + cta_kw ("QUERO") + cta_sub.
- foto_busca: 2–4 palavras EM INGLÊS pra buscar uma foto-mood CONCEITUAL no banco livre, ligada ao tema
  (ex.: "rain window night"). Deixe "foto": "" (o passo de banco preenche depois).
- legenda: gancho + valor + CTA "Comenta QUERO 👇" + 4–5 hashtags relevantes.

# COPY (princípios — aplique, não decore)
- CONCRETO > vago; especificidade gera curiosidade. 1 ideia por slide; headline curta (<12 palavras).
- FUNDAMENTADO mas SEM JARGÃO: a verdade vem de fonte séria (rigor interno), mas o que chega é humano —
  NUNCA termo técnico/código (ex.: "CID-11") nem jargão clínico. Traduza o dado pro sentimento.
- Casar a promessa ao NÍVEL DE CONSCIÊNCIA do leitor. Tom acolhedor, sem julgamento, sem alarmismo.

# GUARDRAILS (inquebráveis — há verificador que REPROVA)
- Ética CFP: SEM promessa de cura/resultado garantido, SEM diagnóstico, SEM expor paciente, SEM alarmismo.
- Marca: NUNCA "feito por IA"/"nossa IA" — quem cria é "nossa equipe"; venda o BENEFÍCIO, não o mecanismo.
- ⛔ NUNCA "no automático" como bordão (o nome psi.automatic é OK; a copy vende dor+economia).
- Marcadores: <grad>1 palavra</grad> (palavra-chave da MARCA no gradiente) · <gold>1 palavra</gold> (destaque na
  PROVA) · <br> quebra pensada · <b> negrito. UM destaque por headline (parcimônia). Sem markdown.
- kicker: "<b>PSI.AUTOMATIC</b> &middot; MARKETING PARA PSIC&Oacute;LOGOS".
- As SETAS, a foto e a composição são do MOTOR — não escreva seta nem layout no texto.

# Tema do carrossel (vem de DADO, não de palpite)
${tema ? `Use o tema: "${tema}".` : "Escolha UM tema dos BALDES DE DEMANDA das pautas abaixo (o que mais converte; NÃO repita o óbvio nem o já usado). Combine com um FORMATO/ângulo do banco de formatos."}

# Brand-DNA da psi.automatic
${brandDna}

# Pautas do nicho (psicologia)
${pautas.slice(0, 2500)}

# Modelo de legenda
${legendaModelo.slice(0, 1500)}

# Fundamentos da faculdade (aplique o princípio, não copie literal)
${fundamentos}

# Schema EXATO a seguir (responda com um JSON assim, preenchido com o novo tema)
${schema}`;

  const anthropic = new Anthropic(); // usa ANTHROPIC_API_KEY do ambiente
  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  });
  let text = response.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
  // tira cercas de código se vierem
  text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();

  const parsed = JSON.parse(text); // valida que é JSON
  delete parsed._aviso; // não propagar o campo de controle do schema de exemplo
  const outDir = path.resolve(__dirname, "outputs");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "conteudo.json");
  await writeFile(outPath, JSON.stringify(parsed, null, 2), "utf-8");
  console.log(`[gerar] Conteúdo do tema "${parsed.tema}" gerado pela API → ${path.relative(process.cwd(), outPath)}`);
  console.log(`[gerar] Agora rode:  node compor.js --in=outputs/conteudo.json   (o motor escolhe a assinatura e compõe)`);
  if (parsed.foto_busca) console.log(`[gerar] Foto sugerida (banco livre): "${parsed.foto_busca}" → baixar p/ assets e passar --foto=arquivo.jpg`);
}

main().catch((e) => { console.error("Falha ao gerar (cérebro):", e.message); process.exit(1); });
