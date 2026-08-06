# Planta da Nova Empresa — Guaru Tech (fábrica de agentes) · 2026-06-27

> Versão FINAL, já com as decisões do fundador: setor criativo antigo demitido (faculdade, Base Mãe,
> regras de copy/design, memórias de cliente, TODAS as referências visuais — tudo aposentado). Agentes
> seniores definem o método. O `CLAUDE.md` é o Chat-Mestre. Conhecimento acumula do zero.

## Organograma
```
                         MARCOS  (fundador — fala só com o maestro)
                            │
                            ▼
                    ┌──────────────────┐
                    │   CHAT-MESTRE    │  ← o CLAUDE.md. Recebe TODO pedido/pergunta,
                    │  (maestro/router)│    decide quem responde e despacha. Não cria.
                    └──────────────────┘
                            │ roteia para o especialista certo:
   ┌──────────────┬──────────────┬───────────────┬───────────────┬──────────────┐
   ▼              ▼              ▼               ▼               ▼              ▼
 PESQUISA       MARCA           COPY           DESIGN         O OLHO        DISTRIBUIÇÃO
 market-       brand-        copywriter-     graphic-       ui-visual-     social-
 researcher    strategist    specialist      designer       validator      publishing
 competitive-                conversion-     (ui-designer)   + RENDER       -publisher
 analyst                     optimizer                       (o diferencial)
                            
   └────────── MEMÓRIA / MOAT: knowledge-synthesizer (registra aprendizado de cada entrega) ──────────┘
   └────────── ESTRATÉGIA: product-manager · business-analyst ───────────────────────────────────────┘
   └────────── "RH" / monta time pra tarefa NOVA: agent-organizer ───────────────────────────────────┘
```

## Como funciona na prática
1. Marcos pede algo ao **Chat-Mestre** ("faz um carrossel pro cliente X sobre Y" / qualquer pergunta).
2. O Chat-Mestre olha a **tabela de roteamento** (no `CLAUDE.md`) e dispara o especialista certo.
3. Peça segue a linha: pesquisa → copy → design → **OLHO (render + vê + corrige em loop)** → entrega.
4. **Memória** registra o aprendizado (MOAT cresce do zero, só com entrega real).
5. Na dúvida de quem faz, o Chat-Mestre chama o **agent-organizer** pra dimensionar o time.

## Regras de ouro da nova empresa
- **Nada de régua/ referência antiga.** O sênior cria do método dele. Referência do Marcos = input pontual de 1 job, nunca régua armazenada.
- **Nada vira entrega sem passar pelo OLHO** (render + validação visual).
- **NUNCA vender "IA"/"automático"** — benefício + toque humano. Direito de imagem respeitado.
- Cliente novo: o agente **estuda o mercado e cria a identidade do zero**.
- Só vira regra o que **muda o que a fábrica PRODUZ**. Sem teoria, sem ensinar o óbvio.

## Onde mora cada coisa
- **Operação/roteamento:** `CLAUDE.md` (o Chat-Mestre).
- **Cultura:** `MANIFESTO.md`.
- **Contexto entre sessões:** `ESTADO-ATUAL.md`.
- **Especialistas:** `.claude/agents/`.
- **Infra (o olho/ferramentas):** `tools/render/`, `tools/foto-auto.mjs`, `tools/sincronizar.mjs`.

## Pendência pra ligar
O **OLHO** ainda precisa ser amarrado no fluxo de design (render obrigatório + `ui-visual-validator` se
corrigindo sozinho, sem humano). É o próximo passo pra fábrica girar 100% autônoma.
