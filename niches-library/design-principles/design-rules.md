# Design Rules — Base Mãe (Marcos)

Regras de diagramação, tipografia, balanço de cores e estilo visual aprovadas pelo Marcos,
válidas para qualquer cliente/nicho. Esta é a camada 1 do Protocolo de Geração de Design (ver
[CLAUDE.md](../../CLAUDE.md)) — qualidade técnica antes de qualquer identidade de cliente.

> Validado visualmente contra as 19 referências em `/Referencias/` (2026-06-22) — grid
> claro, caixa de texto sólida sobre fundo vibrante, paleta restrita e tipografia bold de alto
> contraste se repetem em praticamente todas as peças. Nenhuma regra abaixo precisou mudar.

## Amendment [2026-06-22] — Correção: não existe "o" estilo Guaru, existem 8 registros

Estudo sistemático e completo das 20 referências (ver
[catalogo-referencias.md](catalogo-referencias.md)) mostrou que as peças não são variações de
um único estilo — são pelo menos 8 registros visuais distintos (MONA conceitual, Vidde
tech/lead-gen, Kameleon SaaS suave, Quadra esportivo, Academia/fitness, 3 sub-registros de
comida, pet shop, CT Escola), cada um com paleta e jogada tipográfica próprias. Generalizar
"agressivo/sangra estilo MONA" como regra universal foi um erro — antes de qualquer peça nova,
**identificar qual dos 8 registros do catálogo se aplica ao cliente/humor da peça**, e seguir
a disciplina daquele registro específico, não uma mistura genérica de todos.

O único traço realmente transversal aos 8 (o que vale pra qualquer registro): paleta restrita
(2-3 cores), uma única jogada tipográfica por peça (nunca duas misturadas), fotografia real e
bem executada ou ausência total de foto (nunca placeholder/ícone genérico), e grid rígido OU
quebrado de propósito — nunca "quase rígido por acidente".

## Amendment [2026-06-22] — Morte à Grade Rígida

O Marcos revisou a doutrina: medidas (margem, grid, alinhamento) são **sugestões, não leis**.
O dinamismo nasce da quebra de expectativa — superpõe e substitui os pontos marcados [SUPERSEDED]
abaixo. A régua de pixel deixou de ser o critério; o critério é o peso visual, como o olho
humano lê a peça.

- **Alinhamento**: proibido alinhamento centralizado ou uniforme à esquerda como padrão único.
  Usar tensão: título à esquerda, subtítulo à direita (ou qualquer desequilíbrio proposital).
- **Sobreposição é permitida e incentivada**: elementos devem tocar, cruzar e disputar espaço
  uns com os outros (texto sobre mancha, mancha sobre texto) — não ficar enquadrados e isolados.
- **Contraste de escala extremo**: a palavra/frase de payoff não é "um pouco maior" — é gritante,
  dominando o espaço (referências MONA/Visibe). Pelo menos 1.5x o tamanho usado antes de cada
  ajuste de escala.
- **Sangria ("bleed")**: elementos (uma mancha, uma letra do título) podem sair da borda do
  frame de propósito — dá a sensação de que o design é grande demais pra ser contido.
- **Cor pode ser usada de forma reversa** como experimento: fundo escuro + mancha de destaque,
  ou texto de payoff em branco cruzando zonas de cor diferentes — desde que a cor do texto
  funcione nas zonas por onde ele passa (não precisa de uma regra geométrica por trás, precisa
  funcionar visualmente).
- Validação por código (margem exata em px, payoff contido dentro de uma mancha) **não se aplica
  a este estilo** — a validação passa a ser visual/curatorial, não geométrica.

## Amendment [2026-06-23] — Foto vence text-only em carrossel (pesquisa)

Pesquisa de mercado (Hootsuite/dados 2025–2026, ver `knowledge-base/design/foto-vs-texto-carrossel.md`):
carrossel **com foto engaja mais** que o text-only — *"Instagram é visual; o texto realça a imagem,
não a substitui"* (guideline ~20% de texto por slide; mixed-media engaja ainda mais). Implicação
transversal (qualquer nicho):
- **Default da peça = TEM foto / elemento visual forte.** A peça puramente tipográfica é **formato
  válido EM ROTAÇÃO** (capa-conceito, frase de impacto), **não o padrão** do feed — feed só-texto
  enfraquece a marca e converte menos.
