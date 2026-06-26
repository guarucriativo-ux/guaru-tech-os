# Colaborador de Motion Graphics (animação "parece vídeo") — estudo + plano

<!-- Origem: Marcos pediu "estude motion graphics e pense como a fábrica tem um colaborador que faça isso"
     (2026-06-26). Pesquisa de mercado + arquitetura. Doutrina de COMO um futuro especialista da fábrica OPERA.
     Liga com metodo-do-designer-cerebro-e-config.md, padroes-de-fluxo-criativo-automatico.md, infra-de-producao-e-rede.md. -->

## Por que (o mercado já virou motion)
- **Reels/Stories são vídeo-first** e os posts que mais compartilham hoje "parecem motion design": texto
  animando pra entrar, título cinético, micro-transições. Animação aumenta retenção e compartilhamento de
  forma desproporcional (kinetic typography + micro-animações + transições suaves).
- **Micro-animação > superprodução:** ícone que pulsa, texto que entra em fade, número que conta, seta que
  desliza — dá vida sem encher. É o ganho de motion mais barato e mais reaproveitável.
- **Ficou barato:** o que era semana de After Effects virou minutos por geração programática. É a deixa pra
  a fábrica ter esse músculo sem contratar editor.

## A grande sacada: a NOSSA arquitetura JÁ é um motor de vídeo
O padrão de mercado de vídeo programático (**Remotion**) funciona assim: *"abre o Puppeteer, posiciona no
frame certo, captura e codifica com FFmpeg"*. **É EXATAMENTE o nosso stack de still** (HTML/CSS/SVG → Puppeteer
→ imagem), só que capturando N frames e juntando. Ou seja: **motion não é um paradigma novo pra fábrica — é o
designer still + eixo do tempo.** Mesmo "1 cérebro + config".
- ✅ **Já temos tudo no ambiente:** HTML/CSS/SVG (compor.js), Puppeteer (tools/render) e **ffmpeg v7** (em
  `/opt/pw-browsers/ffmpeg-1011/ffmpeg-linux`). Dá pra fazer hoje, sem dependência nova pesada.

## Como construir o colaborador (3 camadas, do barato ao parrudo — sem abstração prematura)

### Tier 1 — motor próprio: HTML/CSS/SVG animado → Puppeteer captura frames → ffmpeg → MP4 (COMEÇAR AQUI)
- Reescreve a peça com animação dirigida por um **relógio determinístico** (uma função `setTime(t)` que
  posiciona/opacifica os elementos em função de `t`), igual o "seek por frame" do Remotion — captura
  reproduzível, não depende de wall-clock.
- Loop: pra `t = 0…duração` em passos de `1/fps`, `page.evaluate(setTime, t)` → `screenshot` → ffmpeg junta.
- **Cobre 80% do que o nicho precisa:** kinetic typography, carrossel→reel, lower-thirds, contador, ícone
  que entra, transições. Zero dep nova (reusa render + ffmpeg). É o "designer de motion = compor.js + tempo".

### Tier 2 — Remotion (React) [adotar SÓ se o Tier 1 travar]
- Padrão da indústria pra vídeo programático; mais poder (timeline, áudio, composições, milhares de variações
  por dados). Custo: stack React + mais peso. Regra do CLAUDE.md: **nada de abstração prematura** — só migrar
  depois de 2+ peças reais provando que o Tier 1 não dá conta. Por baixo ele faz o MESMO (Puppeteer+ffmpeg).

### Lottie — biblioteca de MICRO-animação reaproveitável (complementa os dois)
- Lottie = animação vetorial em **JSON leve** (vem do After Effects OU de banco grátis tipo LottieFiles).
  Ícones/stickers que tocam no app, escaláveis, arquivo minúsculo. Vira **banco de motion-assets** do nicho
  (igual ao banco de imagem): o designer (still ou motion) solta um sticker animado numa peça. Curadoria do
  Marcos abastece, como nas refs estáticas.

