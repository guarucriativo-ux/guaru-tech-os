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

## A CULTURA DE CURADORIA da Faculdade (Marcos 2026-06-26) — o método das melhores faculdades, aplicado

> Faculdade é lugar de **ENSINO que vira RESULTADO na entrega do colaborador** — não depósito. Conhecimento
> errado ou em excesso vira **gordura no cérebro**: dilui o sinal do RAG (o sistema lê trecho irrelevante) e
> dá a ILUSÃO de "coberto" o que não está. **Curar é subtrair tanto quanto somar.** Não precisamos de excesso —
> precisamos de conhecimento que muda a entrega.

Método das melhores faculdades (Wiggins & McTighe, *Backward Design* · Biggs, *Constructive Alignment* ·
Meyer & Land, *Threshold Concepts* · *depth over breadth*), traduzido pra nossa curadoria:

### O TESTE DE ENTRADA — um doc só entra/permanece se passa nos 4
1. **Backward da ENTREGA** (começa pelo fim, não pelo conteúdo): *"qual peça/entrega, de qual colaborador,
   isto melhora?"* Se não muda nenhuma entrega → não é faculdade.
2. **Princípio TRANSFERÍVEL, não fato avulso** (threshold/transfer): vale em vários casos/clientes/nichos?
   Fato de uma vez, decisão pontual → não entra.
3. **Profundidade > amplitude** (less is more): uma página afiada vence dez enroladas. Já existe doc parecido?
   **Funde**, não soma. Cada doc tem que ganhar o seu lugar.
4. **Alinhado e nomeado** (constructive alignment): o doc diz QUAL colaborador usa e QUAL entrega melhora.
   Órfão (ninguém consulta, não aparece em peça) → candidato a corte.

### O que NÃO é faculdade (vai pra `decisoes/` ou raiz — nunca em `knowledge-base/`)
Decisão · estratégia · comparativo de fornecedor/preço · roadmap/exploração de capacidade ainda não construída ·
infra/rede · status/handoff · teste descartável. Isso é **operação/negócio**, não **ensino**. (Foi o erro do
*mapa de custo de vídeo*: virou pra `decisoes/`.)

### A "prova" = a ENTREGA (alinhamento ao nosso mundo)
Em faculdade a prova mede se o ensino pegou. Aqui a prova é a **peça que o colaborador produz + o feedback do
Marcos**. Doc que nunca aparece na entrega **reprovou** → sai (ou vira regra no motor e some da prateleira).

### AUDITORIA SEMANAL (ritual cravado) — faculdade vs. aplicado
Toda semana, passar cada doc pelos 4 testes: *mudou alguma entrega? é transferível? tem duplicata pra fundir?
está alinhado a um colaborador?* O que não passa: **funde, move ou poda.** Registrar o resultado em
`decisoes/auditoria-faculdade-<data>.md`. A âncora continua sendo a **curadoria do Marcos** (anti-deriva acima):
sem o olho humano, a faculdade incha de novo.

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
