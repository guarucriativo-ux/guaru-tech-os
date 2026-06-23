# Engine de Conteúdo — Guaru Estúdio

Molde padrão para gerar um pacote semanal de conteúdo. Cada execução do motor lê o contexto em
`../client-context.md` (identidade visual, tom de voz, regras) e o **foco comercial da semana**
(uma oferta/dor específica), e produz 3 peças no formato abaixo.

## Inputs

- **Identidade visual** e **Tom de voz** — vêm de `client-context.md`, não se repetem aqui.
- **Foco da semana** — qual oferta/dor está sendo vendida (ex: "Identidade Visual para marcas
  de roupa que querem crescer com DTF"). Definido manualmente antes de cada execução.
- **Público da semana** — quem essa peça precisa convencer (ex: donos de marca de roupa,
  negócios B2B).

## Estrutura do pacote semanal

### 1. Criativo Visual
- **Conceito**: a ideia central da peça em uma frase.
- **Direcionamento de design**: paleta (amarelo-limão/verde neon + preto), tipografia bold
  minúscula, formas circulares orgânicas — como esses elementos aparecem nesta peça específica.
- **Composição**: o que ocupa o centro, o que fica de fundo.
- **Texto no criativo**: frase curta de impacto, se houver (não é a legenda).

### 2. Roteiro de Reels
- **Gancho (0-3s)**: frase/cena que para o scroll do público da semana.
- **Desenvolvimento**: 2-4 beats mostrando a dor → a virada.
- **CTA**: ação clara e direta, sempre amarrada à oferta da semana.

### 3. Copy/Legenda
- **Abertura**: primeira linha, precisa funcionar sozinha (corte do Instagram).
- **Corpo**: 2-4 linhas, tom direto e informal, foco em ação prática.
- **CTA**: chamada explícita.
- **Hashtags estratégicas**: mix de nicho (DTF/apparel ou branding B2B) + marca.

## Regras de geração

- Toda peça se amarra à tagline **"Seu negócio, bem visto."** — não precisa citar literalmente
  toda vez, mas a mensagem por trás (visibilidade = resultado) tem que estar presente.
- Tom sempre: direto, informal, ação prática, fala com quem está ocupado e quer resolver, não
  teorizar.
- Cada semana tem UM foco comercial só — não misturar ofertas no mesmo pacote.
- Saída de cada execução vai para `outputs/semana-NN.md`.
