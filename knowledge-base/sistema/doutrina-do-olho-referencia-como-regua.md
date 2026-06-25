# A fábrica ganhou OLHOS — 3º órgão (visão no loop) + "referência é régua, não regra"

<!-- Origem: reunião de alinhamento Marcos × Claude, 2026-06-24. Saiu de uma auditoria visual dos prints
     da fábrica (Claude abriu os renders em outputs/ e comparou no olho). Esta é a linha de raciocínio da
     reunião, preservada. Liga com: padroes-de-fluxo-criativo-automatico.md, doutrina-de-motor-decisao.md,
     o protocolo de design 3-camadas do CLAUDE.md, e o Ciclo de Aprendizado. -->

## O insight central
Um designer humano **não cria do zero**: ele estuda mercado/público e, sobretudo, **desenvolve design
contra referências visuais, pixel a pixel** — mantém a referência aberta e bate o próprio trabalho contra
ela. A nossa fábrica não fazia isso: ela **compunha cega**.

## Os 3 órgãos de como a fábrica aprende design
1. **Estudo (faculdade)** — `kb-query.js` + `knowledge-base/`. O sistema lê antes de criar. É **texto**.
2. **Feedback (curadoria do Marcos)** — cada crítica do olho do Marcos vira regra. Já roda.
3. **🆕 Olho (visão no loop)** — o órgão que faltava: a fábrica **enxerga pixel** na hora de criar/revisar.

> As duas primeiras alavancas são geniais, mas **convertem visão em linguagem** (a referência vira texto/
> CSS — processo *lossy*, o pixel se perde). A terceira é onde **a visão continua visão**.

## O diagnóstico (a ferida)
- A fábrica tem **cérebro** (`gerar-peca.js` escreve copy) e **mãos** (`compor.js` monta CSS fixo) — mas
  **nenhum órgão enxergava pixel ao criar.** Toda decisão visual foi pré-cozida no CSS por mim, depois de
  olhar refs **uma vez**.
- As referências deixavam **o Claude** mais esperto ao codar o motor; **nunca chegavam ao motor.** No
  runtime, o motor compõe de regras congeladas.
- Ninguém olhava o resultado renderizado e comparava com a referência. Faltava o loop
  **render → comparar com a régua → ajustar**.

## "Referência é régua, não regra" (Marcos, 2026-06-24)
NÃO extrair regrinhas da referência ("use kicker 24px"). **Medir o output contra o NÍVEL dela** —
diagramação, peso, hierarquia, escala, respiro, relação tipo×imagem. A referência é o **sarrafo a
alcançar**, medido **visualmente**, não uma receita a cumprir. Regra é checklist; régua é altura.

## O mecanismo do Olho (passe de crítica visual)
Depois que o motor renderiza o PNG, um **Claude multimodal** olha o output **ao lado de 2–4 réguas
super-relevantes** e:
1. pontua contra o nível da régua (o que está **abaixo** do sarrafo, e em qual eixo);
2. aponta o ajuste concreto ("S3 e S5 no mesmo eixo — varia"; "foto só em 1 de 6 — a régua usa em 3");
3. devolve pra ajustar/regerar **antes** de chegar no humano.

Só o que passa no Olho chega no Marcos → a curadoria dele gasta energia nos **20% sutis**, não em pegar
erro óbvio. **Isso escala a curadoria** (automatiza a 1ª passada do olho do Marcos = solução do
single-approver: o olho dele vira a RÉGUA, não o operador). Teste ao vivo em 2026-06-24 funcionou: o Olho
pegou o frontier sutil "monotonia premium" (4 slides de prova no mesmo eixo, foto só no S1), o mesmo que o
olho do Marcos pega.

## O banco visual espelha as 3 camadas do protocolo de design
Igual ao protocolo do `CLAUDE.md` (Base Mãe → Nicho → Cliente), a régua é **em camadas**, e o Olho mede
contra a camada certa:

| Camada | Régua visual | Mede o quê |
|---|---|---|
| **Base Mãe** (design bom, agnóstico) | refs de agência/design geral | "é design de bom nível, ponto?" |
| **Nicho** (ex.: psicologia editorial @nicoleholz.psi) | o registro/mood do setor | "é o registro certo pro nicho?" |
| **Cliente** (psi.automatic) | `brand-dna.json` | "veste a identidade do cliente?" |

⚠️ Os frames LOUD da marca psi.automatic medem-se contra a régua **de agência** (Base Mãe); a PROVA calma
mede-se contra a régua **de psicologia** (Nicho). Medir a parte certa contra a régua certa.

## Quantidade de referência: diversidade de MOVIMENTOS, não contagem
Pra um designer humano, ref boa nunca é demais (o cérebro treinado filtra). Pra a fábrica é diferente:
- **No runtime, MENOS é mais:** o Olho compara contra **2–4 réguas** por passe. 100 no prompt = sinal
  diluído, custo alto, foco perdido.
- **No banco, MAIS só se CURADO e ETIQUETADO:** 100 imagens soltas = ruído (a máquina não filtra intuitivo
  como o Marcos); 100 com **ficha de anatomia** = biblioteca consultável (puxa as 3 certas por caso).
- **O valor é COBERTURA DE MOVIMENTOS, não nº:** 50 refs quase iguais ensinam 1 movimento; 15 cada uma com
  um movimento diferente ensinam um **vocabulário**.
- **Anti-clone:** encher de UMA conta vira clone dela e mata a nossa identidade. Curar **across 2–3 contas-
  ouro** pra absorver o PRINCÍPIO do nicho, não copiar uma designer.
- **Diretriz prática:** ~**15–30 refs-ouro por nicho** pra começar, 2–3 contas, cada uma um movimento novo;
  cresce só quando uma candidata **adiciona movimento** (não duplica). Cada uma com ficha de anatomia.

## Estado e próximos tijolos
- ✅ **Existe (estudo/texto):** régua da psicologia destilada em `niches-library/psicologia/visual-references/`
  (`referencias.md` + `design-rules.md`).
- ❌ **Falta (o novo workflow):** (1) as refs como **PIXEL** num banco com fichas; (2) o **Olho** em código
  (passe de crítica visual pós-render, antes da aprovação).
- **Próximo:** montar o banco visual da psicologia com fichas (Marcos enviando lotes variados em movimento)
  → protótipo do passe do Olho medindo a PROVA contra a régua certa → graduar pro motor.
