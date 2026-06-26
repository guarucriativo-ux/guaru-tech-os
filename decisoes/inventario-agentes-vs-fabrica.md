# Inventário COMPLETO de agentes × a fábrica (mapa, um a um) · 2026-06-26

> Marcos: achar a base permite **baixar tudo de uma vez** e entender como tudo funciona — então mapear **cada
> agente** contra a nossa fábrica, não só os 15 óbvios. Linha da fábrica: briefing → copy → arte (HTML→JPG) →
> gate → distribuição → relatório (+ eixo produtos digitais). Etiquetas: 🥇 OURO (usar já) · ✅ ÚTIL (adaptar) ·
> ➖ NÃO-RELEVANTE (dev/infra puro) · ❓.
> **Como instalar (geral):** os agentes são `.md` com front-matter (descrição + tools). Copiar pra
> `.claude/agents/` do NOSSO repo (versionado, viaja no Git) e **editar pra injetar Base Mãe + gates + brand-dna**.
> Licença MIT no verificado. Tudo gera "no escuro" → passa pelos nossos gates antes de entregar (= o MOAT).
> Status: **COMPLETO** ✅ — 5 fontes mapeadas (~650 itens, ~70 ouro). Contagem-mestra + kit-ouro recomendado no fim.

---

## FONTE 1 — VoltAgent/awesome-claude-code-subagents (151 subagentes, 10 categorias)
**Instala:** `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents` ou cópia manual dos `.md`.
**Contagem:** 🥇 18 · ✅ 41 · ➖ 91 · ❓ 1.

### 🥇 OURO (18 — alvos diretos de adaptação)
| nome | o que faz | encaixe na fábrica |
|---|---|---|
| **content-marketer** | conteúdo técnico/marketing com SEO | copy (núcleo) |
| **prompt-engineer** | cria prompts eficazes pra IA | copy + faculdade (prompts por nicho) |
| **ai-writing-auditor** | detecta 34 padrões de "texto de IA" e reescreve | **gate de copy** (anti-IA) |
| **ux-researcher** | descobre dor/necessidade via pesquisa | briefing (DOR antes da copy) |
| **market-researcher** | dinâmica de mercado e comportamento | briefing (mercado do cliente) |
| **competitive-analyst** | analisa concorrentes e posicionamento | briefing (posicionar no nicho) |
| **trend-analyst** | detecta tendências antes do óbvio | briefing/copy (ângulo quente) |
| **research-analyst** | investigação profunda multi-domínio | briefing (pesquisa de nicho) |
| **seo-specialist** | otimiza site/conteúdo pra busca | copy + distribuição |
| **growth-loops** | loops de aquisição/PLG | estratégia/distribuição |
| **ui-designer** | design visual, design system, tipografia | arte (craft/layout) |
| **data-analyst** | transforma dados em insight acionável | **relatório** (campanha) |
| **agent-organizer** | orquestra colaboração multi-agente | infra (orquestrar a linha) |
| **workflow-orchestrator** | desenha/executa workflows de IA | infra (a própria linha) |
| **context-manager** | maximiza eficiência de contexto | infra (= ESTADO-ATUAL/bastão) |
| **knowledge-synthesizer** | combina info de várias fontes | faculdade (acumular = MOAT) |
| **multi-agent-coordinator** | orquestra ecossistemas de agentes | infra da fábrica |
| **business-analyst / product-manager** | requisito → produto/roadmap | briefing / produtos digitais |

