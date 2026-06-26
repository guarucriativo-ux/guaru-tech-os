# Lições pra aplicar — Rafa Grandi (técnica/linha) + Rony Meisler (venda/marca) · 2026-06-26

> Marcos: "aprenda o máximo com os dois — igual aos agentes, às vezes ensinam um atalho." Estudo via público
> (prints + busca; conteúdo pago não acessado). Parte técnica (Rafa) abaixo; parte Rony entra quando os agentes
> voltarem. Cruza com `avaliacao-xquads-squads.md` (INTEGRAÇÃO) e a agenda da linha em `rumo-produtos-com-agentes.md`.
> ⚠️ Vínculo Rafa↔repo Xquads (`ohmyjahh`) não confirmado; nomes/preços de modelos 2026 = blogs de terceiros (conferir na doc oficial).

## PARTE 1 — RAFA / VIBE CODING: como montar a LINHA DE PRODUÇÃO (a camada que falta: loops + distribuição)

### 1. "O fim dos prompts → construa LOOPS"
Em vez de promptar peça a peça, desenhar um **mecanismo que se auto-prompta**: ciclo **executar → avaliar →
continuar/parar**. Formas: skill nativa **`/loop`** do Claude Code; **Ralph loop** (`while` de shell rodando o
mesmo prompt contra uma fila/spec até esgotar).
- **APLICAR:** `tools/loop-producao.mjs` → lê fila `pauta.json` (temas por cliente) → p/ cada item roda o
  pipeline (copy → HTML → render JPG → foto Pexels) → roda o **gate** (copy+craft) como AVALIADOR → reprovou:
  devolve o feedback e repete; aprovou: marca no `ledger` e segue. Parada = fila vazia. O `shared/ledger-query.js`
  (`avoidRepeats`) já é a memória anti-repetição entre iterações. **Nossos gates são o "avaliador" que fecha o loop.**

### 2. Agentes em paralelo / squads
- **Subagents** (Task tool): context próprio, só reportam ao pai, mais baratos, **read-only** (não pedem permissão).
- **Agent Teams** (experimental): líder + 3–5 teammates com lista compartilhada + file-lock; regra de ouro =
  **cada um dono de arquivos diferentes** (dois no mesmo arquivo = sobrescrita). Custo escala linear.
- **APLICAR:** produção em lote = **1 teammate por CLIENTE** (isolamento natural = casa com a nossa regra de
  isolamento de assets, sem conflito). Subagents read-only pra pesquisa de dor/ângulo (camada copy); escrita fica no pai.

### 3. Headless / SDK / auto-accept (rodar em lote, sem supervisão)
`claude -p "..."` não-interativo · `--output-format json` (traz result/session_id/custo) · `--json-schema`
(saída estruturada validável) · `--allowedTools` (pré-aprova) · `--permission-mode acceptEdits` (escreve sem
perguntar) · `--bare` (ignora hooks/MCP/CLAUDE.md → idêntico em qualquer máquina, ideal p/ CI) · `--resume <id>`.
- **APLICAR:** cada etapa da fábrica vira chamada headless dentro do `loop-producao.mjs`; copy com `--json-schema`
  fixo; lote com `acceptEdits` + `--allowedTools` restrito a render(Puppeteer)+Pexels; `--resume` p/ reabrir peça reprovada.

### 4. Auto-postagem multi-plataforma ("postagens infinitas") — o elo de DISTRIBUIÇÃO
Só **API oficial** (automação não-oficial = ban). Duas rotas: **agregador 1-API** (Postiz open-source/self-host,
Upload-Post, post-bridge — 1 POST → IG/TikTok/X/LinkedIn) **ou** API nativa (Instagram Graph: conta Business +
app review 2–4 sem + limite 100 posts/24h).
- **APLICAR:** `tools/distribuir.mjs` pega o JPG aprovado + caption (já temos a copy) e publica. **Recomendado:
  começar com Postiz self-hosted** (casa com nossa filosofia de arquivos locais/sem infra cara) em vez do app
  review da Meta. Guardrail de imagem continua (nada de @/rosto de terceiro como cliente).

