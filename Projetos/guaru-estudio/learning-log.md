# Learning Log — Guaru Estúdio

Feedback de design do Marcos por peça gerada (post, anúncio, etc.) — distinto de
`learned-lessons.md`, que cobre aprendizados de negócio/tráfego/conteúdo em geral. Este arquivo
é específico do ciclo de design: o que funcionou visualmente e o que ajustar na próxima rodada.

<!--
Formato de cada entrada:

## [AAAA-MM-DD] <peça avaliada>
- **Peça:** caminho do arquivo (ex: outputs/post-semana-02.png)
- **Feedback do Marcos:**
- **O que funcionou:**
- **O que ajustar na próxima rodada:**
-->

## [2026-06-26] carrossel "Seu negócio, bem visto" (1ª peça pós-instalação dos agentes)
- **Peça:** `outputs/bem-visto-1..6.jpg` (6 slides, 1080×1350, HTML em `outputs/carrossel-bem-visto.html`, copy em `...copy.json`)
- **Contexto:** 1º teste da LINHA COMPLETA depois de instalar os 160 agentes/107 skills. Carrossel de VENDA do
  Estúdio (rede quente/prova no feed). Rodou copy-primeiro (gate + `checar-guardrails.js` passou) → craft (3
  camadas + 5 marcadores) → render. Copy via PAS: dor (negócio bom parece amador) → agita (perde p/ concorrente
  que só parece melhor) → ponte ("você cuida do negócio, a gente de como ele aparece") → prova (design que vende,
  não vaidade) → pitch+CTA (assinatura DNA: Anton + Fraunces itálico "bem visto." + CTA keyword-to-DM, sem botão).
- **O que funcionou:** lime dominando (S2/S6 full-bleed), variedade real de composição (6 fundos/arquétipos
  distintos, sem template disfarçado), marca-texto limpo, assinatura grotesca+serifa-itálica no slide final.
- **Auto-crítica do gate pegou 2 reprovas na 1ª render (e corrigiu antes de entregar):** (1) S1 — caixa lime do
  "FEED" colidia com a linha de cima (entrelinha < 1.0 faz o bg do highlight invadir a linha vizinha → corrigido
  p/ line-height 1.1); (2) S5 — ghost "VENDE" + marca-texto atropelavam o título (ilegível) → separei em 2 blocos
  e removi o ghost. **Lição de craft reaproveitável:** *highlight/marca-texto inline exige line-height ≥ 1.0;
  ghost word nunca sobre o título principal.*
- **Pendente p/ feedback do Marcos:** validar se está no nível "designer sênior" ou se algum slide volta. Possível
  ajuste fino: S5 o sparkle fica meio escondido atrás da caixa lime (decorativo, não atrapalha leitura).
- **Promovido para Base Mãe?** A regra "highlight inline pede line-height ≥1.0 / ghost longe do texto-herói" é
  candidata — promover a `niches-library/design-principles/` se reaparecer noutro cliente.
- **Peça:** `03-automation-bridge/outputs/post-semana-03.png`
- **Feedback do Marcos:** grid quebrado (margem de 90px ausente), contraste quebrado (texto
  preto sobre fundo preto), caixa sólida ausente — pediu que as regras da Base Mãe fossem
  impostas pelo código, não só pelo briefing.
- **Verificação:** sampling de pixel no arquivo então em disco mostrou margem (`rgb(226,255,0)`)
  e texto branco (`rgb(255,255,255)`) já presentes — não foi possível reproduzir o defeito
  relatado no arquivo gerado nesta sessão. Hipótese: comparação com versão em cache/anterior.
- **O que ajustar na próxima rodada:** independente da causa, o pedido de fundo era legítimo —
  `image-engine.js` agora tem `assertContrast()` (falha se `palette.text_on_box` ==
  `palette.text_box_bg`, etc.) e `assertGridCompliance()` (mede `getBoundingClientRect()` real
  pós-render contra `GRID_MARGIN_PX` e falha a geração se a margem não bater). A margem deixou
  de ser um número repetido no CSS e passou a ser uma única constante no código.
- **Promovido para Base Mãe?** Sim, parcialmente — a prática de "validar geometria/contraste
  no código, não só no CSS" vale para qualquer cliente; registrar em
  `niches-library/design-principles/` se isso se repetir num segundo cliente.

## [2026-06-22] post-semana-03.png (crítica visual honesta + mix de referências)
- **Peça:** `03-automation-bridge/outputs/post-semana-03.png` (versão pós Base Mãe rígida —
  margem 90px + caixa 40% fixos)
- **Feedback do Marcos:** olhando só a imagem (não o código), achou amador/"quadrado"/sem vida
  comparado às 20 referências. Pediu 3 erros visuais gritantes + proposta estética.
- **3 erros identificados:** (1) sem hierarquia tipográfica — 3 linhas no mesmo peso/tamanho,
  sem palavra-âncora; (2) zero elemento gráfico — só cor chapada + texto, `brand-dna.json`
  define `shapes: ["circulares orgânicas"]` e isso nunca aparecia na peça; (3) caixa preta
  geométrica demais (90°, simétrica), sem o "respiro de luxo" da Base Mãe.
- **O que foi resolvido nesta rodada:** item 2 — adicionada mancha SVG orgânica/assimétrica
  (`#post-blob`) que rompe a borda superior da caixa, mesma cor da caixa (lê como extensão
  dela), validada por código (`assertGridCompliance` confere que encosta exatamente no topo da
  caixa, sem gap e sem sobrepor o texto).
- **O que ajustar na próxima rodada:** itens 1 (hierarquia tipográfica — isolar palavra/frase
  de impacto em escala maior) e 3 (cantos da caixa ainda são 90°/simétricos) continuam
  pendentes — não foram pedidos nesta rodada específica.
- **Promovido para Base Mãe?** Ainda não — validar se a mancha orgânica funciona bem em mais de
  uma peça/cliente antes de promover o padrão `#post-blob` para `niches-library/design-principles/`.

## [2026-06-22] post-semana-03.png (adesivo rotacionado + sangria + payoff cruzando fundo)
- **Peça:** `03-automation-bridge/outputs/post-semana-03.png` (versão "adesivo no mundo real" +
  sangramento de frame integrado)
- **Feedback do Marcos:** rejeitado — "ficou horrível". Abandonar a ideia por enquanto.
- **O que ajustar na próxima rodada:** não foi detalhado o motivo específico do rejeite (excesso
  de elementos competindo? fundo simulado não convenceu? combinação adesivo+payoff cruzando
  ficou confusa?). Perguntar/aguardar o próximo direcionamento antes de tentar uma variação
  desse conceito — não reaproveitar essa composição sem entender o que especificamente falhou.
- **Promovido para Base Mãe?** Não. Esse caminho (fundo fotográfico simulado por CSS/SVG +
  adesivo circular com sangria de frame) fica registrado como tentativa descartada, não como
  padrão a repetir.
