# Learning Log — psi.automatic

Feedback de design do Marcos por peça gerada — distinto de `learned-lessons.md` (negócio/processo).
Específico do ciclo de design: o que funcionou visualmente e o que ajustar na próxima rodada.

<!--
## [AAAA-MM-DD] <peça avaliada>
- **Peça:**
- **Feedback do Marcos:**
- **O que funcionou:**
- **O que ajustar na próxima rodada:**
-->

## [2026-06-24] 1º carrossel END-TO-END pela API (cérebro v2 → guardrail → foto → motor v2)
- **Peça:** `outputs/carrossel-ansiedade.jpg` — gerada 100% pela máquina (gerar-peca via API → checar-guardrails →
  foto do banco Openverse → compor.js). Tema "ansiedade" (a própria IA escolheu pelos dados).
- **✅ Funcionou:** o cérebro v2 produziu schema v2 com copy **forte** — hook concreto ("Acordou às 3h sem motivo
  nenhum?") + open loop ("e ele tem nome"), reframe ("não é frescura, é o corpo em modo de alarme"), SEM jargão,
  ético (sem diagnóstico/promessa), legenda com "Salva esse post". Guardrail passou. Motor compôs com a foto-lua.
- **🔴 Bug do motor (graduação) — CORRIGIDO:** no `aprofunda` (S4) a serifa e o corpo ficaram colados (faltava
  `margin-top` no corpo). Fix aplicado no compor.js (não só na peça). Lição: ao graduar, conferir TODOS os papéis no olho.
- **🔴 Achado-chave — falta LEDGER (anti-repetição):** (1) a IA escolheu "ansiedade" (balde líder) porque NÃO
  sabe o que já usamos; (2) a assinatura por hash colidiu — "ansiedade" e "foco" caíram ambas em "Noturno" (mesmo
  visual). Prioridade: **ledger de tema+assinatura** (registrar o que saiu e evitar repetir) + mais assinaturas.
- **🟡 Copy:** alguns corpos (aprofunda/pitch) saíram longos (5 linhas) — instruir o cérebro a apertar o corpo.
- **⏳ PENDENTE:** Marcos validou ("funcionou, a régua subiu") mas tem ALTERAÇÕES a passar (estava cansado) — COLETAR na próxima sessão antes de seguir.

## [2026-06-24] Modelo "foco" — tema por DADOS + diferente do anterior (anti-repetição entre peças)
- **Peça:** `outputs/carrossel-foco.jpg` (HTML `modelo-foco.html`, manual/local).
- **Tema por DADO (não palpite):** "por que é tão difícil focar" é pergunta real listada em `pautas-conteudo.md`
  (balde TDAH/foco, top-tier); converte por curiosidade(72%)+normalização(vergonha 25%+15%); formato
  mito×verdade ("não é preguiça") = salvável. CFP-safe (foco/atenção, sem diagnosticar). Claim fundamentado
  (troca de tarefa tem custo; não é força de vontade) mas SEM jargão.
- **ANTI-REPETIÇÃO entre carrosséis (o foco da curadoria):** assinatura CENTRALIZADA/limpa/premium (o
  registro 5⭐ do S5), **oposta** do anterior (assimétrico). **Hook foto-led** (ink duotone, rastros de luz =
  mente dispersa) — totalmente diferente dos hooks anteriores (headline em fundo liso). **Pitch em OFF-WHITE**
  (anteriores eram pretos) + CTA reformulado.
- **Curadoria aplicada:** kicker 24px (ponto-doce, não 30) · foto usada profissional (hero no S1 + textura
  baixa-opacidade no S4, não "texto no rodapé") · centralizado/equilibrado (qualidade do S5) · setas certas
  (S1 →, S6 ↓) · cor com hierarquia (uma governa) · bold+regular no corpo · guardrail passou.
- **Self-catch:** todos os slides centralizados — é a assinatura DESTA peça (e o que o Marcos premia), mas
  se ele quiser mais variação de eixo DENTRO da peça, é a próxima calibragem. Foto reusada em S1+S4 (tons/
  crops diferentes). Headline do S1 tem 3 linhas (longa, mas legível).
- **Curadoria (S2 copy):** o hook do S2 ("a cabeça pulou pra outra") saiu **vago** — não aplicou os princípios
  de copy (não para o scroll, sem curiosity gap). Corrigido: **"Releu a mesma frase 3 vezes?"** (recognição
  CONCRETA, meta) + **"tem um motivo — e ele te alivia"** (open loop). Lição: o hook da PROVA também segue
  `estrutura-carrossel-venda.md` + fórmulas de hook — concreto > vago, sempre abrir loop. Não relaxar a copy do miolo.
- **Pendente curadoria do Marcos.**

## [2026-06-24] Modelo "solidão" — 1º com FOTO do banco + curadoria toda aplicada
- **Peça:** `outputs/carrossel-solidao.jpg` (HTML `modelo-solidao.html`, manual/local, foto do banco livre).
- **Aplicou a curadoria anterior, ponto a ponto:** ✅ FOTO do banco online (Openverse CC0 "Rain Window",
  licença salva em assets/LICENSES.md) em duotone navy — prominente no S2 (tipo×imagem) + baixa opacidade
  no S4 (elemento de apoio que conversa) · ✅ setas certas (S1 "arrasta" →, S6 "comenta" ↓) · ✅ CTA variado
  (texto/layout diferentes, ↓) · ✅ fontes maiores (kicker 30px, rodapé 26px) · ✅ FONTE NOVA explorada
  (Fraunces no lugar do Cormorant — identidade não trava) · ✅ cor com hierarquia (uma governa por slide,
  60-30-10) · ✅ peso bold+regular no corpo · ✅ composição diferente por slide (esq-meio / foto-base / direita
  / topo+textura / centro / base-esq+selo) · ✅ sem gradiente de fundo · sem lista PowerPoint · guardrail passou.
- **Copy:** tema fresco; fundamentada (solidão = qualidade da conexão, não quantidade; solidão emocional)
  mas SEM jargão; ética (sem diagnóstico/promessa; "primeiro passo", não cura). Legenda com keyword cedo + 5 hashtags.
- **CURADORIA DO MARCOS:**
  - ⭐ **S5 = 5 ESTRELAS** (centralizado, equilibrado, cores, conteúdo — "lindo"). **É a régua.**
  - 🔴 **S1 parecido com o carrossel ANTERIOR** → repetição entre peças "invalida o negócio"; + kicker/rodapé grandes.
  - 🔴 **S2** "designer sobrinho", diagramação fraca (texto no rodapé da foto = amador).
  - 🔴 **S3** texto empurrado pra cima (centralizar) + kicker grande.
  - 🔴 **S4** fora de centro + informação demais em cima.
  - 🔴 **S6** "mais do mesmo" — não mudou copy nem visual (o pitch é o que mais repito).
- **Lições (gravadas em faculdade/memória):** (1) hook E pitch têm que ser DIFERENTES entre carrosséis;
  (2) minhas assimetrias saem amadoras → equilibrar/centralizar como o S5 até dominar; (3) foto pede composição
  profissional; (4) fonte kicker/rodapé ≈ 22–26px (30 ficou grande). **Aprender e ir pro próximo.**

## [2026-06-24] Modelo NOVO "comparação" — artesanal, composição variada de verdade
- **Peça:** `outputs/carrossel-comparacao.jpg` (HTML autoral `modelo-comparacao.html`, manual/local, sem API).
- **Objetivo:** provar que aprendi a curadoria — NÃO re-skin; modelo novo com diagramação diferente slide a slide.
- **Composições (6 distintas):** S1 centralizado simétrico (off-white) · S2 assimétrico à direita + "?" gigante
  de contrapeso (navy) · S3 **split diptych** navy|creme + faixa-base (a comparação virou layout) · S4 **diagonal**
  serifa topo-esq + apoio baixo-dir (creme) · S5 centralizado-baixo arejado (navy) · S6 pitch base-esq + selo
  topo-dir, equilíbrio assimétrico (preto). Arco de fundo: off-white→navy→split→creme→navy→preto.
- **Regras aplicadas (curadoria anterior):** sem gradiente de FUNDO (só acento) · sem lista PowerPoint ·
  kicker centralizado (âncora) · selo só onde casa (S6) · composições equilibradas (contrapeso, não tudo à
  esquerda) · copy SEM jargão (sem CID-11) · fundamentada (comparação ascendente → bem-estar, sem citar) ·
  guardrail passou · legenda com keyword cedo (SEO) + 5 hashtags.
- **Micro-refino que peguei no olho:** a faixa-base do S3 quebra "resumo editado / dos outros" de forma meio
  torta — encurtar a frase ou ajustar largura pra fluir em 2 linhas limpas.
- **CURADORIA DO MARCOS (evoluí, mas ainda há erros):**
  - ✅ S1 aprovado (bons costumes); ✅ peso visual do "?" (S2) validado; ✅ kicker bold+regular ficou lindo (aplicar no corpo tb).
  - 🔴 **Setas invertidas:** "arrasta" tem que ser **→** (horizontal); CTA "comenta" tem que ser **↓** (comentário embaixo);
    último slide **nunca →**. `cta-carrossel-sem-botao.md`.
  - 🔴 **Diagramação recorrente demais** — fechei os olhos pras infinitas possibilidades; **identidade não trava
    numa fonte/layout** — explorar outras fontes que conversem + mais composições. `tipografia-social-legibilidade-e-fontes.md`, `diagramacao-e-composicao-variada.md`.
  - 🔴 **S3 REPROVADO** — 3 cores (navy+creme+preto) não casaram, vazio. Teoria das cores: uma governa (60-30-10). `teoria-das-cores-harmonia.md`.
  - 🟡 **S4** bonito mas: centralizar o texto principal + **elemento de apoio** (duotone/baixa opacidade) que converse.
  - 🔴 **S6 CTA "cravado"/repetido** — variar o fechamento (texto E layout), nunca sempre o mesmo.
  - 🔴 **Kicker/rodapé pequenos demais = ilegível** — mínimo ~28–32px. `tipografia-social-legibilidade-e-fontes.md`.
  - 🔴 **NÃO usei FOTO** — 2 carrosséis tipográficos seguidos furam o default "tem foto"; usar banco online (converte). `foto-vs-texto-carrossel.md`.
- **Próximo modelo:** com FOTO do banco online (ligada ao tema, duotone/overlay), setas certas, CTA variado,
  fontes maiores, explorar nova fonte/diagramação, cores com hierarquia (uma governa).

## [2026-06-24] Carrossel "esgotamento" — 1ª peça do método completo (pesquisa+fact-check+variedade)
- **Peça:** `outputs/carrossel-esgotamento.jpg` (variant 1, manual/local, sem API).
- **O que apliquei:** tema FRESCO (não ansiedade/insônia) vindo de pesquisa; claim **fact-checkado**
  (OMS/CID-11 QD85, ≥3 fontes: ONU Brasil, OPAS, Medscape) **citado** no slide 3; 3 sinais batendo nas
  3 dimensões da CID-11; copy NOVA com hook palavra-herói (marca) + pattern-break (prova); guardrail passou.
- **O que funcionou:** bracket com arco de cor (preto→navy→creme→creme→navy→gradiente); citação
  humanizada + transparência (fonte nomeada); ético (sem diagnóstico/promessa).
- **Validação no olho (peguei eu mesmo):** variant 0 deu a PROVA inteira em navy (capa/conceito/sinais/
  acolh) = 4 telas iguais de cor → monótono. Troquei pra variant 1 (conceito+sinais em creme) p/ quebrar.
- **CURADORIA DO MARCOS (o que vale — corrige meu olho):**
  - 🔴 **Erro-mãe:** do slide 2 ao 5 mudei a COPY mas **não a DIAGRAMAÇÃO** — tudo texto à esquerda, mesmo
    cabeçalho → ctrl-c/ctrl-v. Seguir identidade ≠ fazer igual. **Variar a COMPOSIÇÃO** (ver
    `knowledge-base/design/diagramacao-e-composicao-variada.md`).
  - 🔴 **CID-11 (slide 3):** termo técnico é **irrelevante/frio** pro consumidor. "Fonte confiável" = rigor
    de pesquisa (não fake-news), **não** citar código no post. Sem jargão na copy do paciente.
  - ✅ **Slide 3 (diagramação):** gostou — referência de composição boa (não copiar idêntico).
  - 🔴 **Slide 4 (círculos numerados):** genérico, "cara de PowerPoint". Evitar lista em bolinhas.
  - 🔴 **Slide 5 (acolhimento):** desequilíbrio — peso todo à esquerda, vazio à direita. Centralizar/contrapeso.
  - 🔴 **Slide 6 (pitch full-gradient):** degradê como fundo grande **não funciona**; fundo = preto/off-white,
    gradiente só em DETALHE (regra gravada no `brand-dna.json` → `regra_de_fundo`).
  - 🟡 **Selo (slide 1):** ilegível/não casou ali — não forçar; usar onde encaixa.
  - 🟡 **Kicker + rodapé:** centralizados ficam melhores/mais consistentes — testar.
  - 📐 **Tipografia:** "Dormiu o fim de semana inteiro" pede 2 linhas pensadas.
- **Próxima rodada (motor):** matar `pitchFullGradient`; variar ALINHAMENTO/EQUILÍBRIO/FOCO entre slides
  (não só cor); repensar `sinaisCartela` (sai do PowerPoint); kicker/rodapé centralizados; selo opcional.

## [2026-06-24] Variedade só nos frames da marca ≠ variedade (o miolo-prova ficou templatado)
- **Peça:** lote de teste do `compor.js` (motor de arquétipos) — variants 0–4, com e sem foto.
- **Feedback do Marcos:** apliquei a regra de variedade só no slide 1 (hook) e 6 (pitch); o **miolo-prova**
  (capa/conceito/sinais/acolhimento) ficou praticamente igual entre as peças, só trocando de "skin".
  "Um molde de 6 vagas que só gira a moldura ainda é molde." O miolo **É a prova social** — cada entrega
  que o psicólogo vê no feed tem que ser ÚNICA, senão a prova morre.
- **O que funcionou:** o motor rotaciona arquétipos e os do nicho ficaram bonitos/legíveis (citação-ouro,
  cartela numerada, two-tone navy, serifa); esfera morta; selo ∞ + two-tone assinando.
- **O que ajustar na próxima rodada:** a **variedade tem que valer em TODO slide**, sobretudo a prova.
  O conteúdo de psicologia **nasce do ZERO via pesquisa** (tema + composição únicos), replicando **só o
  DNA** (paleta + tipografia do nicho) — não é uma sequência fixa de 4 papéis reskinada. Deck de prova
  pequeno demais (e sem foto, capa=acolh=serifa-navy ficaram parecidos): ampliar/diversificar de verdade.
  E: **só gerar a comando** — estourei um lote de teste sem autorização.

## [2026-06-24] Carrossel de venda — molde rígido × composição variada
- **Peça:** `02-content-generator/outputs/composicao-variada.html` (vs. o molde fixo em `montar.js`).
- **Feedback do Marcos:** a fábrica entregava TODAS as peças com o mesmo design — mesma foto, mesmo
  layout, só trocando o texto. "Isso não é prática de designer, parece copia e cola; designer
  desenvolve imagens ÚNICAS." Na fase artesanal as peças eram únicas; a automação num molde fixo
  regrediu isso (abaixo da própria Base Mãe: "8 registros", "morte à grade rígida", "carrossel não
  repete a mesma foto" = o DEFEITO documentado).
- **O que funcionou:** voltar à composição autoral **variada por slide** — tipo+blob de marca (sem foto)
  / foto full-bleed em duotone / citação só-tipográfica / split diagonal / foto recortada / CTA marca.
  **Foto diferente por slide**, vinda de banco free (CC0), baixada e tratada em duotone. Matou o copia-e-cola.
- **O que ajustar na próxima rodada:** (1) **duotone com FORÇA** — tint fraca deixou a foto do mar (slide 4)
  cinza/lavada, sem a marca; (2) recorte **orgânico, não círculo** perfeito (slide 5 ficou quase círculo —
  Base Mãe Modelo 3 pede blob); (3) **resolução decente** — peguei thumb de 33KB pras mãos; (4) subir a
  régua de curadoria da foto (CC0 Flickr/StockSnap funciona, mas dá pra escolher melhor).