### 5. Roteamento de MODELOS (economia)
Stack roteado economiza ~51% vs. Opus uniforme: **Haiku** triagem/extração · **Sonnet** constrói (60–70% do
volume) · **Opus** julga/revisa · **Fable** raciocínio longo (caro).
- **APLICAR:** Haiku na fila/pauta; **Sonnet** = motor de copy+layout em lote; **Opus** nos **gates** (a parte de
  julgar aprovar/reprovar); **Fable** no líder-orquestrador ou peça carro-chefe. (Conferir nomes/preços 2026 na doc oficial.)

### 🔧 O que isso vira de CÓDIGO novo (a linha)
1. `tools/loop-producao.mjs` — orquestrador (fila → pipeline → gate → ledger → repete). **É o coração da linha.**
2. `tools/distribuir.mjs` — auto-postagem (começar Postiz self-host).
3. `pauta.json` por cliente — a fila de temas. (gate-check + briefing-de-peca.json já existem/esboçados.)
> Conecta com a integração do Xquads: o kit/agentes preenchem o briefing → o loop roda → render → gate → posta.

## PARTE 2 — RONY MEISLER (venda · marca · oferta · produto)
> Reserva (R$6 mil → ~R$2 bi → vendida ao Arezzo). Hoje: newsletter "Email do Rony" (~1,2mi), Manual de Donos
> (escola por e-mail + comunidade + IA), Rebels Ventures. A audiência dele É o nosso buyer persona (donos).
> ⚠️ Substack/LPs deram 403; conteúdo reconstruído de snippets de busca — frases entre aspas são indexadas,
> preços variam por campanha. Vínculo honesto, não verificado linha a linha.

### A) VENDA / OFERTA / COPY (o que mais aplica já)
1. **Os 4 Mecanismos de Venda** (vira DIAGNÓSTICO do cliente antes de produzir): (1) **novos clientes** —
   sub-gargalos consciência / educação / conversão; (2) **ticket médio** (upsell/combo); (3) **recorrência**
   (recompra/assinatura); (4) **reativação da base inativa** ("cliente parado é dinheiro esperando ligação").
   → Cada serviço nosso ataca um: criativo de aquisição (1), combo no PDV (2), conteúdo de recompra/CRM (3),
   **campanha de reativação por WhatsApp/e-mail (4) = o "dinheiro fácil" que justifica o serviço no 1º mês.**
2. **"Vendas e o resto" + "primeiro começa, depois melhora":** Fase 1 do pequeno negócio = tudo puxa venda.
   → Reforça o gate de copy (peça que não converte volta) e libera a fábrica de travar na perfeição.
3. **Cliente é o HERÓI** (não a marca). → item no gate de copy: a peça fala "VOCÊ" ou fala "nós"?
4. **Hook = curiosidade + "você" + tensão:** "Você faz isso e nem percebe", "Ninguém te ensinou isso", "Você
   está sendo enganado". Tom dono-pra-dono, sem jargão; assinatura recorrente ("Fui!"). → **banco de fórmulas de
   hook** (capa = 80%). 🎓 *candidato a promover pro `knowledge-base/copywriting/`.*
5. **Ponte conteúdo→oferta:** cada peça = **mini-aula (ensina 1 alavanca real) + porta (CTA pro serviço que
   executa aquilo)**. Nunca "post bonito sem destino". 
6. **CTA de baixa fricção:** "comenta [PALAVRA] que eu te mando o [orçamento/material]" → alcance + lista de leads
   quentes sem depender de link. → CTA orgânico padrão pros clientes.
