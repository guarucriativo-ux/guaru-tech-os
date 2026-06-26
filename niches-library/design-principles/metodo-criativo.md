# Método Criativo — Composição Autoral (Base Mãe)

Camada 1 do Protocolo de Geração de Design (ver [CLAUDE.md](../../CLAUDE.md)). Define **como** a
peça é produzida — niche-agnóstico. Vale para qualquer cliente.

## Regra de ouro

A peça final é **composição autoral em HTML + SVG, renderizada a PNG via Puppeteer**. A IA
generativa do Canva (`generate-design`) **não** é compositora de peça final — ela produz layout
genérico que não segue Base Mãe nem o DNA do cliente, e já causou regressão de qualidade
(2026-06-22). Quando o Canva oscilar, **manter o método autoral**, nunca cair pro gerador de IA.

- **Canva = fonte de foto/asset e identidade** (brand kit, fotos), não o compositor.
- **Composição/tipografia/diagramação = autoral**, controlada no HTML+SVG, seguindo as 20
  referências de [`Referencias/`](../../Referencias/) e o catálogo dos 8 registros
  ([catalogo-referencias.md](catalogo-referencias.md)).

## Método de referência

Protótipo: [`sandbox/metodo-foto-real/index.html`](../../sandbox/metodo-foto-real/index.html).
Motor de produção: [`image-engine.js`](../../template-client-base/03-automation-bridge/image-engine.js)
em **modo `--job`** (token `{{ASSET_PATH}}` = a foto; resolve template/paleta via `registros.json`).

Técnicas do método:
- **Foto real recortada** em forma orgânica via `clip-path` (não retângulo, não círculo).
- **Manchas / stickers / frames em SVG** posicionados com `z-index` — elementos com função
  (recipiente de texto, âncora visual), nunca decoração solta.
- **Hierarquia tipográfica** com palavra-âncora isolada em **escala extrema**; resto secundário.
- **Paleta restrita** do `brand-dna.json`; uma única jogada tipográfica por peça.
- Render: `#post` → `page.screenshot()` em 1080×1080 ou 1080×1350.

## Estudar o mercado ANTES (workflow do designer humano — Marcos 2026-06-26)

Quando NÃO há referência curada pelo Marcos pra aquele nicho, o designer **pesquisa o mercado validado antes
de criar** (não inventa no escuro): Behance + Pinterest (`nicho + social media`) + como o nicho se comporta
no Instagram → **destila os conceitos visuais e de copy** → salva em `niches-library/<nicho>/visual-references/
estudo-de-referencias.md` → só então cria, com DNA do cliente **dentro do nicho** (cores/tipografia que batem
com o mercado; saúde não é preto). Processo completo + atrito (proxy 403) em
`knowledge-base/design/workflow-estudar-mercado-antes-de-criar.md`. Casa com a régua do Estúdio (curar o
critério) e com "designer sem boas referências não é ninguém".

## Fluxo padrão (do briefing à peça)

1. **Contexto + referência** — o cliente/Marcos manda a referência como **imagem real**
   (não print colado: resolução cheia, sem moldura de navegador) + o contexto do projeto.
2. **Leitura ANTES de criar** — ler as 3 camadas (Base Mãe → nicho → DNA do cliente) **e** olhar
   as referências internas (`Referencias/` + a referência específica enviada). Identificar qual
   dos 8 registros se aplica ao cliente/humor da peça.
3. **Foto primeiro** — definir a foto protagonista (Canva/banco/cliente). Para o motor usar, a
   foto precisa estar **em disco** na pasta do cliente (o chat vê imagens mas não grava binário;
   download via shell ou cópia manual resolve).
4. **Compor** em HTML+SVG (técnicas acima).
5. **Renderizar** a PNG via Puppeteer.
6. **Avaliar** — Marcos dá feedback → registrar no `learning-log.md` do cliente → calibra a
   próxima rodada. Promover à Base Mãe só o que se repetir em 2+ clientes.

## Referência é RÉGUA, não REGRA — o designer decide por peça (princípio central)

> Lição do Marcos (2026-06-26). **O designer tem que estudar isto** — muda como ele pensa.

Nada nas referências é regra a aplicar no automático. Duotone, foto recortada em `clip-path`, foto-herói
nítida em cor cheia, peça tipográfica — **são MÉTODOS / exemplos de referência (régua), não regras.** A régua
serve pro designer **medir** a decisão dele, não pra obedecer.

Antes de cada peça, o designer **avalia** (é assim que um designer de verdade pensa):
- "Com ESTA foto e ESTE texto, qual método deixa o visual mais bacana?"
- "Fica legal se eu fizer duotone neste modelo? Ou a foto nítida em cor combina melhor com o texto?"
- "E se eu usar outro método?" → **olha as referências, pesquisa** → "pô, com a foto recortada de tal jeito,
  ou com o tratamento tal, fica melhor." Decide pela régua + olho, não por regra fixa.

É a doutrina do [MANIFESTO](../../MANIFESTO.md) aplicada ao design: **estudar antes de agir.** O designer estuda
as referências e DECIDE caso a caso — não despeja um preset.

**Consequência 1 (criativa):** o tratamento da foto (duotone/grayscale, cor cheia, recorte orgânico, sem foto)
é **escolha por peça**, guiada pela régua. Não existe "o motor sempre faz X". O motor atual do psi *hoje* usa
duotone — mas isso é a configuração de uma vitrine, **uma escolha**, não uma regra do design.

**Consequência 2 (infra — por isso importa pro código):** como o designer decide caso a caso, **todas as
capacidades têm que estar sempre disponíveis** — ele não pode esbarrar em "a ferramenta só faz fundo tratado".
Por isso o `foto-auto` serve os dois níveis: foto de **fundo tratado** (Openverse, ~960px basta sob duotone) **e**
**foto-herói nítida ≥1080 em cor cheia** (Pexels/Unsplash). A ferramenta nunca limita a decisão do designer.

## O que NÃO fazer (erros já cometidos)

- ❌ Usar `generate-design` do Canva como peça final (genérico — regressão 2026-06-22).
- ❌ Carrossel/post 100% tipográfico (cor chapada + texto) por default — foto é sempre bem-vinda;
  ausência de foto é fallback com grafismo forte, não estilo padrão.
- ❌ Criar sem antes ver as referências internas e as 3 camadas.