## Especificações de saída (disciplina, igual ao still)
- **Reels/Stories:** 1080×1920 (9:16). **Vídeo de feed:** 1080×1350 (4:5). 24–30 fps. ~6–15s, **loop limpo**.
- **Primeiro frame forte** (é a capa/thumb — vale a regra de hook do still). Texto em zona segura (anti-corte).
- Codec **H.264 / MP4** (entrega Meta), bitrate equilibrado → arquivo leve (a regra "output otimizado" vale
  pra vídeo também: nada de MP4 gigante).
- **Som:** Reel sem áudio rende menos; mas trilha tem licença. Plano: ou trilha do banco licenciado, ou
  entregar mudo + indicar áudio de trend pro Marcos pôr no app na hora de postar (decidir com ele).

## O colaborador no modelo da fábrica (1 cérebro + config + loop de aprendizado)
- É um **especialista** (como o still designer, o futuro Olho, o gestor de tráfego): mesmo cérebro, **config
  por cliente** (DNA, estrutura, nicho) — **reaproveita o DNA e a estrutura do still designer**, só adiciona
  a camada de tempo/animação. Cliente novo = config, não código novo.
- **Loop de aprendizado:** feedback do Marcos por peça → `learning-log.md` do cliente → promove pra Base Mãe
  o que vira regra (ex.: "kinetic type entra por baixo, nunca pisca"). Mesma régua-não-regra do still.
- **Estudar antes (MANIFESTO):** antes de animar, estudar referência de motion do nicho (curadoria do Marcos)
  — animação genérica/cafona derruba a marca igual foto ruim. Princípios de craft do still valem (alinhamento,
  respiro, sem cara de template); + craft de motion (easing natural, nada de movimento robótico/exagerado).

## Riscos / pontos a validar
- **Custo de tempo de render:** N frames = N screenshots; vídeo de 10s a 30fps = 300 frames. Aceitável na
  nuvem pra peças curtas; medir. (Otimização: resolução nativa, sem oversize; paralelizar se preciso.)
- **Fontes/recursos** têm que carregar antes de capturar cada frame (já tratamos no render).
- **Áudio/trend e licença** (acima) — decisão de produto com o Marcos.
- **Onde entra na fila:** é um especialista novo; encaixar no backlog depois do designer still afinado e do
  gestor de tráfego (ver ESTADO-ATUAL / visao-ampla) — mas o Tier 1 é barato o suficiente pra um POC já.

## Recomendação
Começar pelo **Tier 1** (nosso motor: HTML/CSS animado + Puppeteer + ffmpeg) — zero dep nova, reusa tudo, e
é o mesmo cérebro do still com eixo do tempo. Lottie como banco de micro-animação curado. Remotion fica
parqueado pra quando o Tier 1 provar teto.

## ✅ POC FEITO (2026-06-26) — o pipeline FUNCIONA; só o encode trava na nuvem
POC em `sandbox/motion-poc/` (kinetic typography da Lume, 3s): `poc.html` com animação **determinística**
(`window.setTime(t)`) + `capture.mjs` capturou **90 frames @30fps @1080×1350** no Chromium do ambiente. ✅ A
captura (a parte que prova "a fábrica faz motion") roda 100% na nuvem.
- ⚠️ **Encode trava na nuvem (limitação de ambiente, não do pipeline):** o ffmpeg do ambiente é build enxuto
  (só VP8/WebM, **sem decoder de PNG**); `ffmpeg-static` (npm) **deu segfault** neste kernel; `page.screencast()`
  do Puppeteer travou (precisa de ffmpeg no PATH com codec compatível). ➡️ **Encode final precisa de ffmpeg
  completo** — trivial no PC (`-c:v libx264 … out.mp4`) ou com binário compatível. Detalhe no README do POC.
- **Próximo passo** (quando priorizar): generalizar o `poc.html` pra ler `conteudo.json`+DNA (o "compor de
  motion") + resolver o encode (ffmpeg completo).