### ✅ ÚTIL (41 — adaptar quando precisar), por encaixe
- **briefing/estratégia:** assumption-mapping · first-principles-thinking · project-idea-validator · sales-engineer · customer-success-manager · legal-advisor (direito de imagem/licença) · license-engineer
- **copy/conteúdo:** technical-writer · search-specialist
- **arte/gate craft:** design-bridge (DNA→tokens) · ui-ux-tester (QA visual) · accessibility-tester · frontend-developer/react-specialist/nextjs (landing)
- **relatório/dados:** data-scientist · data-researcher · ab-test-analysis · cohort-analysis · performance-monitor
- **infra da fábrica/orquestração:** cli-developer · tooling-engineer · dx-optimizer · git-workflow-manager · documentation-engineer · readme-generator · mcp-developer · refactoring-specialist · dependency-manager · codebase-orchestrator · error-coordinator · task-distributor
- **produto digital (SwaS):** ai-engineer · llm-architect · nlp-engineer · payment-integration · wordpress-master · node-specialist/python-pro/typescript-pro/javascript-pro (automação)
- **❓:** taskade (workspace externo)

### ➖ NÃO-RELEVANTE (91 — dev/infra puro; listados p/ completude)
Linguagens de sistema (cpp/go/rust/java/c#/php/swift/kotlin/elixir/…), frameworks back-end (django/rails/laravel/
spring/symfony/fastapi/dotnet/…), Infra inteira (k8s/docker/terraform/cloud/azure/sre/network/…), Quality/Security
de código (pentest/compliance/chaos/debugger/…), Domains técnicos (blockchain/iot/embedded/game/quant/fintech/
healthcare/…), ML puro (mlops/rl/ml-engineer/…). Nenhum encaixa na fábrica de marketing.

---

## FONTE 2 — wshobson/agents (85 plugins · 194 agents · 158 skills · 106 commands)
**Instala:** `claude plugin marketplace add wshobson/agents` (plugins) ou cópia manual.
**Contagem (plugins por veredito dominante):** 🥇 ~10 · ✅ ~14 · ❓ ~7 · ➖ ~54. (Na granularidade de agente: ~20–25 plugáveis direto na linha; ~170 são dev/infra.)
> Vários plugins de marketing exigem MCP externo (meigen, Stitch/SocialClaw) — validar custo/integração antes; usar o PADRÃO mesmo quando trocar a dependência.

### 🥇 OURO (encaixe direto na linha)
| nome | plugin | o que faz | encaixe |
|---|---|---|---|
| **content-marketer** | content-marketing | blog/social/email/newsletter c/ SEO | copy |
| **search-specialist** | content-marketing | pesquisa web profunda, sintetiza fontes | briefing |
| **seo-content-writer / -planner** | seo-content-creation | escreve + planeja pautas/clusters | copy / briefing |
| **seo-keyword-strategist** | seo-technical-optimization | estratégia/agrupamento de keywords | briefing |
| **sales-automator** | customer-sales-automation | cold email, follow-up, proposta, script | copy (venda SwaS) |
| **social-publishing-publisher** (+skill) | social-publishing | publica/agenda posts nas redes | **distribuição** (fecha a linha) |
| **brand-landingpage** (skill) | brand-landingpage | entrevista de marca → landing → bundle HTML | briefing+arte (alimenta brand-dna) |
| **image-generator / prompt-crafter / gallery-researcher** | meigen-ai-design | gera imagem IA + lote de prompts distintos + galeria 1.300+ refs | **arte** (camada 4 anti-genérico) |
| **kpi-dashboard-design / data-storytelling** (skills) | business-analytics | dashboard + narrativa de dados | **relatório** |
| **context-manager** (+save/restore) | context-management | salva/restaura contexto de sessão | motor (= ESTADO-ATUAL.md) |
| **before-you-build** (skill) | before-you-build | força planejar/estudar antes de agir | motor (= "estudar antes de agir" do MANIFESTO) |

### ✅ ÚTIL (adaptar)
seo-analysis-monitoring (refresh/canibalização → relatório) · seo-content-auditor (gate) · seo-meta/snippet/structure (copy/landing) · ui-design (ui-designer, design-system-architect, design-review → arte/gate) · startup-business-analyst (sizing/concorrência → briefing) · hr-legal-compliance (legal-advisor, templates LGPD → SwaS) · payment-processing (Stripe/billing → cobrança SwaS) · llm-application-dev (prompt-engineer 🥇, ai-engineer → produto digital/agentes) · agent-orchestration + agent-teams (motor da linha multiagente) · plugin-eval (LLM-judge = **modelo p/ nossos gates**) · documentation-generation (mermaid-expert → relatório) · file-conversion (otimizar output) · customer-support (produto SwaS).

