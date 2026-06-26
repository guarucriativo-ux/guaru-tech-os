# Garimpo de agentes — O OURO (tudo que a gente ia construir na unha JÁ EXISTE) · 2026-06-26

> **O MARCO (Marcos):** a gente ia construir todos esses colaboradores NA UNHA pra só depois faturar. **Está
> tudo pronto.** A fase de construir o cérebro acabou — sobra **montar (vestir no nosso DNA/gates) + RODAR**.
> A fábrica pode girar e ganhar dinheiro AGORA. Tudo MIT (uso comercial livre). Garimpo de 4 fontes abertas.
> Regra transversal: tudo gera "no escuro" → **passa pelos nossos gates + veste o brand-dna** antes de entregar.
> Eles são MATÉRIA-PRIMA + esqueleto automático; o acabamento e a alma continuam NOSSOS (= o MOAT).

## Correção importante (onde está o ouro de verdade)
- **Synkra AIOS / aios-core NÃO é a caixa de agentes de marketing.** É um framework de orquestração de DEV de
  software (linhagem BMAD): agentes PM/architect/dev/QA + o **ADE** (pipeline spec→exec→QA gate→recovery→memory).
  Só traz `etl-squad` + `creator-squad` (este não detalhado). **Serve como ARQUITETURA/orquestração** (espelho da
  nossa linha) e pra **empacotar/vender nosso método como squad** (marketplace) — não como agentes de conteúdo.
- **Os agentes de marketing/conteúdo prontos estão nas COLEÇÕES abertas** (abaixo). Foi isso que o Xquads curou.

## 🥇 O OURO — por fonte (e como aplica na nossa linha briefing→copy→arte→gate→distribuição)

### 1. zubair-trabzada/ai-marketing-claude — A FÁBRICA QUASE PRONTA 🥇🥇 (prioridade 1)
Sistema orquestrado: skill mãe `/market` roteia 14 sub-skills; a auditoria dispara **5 subagentes em paralelo**.
- `/market audit <url>` ⚙️ — 5 agentes paralelos pontuam o site em 6 eixos (0–100). 
- `/market report-pdf` ⚙️ — **relatório PDF pronto pro cliente**. · `/market proposal` ⚙️ — **proposta comercial**.
- `/market social` ⚙️ — **calendário de 30 dias**. · `/market emails` ⚙️ — sequências (welcome/nurture/lançamento).
- + copy, landing(CRO), ads, funnel, launch, seo, brand, competitors.
- **USO:** `audit`+`report-pdf` = **produto digital de ENTRADA** (auditoria do IG/site do prospect = isca paga/
  brinde de fechamento — roda sozinho, cliente vê valor antes de assinar). `proposal` na venda. `social`/`emails`
  = matéria-prima da linha (passa pelo gate). Scripts em Python/local = casa com a nossa filosofia.

### 2. coreyhaines31/marketingskills — A BIBLIOTECA DE CONHECIMENTO 🥇 (minerar pra faculdade)
60+ skills em markdown puro (= mesmo formato da nossa `niches-library`/`knowledge-base`). Ouro: `cro`,
`copywriting`/`copy-editing`, `programmatic-seo` (**produto: páginas SEO em escala**), `free-tools`
(**produto: calculadoras/iscas de lead**), `seo-audit` ⚙️, `analytics`, `ai-seo`/GEO (tendência 2026).
- **USO:** absorver `cro`/`copywriting` pros nossos gates; `programmatic-seo` e `free-tools` viram **2 produtos
  digitais novos**. Markdown → encaixe direto, sem runtime externo.

### 3. VoltAgent/awesome-claude-code-subagents — TIME GENÉRICO BOM (clonar e editar)
- **content-quality-editor** ⚙️🥇 = **gate de copy EXECUTÁVEL** (tira "sotaque de IA"). · **content-marketer**
  (pesquisa+SEO+calendário). · **market-researcher / competitive-analyst / trend-analyst** = a etapa "pesquisar
  a DOR + o que CONVERTE" do nosso gate de copy, por nicho. · **product-manager / project-idea-validator** =
  conceber os produtos digitais. · **prompt-engineer** = padronizar/versionar nossos prompts.
- **USO:** clonar 4–6 `.md` pra `.claude/agents/` do nosso repo (versionado, viaja no Git) e **editar** injetando
  nossas regras. Instala via `claude plugin marketplace add VoltAgent/...` ou cópia manual.

### 4. rshah515/claude-code-subagents — ESPECIALISTAS (clonar personas)
**email-strategist** ⚙️🥇 + **marketing-automation-expert** ⚙️🥇 (os FLUXOS automáticos = coração do SwaS
recorrente) · content-strategist (calendário+voz) · geo-strategist (diferencial 2026) · email-deliverability
(garante entrega = retenção). **USO:** clonar as personas pros nossos agentes de sequência/automação.