- Texto **realça** a imagem (overlay enxuto), não a substitui. Continua valendo "foto real bem
  executada OU ausência total de foto — nunca placeholder/ícone genérico": se não houver foto boa,
  melhor tipográfica limpa do que foto ruim/genérica.
- Em nicho de **serviço/autoridade (classe B)**, o **rosto do profissional** é ativo de conversão
  (confiança/conexão) — a regra de nicho diz quando e como (ver camada 2).

## Amendment [2026-06-24] — Proibido botão de app (UX/UI) na peça; CTA é tipográfico

Marcos pegou um "botão" (pill com borda, tipo target de app) num CTA → **inaceitável**. Peça de
social media **não usa linguagem de INTERFACE** (botão arredondado com borda/sombra, toggle, ícone
de app). Isso mete cara de template genérico e mata o peso de branding.
- **O CTA é o próprio comando VISUAL/tipográfico:** frase forte tratada como headline + pista
  direcional (seta → ↓ 👇, sublinhado, traço). Nunca um rótulo dentro de uma caixa-botão.
- **Último slide muda de cor/layout** pra sinalizar "acabou, aja" (não um botão).
- Em objetivo de venda, **keyword-to-DM** ("Comenta QUERO 👇") converte muito mais que "link na bio".
- Detalhe e racional na faculdade: `knowledge-base/design/cta-carrossel-sem-botao.md`.

## Amendment [2026-06-24] — Lições de craft (Marcos revisou peça a peça)

- **Margem de segurança (anti-corte mobile):** texto IMPORTANTE nunca colado na borda — o app/UI do
  celular pode cortar. Manter zona segura generosa em todos os lados; nada crítico nos ~100px de borda.
- **Emoji/ícone TEM que seguir o estilo da arte.** Emoji genérico de SO (👇 estilo "WhatsApp") fica
  "fora da caixinha", quebra o padrão visual. Se for usar seta/mão/ícone, ele é **desenhado no mesmo
  estilo da peça** (mesmo traço, mesma cor, mesma linguagem) — não um emoji solto colado por cima.
- **Troca de fonte pra compor/destacar é ótima — mas com critério.** Mudar de fonte pra destacar uma
  palavra/frase é prática forte e bem-vinda; porém nem todo caso pede. Às vezes **só um bold já
  resolve** e fica mais limpo. Se a troca não "casar" na peça específica, voltar pro bold. (Marcos:
  a jogada do "cansaço emocional" não casou → era caso de bold simples.)
- **"Cara de agência" no que é marca/venda:** headline grande, **bold, sans geométrica** (Montserrat/
  Avenir/Manrope) + acento + respiro. Hook "simples/soft" tem cara de amador. (Serif editorial fica
  pro conteúdo emocional; venda/branding pede sans bold confiante.) Ver `knowledge-base/copywriting/gatilhos-mentais.md`.
- **Peça-chave (capa/hook) quase sempre pede FOTO** com gatilho de **identificação** (a pessoa se vê).
  Capa importante sem foto tende a ficar fraca. Ver Amendment "Foto vence text-only".

## Amendment [2026-06-26] — Hábitos de designer: ESTUDAR antes, craft, entrega (Marcos revisou peça a peça)

> Feedback duro do Marcos no teste da joalheria (Lapidar). **Cada item é hábito inegociável** — é o
> MANIFESTO aplicado ("estudar antes de agir"). Acumulativo: não fazer o Marcos ensinar 2x. Detalhe e
> exemplos em `knowledge-base/sistema/habitos-de-designer-apresentacao-e-estudo.md` e
> `knowledge-base/design/foto-de-produto-referencia-e-qualidade.md`.

