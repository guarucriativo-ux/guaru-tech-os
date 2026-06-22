# Design Rules — Alimentação (salgados, fast-food, delivery)

Manual estético consolidado para o nicho de alimentação: regras de CSS, paddings, fontes e
estilos aprovados, com base num lote de 10 referências reais de mercado (cardápios, promo de
delivery, identidade de marca) analisadas em 2026-06-22. É a fonte que alimenta os templates
HTML do `03-automation-bridge` de qualquer cliente deste nicho — ver também
`niches-library/design-principles/catalogo-referencias.md` (Modelos 6a/6b/6c), que cobre o
mesmo nicho do lado da Base Mãe do Guaru Estúdio.

## Layouts de post

- **Cardápio/grade de preço**: foto de prato real (com guardanapo, talher, mesa) sangrando
  borda superior e/ou inferior; cards brancos arredondados flutuantes para o preço (sombra
  suave, leve `rotate`); letra-fantasma gigante (contorno, sem preenchimento) atrás do título
  como textura de profundidade — substitui precisar de uma segunda foto.
- **Hero de produto único**: produto centralizado, fundo liso ou com doodle, headline grande
  dividida em 2-3 blocos. Pode ter prop de cenário (cesto, prato, mesa) ou não, dependendo do
  quão "lifestyle" vs. "gráfico" a marca quer ser.
- **Promo/oferta de impacto**: gradiente quente (vermelho→laranja) ou cor sólida, preço em
  fonte cartoon/contorno grosso, seta ou rabisco apontando para o produto, copy de
  urgência/pergunta direta ("Festinha, reunião ou social?").
- **Grid de identidade (moodboard de 9 posts)**: mistura foto real + slide só-tipografia +
  slide texturizado — mas **sempre** com elemento de marca presente (mascote, paleta, padrão
  de doodle) mesmo no slide sem foto de produto.

## Identidade visual

- **Paleta quente dominante** (amarelo/laranja/marrom/vermelho) só funciona com **uma cor de
  contraste fora da paleta de comida** pra ancorar a marca — azul (Woofers, Grub), vermelho
  profundo (Supremu's). Sem essa cor de contraste a peça fica genérica/intercambiável entre
  concorrentes.
- **Textura tátil real** (papel manteiga, cesto de vime, prato de cerâmica, mesa de madeira)
  aparece mais nas peças "lifestyle" do que fundo de estúdio liso — reforça frescor e
  cotidiano. Ver princípio transversal #6 abaixo.
- **Doodles** (setas, rabiscos, estrelas, squiggles, sparkles) como elemento secundário
  recorrente — nunca competem com o headline, ficam nas bordas/cantos, reforçam personalidade
  sem precisar de mais texto.
- **Halftone** (textura de pontos) aparece em peças de "ataque"/promoção — dá energia de
  impresso/grunge, contrasta com o liso das peças mais clean/premium.
- **Letra-fantasma** (contorno gigante de uma letra/número atrás do título) é o recurso mais
  barato de profundidade visual sem precisar de uma segunda foto.
- **Mix de duas fontes** (bold redondo + script cursivo numa palavra-chave) aparece em quase
  todas as peças mais "divertidas" — ver tokens de fonte abaixo.
- **Logos de plataforma** (iFood/Rappi/Uber Eats) funcionam como selo de confiança/disponibi-
  lidade quando o cliente vende por delivery — usar em fileira fina, topo ou rodapé.

## Princípio transversal #6 (novo, promovido deste lote)

Em alimentação, **nunca trocar a foto por um slide 100% gráfico/sem comida** só para variar o
carrossel. A regra geral de carrossel (catalogo-referencias.md) permite "trocar de estratégia"
entre foto e tipografia pura — mas nesse nicho especificamente isso lê como "saiu o produto da
tela", o que é fraco pro objetivo (vender comida). Variar aqui significa: foto diferente,
crop/zoom diferente, OU cenário/prop diferente (prato, mesa, cesto) — a comida fica sempre
presente, em algum grau, em todo slide.

## Tokens de CSS aprovados

- **Headline bold redondo** (tom divertido/comida): `Baloo 2` ou `Fredoka`, peso 700–800.
  Substitui fontes condensadas tipo `Anton` quando o tom precisa ser "convidativo" em vez de
  "sério/agressivo" (Anton continua válido pro registro 6a — food delivery agressivo).
- **Acento script/cursivo**: `Caveat`, `Kalam` ou `Permanent Marker` — usar em UMA
  palavra/frase curta de destaque, nunca no headline inteiro. Pareado com o bold redondo, não
  sozinho.
- **Cartoon/contorno grosso** (peças de altíssimo impacto, promoção/preço): `Luckiest Guy` ou
  `Bungee` — simular contorno branco grosso com `-webkit-text-stroke` ou `text-shadow` em
  4 direções.
- **Paleta-base reaproveitável**: laranja `#FD7000` / `#FFA103`, amarelo `#FFE5B0` / `#FFD23F`,
  marrom `#843F08` / `#3D1F1F` — sempre somado a 1 cor de contraste escolhida por cliente
  (nunca usar só as quentes; é o que torna a peça genérica).
  **Cores específicas do registro 6c (café aconchegante) — ver `Projetos/guaru-estudio/03-automation-bridge/templates-html/registro-cafe-aconchegante.html`** continuam à parte, vêm do brand-dna de cada cliente.
- **Badge/pill de oferta**: `border-radius: 999px`, fundo sólido contrastante, leve
  `transform: rotate(-6deg)` pra parecer adesivo colado em vez de elemento do layout.

## Fontes (Google Fonts, testadas no Puppeteer/Chromium headless)

| Uso | Fonte | Peso |
|---|---|---|
| Headline bold redondo | `Baloo 2` | 700-800 |
| Headline bold redondo (alt) | `Fredoka` | 600-700 |
| Acento script/cursivo | `Caveat` ou `Kalam` | 600-700 |
| Cartoon/contorno grosso | `Luckiest Guy` | 400 (único peso) |
| Condensado impacto (registro 6a, já catalogado) | `Anton` | 400 |
