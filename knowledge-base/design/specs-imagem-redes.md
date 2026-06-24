# Specs de imagem pra redes (tamanho, formato, qualidade) — o que a Meta gosta
<!-- Origem: pesquisa 2026-06-24 (Buffer, Hootsuite, SocialPilot, dev.to, pixelbatch, fileslim). Distilado.
     Gatilho: Marcos — renderizar no tamanho/qualidade certos (mais leve p/ nós e p/ o ecossistema). -->

## Tamanhos estabelecidos (Instagram)
- **Feed 4:5 (vertical) = 1080 × 1350 px** → MELHOR pro feed (ocupa mais tela no mobile). É o nosso padrão de carrossel.
- **Quadrado 1:1 = 1080 × 1080 px** (alternativa).
- **Stories / Reels 9:16 = 1080 × 1920 px**.
- Cada slide de carrossel = uma imagem 1080 × 1350.

## REGRA DE OURO: suba a 1080 de largura — não maior
A Meta EXIBE a no máx. **1080 px de largura**. Se subir maior (ex.: 2160), **ela mesma reduz** — e a
redução + recompressão dela tende a AMOLECER e pesar. → Renderizar **exatamente 1080×1350**, não oversize.
(Era o que a gente fazia errado: deviceScaleFactor 2 → 2160×2700, pesado à toa. Corrigido.)

## DPI / "72 dpi": mito pra tela
Pra web/tela, **DPI/PPI é irrelevante** — só conta o nº de PIXELS. "72 dpi" é só uma convenção/etiqueta
herdada do print; não muda nada na renderização do celular. Não gastar energia perseguindo DPI; o que
importa é a dimensão em pixels (1080×1350) e o sRGB.

## Formato: a Meta converte TUDO pra JPEG internamente
- **JPEG é o melhor pra entrega** (fotos e nossas peças híbridas texto+foto): começar com um JPEG bem
  otimizado faz a recompressão da Meta ter menos a estragar. **Qualidade 85–95%** (NÃO 100% — arquivo
  grande demais dispara uma 2ª compressão e PIORA), **perfil sRGB**.
- **PNG só** quando precisa de transparência OU peça de **texto/grafismo de linha nítida** onde cada
  pixel do texto importa (PNG mantém o texto mais crisp, mas é mais pesado e a Meta recomprime forte).
- Nossas peças = texto + foto duotone → **default JPEG ~90% sRGB**. (PNG fica de exceção p/ slide
  puro tipográfico/flat se um dia o texto pedir.)

## Tamanho de arquivo
- Ideal **500 KB – 2 MB** (ótimo < 1 MB). < 100 KB pixeliza; > 2 MB sofre compressão agressiva da Meta.
- sRGB obrigatório (Adobe RGB/ProPhoto → cores lavadas/torta na Meta).

## Como o NOSSO renderizador deve sair (aplicado em tools/render)
- **1080 × 1350, deviceScaleFactor 1** (= tamanho de tela exato; leve; e cabe no meu preview interno).
- **JPEG por extensão** (`saida.jpg`) com qualidade ~90, sRGB (padrão do Chrome). PNG continua disponível
  por extensão `.png` p/ casos de texto puro.
- **Otimização futura (só se o texto ficar mole):** renderizar 2× e REDUZIR pra 1080 por conta própria
  (supersampling Lanczos) antes de exportar JPEG — crisp máximo + tamanho certo. Hoje não precisa: peças
  são tipografia bold limpa, 1080 nativo já é pixel-perfect pro display da Meta.
