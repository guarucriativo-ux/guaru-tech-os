# Tratamento de foto: looks (color grading), retoque e enquadramento
<!-- Origem: destilado das Adobe Creative Skills (catálogo "Adobe for Creativity", instalado 2026-06-24:
     adobe-batch-edit-photos, adobe-retouch-portraits, adobe-create-social-variations, adobe-resize).
     Princípio aprendido em palavras nossas — não republicar texto proprietário. Ver filtro da regra de
     ouro em `knowledge-base/sistema/agent-skills-e-externas.md`: Adobe entra UPSTREAM (trata o ASSET do
     banco/cliente), NUNCA gera a peça final. Estes números são RECIPE de partida, calibrar no olho. -->

A Adobe codifica o que um fotógrafo/retocador faz à mão. Para nós isso é matéria-prima da faculdade:
padroniza o **tratamento da foto do banco e da foto do cliente** (rosto do psicólogo = conversão), e
informa nosso pipeline de duotone. A peça final continua sendo composição autoral nossa — isto trata o
INSUMO, não o produto.

## 1. Recipes de "look" (color grading) — ponto de partida, calibrar no olho
Um look é a combinação de **temperatura de cor + vibração/saturação + brilho/contraste**. Valores de
referência (a escala da ferramenta vai ~-100…+100; tempA/tempB/tempLum são eixos de temperatura):

| Look | Temp (A / B / Lum) | Vibrance / Saturation | Brilho / Contraste | Quando usar |
|---|---|---|---|---|
| **Auto (neutro)** | — | — | — | foto que já está boa; só equilibrar |
| **Warm & Golden** | 32 / 120 / 67 | vib +15 | — | aconchego, hora dourada, acolhimento |
| **Bright & Airy** | 20 / 60 / 62 | sat −10, vib +10 | brilho +15 | clean, lifestyle, leveza, "respira" |
| **Moody & Cinematic** | 20 / −50 / 45 | sat −20 | contraste +25 | dramático, sério, profundidade |
| **Cool & Fresh** | 18 / −123 / 45 | vib +10 | — | céu limpo, frescor, tons azuis |
| **Vibrant & Punchy** | — | vib +30, sat +15 | contraste +10 | vívido, social, para o scroll |
| **Muted & Film** | — | sat −35, vib −10 | contraste +10 | analógico, editorial, desbotado |

**Ajustes finos** (aplicar como _delta_ por cima do look, nunca somar duas vezes o mesmo eixo):
- Recuperar estouro de luz (céu/testa queimados) → `highlights −60`
- Levantar sombras fechadas → `darks +40` (positivo = clareia o escuro)
- Mais contraste → `+30` · mais cor → `vibrance +30` · dessaturar → `saturation −30`
- Exposição → `±0.5` (mais claro / mais escuro) · ajustar só os claros → `lights +20`

**Vibrance > Saturation para pele:** vibrance protege os tons de pele (não estoura rosto); saturation
mexe em tudo igual. Em retrato, preferir vibrance.

## 2. Ordem de operações do retoque (a sequência importa)
Cada passo prepara o próximo — fora de ordem, o resultado degrada:

1. **Alinhar (straighten)** — endireita o quadro primeiro; detecção de rosto e composição dependem de
   horizonte limpo.
2. **Auto-tom** — reequilíbrio global de exposição/cor; estabelece a base antes de qualquer ajuste manual.
3. **Ajuste de tom manual** — o look + finos da seção 1 (highlights −40…−70, sombras +30…+50,
   contraste +15…+30, vibrance +15…+30). Valores são **diagnóstico, não fixos**: escolher dentro da faixa
   olhando a foto.
4. **Detectar sujeito** (rosto, torso, pele, cabelo, roupa) — mapear o que está no quadro antes de aplicar.
5. **Presets adaptativos**, nesta ordem: realce de pessoa (só se houver pessoa) → mood/clima → look/estilo
   → desfoque de fundo.
6. **Desfoque de fundo** (se não veio do preset): _lens blur_ (consciente de profundidade, bokeh real,
   mantém o sujeito nítido) é o preferido; gaussiano pesado só se pedirem explicitamente. Nunca os dois juntos.
7. **Corte (crop)** — por último, já com a foto tratada (ver seção 4).

**Limite do "natural" (não exagerar):** dessaturação severa (−40), contraste agressivo (+30) e lote sem
preview = risco de **pele plástica**. A barra é foto que parece tratada, não filtrada. Vibrance + presets
de pele são seguros; o resto, com parcimônia.

## 3. Coesão de conjunto > perfeição de cada foto (o insight central)
Quem quer um feed/conjunto "coeso" se importa menos com cada foto perfeita e mais com **o todo parecer
intencional**. Por isso: **mesmos parâmetros aplicados a todas as fotos do conjunto.** A detecção é por
foto (cada uma tem o que tem no quadro), mas o _plano de look_ é o mesmo. Isto é exatamente o nosso
princípio de marca por construção (ver [identidade-visual-consistencia.md](identidade-visual-consistencia.md)):
identidade FIXA, conteúdo variado. Tratamento de foto é mais um eixo dessa consistência.

## 4. Enquadramento e corte (reframe) — craft de composição
- **Foco do corte por tipo de imagem:** pessoa/retrato → focar no **rosto**; meio-corpo (roupa/gesto
  importam) → torso; produto em fundo limpo → nomear o produto ("tote bag"); aéreo/flat-lay/sem sujeito
  claro → **corte central** (0.5, 0.5) é o seguro. **Regra de ouro: gente = rosto** (foco genérico
  escorrega para o corpo e perde a cara).
- **Modos de ajuste:** _reframe_ (padrão — o maior corte possível na proporção alvo, centrado, **zero
  distorção**) · _pad_ (letterbox, preenche com vazio — quando não pode cortar) · _extract_ (corte
  apertado no sujeito). **Nunca esticar** para encaixar proporção — distorce.
- **Expandir canvas vs. cortar:** quando a foto não tem proporção suficiente (ex.: paisagem virando
  story 9:16), **expandir o canvas** (IA preenchendo as bordas) preserva mais do que cortar fora. Expandir
  **sempre a partir do original**, nunca de uma expansão anterior (encadear degrada).
- **Reduzir é seguro, ampliar não cria detalhe:** downscale não perde nada relevante; upscale de fonte
  pequena **não inventa nitidez** — avisar antes, não fingir que melhora.

## Como isso entra na fábrica (disciplina da regra de ouro)
- O tratamento padroniza a **foto do banco** (duotone de marca consistente) e a **foto do cliente real**
  (rosto do psicólogo) → o asset tratado vai pro **banco compartilhado**, não vira a peça.
- A peça final por formato a gente **re-renderiza no molde** (1080×1350 etc.), não estica/recorta a peça
  pronta. Reframe/look se aplicam ao ASSET de foto, antes de entrar na composição.
- Liga com `banco-imagem-resiliencia-curadoria`, `imagem-autentica-vs-generica` e
  [foto-vs-texto-carrossel.md](foto-vs-texto-carrossel.md) (foto boa > tipográfica > foto genérica).
