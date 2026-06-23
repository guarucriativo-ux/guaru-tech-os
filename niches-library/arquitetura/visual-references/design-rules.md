# Design Rules — Arquitetura de Alto Padrão

Camada 2 do Protocolo de Geração de Design (ver [CLAUDE.md](../../../CLAUDE.md)). Registro
visual **"Minimalismo Escultural"**, validado no 1º cliente do nicho (Studio Meta-Espaço,
2026-06-22). Modelo de referência oficial para futuros clientes de arquitetura/design de
interiores de alto padrão. Veste-se com o DNA de cada cliente; a disciplina abaixo é do nicho.

> Origem: destilado do teste de expertise do Studio Meta-Espaço. Promover ajustes aqui só
> quando se repetirem num 2º cliente do nicho (ver Ciclo de Aprendizado do CLAUDE.md).

## Princípio do nicho
Cliente premium compra **autoria e curadoria**, não metro quadrado. A autoridade vem da
**contenção**, não do volume. Toda peça defende uma tese (curado > genérico) sem gritar.
Proibido o visual de "imobiliária": colagem de fotos, selo de preço, excesso, render fraco.

## Layouts de carrossel
- **Slide 1 (gancho):** vazio dominante, headline serifada em escala extrema (≥120px no canvas
  1080×1350), um único fio de cobre (1px), kicker em caixa alta tracking largo. Quase nada mais.
- **Slides 2–5 (valor técnico):** **variar o layout a cada slide** (regra de carrossel da Base
  Mãe — nunca repetir enquadramento). Repertório validado: (a) tensão de duas colunas (tese vs.
  antítese), (b) matriz/índice de 3 colunas com fio superior, (c) **slide escuro** (grafite) com
  aforismo — quebra de ritmo, sempre 1 por carrossel, (d) swatches de material reais + nota
  técnica.
- **Slide 6 (CTA):** cobre como acento, logotipo + tagline, ação única e clara. Para este nicho:
  CTA de **consultoria/conversa**, nunca de oferta/desconto ("Agendar Consultoria de Projeto").

## Identidade visual
- Espaço negativo é protagonista, não sobra — dimensionar o vazio como elemento ativo.
- Materiais com honestidade: cor sólida real (concreto, cobre, off-white), nunca textura falsa
  simulada por CSS. Cobre é **acento pontual**, jamais preenchimento de área.
- Tipografia: **uma jogada só** — serifa editorial de peso leve para display, sans minimalista
  (caixa alta, tracking largo) só para rótulos/índices. Nunca duas serifas, nunca display + script.

## Tom de voz (copy)
Intelectual, minimalista, aforístico. Frases curtas e afirmativas. Defende a tese sem adjetivos
de venda. Ex.: "Verdade é o acabamento mais caro." / "O luxo é o espaço que ninguém ocupa."

## Tokens de CSS aprovados
Ver `Projetos/studio-meta-espaco/outputs/style.css` (sistema de referência). Núcleo:
- Paleta-base do nicho (cliente ajusta o acento): off-white de fundo `#F2EEE7`, grafite de texto
  `#26241F`, cinza concreto `#908B83`, **acento cobre `#B5733F`** (este é o que mais varia por cliente).
- Canvas 1080×1350 (4:5), padding 96px, fio de cobre 1px como motivo recorrente, índice `NN / 06`.
- Display serif `line-height: 0.98`, `letter-spacing: -0.015em`; rótulos sans `letter-spacing: 0.4em` uppercase.
