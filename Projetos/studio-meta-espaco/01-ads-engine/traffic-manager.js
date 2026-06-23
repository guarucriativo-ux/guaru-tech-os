import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { logEvent } from "../shared/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Baseline usado enquanto niches-library/apparel/traffic-playbook.md ainda não tem regras
// validadas para este nicho (ver aviso em readPlaybook). Vem do plano manual da Semana 1
// (01-ads-engine/outputs/ads-semana-01.md), nosso único dado real até agora.
const BASELINE = {
  objective: "OUTCOME_ENGAGEMENT",
  optimization_goal: "CONVERSATIONS",
  destination_type: "MESSAGING_INSTAGRAM_DIRECT",
  call_to_action_type: "MESSAGE_PAGE",
  daily_budget_brl: 35,
  countries: ["BR"],
  age_min: 22,
  age_max: 45,
  interests: [
    "Confecção",
    "Estamparia DTF",
    "Moda autoral",
    "Empreendedorismo",
    "Marcas de roupa pequenas e médias",
    "E-commerce de moda",
  ],
  publisher_platforms: ["instagram", "facebook"],
  instagram_positions: ["story", "reels"],
  facebook_positions: ["story", "reels"],
};

function parseArgs(argv) {
  const args = {
    week: null,
    playbook: "../../../niches-library/apparel/traffic-playbook.md",
    content: null,
    image: null,
  };
  for (const arg of argv) {
    const [key, value] = arg.replace(/^--/, "").split("=");
    if (key in args) args[key] = value;
  }
  return args;
}

function usageAndExit() {
  console.error(
    "Uso: node traffic-manager.js --week=02 [--playbook=<path>] [--content=<path>] [--image=<path>]",
  );
  process.exit(1);
}

function toRelative(from, to) {
  return path.relative(from, to).split(path.sep).join("/");
}

// --- Leitura da memória-mãe de nicho (niches-library/apparel/traffic-playbook.md) ---

function stripComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "").trim();
}

