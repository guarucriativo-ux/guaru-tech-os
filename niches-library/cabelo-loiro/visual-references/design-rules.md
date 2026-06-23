# Design Rules — Cabelo Loiro / Colorimetria

Camada 2 do Protocolo de Geração de Design (ver [CLAUDE.md](../../../CLAUDE.md)). Registro visual
**"Editorial de Autoridade"** — hipótese inicial do nicho, origem Freitas Hair (2026-06-22,
cliente de teste). Veste-se com o DNA de cada cliente; a disciplina abaixo é do nicho.

> Origem: bootstrap do nicho a partir do Freitas Hair. Ainda **não validado** em peça aprovada
> pelo Marcos nem em 2º cliente — tratar como ponto de partida, não regra firme. Promover/ajustar
> conforme `learning-log.md` do cliente confirmar o que funciona (ver Ciclo de Aprendizado do CLAUDE.md).

## Princípio do nicho
A cliente de loiro compra **confiança técnica**, não "um salão bonito". A peça precisa parecer
de quem domina colorimetria — editorial, cuidada, nunca panfleto de promoção. Proibido o visual
de "salão de bairro": colagem de fotos amarelas, selo de preço gritante, fonte de Word, brilho
falso. A foto (resultado de loiro / antes-e-depois) é protagonista; o texto prova o domínio.

## Layouts de post / carrossel
- **Foto é protagonista** — sempre que houver resultado real autorizado, ela domina a peça;
  texto entra em barra/caixa sólida sobre a foto, nunca disputando legibilidade com o cabelo.
- **Sem foto → diagramação + elemento gráfico forte** (estrela/sparkle, moldura tracejada, nota
  fixada), nunca slide só texto no vazio (regra do `client-context.md`, alinhada à Base Mãe).
- **Antes/depois:** o "antes" nunca é vexatório/feio de propósito — é honesto e respeitoso com a
  cliente. O "depois" é o herói. Mesma luz/enquadramento nos dois lados (regra de fotografia da
  Base Mãe: padrão visual definido pela 1ª foto, variações só de cenário/luz controladas).
- **Carrossel educativo** (ex.: "por que o loiro amarela"): variar o layout a cada slide (Base
  Mãe — nunca repetir enquadramento); slide final é o único com CTA de agendamento/avaliação.

## Identidade visual
- Tipografia: **uma jogada por peça** — serifa editorial alto-contraste para display + script
  caligráfico só na palavra-âncora + sans para rótulos. Mix com disciplina, nunca bagunça de
  fontes (Base Mãe: uma jogada tipográfica por peça).
- Paleta restrita do cliente. O **champagne/loiro é acento opcional** (nod ao nicho), nunca
  preenchimento de área — o protagonista cromático é a assinatura do cliente, não o "dourado".
- Champagne sobre creme tende a sumir — usar o acento loiro com contraste suficiente (sobre
  preto/escuro funciona; sobre fundo claro, só em detalhe com peso).

## Tom de voz (copy)
Autoridade acessível. Afirma domínio técnico em linguagem que a cliente entende; educa o "porquê"
(fundo de clareamento, porosidade, matização) sem arrogância. Nunca promessa milagrosa — sempre
técnica + cuidado com a saúde do fio. Ex.: "Loiro é técnica, não sorte." / "Amarelou? É fundo de
clareamento mal neutralizado, não falta de matização."

## Tokens de CSS
Sem sistema de referência consolidado ainda (1º cliente). Usar `Projetos/freitas-hair/brand-dna.json`
como fonte de cor/tipografia e o template da Base Mãe em `03-automation-bridge/templates-html/`.
Consolidar um `style.css` de nicho quando a 1ª peça for aprovada pelo Marcos.
