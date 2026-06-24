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

  // Faculdade: estuda antes de criar (copywriting de venda, gatilhos, guardrail).
  let fundamentos = "";
  try {
    const { queryKnowledgeBase } = await import(pathToFileURL(path.resolve(ROOT, "core/kb-query.js")).href);
    const q = `carrossel de venda psicólogo gatilho identificação ${tema}`;
    const hits = await queryKnowledgeBase(q, { top: 5 });
    if (hits.length) fundamentos = hits.map((h) => `- (${h.file}) ${h.chunk.slice(0, 400).replace(/\s+/g, " ").trim()}`).join("\n");
  } catch (e) { console.warn(`[gerar] Faculdade indisponível (${e.message}).`); }

  const prompt = `Você é o motor de conteúdo da vitrine @psi.automatic (marca-AGÊNCIA que vende marketing
no automático para PSICÓLOGOS). Produza o conteúdo de UM carrossel de venda, retornando SÓ um JSON
VÁLIDO no MESMO schema do exemplo abaixo (mesmas chaves), sem texto fora do JSON.

# Estrutura obrigatória (modelo "portfólio-que-vende")
- hook (frame da MARCA): fala com o PSICÓLOGO — dor/objeção dele + open loop ("te provo, arrasta"). NÃO é sobre o paciente.
- prova (capa, conceito, sinais, acolhimento): um post de PSICOLOGIA exemplo sobre o TEMA, falando com o PACIENTE (demonstra qualidade).
- pitch (frame da MARCA): vende a psi.automatic — dor+economia ("sua equipe de marketing por menos de R$ 4 por dia, sem agência cara"), CTA keyword-to-DM ("QUERO").
- legenda: gancho + valor + CTA "Comenta QUERO".

# GUARDRAILS (inquebráveis)
- Ética CFP: SEM promessa de cura/resultado garantido, SEM diagnóstico, SEM expor paciente, SEM alarmismo.
- Regra de marca: NUNCA dizer "feito por IA"/"nossa IA"; quem cria é "nossa equipe". Vender o BENEFÍCIO, não o mecanismo.
- ⛔ NUNCA usar "no automático" como bordão/headline de venda (pesa pro lado IA). O NOME da marca é psi.automatic, mas a COPY de venda fala de dor+economia ("sem você fazer nada / todo dia / sua equipe no bolso / menos de R$ 4 por dia"). Há um verificador automático que REPROVA a peça se achar "no automático".
- Texto curto e de impacto (headline tipo anúncio). Negrito com <b></b> onde destacar. Sem markdown.
- FOTOS: use só estes arquivos disponíveis — hook.foto e acolhimento.foto = "foto-hook-2.jpg" ou "foto-teste-2.jpg"; capa.foto = "foto-teste.jpg". (banco de imagem ainda pequeno.)
- kicker: "<b>PSI.AUTOMATIC</b> &middot; MARKETING PARA PSIC&Oacute;LOGOS".

# ORÇAMENTO DE CARACTERES (a copy tem que CABER no molde — headline que estoura vaza o slide)
A peça é diagramada por um molde de largura fixa; headline longa demais encolhe e perde impacto. Respeite
o nº MÁXIMO de caracteres por campo (conte com espaços; é teto, não meta — quanto mais curto e afiado, melhor):
- hook.linha1 ≤ 22 · hook.linha2 + " " + hook.destaque ≤ 24 (somados, é UMA linha) · hook.sub ≤ 90
- prova.capa.disp ≤ 14 · prova.capa.destaque ≤ 14 (cada um é UMA linha grande)
- prova.conceito.titulo ≤ 30 (pode ter um <br> no meio; cada lado ≤ 16) · prova.conceito.corpo ≤ 150
- prova.sinais.intro ≤ 28 · cada item de prova.sinais.itens ≤ 42 (3 a 4 itens)
- prova.acolhimento.disp ≤ 13 · prova.acolhimento.destaque ≤ 13 · prova.acolhimento.corpo ≤ 80
- pitch.linha1 ≤ 26 · pitch.linha2 + " " + pitch.destaque ≤ 30 (somados) · pitch.corpo ≤ 95 · pitch.cta_sub ≤ 34

# VIBE (alavanca de primeira ordem — pesa mais que qualquer regra mecânica)
Tom da MARCA (hook/pitch): direto, confiante, parceiro do psicólogo — dor real + alívio econômico, sem hype.
Tom da PROVA (psicologia): acolhedor, sóbrio, validante — fala com o paciente sem dramatizar. Mantenha os
DOIS tons distintos na mesma peça (é o bracket loud×calm da marca).

# Tema do carrossel
${tema ? `Use o tema: "${tema}".` : "Escolha UM tema de alta demanda a partir das pautas abaixo (não repita o óbvio)."}

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

  const n = Math.max(1, Number(arg("n", "1")) || 1); // doutrina nº7: gerar-N-e-escolher
  const anthropic = new Anthropic(); // usa ANTHROPIC_API_KEY do ambiente
  const outDir = path.resolve(__dirname, "outputs");
  await mkdir(outDir, { recursive: true });

  // gera UMA variação: mesma brief, a API varia naturalmente → cada chamada é um ângulo diferente.
  async function gerarVariacao() {
    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6",
      max_tokens: 2048,
      messages: [{ role: "user", content: prompt }],
    });
    let text = response.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
    text = text.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(text); // valida que é JSON
    delete parsed._aviso; // não propagar o campo de controle do schema de exemplo
    return parsed;
  }

  if (n === 1) {
    const parsed = await gerarVariacao();
    const outPath = path.join(outDir, "conteudo.json");
    await writeFile(outPath, JSON.stringify(parsed, null, 2), "utf-8");
    console.log(`[gerar] Conteúdo do tema "${parsed.tema}" gerado pela API → ${path.relative(process.cwd(), outPath)}`);
    console.log(`[gerar] Agora rode:  node montar.js --in=outputs/conteudo.json`);
    return;
  }

  // N>1: dispara em paralelo (como o Quick Cut faz 3 de uma vez) → você ESCOLHE a melhor.
  console.log(`[gerar] Gerando ${n} variações em paralelo (mesma brief, ângulos diferentes)…`);
  const results = await Promise.allSettled(Array.from({ length: n }, () => gerarVariacao()));
  const ok = [];
  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "fulfilled") {
      const file = path.join(outDir, `conteudo-${i + 1}.json`);
      await writeFile(file, JSON.stringify(r.value, null, 2), "utf-8");
      ok.push({ i: i + 1, tema: r.value.tema, file, obj: r.value });
    } else {
      console.warn(`[gerar] ⚠ variação ${i + 1} falhou: ${r.reason?.message ?? r.reason}`);
    }
  }
  if (!ok.length) throw new Error("Nenhuma variação foi gerada.");
  // back-compat: conteudo.json = a 1ª variação que deu certo (pra quem roda montar sem --in)
  await writeFile(path.join(outDir, "conteudo.json"), JSON.stringify(ok[0].obj, null, 2), "utf-8");
  console.log(`[gerar] ${ok.length}/${n} variações prontas — monte e ESCOLHA a melhor (a máquina gera, você escolhe):`);
  for (const v of ok) console.log(`   • #${v.i} "${v.tema}"  →  node montar.js --in=${path.relative(process.cwd(), v.file)}`);
}

main().catch((e) => { console.error("Falha ao gerar (cérebro):", e.message); process.exit(1); });
