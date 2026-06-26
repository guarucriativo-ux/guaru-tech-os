# POC — Motor de Motion Graphics (Tier 1)

Prova de conceito do **colaborador de motion** da fábrica (ver
`knowledge-base/sistema/colaborador-de-motion-graphics.md`). Demonstra que a NOSSA arquitetura já faz vídeo:
**HTML/CSS animado → Puppeteer captura frame a frame → ffmpeg junta**. Mesmo "1 cérebro + config" do designer
still, só com eixo do tempo.

## Arquivos
- `poc.html` — peça animada (kinetic typography, marca da Lume). A animação é **determinística**: uma função
  `window.setTime(t)` posiciona/opacifica os elementos em função de `t` (segundos). Isso permite captura
  reproduzível por frame (mesma ideia do "seek" do Remotion), em vez de depender do relógio real.
- `capture.mjs` — abre o `poc.html` no Chromium, varre `t = 0…duração` em passos de `1/fps` e salva um PNG por
  frame em `frames/`. (frames/ e qualquer vídeo NÃO entram no Git — são binário regenerável.)

## Como rodar
```
# precisa de puppeteer (ex.: o de tools/render):
NODE_PATH=../../tools/render/node_modules node capture.mjs
# → gera frames/f0000.png …
```

## Encode (juntar frames em vídeo)
- **PC / ffmpeg completo (recomendado, MP4 Instagram-ready):**
  `ffmpeg -framerate 30 -i frames/f%04d.png -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart out.mp4`
- ⚠️ **Na nuvem o encode trava:** o ffmpeg do ambiente (`/opt/pw-browsers/ffmpeg-1011`) é um build enxuto de
  gravação de tela — **só VP8/WebM, sem decoder de PNG** — então não junta os PNGs. O `ffmpeg-static` (npm) **deu
  segfault** neste kernel. O `page.screencast()` do Puppeteer pede um `ffmpeg` no PATH com codec compatível e
  travou. **Conclusão:** a captura de frames roda 100% na nuvem; o ENCODE final precisa de um ffmpeg completo
  (trivial no PC, ou um binário compatível) — é limitação de ambiente/codec, não do pipeline.

## Próximos passos (quando for formalizar o Tier 1)
- Generalizar `poc.html` pra ler `conteudo.json` + DNA do cliente (como o `compor.js`): o "compor de motion".
- Biblioteca de presets de animação (entrada de texto, wipe de highlight, contador, transição entre slides).
- Resolver o encode (ffmpeg completo) e padronizar saída: Reel 1080×1920 / feed 1080×1350, H.264, leve, loop limpo.