### 5. talknerdytome-labs/claude-agents — ESPIONAGEM DE ANÚNCIO (depois)
**meta-ads-library** ⚙️🥇 puxa os anúncios REAIS rodando dos concorrentes (Meta Ads Library API) → ângulos
quentes antes de criar campanha. Exige MCP+API → avaliar quando escalar tráfego pago.

### 6. wshobson/agents — A MINA DAS PONTAS QUE FALTAM (194 agentes em 85 plugins) 🥇
Ignorando dev de software puro, o ouro é justamente o que a nossa linha não tinha (a gente parava no JPG):
- **DISTRIBUIÇÃO:** `social-publishing` ⚙️ — publica/agenda em **13 plataformas** com 1 API (SocialClaw) +
  puxa métricas. **Fecha a linha, roda unattended.** (dep. externa SocialClaw — substituível.)
- **RELATÓRIO mensal (retenção SwaS):** `business-analyst` + skills `data-storytelling`/`kpi-dashboard-design` ⚙️
  — pega as métricas e gera o report do cliente automático.
- **PRODUTO SEO inteiro:** 10 agentes (planner→writer→keyword→auditor→meta/structure/snippet) — modular, barato (haiku/sonnet).
- **E-MAIL/CRM/VENDAS:** `sales-automator` ⚙️ (cold e-mail, follow-up, proposta — serve até pra prospectar a
  Guaru) + `customer-support` ⚙️ (atendimento automatizado = produto SwaS vendável).
- **ARTE por IA:** suíte `meigen-ai-design` — `prompt-crafter` (lote de prompts DISTINTOS) + `image-generator` +
  `gallery-researcher`. É a nossa camada 4 anti-genérico; o padrão "lote distinto + variedade obrigatória" = a
  nossa regra "roupagem nova". (dep. MCP meigen — usar o PADRÃO.)
- **LANDING/BRAND:** `brand-landingpage` — entrevista de marca → HTML (a entrevista alimenta nosso `brand-dna.json`).
- **BRIEFING:** `before-you-build` ⚙️ (pré-mortem de oferta) · **COPY-pesquisa:** `search-specialist` ⚙️ ·
  **COPY-escrita:** `content-marketer` (subordinado à nossa faculdade).
- **ORQUESTRAÇÃO (o "automático"):** `agent-teams` (skills team-composition / task-coordination / parallel-feature
  / file-ownership) = arquitetura pra rodar briefing→copy→arte→gate→distribuição como time paralelo de subagentes.
  `context-management` = gêmeo do nosso `ESTADO-ATUAL.md`. → estudar a arquitetura.
- Licença MIT no verificado. Avisos: deps externas pagas/MCP em vários; tudo genérico/anglo = esqueleto, não substituto.

## 🏁 O QUE ISSO PROVA (o marco)
A gente ia construir TODOS esses colaboradores na unha — copy, calendário, auditoria, proposta, e-mail, SEO,
arte por IA, distribuição, relatório, orquestração — pra só DEPOIS faturar. **Está tudo pronto, grátis, MIT.**
A fase de construir o cérebro acabou. O que falta é leve: **escolher o conjunto-ouro → vestir no nosso DNA +
gates → ligar na nossa linha (render + distribuição) → RODAR.** A fábrica pode girar e ganhar dinheiro AGORA.
Nosso trabalho deixou de ser "construir o cérebro" e virou "**montar + curar + rodar + vender**".

## O que isso significa (o marco, em ações)
- **Some a fase "construir os agentes na unha".** Copy, calendário, auditoria, proposta, e-mail, SEO, pesquisa
  de mercado, automação — **tudo já existe pronto e grátis (MIT).** A gente não constrói o cérebro; a gente MONTA.
- **O que falta (leve):** (a) escolher o conjunto-ouro; (b) clonar pra `.claude/agents/` do repo e **vestir no
  nosso DNA + plugar nos gates**; (c) ligar à nossa linha (render HTML→JPG + distribuição); (d) RODAR.
- **Produtos digitais já visíveis no garimpo:** auditoria+PDF (entrada), proposta automática, calendário/e-mail
  por assinatura, programmatic-SEO, free-tools/calculadoras. Caminho de caixa rápido.

## Fontes
github.com/SynkraAI/aios-core · github.com/zubair-trabzada/ai-marketing-claude · github.com/coreyhaines31/marketingskills ·
github.com/VoltAgent/awesome-claude-code-subagents · github.com/rshah515/claude-code-subagents ·
github.com/talknerdytome-labs/claude-agents · github.com/wshobson/agents. (pesquisa web 2026-06-26; descrições dos
READMEs/arquivos — não testados rodando; saídas precisam passar pelos nossos gates.)
