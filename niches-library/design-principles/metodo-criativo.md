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

## O que NÃO fazer (erros já cometidos)

- ❌ Usar `generate-design` do Canva como peça final (genérico — regressão 2026-06-22).
- ❌ Carrossel/post 100% tipográfico (cor chapada + texto) por default — foto é sempre bem-vinda;
  ausência de foto é fallback com grafismo forte, não estilo padrão.
- ❌ Criar sem antes ver as referências internas e as 3 camadas.