7. **Ancoragem de valor (2 jeitos):** (a) **empilhamento** ("entrego N peças/mês + aprendizado que fica na sua
   marca") e **preço como sinal** (Veblen — barato demais destrói percepção; não competir por ser o mais barato);
   (b) **custo do humano equivalente** ("agência inteira = R$X mil/mês; com a fábrica, fração disso"). 🎓 *candidato a `marketing/`.*
8. **Urgência honesta:** deadline REAL + perda concreta ("fecha dia X, depois o preço sobe / o bônus acaba"), não "últimas vagas" genérico.
9. **Anti-guru / autoridade por PROVA:** números, antes/depois do próprio cliente — não promessa vazia.

### B) MARCA / AUDIÊNCIA / PRODUTO / MENTALIDADE
10. **"Interessante, não interesseira":** o feed não pode ser 100% oferta. Ensina/provoca > vende. → casa com "copy primeiro" (gancho serve o leitor). Definir um RATIO de conteúdo por cliente.
11. **Propósito gera valor** (Reserva 1P5P). → todo cliente precisa de um "porquê" articulável ANTES da arte (vai no brand-dna/learned-lessons).
12. **No máximo 3 valores** por marca → `brand-dna.json` enxuto, foco vence dispersão.
13. **Cadência fixa e NOMEADA** (ele: newsletter dia/hora fixo; terça=negócios, quinta=IA; live mensal). → **calendário fixo por cliente** (dia/tema recorrente) = vira hábito de consumo.
14. **Diálogo, não monólogo:** comentário/DM = matéria-prima de conteúdo; peça que PERGUNTA > peça que declara.
15. **Conteúdo grátis generoso = ímã + portfólio:** a vitrine entrega valor real de graça (é o melhor lead-magnet).
16. **Mentalidade "Cabeça de Dono":** antecipar o problema do cliente antes dele pedir; agir por convicção; **"durar, não correr"** (= o nosso MOAT por acúmulo). É o nosso próprio modo de execução.
17. **Modelo de produto = blueprint de SwaS:** "escola/serviço por e-mail + **comunidade** + **IA** + **garantia**"
    (assinatura recorrente; garantia 7 dias + garantia condicional). → desenhar a "**fábrica como assinatura**":
    entregável recorrente + comunidade + **garantia condicional** ("postou, aplicou e não vendeu mais? devolvo").
18. **Escada de valor (funil em camadas):** grátis (conteúdo) → produto de entrada (assinatura de posts) →
    serviço sob medida / alto ticket. → desenhar a NOSSA escada.
19. **"Venture Builder as a Service" (Rebels):** framework + execução em ciclos curtos, portfólio de marcas. →
    valida o "with a Service" do nosso SwaS e o modelo de carteira de clientes em ciclos.

### Candidatos a PROMOVER pra faculdade (passar pelo gate de curadoria, não dumpar)
- Banco de **fórmulas de hook** (#4) → `knowledge-base/copywriting/`.
- **Cliente é o herói** como item de gate (#3) → reforço no `copy-primeiro-o-gate.md`.
- **Ancoragem de valor** (empilhamento/Veblen/custo-equivalente) (#7) + **4 mecanismos de venda** (#1) → `knowledge-base/marketing/`.
- Demais = decisão/oferta (ficam aqui) até virarem oferta concreta.

## Fontes (Parte 2 — Rony)
Substack "Email do Rony"/bobpost (Aula de Vendas 4 mecanismos · "Você está sendo enganado"/Veblen · COPY 1) ·
x.com/@ronymeisler (CTA comenta-DONO/IA) · lp.manualdedonos.com.br + Hotmart (oferta/preço) · YouTube CabeçaDeDono
LIVE (3 fases) · g4educacao (interessante≠interesseira, 3 valores, diálogo) · neofeed/itforum/fashionnetwork
(Rebels Ventures) · fabriciolima.net (lições). *Vários hosts deram 403; conteúdo de snippets de busca.*

## Fontes (Parte 1)
Claude Code docs: headless (code.claude.com/docs/en/headless) · agent-teams · agent-sdk/agent-loop · auto-mode
(anthropic.com/engineering/claude-code-auto-mode). Loops: robertodiasduarte.com.br · theregister (Ralph) ·
aihero.dev · mfyz.com. Xquads repo: github.com/ohmyjahh/xquads-squads. Vibe coding: akitaonrails (37 dias) ·
OpenClaw Brasil. Distribuição: postiz.com · upload-post.com · Instagram Graph API (developers.facebook.com) ·
n8n. Modelos: platform.claude.com/docs/.../choosing-a-model · mindstudio.ai.
