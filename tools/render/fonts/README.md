# Biblioteca de fontes da fábrica (instaladas, como um designer)

As fontes que os motores usam ficam AQUI (`.ttf`/`.otf`), versionadas no Git — assim toda sessão (PC/nuvem)
tem as MESMAS fontes, sem depender do Google Fonts via rede (que flapa e cai em serifa errada).

O `render-creative.js` copia estas fontes pra `~/.fonts` + roda `fc-cache` em TODA renderização (idempotente),
então o Chromium acha as fontes do DNA pelo nome (font-family) localmente, offline.

**Como adicionar uma fonte nova:** baixe o `.ttf`/`.otf` aqui e commite. O nome do arquivo não importa (o
fontconfig lê o nome da família de dentro do arquivo). Hoje: Anton, Archivo, Fraunces (itálica), Inter.
