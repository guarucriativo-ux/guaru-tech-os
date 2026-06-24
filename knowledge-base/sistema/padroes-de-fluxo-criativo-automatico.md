# Padrões de fluxo de criação automática (como uma boa skill se comporta)
<!-- Origem: destilado das 7 Adobe Creative Skills (catálogo instalado 2026-06-24). Não é sobre as tools
     da Adobe — é sobre o PADRÃO DE PROCESSO que elas repetem. Insumo direto para como a NOSSA fábrica
     (molde-engine / gerar-peca / guaru-creative) deve se comportar. Liga com agent-skills-e-externas.md
     e com o loop de aprendizado (gera→policia→aprende→entrega). -->

As skills da Adobe convergem em sete padrões de processo. Eles valem para qualquer pipeline de criação
automática — são o "como um operador caprichoso trabalha", codificado. Adotar na fábrica:

## 1. Portão de preview antes do lote (inquebrável)
Antes de rodar um lote inteiro, processar **1 amostra** (a primeira peça/foto, em baixa resolução),
mostrar, e **só seguir com confirmação explícita**. Se o usuário ajustar, **refazer o preview** com os
novos parâmetros — nunca pular o portão. Barato comparado a reprocessar tudo errado.
→ Na fábrica: gerar 1 slide/peça de mostra antes de fechar o carrossel; o portão de guardrail já é parente disso.

## 2. Inferir antes de perguntar (minimizar fricção)
Varrer o contexto e **deduzir tudo que der** (look, formato, recorte) ANTES de abrir pergunta. Só
perguntar o que genuinamente ficou em aberto, e confirmar o que foi inferido. Três casos: tudo claro →
não pergunta, só confirma; parte claro → confirma + pergunta o resto; nada claro → pergunta o conjunto.
→ Mesma regra do nosso CLAUDE.md ("buscar na pasta do cliente primeiro; só perguntar o não-documentado").

## 3. Coesão > perfeição unitária
Num conjunto, **mesmos parâmetros para todas as peças** vence otimizar cada uma isolada. O todo lendo
como intencional é o que importa. (Detalhado em [../design/tratamento-de-foto-e-looks.md](../design/tratamento-de-foto-e-looks.md) §3.)
→ É a consistência-por-construção da marca, aplicada também ao tratamento.

## 4. Validar antes do irreversível; preservar o original
Antes de qualquer passo que altera dados/template de forma cara, **mostrar o que vai acontecer e pausar**
para aprovação (ex.: mostrar o mapeamento coluna→campo antes do merge). Guardar SEMPRE os originais
(`original*`); ajustes do usuário entram como **delta por cima do original**, nunca sobre um rascunho
intermediário — senão a coisa diverge sem volta.
→ Vale pro brand-DNA e pros moldes: editar a partir da fonte, não empilhar rascunhos.

## 5. Variação por parametrização (não por hardcode)
Mesma ferramenta + prompts/durações diferentes = saídas diferentes. Rodar o mesmo job 3× com a mesma vibe
gera 3 variações reais → apresentar em paralelo deixa escolher pelo arranjo, não refazer o fluxo. Não
fixar nomes/valores: **descobrir em runtime** (ex.: listar os presets disponíveis e classificar), com
fallback quando não há match (deixa vazio, não força encaixe ruim).
→ É o nosso anti-repetição (brand-DNA + ledger + dedup) dito como princípio de engenharia.

## 6. Degradar com elegância (nunca abortar o lote por um item)
Cada item é processado; falha de um é **sinalizada, não engolida em silêncio**. Se um passo falha, passa
adiante a saída do passo anterior e anota no resumo. Verbosidade enxuta: começo de etapa, falhas (uma vez),
resumo final com os links. Se cortar cobertura (top-N, amostragem), **dizer o que ficou de fora** — corte
silencioso parece "cobri tudo" sem ter coberto.

## 7. Walk-away com resumo (respeitar o tempo do humano)
Lote grande: avisar tempo estimado, liberar o usuário ("pode sair, eu aviso"), e fechar com um resumo
claro no fim (grade de preview + links + caminho do que foi aplicado). Nada de inundar o chat no meio.

---

## Caso especial — "data merge" = a prova do nosso modelo de fábrica
A skill de PDF-em-massa (1 template InDesign × N linhas de CSV = N peças personalizadas) é **exatamente a
arquitetura da nossa fábrica**: 1 molde × N (DNA de cliente / dados de conteúdo) = N peças. O que ela
ensina de disciplina, e que adotamos:
- **Mapear campos → dados explicitamente e validar** antes de gerar (campo existe? tipo bate? sobrou
  coluna órfã?). Mostrar o mapa, aprovar, só então rodar.
- **Um layout, não N:** se a fonte tem várias páginas/layouts, extrair o **template único** antes de
  multiplicar — senão a multiplicação quebra. (Nosso molde tem que ser a unidade limpa.)
- **Texto que estoura a caixa é a armadilha:** a mesma caixa recebe textos de tamanhos muito diferentes
  entre linhas; o molde precisa **refluir ou truncar de propósito**, nunca cortar escondido. Testar com
  dado real, não com lorem. → vale direto pros nossos moldes parametrizados por copy variável.

Confirma a tese "plataforma com verticais" e o par construtor×fábrica: a peça final é **molde + dados**,
reproduzível, não arte avulsa — não um criativo gerado avulso a cada vez.