### ❓ AVALIAR
machine-learning-ops (data-scientist → relatório) · conductor · review-agent-governance · protect-mcp / signed-audit-trails · runapi-mcp (roteamento de modelo p/ custo) · documentation-standards (hads) · vector-database/multi-platform.

### ➖ NÃO-RELEVANTE (~54 plugins, dev/infra puro)
api-scaffolding, backend/frontend/full-stack-dev, cloud-infrastructure, kubernetes-operations, cicd-automation, database-* (design/migrations/optimization), debugging/error-*, todos os *-pro de linguagem (python/js/ts/go/rust/java/c#/php/ruby/etc.), blockchain-web3, game-development, quantitative-trading, security-* (auditoria de código), testing (tdd/unit/e2e), observability, reverse-engineering, systems-programming, etc. *(python-development é o runtime da Guaru — ferramenta de infra, não agente da linha.)*

---

## FONTE 3 — rshah515/claude-code-subagents (165 agentes, 30 categorias)
**Instala:** cópia manual dos `.md` (README é a fonte autoritativa; árvore deu 403/404 anônimo).
**Contagem:** 🥇 16 · ✅ ~45 · ❓ 8 · ➖ ~96. **Os 30 agentes de "Marketing & Growth" são o ouro real** (espelham quase 1:1 a nossa linha).

### 🥇 OURO (16)
| nome | categoria | o que faz | encaixe |
|---|---|---|---|
| **copywriter-specialist** | Mkt/Conteúdo | copy persuasiva | **copy** (núcleo, gate de copy) |
| **content-editor** | Mkt/Conteúdo | edição editorial, otimização | copy/gate (revisão pré-design) |
| **content-strategist** | Mkt/Digital | planejamento/estratégia de conteúdo | briefing (calendário/pauta) |
| **social-strategist** | Mkt/Digital | estratégia de redes sociais | briefing (vitrine) |
| **brand-strategist** | Mkt/Brand | posicionamento e mensagem de marca | briefing (brand-dna/ângulo) |
| **conversion-optimizer** | Mkt/Brand | CRO e otimização de funil | gate de copy / relatório |
| **social-ads-expert** | Mkt/Digital | anúncios em redes (Meta Ads) | distribuição |
| **ppc-specialist** | Mkt/Digital | mídia paga e PPC | distribuição (tráfego pago) |
| **marketing-automation-expert** | Mkt/Tech | fluxos de automação | distribuição/automação (motor SwaS) |
| **growth-hacker** | Negócio | experimentos de crescimento, loops virais | briefing/distribuição |
| **ux-designer** | Especializado | pesquisa, wireframe, design system | briefing/arte |
| **ai-engineer** | Data/AI | LLMs, RAG, prompt engineering, apps IA | toda a linha (motor dos agentes) |
| **project-manager** | Orquestrador | orquestração de projeto | toda a linha (maestro do fluxo) |

### ✅ ÚTIL (destaques dos ~45)
email-strategist/copywriter/designer (distribuição/copy/arte e-mail) · seo-expert/strategist + geo-strategist (distribuição, visibilidade IA) · video-ads-expert · viral/influencer/affiliate-marketing (distribuição) · crm-specialist + customer-success-manager (relacionamento/relatório SwaS) · martech-stack-architect (orquestração) · pr-strategist · business-analyst + prd-writer (briefing) · data-scientist + business-intelligence-expert (relatório) · technical-writer (produto digital) · payment-expert (cobrança) · legal-compliance-expert (**direito de imagem/LGPD** — casa c/ CLAUDE.md) · ui-components-expert (arte/landing) · react/next/fastapi/astro-expert (site/landing leve).

### ❓ DÚVIDA (8 — vale teste)
**playwright-expert · cypress-expert · e2e-testing-expert** → candidatos a **motor do render HTML→JPG** (automação de browser; cruzar com o nosso `render-creative.js`). · runbook-generator · crisis-communication · data-quality-engineer · edtech-expert (curso/infoproduto).

### ➖ NÃO-RELEVANTE (~96)
Todo o bloco Infra/DevOps (13), Banco (7), Web3 (4), Healthcare (8), Fintech (3), Op-Excellence (3), Advanced Computing (3), Mobile (2), Localization (2), Research (2), Creative/AR-VR (2), API (graphql/grpc/websocket), e as linguagens/frameworks de sistema (go/rust/java/c#/scala/ruby/elixir/kotlin/swift/angular/django/rails/spring/etc.).

---

## FONTE 4 — repos de marketing + AIOS (~143 itens enumerados)
*ai-marketing-claude · marketingskills · talknerdytome/claude-agents · aiox-core/aiox-squads.*
**Contagem agregada:** 🥇 20 · ✅ 48 · ❓ 12 · ➖ 63. **O ouro de verdade está nos repos 1 e 2.**

### 4a. zubair-trabzada/ai-marketing-claude — A FÁBRICA QUASE PRONTA 🥇🥇 (5 subagentes + 14 skills + 4 scripts Python)
| 🥇 nome | o que faz | encaixe |
|---|---|---|
| **market-content** (subagente) | avalia headline, proposta de valor, CTA | copy |
| **market-copy** (skill) | gera copy de site c/ exemplos comparativos | copy |
| **market-social** (skill) | calendário social de 30 dias | distribuição/briefing |
| **market-ads** (skill) | criativos + mensagens de anúncio | copy/arte |
| **market-proposal** (skill) | proposta comercial com preço | briefing (venda SwaS) |
| **market-report-pdf** + **generate_pdf_report.py** | relatório profissional em PDF pro cliente | **relatório** |
| **market-brand** (skill) | guia de voz de marca/mensagem | briefing (alimenta brand-dna) |
- ✅ ÚTIL: market-audit (orquestra), market-conversion, market-competitive/competitors, market-strategy, market-emails, market-funnel, market-launch, market-report, competitor_scanner.py, social_calendar.py. · ➖: market-technical, market-landing, market-seo, analyze_page.py (foco web).
- **USO:** `audit`+`report-pdf` = **produto digital de ENTRADA** (auditoria do IG/site do prospect = isca/brinde, roda sozinho). `proposal` na venda. `social`/`emails` = matéria-prima da linha (passa pelo gate). Python/local casa c/ a nossa filosofia.

### 4b. coreyhaines31/marketingskills — A BIBLIOTECA DE CONHECIMENTO 🥇 (60 skills, formato markdown = igual à nossa niches-library)
| 🥇 nome | o que faz | encaixe |
|---|---|---|
| **copywriting** | frameworks de copy + transições naturais | copy |
| **copy-editing** | edita copy, checklist, plain english | copy (gate de copy) |
| **marketing-psychology** | gatilhos de psicologia | copy (ângulo quente) |
| **customer-research** | pesquisa de cliente e fontes | copy (pesquisar a DOR) |
| **offers** | desenho de oferta (value equation, garantia) | copy/produto digital |
| **marketing-plan** | plano completo (AARRR, budget) — o mais robusto (15 refs) | briefing |
| **social** | orgânico, short-form, listening (7 refs) | distribuição/briefing |
| **ad-creative** | criativo de anúncio por plataforma | copy/arte |
| **image** | prompting de imagem por IA | arte (banco IA do nicho) |
| **lead-magnets** | cria iscas digitais por formato | produto digital |
- ✅ ÚTIL: ads, cold-email, emails, sms, competitor-profiling/competitors, content-strategy, marketing-ideas, product-marketing, pricing (precificar SwaS), prospecting, sales-enablement, launch, video (Reels). · ❓: free-tools (produto digital?). · ➖ (~30): SEO técnico (ai-seo, schema, seo-audit, programmatic-seo, site-architecture), CRO/web (cro, signup, popups, paywalls, onboarding), SaaS (churn, revops, referrals), ab-testing, analytics, aso, PR, directory-submissions, co-marketing, community.
- **USO:** absorver `copywriting`/`copy-editing`/`marketing-psychology` pros gates; `lead-magnets`/`free-tools` viram **produtos digitais**. Markdown → encaixe direto, sem runtime externo.

### 4c. talknerdytome-labs/claude-agents — ESPIONAGEM DE ANÚNCIO (3 agentes)
| nome | o que faz | etiqueta | encaixe |
|---|---|---|---|
| **meta-ads-library** | minera anúncios Meta/FB reais do concorrente | 🥇 | briefing (ângulos quentes do nicho) |
| website-intel | rastreia mudança de mensagem/ICP/preço | ✅ | briefing |
| google-ads-library | minera anúncios Google (Transparency Center) | ✅ | briefing |
- **USO:** arma de briefing — ver o que o nicho REALMENTE roda antes de criar. Exige MCP/API → avaliar ao escalar tráfego.

### 4d. SynkraAI/aiox-core + aiox-squads — A ARQUITETURA (majoritariamente infra de DEV)
> **Correção de descoberta:** `aios-core` → redireciona pra **`aiox-core`**; os squads vivem em repo separado **`aiox-squads`**. **NÃO existe `etl-squad` nem `creator-squad`** públicos — o "ETL" é o agente core `data-engineer`; o "creator" é `squad-creator` (meta-infra). Os agentes core (aiox-master/pm/architect/dev/qa/po/sm/devops) são **➖ dev de software**.
- **Squad `curator`** (pipeline de vídeo/hook) — o mais relevante: 🥇 **brendan-kane** (hooks de 3s → copy hook-first) · 🥇 **jonah-berger** (viralidade STEPPS → o que CONVERTE) · ✅ matthew-dicks (storytelling), curator-chief, content-miner-pro, ffmpeg-cutter, mrbeast, data-curator. · ❓ ken-burns, walter-murch, robert-mckee (edição de vídeo autoral).
- **Squad `brand`** (alimenta brand-dna): ✅ marty-neumeier, emily-heyward, april-dunford, michael-johnson, brand-chief. ❓ alexandra-watkins (naming), sagi-haviv (logo).
- ➖ Demais squads: seo (8, foco web), apex (15, dev frontend), deep-research (11, acadêmico — já temos /deep-research), dispatch/kaizen/squad-creator (meta-infra), legal-analyst (jurídico BR), education (16 → ❓ infoproduto/curso).
- **USO:** vale como **arquitetura/orquestração** (espelho da linha) e p/ minerar os 4 agentes de hook/viralidade/brand. Traz peso de framework → garimpar, não adotar inteiro.

---

# 🏆 CONTAGEM-MESTRA (5 fontes)
| Fonte | total | 🥇 OURO | ✅ ÚTIL | ❓ | ➖ |
|---|---:|---:|---:|---:|---:|
| 1. VoltAgent | 151 | 18 | 41 | 1 | 91 |
| 2. wshobson | 194 ag (85 plugins) | ~10 plug | ~14 plug | ~7 | ~54 plug |
| 3. rshah515 | 165 | 16 | ~45 | 8 | ~96 |
| 4. marketing+AIOS | ~143 | 20 | 48 | 12 | 63 |
| **TOTAL aprox.** | **~650+ itens** | **~70 ouro** | **~190 úteis** | **~30** | **~360 dev/infra** |

**A leitura do marco:** de ~650 colaboradores mapeados, **~70 são ouro direto** e **~190 úteis** — todos prontos, MIT, grátis. A gente ia construir isso na unha. Não precisa mais: **escolher o conjunto → vestir no DNA/gates → ligar na linha → rodar.**

---

# 🎯 KIT-OURO RECOMENDADO (o que baixar/montar primeiro, por etapa da linha)
Conjunto mínimo pra fábrica girar ponta a ponta — escolhendo o melhor de cada fonte, sem redundância:

| Etapa | Pegar (fonte) | Por quê esse |
|---|---|---|
| **briefing (DOR + nicho)** | `customer-research` + `marketing-plan` (mktskills) · `market-audit/competitors` (ai-mkt) · `meta-ads-library` (talknerdytome) · `brand-strategist`+`content-strategist` (rshah515) | pesquisa de dor + mercado + ângulo quente real do nicho |
| **copy (núcleo + gate)** | `copywriting`+`copy-editing`+`marketing-psychology`+`offers` (mktskills) · `market-copy`/`market-ads` (ai-mkt) · `copywriter-specialist`+`content-editor` (rshah515) · `ai-writing-auditor` (VoltAgent, anti-IA) · `brendan-kane`+`jonah-berger` (aiox curator) | cobre PAS/AIDA, psicologia, oferta, hook-first, STEPPS e o auto-check anti-"sotaque de IA" |
| **arte (render + anti-genérico)** | `image-generator`+`prompt-crafter`+`gallery-researcher` (wshobson/meigen) · `image`/`ad-creative` (mktskills) · `ui-designer`/`design-bridge` (VoltAgent) · testar `playwright-expert` (rshah515) como motor HTML→JPG | banco IA por lote distinto + craft/layout + ponte DNA→tokens |
| **gate (copy + craft)** | nossos `copy-primeiro`/`craft-primeiro` (proprietário) + `plugin-eval` (wshobson, LLM-judge) como mecânica | o gate é o MOAT — só inspirar a mecânica, regra é nossa |
| **distribuição** | `social-publishing` (wshobson) · `market-social` (ai-mkt) · `social-ads-expert`+`ppc-specialist`+`marketing-automation-expert` (rshah515) | publica/agenda + calendário + tráfego + automação SwaS |
| **relatório (retenção SwaS)** | `market-report-pdf`+`generate_pdf_report.py` (ai-mkt) · `kpi-dashboard-design`+`data-storytelling` (wshobson) · `data-scientist` (rshah515) | PDF pronto pro cliente + dashboard + narrativa |
| **motor/orquestração** | `context-management`+`before-you-build`+`agent-teams` (wshobson) · `project-manager` (rshah515) · arquitetura do `curator` (aiox) | bastão de contexto + estudar-antes + time paralelo + maestro |
| **produtos digitais (caixa)** | `market-audit`+`report-pdf` (auditoria-isca) · `lead-magnets`/`free-tools` (mktskills) · `brand-landingpage` (wshobson) · `proposal`+`pricing` (venda) | auditoria de entrada, iscas, landing, proposta/preço |
| **operação/jurídico** | `legal-compliance-expert` (rshah515) · `legal-advisor`+templates LGPD (wshobson) | direito de imagem/LGPD — casa com a regra do CLAUDE.md |

**Caminho de montagem:** clonar os `.md` do kit pra `.claude/agents/` do nosso repo → editar cada um injetando **Base Mãe + gates + brand-dna** → ligar render (`render-creative.js`) + distribuição → rodar atrás dos dois gates. Tudo MIT, viaja no Git, sem custo de licença (atenção só às deps MCP de meigen/social-publishing — usar o padrão e trocar a dep).

## Fontes
github.com/VoltAgent/awesome-claude-code-subagents · github.com/wshobson/agents (commit 5cc2549) · github.com/rshah515/claude-code-subagents ·
github.com/zubair-trabzada/ai-marketing-claude · github.com/coreyhaines31/marketingskills · github.com/talknerdytome-labs/claude-agents ·
github.com/SynkraAI/aiox-core (ex-aios-core) · github.com/SynkraAI/aiox-squads. (pesquisa web/API 2026-06-26; descrições dos READMEs/árvores —
não testados rodando; toda saída passa pelos nossos gates antes de entregar.)