**1. ESTUDAR REFERÊNCIA ANTES de criar (a falha-raiz).** Não criar "no escuro". Antes de qualquer peça,
**pesquisar anúncios/feeds de marcas RENOMADAS do nicho** (profissionais, não amadores) — visual E copy.
A internet tem imagem boa e ruim; o designer escolhe a boa porque estudou o que é bom. **"Designer sem
boas referências não é ninguém."** Copy feita sem estudo NÃO converte — é a pior falha, não um detalhe.

**2. Foto de PRODUTO (regra dura — ver nota dedicada).**
- **O produto é o HERÓI. Texto NUNCA cobre o produto.** (Erro no S1: a copy apagou a aliança.)
- **Fundo não pode competir nem apagar o produto.** Fundo poluído, pessoas aleatórias (apareceu um bebê
  no S1!), qualquer coisa que rouba o olho do produto = reprovado. Produto à mostra, limpo, em foco.
- **Arquivo grande ≠ alta resolução.** 1600px de dimensão pode ser foto mole/upscalada. **Conferir a
  NITIDEZ REAL**, não só o tamanho em px. Crop de fonte mole = output borrado (foi o erro do S1/S6).
- Quando der certo é como o **S2**: crop com o **produto à mostra**, nítido, fundo que valoriza.

**3. Alinhamento com intenção.** Centralizou? **Centralize de verdade** (eixo coerente). "Quase centro"
parece amador, não estilizado. Estilizar desalinhado é válido — mas tem que LER como decisão proposital,
nunca como descuido. (S1–S5 saíram com alinhamento frouxo.)

**4. Ênfase tipográfica em PALAVRA/FRASE com sentido — nunca numa letra solta.** Bold só no "É" ficou
feio; o certo era bold em **"É certo."** (a unidade de sentido). Destaque carrega significado, não cai
numa letra avulsa.

**5. Grafismo só com função.** O traço/filete depois de "polimento" (S3) ficou solto/estranho. Filete,
traço, divisor — só quando ancoram algo; soltos viram ruído.

**6. ENTREGA/APRESENTAÇÃO é parte do trabalho.** **Nunca** entregar montagem/folha de contato em baixa
resolução. **Sempre slides individuais em qualidade cheia.** Apresentar mal o próprio trabalho = amadorismo:
imagem em baixa → o cliente lê "entrega baixa". Errar na apresentação destrói a percepção do que foi feito.

**7. Mercado: foco é CLASSE B (serviço/autoridade), não classe A (produto).** Joalheria é classe A
(depende de foto de produto, "não é o meu produto") — fica **parqueada** (ver `niches-library/
mercado-classe-b.md`). Escolher classe A sem necessidade foi erro de partida.

## Amendment [2026-06-26] — Doutrina do CROP: fonte GRANDE, output LEVE (o designer estuda)

> Lição do Marcos (2026-06-26). Vale pra **qualquer nicho**. Detalhe e exemplo trabalhado:
> `knowledge-base/design/crop-de-detalhe-fonte-grande.md`.

Separar **FONTE** de **OUTPUT** — são duas coisas, com tamanhos opostos:

- **OUTPUT (o que vai pro post) = padrão Instagram, LEVE.** A peça final é 1080×1350 (o tamanho que a
  Meta exibe — não fazer oversize), **JPEG q85–90** (100 piora na Meta). Arquivo de **dezenas a poucas
  centenas de KB**, nunca PNG de vários MB. É a regra de output otimizado do CLAUDE.md, agora cravada no
  design. O renderizador já entrega assim (`tools/render`, scale 1, q90).
- **FONTE (a foto-matéria) = GRANDE de propósito.** Existe uma prática de design real: **cortar um
  detalhe** da foto (um macro — a pedra, a textura, a marca da ferramenta) e pôr **diagramação de texto por
  cima**. Pro crop sair em ALTA, a foto-fonte precisa ser grande (**≥1600px**, foto-herói Pexels/Unsplash).
  De uma fonte pequena (~960px do Openverse) o mesmo recorte sai **borrado**.

