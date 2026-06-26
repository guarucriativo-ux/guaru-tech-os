# Crop de detalhe: fonte GRANDE, output LEVE

Nota da faculdade (faculdade = `knowledge-base/`). Origem: lição do Marcos em 2026-06-26, durante o
teste do designer-generalista no nicho de joalheria (cliente fictício Lapidar). Promovida à Base Mãe
como amendment em `niches-library/design-principles/design-rules.md`.

## A lição em uma frase

A imagem do POST vai no padrão Instagram (leve) — mas a foto-FONTE é grande de propósito, porque a
prática de **cortar um detalhe e diagramar texto por cima** só sai em alta se a fonte for grande.

## Por que (a física do pixel)

Quando o motor faz um crop de detalhe, ele amplia uma REGIÃO da foto pra preencher o slide 1080×1350.
Quanto mais fechado o crop, menos pixels da fonte original cabem naquela região — então a fonte precisa
ter pixel sobrando.

- **Fonte ≥1600px (foto-herói Pexels/Unsplash):** um crop fechado ainda amostra ~600–900px reais da
  fonte → nítido no slide. ✅
- **Fonte ~960px (Openverse, fundo tratado):** o mesmo crop amostra ~350–450px → **borra**. ❌ (Serve pra
  fundo inteiro sob duotone, não pra macro de detalhe.)

É por isso que o `foto-auto` serve dois níveis (ver ESTADO-ATUAL / metodo-criativo): **planejou crop,
baixa a alta**.

## Fonte ≠ Output (não confundir)

| | FONTE (matéria-prima) | OUTPUT (o que posta) |
|---|---|---|
| Tamanho | grande, ≥1600px | 1080×1350 nativo (não oversize) |
| Formato | JPEG da Pexels (~300–500 KB) | JPEG q85–90, leve |
| Onde vive | `assets/`/`references/` (insumo) | `outputs/` → vai pro feed |
| Papel | aguentar o crop em alta | ser leve pra Meta não degradar |

O renderizador (`tools/render`) já entrega o output certo: `scale 1` (sem oversize) + JPEG q90. Nada a
mudar no output — a lição é sobre **garantir a fonte grande quando o plano inclui crop**.

## O formato "crop de detalhe + frase"

- Mesmo arquivo-fonte rende a **capa hero** (cor cheia, full-bleed) E **um/mais slides de detalhe** (zoom
  em regiões diferentes da MESMA foto). Multiplicador grátis de variedade a partir de uma foto só.
- O crop fechado + 1 frase curta por cima é forte em nichos de **macro**: joalheria (a pedra, o ouro
  escovado), comida (a textura, o recheio), produto (o acabamento). É prova visual de qualidade/artesania.
- Posição/zoom do crop são decisão do designer por peça (régua, não regra). No motor isso é
  `background-size` (zoom) + `background-position` (qual detalhe) — ver `compor.js` da Lapidar, tipo
  `"detalhe"`.

## Exemplo trabalhado (Lapidar, 2026-06-26)

- Foto-herói baixada da Pexels: **1600×2400** (~381 KB).
- Carrossel de 6 slides 1080×1350: slide 1 = hero cor cheia; slides 2 e 6 = **crop macro das alianças**
  (zoom 230%/200% em regiões diferentes) + texto; slides 3–5 = tipográficos.
- Output: carrossel inteiro **~670 KB** (slides de foto 150–204 KB, tipográficos 46–54 KB). Leve pro feed,
  detalhe nítido — fonte grande, output leve, na prática.
