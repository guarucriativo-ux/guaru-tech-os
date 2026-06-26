# Agentes instalados — colaboradores ATIVOS da fábrica · 2026-06-26

> **O que é esta pasta:** os colaboradores que a fábrica USA (Claude Code lê `.claude/agents/`, `.claude/skills/`,
> `.claude/commands/`). Foram **ativados em largura** das 6 fontes abertas (MIT) — decisão do Marcos: *instala
> tudo que serve, ajusta na unha depois; pode ter agente ótimo que hoje não preciso, mas amanhã sim.*
> **Armazém completo (1.338 arquivos, TUDO):** fica em `_estudo-agentes/` no Git — o que não foi ativado (dev/infra
> puro: kubernetes, rust, blockchain, healthcare…) está lá, a um `cp` de distância se precisar.

## Quanto foi ativado
- **160 agentes** (`.claude/agents/`) · **107 skills** (`.claude/skills/`) · **27 commands** (`.claude/commands/`).
- Organizados por origem (evita colisão de nome + preserva proveniência):
  - `01-marketing-ai/` (5) — auditoria paralela do ai-marketing-claude.
  - `03-wshobson/` (42) — só plugins de marketing/criação/negócio/orquestração (dev puro ficou no armazém).
  - `04-rshah515/` (57) — marketing, business, analytics, operação, orquestradores + cherry de design/IA.
  - `05-voltagent/` (54) — business-product, meta-orquestração, research + cherry de design/IA/DX.
  - `06-ad-intel/` (3) — espionar anúncio real do nicho (meta/google ads library + website-intel).

## ⚠️ REGRA INEGOCIÁVEL (o MOAT)
Todo agente aqui é **commodity genérico e em inglês** — gera "no escuro". **Nada que ele produz é entregue cru.**
Toda saída passa pelos NOSSOS portões antes de virar peça/entrega:
1. **Copy primeiro** → `knowledge-base/copywriting/copy-primeiro-o-gate.md` (dor→ângulo→hook→edita→auto-check).
2. **Craft primeiro** → `knowledge-base/design/craft-primeiro-o-gate.md` (3 camadas → 5 marcadores → comparar c/ ref).
3. **Vestir no cliente** → Base Mãe + `Projetos/<cliente>/brand-dna.json`.
O valor da Guaru não é o agente (é grátis); é **render + gates + taste + DNA** por cima. Ver `CLAUDE.md`.

## 🎯 Kit-ouro — quais VESTIR primeiro (injetar DNA + gates na unha)
Não precisa afinar os 160 já. Comece pelos que rodam a linha ponta a ponta:
- **copy:** `copywriting` · `marketing-psychology` · `offers` · `copy-editing` (skills) + `content-quality-editor`/`ai-writing-auditor` (anti-IA, voltagent) + `copywriter-specialist` (rshah515).
- **briefing:** `customer-research` · `marketing-plan` (skills) + `market-audit`/`market-competitors` + `meta-ads-library` (ad-intel) + `brand-strategist`/`content-strategist` (rshah515).
- **arte:** `image`/`ad-creative` (skills) + meigen (`gen`/`image-generator`/`prompt-crafter`, wshobson) + `ui-designer`/`design-bridge` (voltagent).
- **distribuição:** `social`/`market-social` (skills) + `social-publishing` (wshobson) + `social-ads-expert`/`marketing-automation-expert` (rshah515).
- **relatório:** `market-report-pdf` + `kpi-dashboard-design`/`data-storytelling` (skills) + `data-scientist`.
- **motor:** `context-save`/`context-restore` + `before-you-build` + time multiagente (wshobson) + `project-manager` (rshah515).
- **produtos digitais (caixa):** `market-audit`+`report-pdf` (auditoria-isca) · `lead-magnets`/`free-tools` · `brand-landingpage` · `market-proposal`/`pricing`.

## Dependências externas a trocar (anotar ao vestir)
Alguns pedem MCP/API paga: `social-publishing` (SocialClaw), `meigen-ai-design` (MCP meigen), `brand-landingpage` (Stitch),
ad-intel (Meta/Google Ads API). Usar o **padrão** deles (lote distinto, agendamento) e trocar a dependência pela nossa quando ligar de verdade.

## Mapa completo (cada agente × a fábrica)
`decisoes/inventario-agentes-vs-fabrica.md` — os ~650 mapeados, com etiqueta e encaixe. Esta pasta é o subconjunto ATIVADO.
