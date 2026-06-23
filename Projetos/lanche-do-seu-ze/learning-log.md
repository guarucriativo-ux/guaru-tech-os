# Learning Log

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

## [2026-06-22] 2 carrosséis (8 slides) — desejo + chapa/processo
- **Peças:** `03-automation-bridge/outputs/c1-s1..s4.png` (desejo/foodporn) e `c2-s1..s4.png`
  (chapa/nicho). Método autoral HTML+SVG→PNG; fotos livres Unsplash/Pexels em `assets/`. HTML em
  `creativos/`. Render via `../freitas-hair/03-automation-bridge/render-creative.js` (caminhos absolutos).
- **O que funcionou (autoavaliação):** DNA retrô fast-food fiel às refs (vermelho/creme/mostarda,
  Luckiest Guy + Pacifico + Anton, halftone, motion lines, selos, foodporn real). Provas de estilo
  validadas pelo Marcos antes da produção em massa. Variação de composição entre slides (foto
  full-bleed, foto+painel diagonal, CTA ilustrado, slide creme ilustrado).
- **Feedback do Marcos:** (pendente — primeira entrega completa)
- **Bugs corrigidos na rodada:** (1) motion-lines liam como ícone de menu → viraram whoosh; (2) tag
  "SÓ AQUI" sumiu no C2S1 → reposicionada e visível no C2S2; (3) doodle de molho parecia rosto →
  virou bisnaga; (4) `rect` sem `fill:none` no seletor de doodle ficava preto → corrigido p/ contorno.
- **O que ajustar na próxima rodada:** confirmar @/WhatsApp reais p/ a barra de delivery (hoje só
  apps genéricos, sem telefone). Avaliar foto de chapa lisa (flat-top) real p/ C2 — as atuais são
  grelha. Logo do Seu Zé ausente (brand-dna.logos vazio).
- **Promovido para Base Mãe/nicho?** Método já documentado. Registro retrô fast-food pode virar
  nicho `niches-library/hamburgueria/` se repetir num 2º cliente do setor.