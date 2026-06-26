# Mapa de custo — Vídeo pra fábrica: Vídeo-como-API vs. IA image-to-video

<!-- Origem: Marcos pediu (2026-06-26) um comparativo de custo das 2 estradas de vídeo antes de abrir conta paga.
     Pesquisa de preço jun/2026 — números DIRECIONAIS (planos mudam), servem pra decidir caminho, não contábil.
     USD; BRL ~ ×5,5 (FX varia). Liga com colaborador-de-motion-graphics.md (a estratégia). -->

Duas estradas, dois modelos de custo bem diferentes — e os dois cabem no SwaS se usados certo.

## Estrada 1 — VÍDEO-COMO-API (workhorse do feed) · custo ~FIXO mensal, amortizado entre clientes
Manda `conteudo.json` + assets, recebe MP4 (legenda/transição/áudio/TTS). Cobrança por **minuto/segundo renderizado**.

| Serviço | Modelo de preço | Entrada | Custo no volume | Free tier | Encaixe |
|---|---|---|---|---|---|
| **JSON2Video** | por **segundo** renderizado (1 crédito/s) | $49,95/mês | — | **600 créditos grátis** (~20 reels de 30s) | feito pra **coding agent** = encaixe direto no nosso |
| **Creatomate** | por **minuto** (resolução/fps) | $41/mês ($0,28/min) | até **$0,06/min** | sim (limitado) | **editor visual de template** → Marcos desenha o look |
| **Shotstack** | por **minuto** | PAYG $0,40/min · assinatura $0,20/min ($39/mês/200min) | $0,20/min | trial | robusto, dev-first; TTS +0,1 créd/100 chars |

**Tradução pro nosso caso (reel de ~20s):** ~**$0,02–0,15 por reel** (centavos). O custo real é o **piso da
assinatura (~$40–50/mês)** — e ele é **único pra fábrica inteira**, dividido por TODOS os clientes:
- Ex.: 10 clientes × 8 reels/mês × 20s = 80 reels = ~**27 min de render/mês** → cabe folgado num plano de $39–50.
- ➡️ Na prática: **~$40–50/mês fixos pra fábrica toda → centavos por reel.** É o sonho do SwaS (custo marginal ~0).

## Estrada 2 — IA IMAGE-TO-VIDEO (camada UAU) · custo VARIÁVEL por clip, usar cirúrgico
Anima nossa foto-herói/arte (clip 4–10s). Via **fal.ai** (1 chave, vários modelos, pay-as-you-go, sem assinatura).

| Modelo (via fal.ai) | Preço/segundo | Clip de 5s | Perfil |
|---|---|---|---|
| **Kling 3.0** | ~$0,029/s | ~**$0,15** | mais barato com boa qualidade — **default UAU** |
| **Wan 2.5** | $0,05/s | ~$0,25 | budget alternativo |
| **Kling 2.5 Turbo** | $0,07/s | ~$0,35 | bom custo-benefício |
| **Sora 2** | ~$0,10/s | ~$0,50 | qualidade alta |
| **Veo 3.1** | $0,20–0,40/s (c/ áudio) | ~$1–2 | **premium/cinematográfico** — só peça-herói |

**Tradução:** **~$0,15–0,50 por clip** (modelos budget) a ~$1–2 (Veo premium). Sem piso mensal — paga o que usa.
- Doutrina (igual à imagem por IA): **IA alimenta o BANCO, o banco alimenta os posts.** Gerar UAU/b-roll
  cirúrgico (peça-herói, reabastecer banco), **não em todo post** → custo amortizado por reuso.
- Ex.: 4 clips UAU/mês por cliente em Kling = ~$0,60/cliente/mês. Some pra fábrica conforme a base.

## Veredito do mapa
- **Estrada 1 é a base barata e recorrente** (custo ~fixo da fábrica, centavos/reel) → **o workhorse do feed**.
- **Estrada 2 é a faísca** (variável, cirúrgica) → **peça-UAU e banco de b-roll**, com modelo barato (Kling) de
  default e Veo só pro herói.
- **As duas juntas** = feed constante barato + UAU pontual de alto impacto. Nenhuma exige construir infra nossa.

## Caminho de PROTÓTIPO custo-ZERO (recomendado antes de assinar qualquer coisa)
1. **Vídeo-como-API:** começar no **free tier do JSON2Video (600 créditos)** — dá pra gerar ~20 reels de 30s
   de teste **sem pagar**, com o nosso `conteudo.json`. Valida qualidade + encaixe no agente antes de assinar.
   (Se o Marcos preferir desenhar o template no olho, testar o free da **Creatomate**.)
2. **IA image-to-video:** **fal.ai pay-as-you-go** — créditos mínimos (uns poucos dólares) pra animar 2–3 das
   nossas stills com **Kling** e ver o "UAU" na prática. Sem assinatura.
3. Eu trago os MP4s de teste → Marcos avalia qualidade → só então decide qual assinar.

## Caveats (validar)
- Preços **direcionais (jun/2026)** — conferir no site antes de assinar.
- **Dados saem pra serviço externo** (asset/copy do cliente) → checar privacidade/licença; ok pra peça de
  divulgação, atenção com material sensível.
- **Na nuvem:** liberar os hosts das APIs na allowlist (como a Pexels) + guardar a chave em env. No PC roda direto.
- **Qualidade varia por modelo/prompt** — image-to-video erra mão/rosto às vezes; por isso TESTAR antes e usar
  cirúrgico. O free/PAYG existe justamente pra medir sem compromisso.
