# Avaliação — Xquads / Squads (sowsales/raxo · repo ohmyjahh/xquads-squads)

> Marcos mandou estudar (2026-06-26): https://www.sowsales.com.br/xquads/downloads (deu 403/anti-bot; estudei
> via repo público + páginas). É DECISÃO/avaliação (build-vs-buy), não faculdade. Compare com avaliacao-lovable-dev.md.

## O que é
Produto BR que vende um **pacote de ~96–136 agentes de IA** organizados em **12 "squads" temáticos**, pra rodar
**dentro do Claude Code** por comandos em português. Cada agente é uma **persona de um expert lendário**
("pensa como" Gary Halbert/Ogilvy/Schwartz na copy, Hormozi na oferta, Pedro Sobral no tráfego, **David Aaker/
Neumeier/Al Ries no branding"). Squads: advisory-board, brand, c-level, claude-code-mastery, copy, cybersecurity,
data, design, hormozi, movement, storytelling, traffic-masters.

## A arquitetura (é isto que interessa pra nós)
Padrão tipo **BMAD/agent-OS**. Cada squad é uma pasta com:
- `squad.yaml` — **manifesto** (lista agentes, tasks, workflows).
- `agents/` — definição de cada agente: **persona · role · focus · greeting** (+ orquestrador do squad).
- `tasks/` — unidades executáveis com **inputs/outputs** (ex. brand-squad: audit-brand, diagnose, create-
  positioning, generate-names, build-identity, create-brand-story, map-archetype…).
- `workflows/` — **sequências multi-agente** (ex.: brand-creation, rebrand — encadeia estrategista → copy → preço).
- `checklists/` — **portão de qualidade** (ex.: output-quality).
- `data/` — frameworks + routing-catalog (qual agente pra qual problema).

## Como isso MAPEIA na nossa fábrica (quase 1:1 — valida o caminho)
| Xquads | O que já temos / estamos construindo |
|---|---|
| agents/ (persona Aaker, Halbert…) | colaboradores (designer, gestor, copywriter, web) + **cânone destilado** na faculdade (já destilamos Aaker/Wheeler/Neumeier, Ogilvy/Cialdini, Schwartz) |
| tasks/ (inputs→outputs) | nossos **gates** (copy-primeiro, craft-primeiro) e protocolos |
| workflows/ (encadeia agentes) | nosso **Protocolo de Geração de Design** (copy → 3 camadas → craft) |
| checklists/ (output-quality) | os **checklists-portão** dos nossos gates |
| data/ (frameworks, routing) | `knowledge-base/` + a lógica de qual regra aplicar |
| squad.yaml (manifesto) | (não temos um manifesto por colaborador — é o que falta formalizar) |

## Leitura (build vs buy — alinhado à nossa cultura)
- **NÃO comprar o pacote pelo conteúdo.** O valor deles é **amplitude** (136 personas genéricas). Nossa doutrina
  é **curadoria** (conhecimento errado/excesso = "gordura no cérebro") + **acúmulo por cliente real com o taste
  do Marcos**. Persona genérica de expert ≠ o nosso MOAT (faculdade validada + feedback real). Já temos o cânone
  de branding/copy/tráfego destilado e PROVADO no nosso fluxo.
- **SIM, aprender a ARQUITETURA.** O padrão `manifesto + agents + tasks + workflows + checklists + data` é uma
  forma limpa de **formalizar nossos colaboradores como agentes invocáveis** e amarrar nossos gates como
  tasks/workflows. Hoje nossos gates e currículos existem soltos em `.md`; um "squad.yaml" por colaborador
  deixaria a fábrica orquestrável (e é o pattern aberto BMAD, não IP deles — dá pra adotar sem copiar arquivos).
- **Cautela de IP/marca:** não clonar os arquivos deles (produto pago). E coerente com a nossa regra: a fábrica
  é invisível, vende-se o toque humano — agentes são motor interno.

## Nossa vantagem que um pacote não dá
Feedback real do Marcos virando regra (taste) + acúmulo por nicho/cliente. Xquads é genérico e estático; a nossa
faculdade **aprende com cada peça** (este loop de design inteiro é prova disso).

## Recomendação
1. **Não comprar pelo conteúdo** — já temos cânone melhor (curado + validado) pro nosso escopo.
2. **Adotar o PADRÃO de organização** quando formos formalizar os colaboradores: dar a cada um um manifesto
   (agente: persona/role/focus) + tasks (nossos gates) + workflow (Protocolo) + checklist (portão). Mantém a
   nossa lógica de "colaborador consulta a faculdade", agora orquestrável.
3. **Roubar 1 ideia útil já:** o **routing-catalog** (mapa "qual problema → qual agente/regra") e o **orquestrador
   de squad** (um dispatcher) — úteis quando tivermos vários colaboradores rodando.
4. Decidir com o Marcos se vale, no futuro, empacotar nossos colaboradores nesse formato (provavelmente sim, na
   fase de escalar) — mas **tijolo por tijolo**, sem abrir frente agora.

## PLANO — capturar o atalho (Marcos: "o modelo dele já está pronto, encurta nosso caminho")
**Insight central (CORRIGIDO 2026-06-26 — eu tinha concluído cedo demais):** o Xquads claramente entrega o
**CÉREBRO DE CONTEÚDO curado** (copy/estratégia/branding). **MAS ele também PODE entregar a IMAGEM** — a
**design-squad** tem `visual-generator` ("visual assets") e `ui-engineer` ("UI code production"). Marcos
ouviu que às vezes entrega a arte pronta, **às vezes melhor que a nossa**. ⚠️ Minha leitura anterior ("não
renderiza") veio só do README + copy-squad (textual) — **estava incompleta**. O que falta APURAR (só com os
arquivos reais): COMO o `visual-generator`/`ui-engineer` produz a imagem (escreve código HTML/SVG como a gente?
chama IA de imagem? exporta PNG/JPG?) e **se a qualidade ganha da nossa**. → decisão por **TESTE head-to-head**,
não por achismo. Pode ser que a integração não seja "conteúdo dele + render nosso", e sim **usar o pipeline
dele** se a arte dele for melhor — ou um híbrido. Manter as duas portas abertas até o teste.

**Como ele "já funciona" (a curadoria embutida):** persona-expert (frameworks do Aaker/Halbert/etc. no system
prompt) + **tasks** com passos/inputs/outputs + **checklist output-quality** (portão) + **workflow** que
encadeia + **routing-catalog** + **orquestrador**. Invocação BMAD: `@copy-chief` → `*diagnose`/`*full-copy-project`.

### Fases
- **Fase 0 — TESTE HEAD-TO-HEAD (barato, ANTES de comprometer):** mesmo briefing → (a) gerar pelo Xquads
  (design-squad: `visual-generator`/`ui-engineer`) e (b) pela nossa fábrica → **comparar lado a lado**: a
  imagem dele sai pronta? como (código x IA de imagem)? a qualidade/craft ganha da nossa? a copy/curadoria é
  boa? em PT-BR? serve a pequeno negócio BR? **Quem ganha em cada parte (conteúdo / arte) define a integração.**
  ⚠️ Na nuvem o git de terceiro é bloqueado (proxy só libera nosso repo); roda melhor **no PC do Marcos**.
- **Fase 1 — Modelo de adoção:** (A) usar/adaptar os squads direto (rápido; risco genérico+licença) · (B)
  replicar o PADRÃO com a NOSSA faculdade curada (alinhado ao MOAT; mais trabalho) · (C) **HÍBRIDO
  (recomendado):** estrutura + conteúdo deles como BASE, vestida com nosso DNA + gates + taste do Marcos.
- **Fase 2 — Conectar ao render:** definir o "contrato" — a copy/estrutura aprovada vira input do nosso
  pipeline (gate de copy → 3 camadas DNA → portão de craft → JPG). Xquads não renderiza; nós sim.
- **Fase 3 — Taste/acúmulo:** cada peça + feedback do Marcos refina nossos tasks/checklists (o que o pacote
  genérico nunca terá — é o nosso MOAT por cima da base dele).

### Licença (gate antes de usar comercialmente)
Repo público e clonável, **sem arquivo LICENSE declarado**, com página de download e `npx`. Sem termos
explícitos = zona cinza pra uso comercial. **Estudar/aprender o método: ok.** Usar o conteúdo deles em
entrega paga: confirmar condições com o vendedor (sowsales) antes. (Reforça a opção B/C — nosso conteúdo curado.)

### Preço/risco (achado 2026-06-26 — muda a Fase 0)
- **Xquads = R$67, garantia de 7 dias (reembolso).** Barato e reversível. A `raxo.com.br/vibecodingvsl` é a
  **VSL do funil** (utm `xquads-isca-nov25`) — o Xquads é a **isca/front-end**; a VSL deve vender um curso/oferta
  maior de "vibe coding" por cima. ⚠️ Avaliar o front-end (R$67) ANTES de qualquer upsell do funil.
- Comprar dá acesso/uso (resolve a zona cinza de licença pro nosso teste). A garantia torna a Fase 0 quase sem risco.

### Primeiro passo concreto (recomendado, atualizado)
**Comprar o Xquads (R$67) → rodar a Fase 0 → comparar com a nossa fábrica → decidir A/B/C.** Como é R$67 com
garantia, o custo de descobrir é mínimo. Definir quem instala/roda (PC do Marcos x nuvem). Guardrail: o que
valer a pena, **destilar pra NOSSA faculdade** (não virar dependente do tool; o conteúdo curado tem que ser
nosso — é o MOAT que sobrevive mesmo se largarmos o pacote).

## 📥 Download grátis + passo a passo (Marcos no PC)
- **Repo (grátis):** https://github.com/ohmyjahh/xquads-squads
- **ZIP direto:** https://github.com/ohmyjahh/xquads-squads/archive/refs/heads/main.zip
- Alternativas: `xquads.vercel.app/xquads/downloads` · `npx aios-core install`.

**Passos (PC):** (1) baixar ZIP + descompactar → (2) abrir a fábrica no Claude Code → (3) criar pasta de
estudo **`_estudo-xquads/`** na raiz e colocar os arquivos lá → (4) `git add _estudo-xquads && commit && push`
(ou `node tools/sincronizar.mjs`) → (5) avisar "subi o xquads" → o Claude (nuvem) lê, roda a Fase 0 e desenha
a integração com o render. ⚠️ Pasta de ESTUDO temporária (não é a faculdade); depois destila o método pro
nosso DNA e apaga os arquivos deles (sem licença declarada → aprender e reconstruir, não virar refém).

## 🧭 Lição de processo (Marcos 2026-06-26) — RECON antes de construir do zero
Antes de ensinar/treinar um colaborador do ZERO, **verificar se já existe solução pronta** (comprar vs
construir) — pesquisar tools/produtos/repos do mercado. Bater cabeça reinventando o que já existe pronto =
tempo humano perdido. Recon de mercado é o passo 0 de qualquer frente nova. (Cravado depois de descobrir o
Xquads tarde.)

## Mecanismo provável da arte (pesquisa 2026-06-26) — é a MESMA família que a nossa
Esse meio (Claude Code + carrossel) entrega imagem **via HTML → PNG/JPG, sem IA de imagem** ("create carousel
directly inside Claude, HTML to PNG conversion"). É **o mesmo método do nosso `render-creative.js`**. Marcos viu
num vídeo a entrega dele sair **bem melhor** que a nossa. Conclusão provável: se a tecnologia é igual, a vantagem
dele **não é o render — é a CURADORIA/CRAFT embutida** (templates/regras/checklists de design melhor authorados).
**Boa notícia:** craft encodado a gente **absorve** pro nosso pipeline (que já faz HTML→JPG). O teste head-to-head
vai mostrar o QUE ele faz melhor (estrutura? tipografia? composição? copy?) → vira regra na nossa faculdade.
(Ainda assim, confirmar no arquivo real: se usar IA de imagem em algum ponto, anotar.)

## INTEGRAÇÃO NA FÁBRICA — arquitetura + contrato + o que mexer no código (meio de campo, 2026-06-26)
**Princípio que protege a criatividade:** o Xquads encurta a **curadoria de CONTEÚDO**; a **criatividade
VISUAL continua no designer** (senão vira o template que o Marcos reprovou). Então não é "spec → template
rígido"; é um **handoff por briefing**.

**Fluxo:**
`cérebro de conteúdo (Xquads/nosso)` → **briefing de peça** (copy aprovada no gate + estrutura sugerida +
brief de foto) → `designer (agente) compõe HTML AUTORAL` (varia arquétipo/tipo/composição) → **portão de
craft** → `tools/render/render-creative.js` (HTML→JPG) → slides. Foto via `tools/foto-auto.mjs` quando precisa.

**Contrato pronto:** `tools/briefing-de-peca.template.json` (a interface; o cérebro preenche, o designer consome).

**O que JÁ existe (não precisa reescrever):** render (`render-creative.js` + fontes do DNA) · foto
(`foto-auto.mjs`) · os 2 gates (copy/craft) · DNA/faculdade. A metade do RENDER está pronta.

**O que vai precisar de NOVAS LINHAS (montar no desktop, em ordem):**
1. **Adaptador `xquads → briefing-de-peca.json`** — converte o output deles (formato de task/agente) pro nosso
   contrato. *Só dá pra escrever depois de ver os arquivos reais em `_estudo-xquads/`.* (1º código a fazer.)
2. **(opcional) `tools/gate-check.mjs`** — imprime os checklists do gate de copy e de craft pro designer
   auto-auditar a peça (rápido, independe do Xquads).
3. **(opcional) orquestrador `tools/pipeline-peca.mjs`** — encadeia: lê briefing → `foto-auto` (se precisa) →
   [designer compõe HTML = passo do agente] → `render-creative` → imprime gate-check. Montar quando o fluxo estiver fechado.
4. **(fase escalar) manifestos de "squad"** dos nossos colaboradores (config .yaml/.md, padrão BMAD) — não é
   código, é organização; só quando formos formalizar os colaboradores.

> Resumo: o grosso do "novo código" é o **adaptador (1)**, que depende dos arquivos. O resto (contrato, render,
> foto, gates) já está adiantado. Por isso o gargalo agora é só o Marcos subir o `_estudo-xquads/`.

## Pendência
- Marcos decidir: (1) quem roda a Fase 0 (PC dele x eu instalo na nuvem) · (2) modelo de adoção A/B/C.
- Marcos subir `_estudo-xquads/` (passo a passo acima) → libera a Fase 0 + escrever o adaptador (item 1).
