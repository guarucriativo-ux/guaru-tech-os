# Engine de Ads — Guaru Estúdio

Molde padrão para transformar o pacote de conteúdo da semana (gerado em
`../02-content-generator/outputs/semana-NN.md`) em um plano de campanha de Meta Ads. O motor
de ads não cria criativo do zero — ele lê o **Criativo Visual** e a **Copy/Legenda** já
aprovados da semana e estrutura a campanha em torno deles.

## Inputs

- **Pacote da semana** — `02-content-generator/outputs/semana-NN.md` (foco comercial, público,
  criativo visual, copy).
- **Identidade visual** e **Tom de voz** — vêm de `../client-context.md`, não se repetem aqui.
- **Fase da oferta** — primeira semana rodando essa oferta (sem dado de remarketing ainda) vs.
  semanas seguintes (já existe base para público quente).

## Estrutura do plano de campanha

### 1. Objetivo da campanha
- Objetivo no Gerenciador de Anúncios (ex: Engajamento/Mensagens, Conversão, Tráfego).
- Por que esse objetivo é o certo para a fase atual da oferta (validar interesse vs. já converter).

### 2. Estrutura de públicos
- **Público frio**: interesses/comportamentos relevantes ao nicho (ex: marcas de roupa,
  confecção, DTF, empreendedorismo de moda), localização e faixa etária se relevante.
- **Público quente (remarketing)**: quem interagiu com perfil/site/conteúdo da semana —
  visualização de vídeo, engajamento no post, visitantes de página. Sem histórico ainda na
  primeira semana de uma oferta nova: registrar isso explicitamente em vez de inventar dado.

### 3. Orçamento base diário
- Valor sugerido por conjunto de anúncios, com justificativa curta (fase de teste vs. escala).

### 4. Variações de copy de anúncio
- 2-3 variações de **título** (headline).
- 2-3 variações de **texto principal** (primary text), todas usando o mesmo criativo visual da
  semana como base, mas testando ângulos de dor/benefício diferentes.

## Regras de geração

- O criativo do anúncio é o mesmo Criativo Visual aprovado na semana — o motor de ads não pede
  um novo criativo, só empacota.
- Toda copy de anúncio mantém o tom direto/informal definido em `client-context.md` — anúncio
  não muda de personalidade em relação ao conteúdo orgânico.
- Sem dado histórico de público quente ainda: a primeira execução de uma oferta declara isso e
  sugere a fonte que vai alimentar o remarketing daqui pra frente (visualização de vídeo, etc.).
- Saída de cada execução vai para `outputs/ads-semana-NN.md`.
