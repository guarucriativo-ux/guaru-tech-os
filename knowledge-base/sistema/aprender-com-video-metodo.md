# Como a fábrica aprende com VÍDEO — método

<!-- Origem: Marcos (2026-06-26) — "como faço você aprender com um vídeo?". Método de ingestão de vídeo.
     Realiza o ⬜ "ingestão de videoaula" do ESCOPO-ESTUDO. Grounding: pesquisa 2026-06-26 (Whisper/yt-dlp/
     ffmpeg/OCR — pipeline padrão de video→texto pra LLM). Liga com ferramenta-vs-colaborador-e-o-que-acumula.md. -->

> **Princípio:** o Claude **não assiste vídeo** (não processa áudio+movimento). Mas vídeo **vira** o que ele
> processa: **TEXTO (a fala) + IMAGENS (frames) + TEXTO-NA-TELA (OCR)**. Converte → eu leio/enxergo → destilo.
> E, como sempre: **quem aprende é o REPO** (a regra destilada), não o modelo. O vídeo é só insumo.

## O pipeline (3 conversões)
1. **Áudio → transcrição (ASR):** a fala vira texto (com timestamps). Ferramenta: **Whisper / faster-whisper**.
2. **Vídeo → keyframes:** extrair frames (por cena ou a cada N s) com **ffmpeg** → as imagens eu **ENXERGO**
   (tool Read vê imagem) e descrevo. + **OCR (tesseract)** pega o texto escrito na tela (legendas, números).
3. **Síntese → destilação:** juntar transcrição + descrição dos frames + texto-na-tela num **markdown** → eu
   **leio e destilo** em regra/nota (faculdade se for método; `decisoes/` se for ideia/decisão) → **crítica do
   Marcos** (âncora) → vira aprendizado. É o mesmo loop de tudo.
> (Baixar o vídeo da plataforma: **yt-dlp** — YouTube/IG/TikTok. ⚠️ IG exige login/bloqueia; rede importa.)

## Dois níveis (escolher pelo caso — igual fizemos com foto/vídeo)
### Nível 0 — SEM infra, funciona HOJE (o caminho imediato)
**Marcos (ou qualquer app) fornece o conteúdo já convertido** → eu destilo:
- **Transcrição:** o app de transcrição do celular, a auto-legenda do YouTube/CapCut, ou Marcos resume em 2 linhas.
- **Visual:** 3–4 **prints** dos momentos-chave (eu enxergo imagem no chat).
→ Com isso eu entendo o vídeo e tiro o aprendizado **agora**, zero dependência. É o nosso "curadoria do Marcos = âncora".

### Nível 1 — pipeline automático (construir quando virar VOLUME)
`yt-dlp` (baixa) → `ffmpeg` (keyframes) + `faster-whisper` (fala) + `tesseract` (OCR) → markdown → eu destilo.
- **Realidade do ambiente (conferido 2026-06-26):** na NUVEM falta yt-dlp/whisper/tesseract e o ffmpeg é
  limitado (só VP8) → **o pipeline NÃO roda fácil aqui**. `python3`/`pip3` existem (dá pra instalar), mas há
  o custo de compute + o bloqueio de download do IG. **Roda bem no PC** (rede aberta + instalar as ferramentas)
  ou via **API de transcrição**. Construir só quando formos ingerir muitas videoaulas (aí compensa a infra).

## O que NÃO muda (não cair no mito)
Ter a transcrição/frames **não** é aprender — é só o INSUMO. O aprendizado é **destilar em regra + crítica do
Marcos** (ver `ferramenta-vs-colaborador-e-o-que-acumula.md`). Vídeo vira texto/imagem; o repo acumula a lição.

## Aplicado ao reel que o Marcos mandou (caminho imediato)
Me manda **a transcrição** (auto-legenda / app de transcrição do celular) **+ 3–4 prints** dos momentos-chave —
ou só me **descreve** o que ele criou. Eu entendo e **destilo o aprendizado pro nosso futuro** na hora.
