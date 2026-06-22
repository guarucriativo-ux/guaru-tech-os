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
