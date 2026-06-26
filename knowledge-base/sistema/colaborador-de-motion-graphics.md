# Colaborador de Motion Graphics (animação "parece vídeo") — estudo + plano

<!-- Origem: Marcos pediu "estude motion graphics e pense como a fábrica tem um colaborador que faça isso"
     (2026-06-26). Pesquisa de mercado + arquitetura. Doutrina de COMO um futuro especialista da fábrica OPERA.
     Liga com metodo-do-designer-cerebro-e-config.md, padroes-de-fluxo-criativo-automatico.md, infra-de-producao-e-rede.md. -->

## ⭐ REVISÃO (olhar amplo, Marcos 2026-06-26): NÃO construir renderizador — ALAVANCAR o que já existe
> Marcos: "kinetic type frame a frame qualquer app de edição faz; pesquise amplo, ache uma saída mais simples
> e de melhor resultado." Ele está certo. O 1º estudo (abaixo) foi pelo caminho de **construir um motor de
> vídeo** (Puppeteer+ffmpeg) — isso é reinventar o CapCut/Canva e dá só texto animado tier-editor. **Alavanca
> errada.** Reframe: a pergunta não é "como a fábrica RENDERIZA vídeo" e sim **"qual o caminho mais simples pra
> a fábrica TER vídeo bom"**. Resposta: **terceirizar a renderização** — duas estradas prontas, por tipo de vídeo:

### Estrada 1 — "VÍDEO-COMO-API" (o cavalo de batalha do feed) ⟶ a mais simples
Serviços que recebem **JSON + nossos assets e devolvem o MP4 renderizado na nuvem deles** (transições,
legendas animadas, locução TTS, trilha — tudo incluso): **JSON2Video** (feito pra "coding agents" = encaixe
perfeito no nosso agente), **Creatomate** (template + editor visual; o Marcos desenha o template, a fábrica só
troca os dados), **Shotstack** (JSON→vídeo, robusto). 
- **Por que é a saída certa:** zero infra nossa (nada de Puppeteer/ffmpeg/frames pra manter), e já vem com o
  que o editor manual faz (caption animada, áudio, transição). Nosso **conteudo.json + DNA continua sendo o
  cérebro** — só trocamos "renderiza HTML local" por "manda JSON pro serviço e recebe MP4". MESMO modelo do
  still, mais barato de manter.
- **Cobre o workhorse do nicho:** Reel "text-on-screen" / b-roll + legenda + áudio de trend (15–30s) — o
  formato que mais carrega feed de pequeno negócio e converte.

### Estrada 2 — "IA IMAGE-TO-VIDEO" (a camada UAU, cirúrgica) ⟶ o melhor RESULTADO
Pegar a **nossa arte/foto-herói que já é boa** e **animá-la** com IA (Kling, Google Veo, Pika, Runway — via
agregador pay-as-you-go tipo **fal.ai**/Higgsfield, uma API só pra vários modelos). Clip de 4–10s de movimento
cinematográfico real (a foto "ganha vida", b-roll gerado) — muito acima de texto deslizando.
- **Constrói SOBRE nossa força:** a fábrica já faz a still + tem foto-herói; a IA traz movimento. 
- **Custo por clip** → usar **cirurgicamente** (peça-UAU / abastecer o banco de b-roll), **não por post** —
  mesma doutrina da geração de imagem por IA ("IA alimenta o BANCO; o banco alimenta os posts").

### Veredito da revisão
**Não construir motor de vídeo.** Workhorse do feed = **vídeo-como-API** (1 conta + chave, mandar JSON).
Camada UAU = **IA image-to-video** cirúrgica sobre nossas stills. As duas são API (simples) e dão resultado
**acima** de qualquer kinetic-type caseiro. O "construir o próprio" (estudo abaixo / POC) vira **último
recurso** (só se um dia precisarmos de controle total e os serviços não servirem) — não é o caminho.
- **Avatar IA / talking-head** (HeyGen/Synthesia): existe, mas pesa e arranha autenticidade de pequeno
  negócio → **parqueado**. Faceless (b-roll + caption + áudio) é o registro certo do nicho.
- ⚠️ **Caveats a validar:** custo recorrente das APIs (bate no preço do SwaS — medir por cliente); enviar
  asset/dados do cliente pra serviço externo (privacidade/licença); na nuvem, liberar os hosts das APIs na
  allowlist (como foi com a Pexels) + guardar a chave. Decisão de produto/conta é do Marcos.

---
_O estudo abaixo (caminho de CONSTRUIR o renderizador) fica como registro/fallback — superado como
recomendação pela revisão acima._

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
