# _estudo-agentes/ — drop das 5 fontes de agentes (estudo + garimpo do kit-ouro)

> Ponto de drop pros agentes das coleções abertas (MIT) que mapeei em
> `decisoes/inventario-agentes-vs-fabrica.md`. **Temporária / de consulta.** Daqui eu cláudio leio os
> `.md` reais, confirmo o **kit-ouro** e clono SÓ o conjunto escolhido pra `.claude/agents/`, vestindo
> cada um no nosso **DNA + gates**. O resto fica de consulta (ou apaga depois).
>
> ⚠️ **DESCOMPACTAR, não jogar o .zip.** O `.gitignore` ignora `*.zip` (não sobe). Os agentes são `.md`
> leves → descompacta o CONTEÚDO de cada ZIP dentro da subpasta certa abaixo. Licença: tudo MIT no
> verificado (uso comercial livre) — mesmo assim a regra vale: aprender/destilar pro nosso jeito, não virar refém.

## Onde jogar cada ZIP (descompactado)
| Subpasta | ZIP que vai aqui | Prioridade | O ouro dele |
|---|---|---|---|
| `1-ai-marketing-claude/` | zubair-trabzada/ai-marketing-claude | 🥇 1 | audit + PDF pro cliente + proposta + calendário + copy/ads |
| `2-marketingskills/` | coreyhaines31/marketingskills | 🥇 1 | copywriting · marketing-psychology · offers · social · lead-magnets |
| `3-wshobson/` | wshobson/agents | 🥇 2 | social-publishing (distribuição) · meigen (arte IA) · relatório · orquestração |
| `4-rshah515/` | rshah515/claude-code-subagents | 🥇 2 | 30 agentes de mkt (copywriter, conversion, social-ads, automation) + ❓playwright (render) |
| `5-voltagent/` | VoltAgent/awesome-claude-code-subagents | ✅ 3 | ai-writing-auditor (anti-IA) · market-researcher · ui-designer |
| `6-talknerdytome/` | talknerdytome-labs/claude-agents | ✅ 3 | meta-ads-library (espionar anúncio real do nicho) |

> Dica: ao descompactar, o ZIP cria uma pasta tipo `marketingskills-main/` — pode jogar ela inteira
> dentro da subpasta, não precisa achatar. Eu acho os `.md` de qualquer jeito.

## Como subir (Marcos, no PC)
1. Descompactar cada ZIP na subpasta correspondente acima.
2. `git add _estudo-agentes && git commit -m "estudo: 6 fontes de agentes (garimpo do kit-ouro)" && git push`
3. Avisar no chat: **"subi os agentes"** → eu (nuvem) leio os arquivos reais e começo a curar.

## O que eu vou fazer ao receber
- **Confirmar o kit-ouro** lendo os `.md` de verdade (hoje o mapa veio dos READMEs/árvore; aqui valido persona/prompt/tools de cada um).
- **Clonar SÓ o conjunto escolhido** pra `.claude/agents/` do repo (versionado, viaja no Git).
- **Vestir cada um no nosso jeito:** injetar Base Mãe + brand-dna + plugar nos gates (copy-primeiro / craft-primeiro).
- **Ligar na linha:** render (`tools/render/render-creative.js`) + distribuição. Testar 1 peça do nosso nicho ponta a ponta.
- Anotar deps externas (meigen/social-publishing pedem MCP) pra trocar pelo padrão nosso.

## Não baixar agora (decidido com o Marcos)
- **Synkra aiox-core/aiox-squads** — 90% infra de dev; só minero 4 ideias soltas (hooks brendan-kane, STEPPS jonah-berger, squad brand) sem importar o framework.
- **BMAD-METHOD** — não é caixa de agentes, é o molde pra CRIARMOS os nossos. Fica pro futuro (independência total).
