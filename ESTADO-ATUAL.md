# ESTADO-ATUAL.md — bastão de contexto entre terminais

> Leia no início de toda sessão (+ `CLAUDE.md` + `MANIFESTO.md`). Atualize no fim de cada sessão.
> **Branch de trabalho:** `claude/pexels-hero-photo-test-0vbct1` (tudo pushado).
>
> 🔻 **PROJETO ENCERRADO (2026-06-27).** Esta linha cumpriu o papel: arrancou a régua e provou o gate de realidade
> (3 nichos, 3 caras distintas + teste headless 1-4). O Marcos iniciou um **modelo novo, mais avançado** (sessão com
> Adobe / workflow de 7 portões — ver `decisoes/workflow-adobe-carrossel.md`), que **sucede** este. O conteúdo abaixo
> fica como registro/base do que foi limpo e decidido. Nada novo aqui.

## 🟢 Fábrica renascida + RÉGUA ARRANCADA (2026-06-27)
Setor criativo reconstruído do zero: os agentes são SENIORES; a régua antiga (faculdade, Base Mãe, regras de
copy/design, memórias de cliente, referências visuais) era arcaica e os algemava → **aposentada** (recuperável no Git).
**Descoberta-chave desta fase:** a "régua" que fazia tudo sair igual NÃO estava só nos arquivos — estava (a) no
**reflexo treinado do modelo** (ele caía no genérico quando gerava no achismo, ex.: gradiente do Instagram pra açaí) e
(b) na **infra/docs** (prateleira fixa de fontes, vocabulário "DNA/faculdade", doutrina no MANIFESTO que os agentes
reliam no boot). As duas foram atacadas. Conserto real = **gate de realidade** (dado real + foto real ANTES de criar)
+ **liberdade total** (time escolhe fonte/paleta) + o produtor (Chat-Mestre) **não altera a entrega deles**.

### O que foi ARRANCADO nesta fase (além da fábrica antiga)
- Prateleira fixa de 4 fontes → **fonte sob demanda** (`tools/fonte-auto.mjs`, baixa qualquer Google Font).
- "DNA"/"biblioteca da fábrica" fora da infra (render-creative, foto-auto, README das fontes = "cache").
- `README.md` reescrito (sem CLI `guaru dna`/brand-dna/Alkimia — código já deletado). Ponteiros mortos removidos.
- MANIFESTO: doutrina velha (faculdade/designer-estagiário/referências/regra de setor) APOSENTADA do doc ativo;
  original preservado em `decisoes/MANIFESTO-original-2026-06-25.md`.
- Deletados: `template-client-base/`, `niches-library/README.md` (régua de setor).

### O que FICOU (as paredes que sustentam)
- **O OLHO:** `tools/render/render-creative.js` (HTML→JPG) + `ui-visual-validator` validando REALIDADE (não gosto)
  em loop antes de entregar — JÁ AMARRADO no fluxo (reprova com motivo → designer corrige → reaprova).
- **Ferramentas:** `tools/foto-auto.mjs` (foto real, Pexels) · `tools/fonte-auto.mjs` (fonte sob demanda) ·
  `tools/render/` · `tools/sincronizar.mjs` (sync entre terminais — empurra a `main`) ·
  **`tools/fabrica.mjs` (NOVO): a linha de produção HEADLESS — o "produtor" virou código.** Roda o gate inteiro via
  `claude -p` (pesquisa→identidade→copy→foto→fonte→design→render→OLHO+loop) sem humano no chat.
  Uso: `node tools/fabrica.mjs --slug=<x> --nicho="..." --objetivo="..." --praca="..."`.
- Equipe de agentes seniores (`.claude/agents/`). `MANIFESTO.md` (cultura). Projetos em `Projetos/`.

### O processo oficial (gate de realidade — repetível)
Portão 0 briefing (nicho/objetivo/praça) → 1 **pesquisa real** (fonte citada, regras do nicho) → 2 **identidade**
(time escolhe fonte/paleta) → 3 **copy** → 4 **foto real** + **fonte sob demanda** → 5 **design** (método do designer)
→ 6 **render** → 7 **O OLHO** (checklist de realidade; loop reprova→corrige) → 8 registro. **Produtor não toca no design.**

## ✅ Provas entregues nesta fase (3 nichos, 3 caras distintas — feitas pela equipe sozinha)
- `Projetos/puro-acai/` — açaí, VENDA. Roxo-açaí real (matou o gradiente do Instagram). Anton+Inter+Fraunces.
- `Projetos/advocacia-trabalho/` — advocacia do trabalhador, CONSULTA. Azul-marinho+terracota. Fraunces+Libre Franklin
  (Libre Franklin baixada sob demanda). Conformidade OAB.
- `Projetos/studio-beleza/` — lash & brow "Maré", AGENDAMENTO. Verde-mar (subverteu o clichê rosé/bege do nicho).
  Fraunces+Inter. Ética CONAR/LGPD ("imagem ilustrativa", "teste de sensibilidade").
Todos arquivados (pesquisa→identidade→copy→foto→design→OLHO). Falta só preencher placeholders [WhatsApp/@/etc.] pra publicar.

## ⏭️ PRÓXIMO PASSO
- Rodar a linha **headless via `tools/fabrica.mjs`** num nicho novo (1º teste 100% sem humano no chat) e conferir.
- (Opcional) Fechar o processo como padrão oficial no CLAUDE.md / knowledge-synthesizer.
- Quando o Marcos autorizar: `git pull` no outro terminal (ou `node tools/sincronizar.mjs` pra mesclar na `main`).
