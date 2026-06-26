# Grade Curricular — Web Designer (faculdade da fábrica)

> Matrícula nº3 (Marcos 2026-06-26). Função: criar **sites e LANDING PAGES que convertem** pra pequeno
> negócio — incluindo o site do **Guaru Estúdio** (domínio `guaruestudio.com.br` já comprado) e as landings que
> levam o funil do tráfego. **Sem ele a fábrica é fraca e converte menos** (não tem onde aterrissar o anúncio).
> Modelo: educação de elite em **UX/UI + CRO** (Nielsen Norman, Baymard) adaptada à entrega. Método: ver README.

> 🧬 **Ele NÃO começa do zero (ponto do Marcos):** o web designer **HERDA a fundação visual** já destilada pro
> Designer Gráfico (Gestalt, Tipografia, Cor, Grid, Branding) — são as MESMAS bases. + **estuda referência de
> mercado** antes de criar (nenhum web designer cria sem referência; senão "não saberia nem o que é um botão").
> Ele = (fundação do gráfico) + (cânone de web) + (referência do mercado curada) + (loop de aprendizado de web).

> **Legenda:** 🧬 herdado do gráfico (já temos) · 🌱 semente · 📚 cânone a estudar (modo caverna) · ⬜ lacuna.

---

## 🎯 MÉTODO DE CRIAÇÃO — como o web designer cria tudo da melhor forma (o "melhor método" que o Marcos pediu)
A ordem que um web designer de elite segue (e a nossa fábrica codifica):
1. **Herdar a fundação** — já sabe tipografia/cor/grid/hierarquia/branding (faculdade do gráfico). Não reinventa.
2. **Definir o OBJETIVO ÚNICO** (backward design): toda página tem UM trabalho. Landing de tráfego = 1 conversão
   (lead/agendamento). Design começa do objetivo, não do layout. Página com 5 objetivos não converte nenhum.
3. **Estudar a REFERÊNCIA de mercado** (mesmo workflow do gráfico): ver sites/landings reais que convertem no
   nicho (curadoria do Marcos = âncora; é régua, não cópia) → destilar o padrão validado. Nunca criar no escuro.
4. **Mapear conteúdo ao FUNIL/consciência** (liga com o gestor): topo educa, fundo converte; message match com o
   anúncio (a landing tem que continuar a promessa do criativo).
5. **Construir mobile-first** (a maioria entra pelo celular) na NOSSA stack (HTML/CSS/Tailwind/React no VSCode +
   Claude Code — dono de tudo) → publicar no host escolhido (domínio já existe).
6. **Medir e otimizar (CRO):** instalar analytics/pixel → ver o que converte → **destilar a lição no learning-log
   de web** → a próxima landing nasce melhor. (O loop de acúmulo — sem isso, cada site é do zero.)
7. **Crítica do Marcos = professor-mestre** (âncora anti-deriva), como em todos os colaboradores.

---

## FASE 1 — FUNDAMENTOS

### W-F0. Fundação visual (HERDADA do Designer Gráfico) 🧬
Gestalt, Tipografia (Bringhurst), Cor (Albers), Grid/Composição (Müller-Brockmann), Branding (Wheeler). **Já
destilado** em `knowledge-base/design/` + `copywriting/`. O web designer **parte daqui** — é a mesma base, só
muda o meio (tela interativa, responsiva).

### W-F1. Fundamentos de UX & Usabilidade
- **Ementa:** affordances/signifiers, modelos mentais, feedback, as **10 heurísticas de Nielsen**, **Leis de
  UX** (Hick, Fitts, Jakob, Miller), "não faça o usuário pensar".
- **Competência:** criar interface que a pessoa usa sem esforço/confusão.
- **📚 Cânone:** Norman, *The Design of Everyday Things* (herdado) · Krug, *Don't Make Me Think* (bíblia de
  usabilidade) · Nielsen Norman Group (10 heurísticas) · Yablonski, *Laws of UX*.

### W-F2. Componentes & padrões de UI (o "o que é um botão")
- **Ementa:** vocabulário de UI — botão (e seus **estados**: normal/hover/ativo/desabilitado), formulário, nav,
  card, modal, input; convenções (o usuário já sabe usar pelo padrão de outros sites — consistência externa);
  design system/tokens.
- **Competência:** usar o padrão certo (não inventar UI que confunde) e montar um sistema reaplicável.
- **📚 Cânone:** Wathan & Schoger, *Refactoring UI* (prático, ouro pra nossa stack Tailwind) · Tidwell,
  *Designing Interfaces* (catálogo de padrões) · Material Design / Apple HIG (convenções).

### W-F3. Layout web & responsivo (mobile-first)
- **Ementa:** grid web/flex, breakpoints, **mobile-first**, a "dobra" (above the fold), padrões de leitura
  (F/Z), densidade, espaçamento (o grid do gráfico aplicado à tela).
- **📚 Cânone:** Wroblewski, *Mobile First* · Marcotte, *Responsive Web Design* · Refactoring UI (espaçamento/hierarquia).

---

## FASE 2 — NÚCLEO

### W-N1. Landing Page & CRO (o módulo do DINHEIRO) 💰
- **Ementa:** anatomia da landing (hero/proposta de valor → prova social → benefícios → objeções → CTA),
  **um objetivo só**, foco above-the-fold, redução de fricção, message match com o anúncio, formulário curto,
  prova/escassez ética, velocidade. **CRO** = otimizar conversão por dado/teste.