function extractSection(markdown, heading) {
  const match = markdown.match(new RegExp(`##\\s*${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, "i"));
  return match ? stripComments(match[1]) : "";
}

// Convenção esperada quando o playbook for preenchido de verdade: bullets "- chave: valor"
// dentro de cada seção. Hoje as seções só têm comentários-placeholder, então isto retorna {}.
function extractKeyValues(sectionText) {
  const values = {};
  for (const line of sectionText.split("\n")) {
    const match = line.match(/^-\s*([^:]+):\s*(.+)$/);
    if (match) values[match[1].trim().toLowerCase()] = match[2].trim();
  }
  return values;
}

function readPlaybook(markdown) {
  const sections = [
    extractSection(markdown, "Objetivos de campanha que funcionam"),
    extractSection(markdown, "Funis de público"),
    extractSection(markdown, "Faixas de orçamento"),
    extractSection(markdown, "Regras de distribuição"),
  ];
  const overrides = sections.reduce((acc, text) => ({ ...acc, ...extractKeyValues(text) }), {});
  const usedFallback = sections.every((text) => text.length === 0);
  return { overrides, usedFallback };
}

// --- Leitura do pacote semanal (02-content-generator/outputs/semana-NN.md) ---

function extractWeekMeta(markdown) {
  const focus = markdown.match(/Foco:\s*(.+)/i);
  const audience = markdown.match(/Público da semana:\s*(.+)/i);
  return {
    focus: focus ? focus[1].replace(/\*\*/g, "").trim() : null,
    audience: audience ? audience[1].replace(/\*\*/g, "").trim() : null,
  };
}

function extractReelsHeadline(markdown) {
  const reelsSection = markdown.match(/##\s*2\.\s*Roteiro de Reels([\s\S]*?)(?=\n##\s|$)/i);
  if (!reelsSection) return null;
  const ctaBlock = reelsSection[1].match(/\*\*CTA[^*]*\*\*\s*\n([\s\S]*?)(?=\n-{3,}|\n##|$)/i);
  if (!ctaBlock) return null;
  const quoted = ctaBlock[1].match(/>\s*\*\*"?(.+?)"?\*\*/);
  return quoted ? quoted[1].trim() : null;
}

function extractCopySection(markdown) {
  const match = markdown.match(/##\s*3\.\s*Copy\s*\/?\s*Legenda([\s\S]*)/i);
  if (!match) throw new Error('Não encontrei a seção "Copy / Legenda" no pacote da semana.');
  return match[1].split(/\n-{3,}\n\n\*`/)[0];
}

function extractLabeled(section, label) {
  const match = section.match(new RegExp(`\\*\\*${label}:?\\*\\*\\s*\\n([\\s\\S]*?)(?=\\n-{3,}|\\n\\*\\*|$)`, "i"));
  if (!match) return "";
  return match[1]
    .split("\n")
    .map((line) => line.replace(/^>\s*/, "").replace(/\*\*/g, "").trim())
    .filter(Boolean)
    .join("\n");
}

function extractHashtags(section) {
  const match = section.match(/```([\s\S]*?)```/);
  return match ? match[1].trim().split(/\s+/).join(" ") : "";
}

function buildCaption(weekMarkdown) {
  const section = extractCopySection(weekMarkdown);
  const parts = [
    extractLabeled(section, "Abertura"),
    extractLabeled(section, "Corpo"),
    extractLabeled(section, "CTA"),
    extractHashtags(section),
  ];
  return parts.filter(Boolean).join("\n\n");
}

// --- Montagem do plano de campanha ---

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.week) usageAndExit();

  const playbookPath = path.resolve(__dirname, args.playbook);
  const contentPath = path.resolve(
    __dirname,
    args.content ?? `../02-content-generator/outputs/semana-${args.week}.md`,
  );
  const imagePath = path.resolve(
    __dirname,
    args.image ?? `../03-automation-bridge/outputs/post-semana-${args.week}.png`,
  );
  const outputDir = path.resolve(__dirname, "outputs");
  const outputPath = path.join(outputDir, `campaign-semana-${args.week}.json`);

  const [playbookMd, weekMd] = await Promise.all([
    readFile(playbookPath, "utf-8"),
    readFile(contentPath, "utf-8"),
  ]);

  try {
    await access(imagePath);
  } catch {
    throw new Error(
      `Arquivo de mídia não encontrado: ${imagePath}. Rode o image-engine (03-automation-bridge) antes do traffic-manager.`,
    );
  }

  const { overrides, usedFallback } = readPlaybook(playbookMd);
  if (usedFallback) {
    console.warn(
      "[traffic-manager] niches-library/apparel/traffic-playbook.md ainda não tem regras " +
        "validadas para este nicho — usando baseline padrão (origem: ads-semana-01.md). " +
        "Promova aprendizados reais para esse arquivo conforme as campanhas rodarem.",
    );
  }

  const interests = overrides["interesses"]
    ? overrides["interesses"].split(",").map((s) => s.trim())
    : BASELINE.interests;
  const dailyBudgetBRL = overrides["orçamento_diário_brl"]
    ? Number(overrides["orçamento_diário_brl"])
    : BASELINE.daily_budget_brl;

  const weekMeta = extractWeekMeta(weekMd);
  const headline = extractReelsHeadline(weekMd) ?? weekMeta.focus;
  const caption = buildCaption(weekMd);

  const campaignName = `Guaru Estúdio · Semana ${args.week} · ${weekMeta.focus ?? "foco não identificado"}`;

  const campaign = {
    name: campaignName,
    objective: overrides["objetivo"] ?? BASELINE.objective,
    status: "PAUSED",
    special_ad_categories: [],
  };

  const adSet = {
    name: `${campaignName} · AdSet`,
    optimization_goal: overrides["meta_de_otimização"] ?? BASELINE.optimization_goal,
    destination_type: BASELINE.destination_type,
    daily_budget: {
      amount_brl: dailyBudgetBRL,
      amount_minor_units: Math.round(dailyBudgetBRL * 100),
      currency: "BRL",
    },
    targeting: {
      geo_locations: { countries: BASELINE.countries },
      age_min: BASELINE.age_min,
      age_max: BASELINE.age_max,
      interests,
      publisher_platforms: BASELINE.publisher_platforms,
      instagram_positions: BASELINE.instagram_positions,
      facebook_positions: BASELINE.facebook_positions,
    },
    status: "PAUSED",
  };

  const ad = {
    name: `${campaignName} · Ad`,
    creative: {
      headline,
      body: caption,
      call_to_action_type: BASELINE.call_to_action_type,
      local_image_path: toRelative(outputDir, imagePath),
    },
    status: "PAUSED",
  };

  const output = {
    _meta: {
      generated_from: {
        playbook: toRelative(__dirname, playbookPath),
        weekly_content: toRelative(__dirname, contentPath),
        image: toRelative(__dirname, imagePath),
      },
      used_playbook_fallback: usedFallback,
      audience_brief: weekMeta.audience,
      notes: [
        "Blueprint de campanha — não é um payload pronto para POST direto na Graph API.",
        "Antes de enviar: (1) fazer upload de local_image_path em /act_{ad_account_id}/adimages " +
          "para obter o image_hash exigido pelo creative; (2) preencher ad_account_id, page_id e " +
          "access_token reais; (3) revisar os enums de objective/optimization_goal/call_to_action_type " +
          "contra a versão atual da Marketing API; (4) status fica PAUSED por padrão — ativar manualmente.",
      ],
    },
    campaign,
    adSet,
    ad,
  };

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, JSON.stringify(output, null, 2), "utf-8");

  await logEvent({
    modulo: "ads-engine",
    week: args.week,
    etapa_funil: "atracao",
    arquivos: [path.relative(path.resolve(__dirname, ".."), outputPath)],
  });

  console.log(`Plano de campanha da Semana ${args.week} salvo em ${outputPath}`);
}

main().catch((error) => {
  console.error("Falha ao montar campanha:", error.message);
  process.exit(1);
});
