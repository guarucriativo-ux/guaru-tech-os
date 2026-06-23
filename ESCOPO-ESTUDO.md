# Guaru Tech — Escopo de Auto-Estudo ("Faculdade + Pós-Graduação")

> Ideia do Marcos (2026-06-22): fazer a tecnologia **estudar** — base de conhecimento + treino
> diário. "Num mundo onde todos acham que só IA resolve, a gente faz a IA estudar." Documento vivo.
> Complementa [ESCOPO-AUTOMACAO.md](ESCOPO-AUTOMACAO.md) e [CLAUDE.md](CLAUDE.md).

---

## Princípio que sustenta tudo (não cair no mito)
Encher uma pasta de livros **NÃO** deixa o modelo (Claude, congelado) mais inteligente sozinho —
ele não absorve por osmose nem lembra do estudo de ontem. O que fica mais inteligente é o
**SISTEMA**, por dois mecanismos reais:
1. **Consulta** o acervo ao gerar (RAG) — lê a parte certa toda vez que trabalha.
2. **Destila** o estudo em **regra** escrita na `niches-library/`.
A sabedoria mora na biblioteca + nas regras, alimentadas pela curadoria humana.

---

## 1. A "Faculdade" — Base de Conhecimento (RAG)
Acervo de texto curado que o sistema consulta antes de criar.

- **✅ IMPLANTADO (v1, 2026-06-22):**
  - `knowledge-base/` com áreas (`design/`, `copywriting/`, `marketing/`, `por-nicho/`) — despeje
    `.md`/`.txt` (livros, artigos, transcrições de videoaula, curadoria). Só texto.
  - `core/kb-query.js` — consulta por palavra-chave (zero deps): `node core/kb-query.js "pergunta"`
    retorna os trechos mais relevantes. Testado e funcionando.
- **⬜ Próximos passos:**
  - Wire no `02-content-generator`: antes de gerar, chamar `kb-query` com o foco/tema e injetar os
    trechos no prompt ("estuda antes de criar"). É a evolução natural do "pensa antes de agir" (ledger).
  - Upgrade de busca por palavra-chave → **busca semântica por embeddings** (entende sinônimos/sentido).
  - Ingestão de **videoaula**: transcreve o vídeo → texto → entra na base (usa-se a transcrição).

## 2. A "Pós-Graduação / Estágio" — Treino diário (self-play)
Enquanto o sistema é "estudante", ele pratica sozinho pra amadurecer.

- **Loop (⬜ futuro, fase de maturação):**
  ```
  diariamente: gera um "escopo fake" (briefing sintético)
     → cria a peça
     → AGENTE CRÍTICO avalia contra a base de conhecimento + as regras
     → registra o que funcionou/falhou
     → promove a regra refinada pra niches-library
  ```
- É o que rolou no dia 2026-06-22 (salão errou → virou regra → hambúrguer melhor), automatizado e diário.
- O treino **não** deixa o modelo mais esperto — gera **dados e regras refinadas**, e isso compõe.

## ⚠️ A trava obrigatória — anti-deriva (model collapse)
IA corrigindo a própria lição **sem âncora externa** entra em câmara de eco e **piora** (reforça os
próprios vícios). O treino diário PRECISA estar ancorado em três coisas objetivas:
1. **A base de conhecimento** (referência que não é opinião do sistema).
2. **A curadoria periódica do Marcos** (o olho humano corrige o rumo).
3. **O feedback real do cliente** (like/dislike) quando existir.
Sem âncora, vira um menino aprendendo errado e repetindo com confiança. **A curadoria do Marcos é a âncora.**

---

## Sequência (não atrasar o que importa)
- **Base de Conhecimento (RAG):** começar a usar cedo — melhora a qualidade de toda peça já. Marcos
  pode começar a alimentar `knowledge-base/` HOJE; o wire no gerador é o próximo passo barato.
- **Treino diário (self-play):** fase de maturação, quando houver produto rodando e âncoras (cliente
  real). Não deixar atrasar o **Alvo A** (provar um nicho).

## Resumo
- **Faculdade** = base curada que o sistema consulta antes de criar (RAG) + destilação em regra. ✅ v1 no ar.
- **Pós/estágio** = treino diário gera→critica→registra→refina, **ancorado**. ⬜ maturação.
- O que "fica inteligente" é a **biblioteca + as regras**, alimentadas pelo Marcos. O modelo é o motor.
