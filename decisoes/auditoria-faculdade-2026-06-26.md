# Auditoria da Faculdade — 2026-06-26 (a primeira)

Primeira aplicação do **Teste de Entrada** (ver `ESCOPO-ESTUDO.md` › Cultura de Curadoria) a TODO o acervo da
`knowledge-base/`. Objetivo: tirar a gordura, fundir duplicata, mover o que não é ensino. Veredito do Claude —
o que está **executado** já foi feito; o que está **a confirmar** aguarda o aval do Marcos (não mexo na
curadoria antiga dele sem ok).

## Opinião honesta (resumo)
A faculdade **não está um caos, mas tem gordura e mistura** de três tipos de coisa: (a) ensino de verdade
(maioria — bom), (b) **negócio/decisão disfarçado de ensino** (modelos de agência, infra, o mapa de custo),
(c) **duplicata por amplitude** (3 docs de cor). O `sistema/` virou um saco de gato: mistura MÉTODO (legítimo)
com DECISÃO/INFRA (não é faculdade). Assumo que **eu contribui pra gordura nesta sessão** (mapa de custo +
exploração de motion na faculdade). Corrigido. O resto é curadoria antiga do Marcos → recomendo, não mexo.

## ✅ Executado nesta auditoria
- **Movido pra `decisoes/`:** `mapa-de-custo-video-api-vs-ia.md` (procurement) e `colaborador-de-motion-graphics.md`
  (roadmap de capacidade não-construída). Não passam no teste 1 (não mudam entrega hoje) nem 2 (não é princípio).

## Veredito por arquivo

### `knowledge-base/design/` — em geral SAUDÁVEL (ensino de craft, transferível)
| Arquivo | Veredito |
|---|---|
| arquetipos-de-layout-social · crop-de-detalhe-fonte-grande · cta-carrossel-sem-botao · diagramacao-e-composicao-variada · foto-de-produto-referencia-e-qualidade · foto-vs-texto-carrossel · identidade-visual-consistencia · specs-imagem-redes · tipografia-social-legibilidade-e-fontes · tratamento-de-foto-e-looks · variedade-no-mesmo-dna | **MANTER** — princípio de craft que muda a peça |
| **cores-cultura-e-categoria + psicologia-das-cores + teoria-das-cores-harmonia** | ⚠️ **FUNDIR em 1** (`cor.md`) — 3 docs de cor = amplitude/duplicata. Depth>breadth. _(a confirmar)_ |
| dna-agencia-trafego-pago | ⚠️ **REVER** — parece mais marketing/posicionamento que craft de peça. _(a confirmar)_ |
| edicao-video-highlight | ⚠️ **REVER/MOVER** — decidimos NÃO construir editor de vídeo; só fica se servir a uma entrega real. Senão → `decisoes/` (roadmap). _(a confirmar)_ |

### `knowledge-base/copywriting/` — SAUDÁVEL (frameworks de copy)
| copy-alta-performance-4-pilares · copy-fundamentada-e-fact-checking · estrutura-carrossel-venda · gatilhos-mentais · storytelling-social-media | **MANTER** — framework transferível que muda a copy |

### `knowledge-base/marketing/` — MISTURADO (tem negócio disfarçado de ensino)
| Arquivo | Veredito |
|---|---|
| metricas-relatorio-redes-sociais | **MANTER** se o especialista de relatório existir (melhora a entrega "relatório"). |
| naming-metodologia | **MANTER** — método de uma entrega real (naming/branding do Estúdio). |
| operacao-agencia-elite-4-pilares | ⚠️ **REVER** — operação de agência é doutrina de negócio, não craft de peça. _(a confirmar)_ |
| **modelo-agencia-entrega** · **modelo-servico-produtizado-assinatura** | ⚠️ **MOVER → raiz/decisoes** — é **modelo de negócio** (QUEM somos / como cobramos), não ensino de entrega. _(a confirmar)_ |

### `knowledge-base/sistema/` — saco de gato: separar MÉTODO de DECISÃO/INFRA
| Arquivo | Veredito |
|---|---|
| metodo-do-designer-cerebro-e-config · padroes-de-fluxo-criativo-automatico · doutrina-de-motor-decisao · doutrina-do-olho-referencia-como-regua · habitos-de-designer-apresentacao-e-estudo · workflow-estudar-mercado-antes-de-criar | **MANTER** — é MÉTODO de como o colaborador opera/entrega (ensino legítimo). |
| agent-skills-e-externas | **MANTER** (borderline) — método de uso de ferramenta. |
| fontes-de-dna-e-asset-pasta-vs-canva | ⚠️ **REVER** — é registro de DECISÃO (pasta vs Canva); ou vira método enxuto, ou vai pra `decisoes/`. _(a confirmar)_ |
| infra-de-producao-e-rede | ⚠️ **MOVER → decisoes/** — infra/rede não é ensino de entrega. _(a confirmar)_ |
| ~~mapa-de-custo-video-api-vs-ia~~ · ~~colaborador-de-motion-graphics~~ | ✅ **JÁ MOVIDOS** pra `decisoes/`. |

## Recomendação ao Marcos (greenlight pra eu executar a 2ª onda)
1. **Fundir os 3 docs de cor** em um `cor.md` afiado (mantendo o que muda a peça).
2. **Mover modelos de negócio** (`modelo-agencia-entrega`, `modelo-servico-produtizado-assinatura`) e
   **`infra-de-producao-e-rede`** pra fora da faculdade.
3. **Decidir** `edicao-video-highlight`, `dna-agencia-trafego-pago`, `operacao-agencia-elite-4-pilares`,
   `fontes-de-dna-e-asset-pasta-vs-canva` (manter como método enxuto OU mover).
4. **Cravar a auditoria semanal** (eu rodo o teste dos 4 e te trago o diff toda semana).