- **Competência:** página que transforma clique de anúncio em lead/cliente.
- **📚 Cânone:** Krug, *Don't Make Me Think* · *Making Websites Win* (Conversion Rate Experts) · CXL Institute
  (CRO) · Unbounce/Oli Gardner (landing) · Miller, *Building a StoryBrand* (mensagem — herdado da copy).

### W-N2. Arquitetura da Informação & navegação
- **Ementa:** estrutura do site, IA, fluxos de usuário, navegação clara, rotulagem. (Landing pura tem nav mínima
  ou nenhuma; site institucional precisa de IA.)
- **📚 Cânone:** Rosenfeld & Morville, *Information Architecture* · Krug.

### W-N3. Interação & microinterações
- **Ementa:** estados, feedback imediato, microinterações com FUNÇÃO (não enfeite), transições; motion com
  propósito (liga com a doutrina de motion).
- **📚 Cânone:** Saffer, *Microinteractions* · Refactoring UI.

### W-N4. Acessibilidade & performance (conversão invisível)
- **Ementa:** **WCAG** (contraste — liga com Cor; semântica; teclado; alt), **Core Web Vitals** (velocidade =
  conversão + SEO; cada segundo derruba conversão). Acessível e rápido convertem mais e rankeiam melhor.
- **📚 Cânone:** WCAG 2.2 (W3C) · Google Core Web Vitals · "Inclusive Components" (Heydon Pickering).

### W-N5. Copy para web/landing (HERDADA + específica) 🧬
- **Ementa:** headline/proposta de valor, hierarquia de leitura na tela, CTA, microcopy (rótulos/erros).
- **No acervo:** 🧬 `copywriting/copy-persuasao-canone.md` (Ogilvy/Cialdini/StoryBrand) — aplicar à landing.

---

## FASE 3 — ESPECIALIZAÇÃO

### W-E1. Landing pages para TRÁFEGO (a ponte do funil — prioridade) 🔴
- **Ementa:** landing dedicada por campanha, **message match** com o criativo, 1 objetivo, sem nav (não vazar),
  velocidade, pixel/evento de conversão (liga com `marketing/mensuracao-tracking-canone.md`), teste A/B.
- **Competência:** onde o anúncio aterrissa e converte — sem isso o tráfego queima dinheiro.

### W-E2. Estudo de referência de mercado (web) — mesmo workflow do gráfico
- **Ementa:** ver sites/landings reais que convertem no nicho (curadoria do Marcos), destilar o padrão →
  `niches-library/<nicho>/web-references/`. Régua, não cópia. (Ver `sistema/workflow-estudar-mercado-antes-de-criar.md`.)

### W-E3. Nossa STACK & publicação (como a fábrica constrói)
- **Ementa:** HTML/CSS/**Tailwind**/React no VSCode + Claude Code (dono de tudo); build, preview, deploy; host
  (a escolher — Vercel/Netlify/Supabase) + apontar o domínio. Liga com `decisoes/ambiente-de-build-vscode.md`.

---

## FASE 4 — PRÁTICA PROFISSIONAL & MÉTODO
- **W-P1. Método** (estudar ref → objetivo único → build mobile-first → medir → destilar) — seção de método acima.
- **W-P2. SEO básico & analytics** — ser achado (Google Search Essentials) + medir (GA4) → alimenta o CRO.
- **W-P3. Ética & qualidade** — sem dark patterns; acessível; honesto; LGPD nos formulários.
- **W-P4. Estágio (o loop)** — cada site/landing → crítica do Marcos → `learning-log` de web → próxima melhor.

---

## Diagnóstico HONESTO de matrícula
**CALOURO em WEB — mas com a fundação visual JÁ no bolso** (herdada do gráfico). Tem a base de Gestalt/tipo/cor/
grid/branding/copy; **falta toda a camada WEB** (UX, UI/componentes, responsivo, **landing/CRO**, IA,
acessibilidade/perf, stack/host). Hoje a fábrica **não tem nenhum módulo de web destilado** → por isso esta
matrícula é **urgente** (sem landing, o funil não fecha).

### 📓 Progresso do modo caverna de web (2026-06-26)
- ✅ **W-N1 — Landing Page & CRO 💰** destilado → `web/landing-page-e-cro-canone.md` (Krug/CRO/StoryBrand).
- ✅ **W-F1 — UX & Usabilidade** destilado → `web/ux-usabilidade-canone.md` (Norman/Nielsen/Leis de UX/Krug).
- 🧬 Fundação visual: já herdada do gráfico (`design/`+`copywriting/`).
- ⏳ fila: W-F2 UI/Componentes → W-E1 Landing pra tráfego → W-F3 Responsivo → W-N4 Acessib/Perf → W-E3 Stack/host.

### Plano "MODO CAVERNA" de web (fila por pré-requisito / prioridade do funil)
1. 🔴 **W-N1 Landing & CRO** (o módulo do dinheiro) → 2. **W-F1 UX/Usabilidade** → 3. **W-F2 UI/Componentes** →
4. **W-E1 Landing pra tráfego** → 5. **W-F3 Responsivo** → 6. **W-N4 Acessibilidade/Perf** → 7. **W-E3 Stack/host**
→ 8. W-N2 IA → W-N3 Interação → W-P2 SEO/analytics.
> Drafts ≠ formado: vira "cursado" com a crítica do Marcos + aplicar numa landing real (a prova). O que o
> Marcos ensinar entra como matéria obrigatória, à risca.
