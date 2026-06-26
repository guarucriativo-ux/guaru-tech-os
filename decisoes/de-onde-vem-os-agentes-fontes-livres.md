# De onde vêm os agentes — fontes LIVRES (independência do vendedor) · 2026-06-26

> Faro do Marcos: "esses agentes não foram criados por esse rapaz; a base é toda em inglês — ele achou onde já
> existia, pôs uma capa e vende num curso. Pesquise a fonte e outros caminhos de pegar/criar esses agentes."
> CONFIRMADO. Independência = a gente sabe sourcer/criar colaboradores quando precisar, sem depender do Xquads.

## A cadeia (a "capa" do Rafa)
1. **PATTERN → BMAD-METHOD** (`github.com/bmad-code-org/BMAD-METHOD`, open-source) — a estrutura
   `agents/ + tasks/ + workflows/ + checklists/ + orquestrador` (19+ agentes: PM/Architect/Dev/QA…). É
   *exatamente* o esqueleto do Xquads. Site: docs.bmad-method.org. Porte p/ Claude Code: `24601/BMAD-AT-CLAUDE`.
2. **ENGINE com squads → Synkra AIOS / `aios-core`** (`github.com/SynkraAI/aios-core`) — "AI-Orchestrated
   System", instala com **`npx aios-core install`** (o MESMO comando do README do Xquads). Os **"Squads" já vêm
   com agentes de creative writing, business strategy, health, education…**. Estrutura `.aios-core/` (agents/
   tasks/templates/squads/memory/kb). **É a base que o Xquads empacotou.**
3. **CAPA → Xquads** (repo `ohmyjahh/xquads-squads`, vendido por raxo/sowsales, R$67 + curso "vibe coding"):
   pegou o AIOS/BMAD (inglês), **traduziu pra PT, curou em 12 squads e vende como produto/curso** (ganha
   audiência com isso). *Confiança: alta — baseado nos READMEs + no `npx aios-core`; não 100% provado, mas muito provável.*

## Caminhos LIVRES de pegar os agentes (sem o vendedor)
1. **Direto da fonte:** `npx aios-core init my-projeto` ou `npx aios-core install` (Synkra AIOS) → os squads de
   origem, de graça. (Mesma coisa que o Xquads entrega, sem a capa/curso.)
2. **Coleções abertas (grátis, em inglês — traduzir/adaptar):**
   - **wshobson/agents** — 191 agentes · 155 skills · 102 commands · 82 plugins (production-ready, multi-harness).
   - **VoltAgent/awesome-claude-code-subagents** — 154+ agentes em 10 categorias (inclui business/marketing: content-marketer etc.).
   - **rshah515/claude-code-subagents** — 165 agentes (e-mail mkt, conteúdo, martech, CRM).
   - **Marketing específico:** `coreyhaines31/marketingskills` (CRO/copy/SEO/growth) · `zubair-trabzada/ai-marketing-claude`
     (15 skills + subagentes paralelos: audita site, copy, e-mail, anúncio, calendário, PDF pro cliente) ·
     `talknerdytome-labs/claude-agents` (growth) · `VoltAgent/awesome-agent-skills` (1000+ skills).
3. **CRIAR os nossos (independência total):** com o **pattern BMAD** a gente autora squads próprios com o NOSSO
   DNA + gates + taste. Aí o agente nasce já no nosso jeito (não genérico em inglês).

## O que isto muda pra nós (a vantagem)
- **Não dependemos do Xquads.** O R$67 é conveniência (PT + curadoria pronta); o conteúdo está livre na fonte.
- **Sabemos "contratar colaboradores" fácil sempre:** precisar de um novo especialista (ex.: um agente de
  e-mail mkt, de SEO, de CRM) → pegar de uma coleção aberta ou autorar via BMAD, em vez de comprar/esperar.
- **Decisão de adoção (atualiza `avaliacao-xquads-squads.md`):** comparar **`npx aios-core` (fonte grátis)**
  vs **Xquads R$67 (PT+curado)** na Fase 0. Se o AIOS livre entregar o mesmo, pega da fonte e veste no nosso DNA.
- **Mantém a nossa regra:** o valor nosso não é o agente (é commodity livre) — é **render + gates + taste +
  produto/oferta** por cima. Os agentes a gente pega/cria; o MOAT é o que botamos em cima.

## Próximo (quando instalar — Fase 0)
- Testar `npx aios-core install` (fonte) E/OU o zip do Xquads → comparar com a nossa fábrica (head-to-head).
- Espiar 1-2 coleções (wshobson/VoltAgent) pra ver a qualidade dos agentes de copy/marketing/branding.

## Fontes
github.com/bmad-code-org/BMAD-METHOD · docs.bmad-method.org · github.com/24601/BMAD-AT-CLAUDE ·
github.com/SynkraAI/aios-core (+ /docs/getting-started.md) · github.com/ohmyjahh/xquads-squads ·
github.com/wshobson/agents · github.com/VoltAgent/awesome-claude-code-subagents · github.com/rshah515/claude-code-subagents ·
github.com/coreyhaines31/marketingskills · github.com/zubair-trabzada/ai-marketing-claude · github.com/VoltAgent/awesome-agent-skills.
(pesquisa web 2026-06-26)
