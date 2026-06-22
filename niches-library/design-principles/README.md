# Design Principles — Base Mãe

Assinatura de design do Marcos: qualidade técnica e olhar de diagramação que valem para
**qualquer cliente, de qualquer nicho**. Mora dentro de `niches-library/` por conveniência,
mas é niche-agnóstica — fica um nível acima das regras de `niches-library/<nicho>/`.

## Hierarquia de leitura obrigatória antes de gerar HTML/CSS

1. **Base Mãe** (`design-principles/design-rules.md`, este arquivo) — diagramação, tipografia,
   balanço de cores, estilo visual. Define o *padrão de qualidade*, não a identidade do cliente.
2. **Regras de nicho** (`niches-library/<nicho>/visual-references/design-rules.md`) — padrões
   estéticos que funcionam para o setor do cliente.
3. **DNA do cliente** (`Projetos/<cliente>/brand-dna.json` + `references/`) — identidade visual
   específica (logo, paleta, tipografia, fotos) que "veste" o resultado final.

O design final tem a qualidade técnica da Base Mãe + os padrões do nicho, vestido com a
identidade do DNA do cliente. Nunca gerar com estilo genérico — se uma das três camadas não
tiver regra clara para o caso em mãos, perguntar ao Marcos antes de criar.