Regra prática:
- **Planejou crop de detalhe? Baixe a foto-herói em alta** (`foto-auto --source=pexels`, ≥1600px). A fonte
  grande mora em `assets/`/`references/` (pode até ficar fora do Git se for pesada); o **output** é sempre o
  JPEG leve. A fonte é insumo, não entrega.
- **Crop de detalhe + 1 frase curta** é formato autoral forte — em nichos de macro (joalheria, comida,
  produto) é a maior prova de artesania/qualidade. O mesmo arquivo-fonte rende hero (cor cheia full-bleed)
  **e** um ou mais slides de detalhe (zoom em regiões diferentes) — multiplicador grátis de variedade.
- **Régua, não regra:** o designer decide por peça se faz o crop, qual detalhe, qual tratamento. A
  ferramenta serve os dois níveis (fundo tratado ~960px **e** foto-herói ≥1600px) pra nunca limitar a decisão.

> ⚠️ **Correção (Marcos 2026-06-26):** ≥1600px é condição NECESSÁRIA, não suficiente. **Tamanho em px ≠
> nitidez** — foto pode vir mole/upscalada e o crop sai borrado mesmo "grande" (erro no S1/S6 da Lapidar).
> E o crop só presta com **produto à mostra + fundo limpo** (como o S2), nunca com o produto tapado por
> texto ou um fundo poluído. Sempre conferir a nitidez REAL e escolher foto de produto profissional (ver
> itens 1, 2 do amendment "Hábitos de designer" acima).

## Diagramação
- Layout limpo, focado em legibilidade. ~~Alinhamento de texto rigoroso — nunca texto
  centralizado "solto" sem ancoragem.~~ [SUPERSEDED pelo Amendment acima]
- "Respiro" (espaço negativo) é elemento de luxo — mas tensão/sobreposição também é válida
  quando o objetivo é energia, não elegância contida.
- Blocos de texto podem ser ancorados em grids claros **ou** romper esses grids de propósito.

## Tipografia
- Headline é o elemento principal: fonte Bold, peso pesado, alto contraste — e agora também
  **escala extrema** (ver Amendment) e liberdade pra sangrar pra fora do frame.
- Corpo de texto é secundário: pequeno, mínimo, apenas legível — não precisa de leading amplo
  se o objetivo é contraste de escala, não conforto de leitura.
- "Pequeno, mínimo" não pode virar ilegível em tela de celular — qualquer texto que carregue
  significado (não só textura) precisa ser checado pensando em Instagram mobile, não em
  preview de desktop (ver item 5 do princípio transversal em
  [catalogo-referencias.md](catalogo-referencias.md)).
- Caixa de texto sólida deixa de ser obrigatória — texto pode ficar direto sobre a mancha/fundo
  se a cor escolhida funcionar ali.

## Balanço de cores
- Paleta restrita continua valendo — mas os PAPÉIS de cada cor (fundo vs. destaque vs. texto)
  podem ser invertidos como decisão de composição, não só por identidade fixa do cliente.
- Se o fundo for vibrante, o texto precisa continuar legível — mas a regra "monocromático
  preto/branco" deixou de ser rígida; o que importa é a cor funcionar nas zonas que cruza.

## Fotografia (sourcing de mais de uma foto pro mesmo conjunto)
- Quando uma peça/carrossel usa mais de uma foto real do mesmo produto, a primeira foto define
  o padrão visual do produto (formato, cor, recheio/conteúdo, tamanho) — toda foto adicional
  precisa respeitar esse padrão, variando só cenário/enquadramento/luz (ver item 6 do princípio
  transversal em [catalogo-referencias.md](catalogo-referencias.md)). Ao pedir a foto seguinte,
  reafirmar no prompt as características de produto da primeira, não só o atributo novo
  (cenário) que se quer adicionar.

## Estilo visual geral
- O anúncio precisa ter "peso" visual — pegada de branding, nunca parecer amador ou
  puramente comercial.
- Elementos decorativos sem função pura ainda devem ser evitados, **mas** sobreposição/tensão
  entre elementos funcionais (texto, mancha) conta como função: cria dinamismo, não é decoração.
