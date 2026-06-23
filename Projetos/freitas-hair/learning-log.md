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

## [2026-06-22] post-semana-01.png (1ª peça pelo método autoral)
- **Peça:** `03-automation-bridge/outputs/post-semana-01.png` (1080×1350, render 2x)
- **Método:** composição autoral HTML+SVG→PNG (Puppeteer), foto Unsplash de licença livre
  (`assets/loiro-ref.jpg`) + DNA Presença Digital. Substitui a 1ª tentativa via IA do Canva
  (genérica, descartada). HTML: `creativos/post-semana-01.html`; render: `render-creative.js`.
- **O que funcionou (autoavaliação):** foto protagonista, zona creme orgânica (onda, não
  retângulo), palavra-âncora "amarela" em script Pinyon em escala extrema, barra preta cruzando
  a borda (sobreposição), estrela SVG 8 pontas com CTA, paleta restrita. Fontes Google ok.
- **Feedback do Marcos:** (pendente)
- **O que ajustar na próxima rodada:** corte do rosto está em meio-termo (faixa creme corta na
  linha dos olhos, 1 olho "espiando") — decidir entre revelar os dois olhos ou cortar limpo
  abaixo. Avaliar sangrar o script sobre a foto. Aguardar direção do Marcos antes de iterar.
- **Promovido para Base Mãe?** Não — método já documentado em `design-principles/metodo-criativo.md`;
  ajustes estéticos desta peça são específicos até validação.