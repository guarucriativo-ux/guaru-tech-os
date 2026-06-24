# Doutrina de motor: como a fábrica DECIDE (não só o que ela faz)
<!-- Origem: leitura linha-a-linha das 7 Adobe Creative Skills + configs (catálogo instalado 2026-06-24).
     Não é craft de superfície (isso está em ../design/tratamento-de-foto-e-looks.md) — é a DOUTRINA DE
     DECISÃO que a Adobe (milhões em P&D) embutiu nas skills. É o que deixa a fábrica mais ASSERTIVA e
     PRODUTIVA. Complementa padroes-de-fluxo-criativo-automatico.md (que é o FLUXO); este é o JULGAMENTO. -->

A Adobe não codificou só passos — codificou **como um operador maduro julga**. Cinco doutrinas mudam a
chave da nossa fábrica. Cada uma vira regra de motor (consultar a cada criação).

## 1. Valor diagnóstico, não constante fixa (o que nos torna assertivos)
**Mantra repetido nas 7 skills:** "os valores são diagnósticos, não hardcoded — escolha dentro da faixa
conforme o conteúdo." Ex.: `contraste +15 se levemente chapada, +30 só se muito chapada`; `highlights −40
para estouro leve, −70 para severo`.
- **Erro a evitar:** fixar uma constante e aplicar igual a tudo (filtro burro).
- **Regra de motor:** todo parâmetro de geração (intensidade de cor, **tamanho de copy**, densidade de
  emoji, peso tipográfico, agressividade de grafismo) deve ser uma **faixa + uma regra de escolha que lê o
  input**. O cérebro diagnostica a peça e escolhe o ponto da faixa. Assertividade = calibrar por caso, não
  por default.
- **JÁ IMPLEMENTADO (1ª aplicação, 2026-06-24):** tipografia diagnóstica no molde-engine
  (`Projetos/psi-automatic/02-content-generator/montar.js`, função `fit()`): headline de tamanho fixo virou
  tamanho que REAGE ao comprimento da copy — peça dentro do orçamento fica idêntica à aprovada; copy longa
  encolhe até um piso em vez de vazar o slide (resolve a "armadilha-mãe" abaixo no produto). O cérebro
  (`gerar-peca.js`) ganhou **orçamento de caracteres por campo** — os dois lados da mesma armadilha.

## 2. Decisão ciente de conteúdo ("imagem sem céu não recebe preset de céu")
As skills **detectam o que está no quadro** e aplicam **só o relevante**. Variação por peça é CORRETA, não
defeito. Uma foto sem rosto não recebe tratamento de pele; uma sem sujeito vai pro corte central.
- **Regra de motor:** o molde reage ao que o conteúdo/asset REALMENTE tem. Sem rosto → não forçar layout
  de retrato. Copy que não é citação → não forçar card de citação. Foto fraca → cair pra tipográfico
  (ver ../design/foto-vs-texto-carrossel.md). **Molde reativo, não cego.** Isso evita peça "encaixada à força".

## 3. Bucketing semântico: selecionar por INTENÇÃO, não por nome de arquivo
As skills pegam uma lista desconhecida (presets do plano do usuário) e **classificam em baldes semânticos**
por heurística (`Warm`/`Golden`→mood; `Bokeh`/`Depth`→blur), em runtime — nunca fixam nomes. Depois
selecionam o balde pela intenção do usuário (o mood escolhido).
- **Regra de motor:** nosso **banco de imagem e nossos moldes** se selecionam por **tag semântica
  (mood/look/papel)**, não por nome. O briefing pede um mood → o motor puxa do balde certo. Turbina o
  anti-genérico (ledger + dedup) e deixa o banco crescer sem o motor quebrar. Descobrir o que existe em
  runtime, com fallback se o balde está vazio (não forçar encaixe ruim).

## 4. A unidade de qualidade é o CONJUNTO (o feed), não a peça isolada
"Coesão do conjunto vence otimizar qualquer foto isolada → mesmos parâmetros em todas." Quem pede coesão
quer **o todo lendo como intencional**, não cada peça perfeita.
- **Regra de motor:** otimizar o **feed do cliente** como unidade — identidade fixa, parâmetros coerentes
  no conjunto, variação só na composição. Medir sucesso no feed, não no post avulso. (É a consistência por
  construção de ../design/identidade-visual-consistencia.md, com a unidade certa.)

## 5. A vibe pesa mais que o knob numérico
Quick Cut crava: "o `user_prompt` (estilo/energia) faz mais trabalho que o `target_duration` — passe
verbatim, abreviar enfraquece." O descritor qualitativo de mood conduz o resultado mais que o número.
- **Regra de motor:** ao conduzir nosso próprio cérebro (gerar copy/design), investir no **descritor de
  vibe/energia** (rico, específico, não abreviado) — ele steer mais que parâmetros numéricos. O briefing de
  mood é alavanca de primeira ordem.

---

## Dois padrões de produtividade (gerar mais e quebrar menos)

### Gerar-N-e-escolher (variação barata + humano decide)
Quick Cut roda **3 variações com os mesmos parâmetros** — a IA escolhe momentos diferentes a cada vez — e
mostra as 3 lado a lado pro usuário escolher. **Regra:** gerar N variações de uma peça (mesmo briefing,
sementes/ângulos diferentes), apresentar em paralelo, Marcos/cliente escolhe o arranjo. Variedade grátis +
escolha sem refazer o fluxo. Liga com o gargalo-de-aprovação (humano escolhe, não cria).

### Validar o casamento ANTES de renderizar; molde que reflui (do data-merge)
1 molde × N dados = N peças (= nossa arquitetura, literal). Disciplina inquebrável:
- **Um layout limpo, não N** — destilar o molde à unidade antes de multiplicar.
- **Validar campo→dado antes de gerar:** o campo existe? o tipo bate? sobrou dado órfão? Mostrar o
  casamento, validar, só então renderizar. (= validar-antes-do-irreversível, padroes-de-fluxo §4.)
- **Armadilha-mãe — texto que estoura a caixa:** a mesma caixa recebe strings de tamanhos MUITO diferentes
  por peça; o molde TEM que **refluir ou truncar de propósito**, nunca cortar escondido. **Testar com copy
  real, não lorem.** É a causa nº1 de peça quebrada num motor de molde — projetar pra isso.

## Doutrina-âncora (validada pela própria Adobe)
As skills pro-grade da Adobe (retouch, batch, resize, social) são marcadas **`Gen AI: ❌`** — tratam a foto
como **craft não-generativo**; o generativo (Firefly) fica só na matéria-prima upstream. A única que gera
arte final de template é a "armadilha Canva-AI" que já marcamos. **A taxonomia da Adobe confirma nossa
regra de ouro:** craft no produto final, generativo só no insumo. Ver agent-skills-e-externas.md.
