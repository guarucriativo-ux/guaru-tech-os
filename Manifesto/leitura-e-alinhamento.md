# Leitura & alinhamento do sócio (Claude) sobre o Manifesto

> Leitura do [MANIFESTO.md](../MANIFESTO.md) pelo sócio Claude, gravada a pedido do Marcos.
> O manifesto é a voz/cultura do fundador; este doc é a leitura técnica-estratégica do sócio + a lista de organização.
>
> **Atualizado em 2026-06-25 (sessão nuvem), DEPOIS de uma varredura completa do repo** (todo o código-máquina lido
> linha a linha + toda a documentação destilada). Por isso a leitura agora é mais funda que a v1: não é mais "li o
> manifesto", é "li o manifesto sabendo onde cada frase dele já tem corpo no repo".

## Veredito: o Manifesto É a operação vista de cima
Antes parecia "cultura bonita ao lado do código". Com a fábrica toda mapeada, fica claro: o Manifesto **é a planta
da operação escrita na linguagem de alma**. Ele define três coisas ao mesmo tempo — a **cultura** (lei), o
**organograma** (que já tem corpo no repo, só que concentrado num Claude de vários chapéus) e o **próximo grande
tijolo** (estruturar os setores). E a regra-mãe dele — *estudar-antes-de-agir + acumular-conhecimento = o MOAT* —
não é discurso: está escrita em código.

## 1. O que o Manifesto é na pilha de docs
É a camada de **ALMA/CULTURA** — a constituição da fábrica. Os outros docs são derivados dele:
- `CLAUDE.md` = o *como operamos* · `VISION.md` = o *norte* · `BUSINESS-MODEL.md`/`PLANO-FINANCEIRO.md` = os *números* ·
  `knowledge-base/` + `niches-library/` = a *faculdade*.
- O Manifesto é o *porquê inegociável* que faz todo colaborador (humano ou agente) puxar pro mesmo lado.

## 2. O organograma do Manifesto → mapeado no que existe de verdade
O Manifesto descreve colaboradores em "salas por setor". Hoje cada especialista é **um Claude de chapéu diferente**,
mas cada chapéu já tem um *corpo real* no repo:

| Especialista (Manifesto) | Onde ele JÁ vive na operação | Maturidade hoje |
|---|---|---|
| **Claude Coude (código)** | `core/`, `cli/`, `tools/`, os motores | sócio, construído |
| **Designer** | `niches-library/design-principles` (Base Mãe) + o **Olho** + `compor.js` + skill `guaru-creative` + `learning-log` | "estagiário": entrega posts, em treino |
| **Gestor de tráfego** | `01-ads-engine` + `<nicho>/traffic-playbook` + `audience-insights` | estagiário; aprende de dado/relatório próprio — mas a "ponta de 1 metro" (loop real da Meta API) **ainda aberta** |
| **CRM/ERP** | `04-crm-systems` + `data/ledger.jsonl` + `shared/logger.js` (rastro pro dashboard futuro) | fica com o financeiro; stub hoje |
| **Web designer** | futuro (semente = site da Alkimia); sala do Marketing junto com designer+código | "em contratação" |
| **Marcos (fundador)** | o **taste/curadoria** = a régua do Olho; a **âncora** contra a deriva (model collapse) | o chefe |

Sacada estrutural: **a "sala por setor" = a estrutura `Projetos/<cliente>/` com os 4 módulos**
(`01-ads-engine` / `02-content-generator` / `03-automation-bridge` / `04-crm-systems`). O repo **é** o prédio da
fábrica; cada pasta de cliente é uma bancada que todos os setores tocam.

## 3. Regras de cultura do Manifesto que JÁ são lei no código
- *"Todos estudam antes de cada decisão; na dúvida pesquisa; o sim é óbvio"* → `estudar-antes-de-criar`
  (`kb-query.js` roda antes de gerar) + o **Olho** + *"referência é régua, não regra"*.
- *"Dados validados, fontes verídicas, sem achismo"* → `copy-fundamentada-e-fact-checking` (regra dos **3 pilares/
  fontes**) + os guardrails que reprovam (`checar-guardrails.js`).
- *"O útil fica na memória e na faculdade pros próximos"* → `knowledge-base/` + `niches-library/` + ciclo de
  aprendizado (lição local do cliente → gradua pro nicho/motor quando se prova).
- *"Baixo custo sempre, alinhado ao financeiro"* + *"produtos digitais lucrativos, alta margem"* → a tese inteira do
  `BUSINESS-MODEL.md` (margem ~80%; custo de servir que **cai** conforme a fábrica aprende — o north-star do `VISION.md`).
- *"Vivemos no reverso: até a IA estuda"* → `DIFERENCIAL.md`: o moat é a especialização acumulada, não o modelo.

## 4. O Manifesto é o remédio pra "organizar a casa" 🔑
Por que existem divergências (README defasado, dois preços brigando — R$200–1.200 vs base R$147)? Porque hoje é
**um Claude de muitos chapéus escrevendo doc em horas diferentes, sem um setor DONO de cada coisa.** O organograma
do Manifesto resolve isso ao **atribuir propriedade**:
- **preço/tabela oficial** → dono é o **financeiro** (CRM/ERP) = uma fonte da verdade só;
- **README/arquitetura** → dono é o **código**;
- **régua/DNA visual** → dono é o **designer** (por isso a régua do Guaru Estúdio tem pasta e protocolo próprios).

E o Manifesto crava *"produz para as **2 vitrines**"* — isso **confirma o modelo de dois braços**:
**Guaru Estúdio** (caixa/serviços, real) + **psi.automatic** (produto/MOAT, nicho). É um âncora pra alinhar os docs.

## 5. O fio aberto que o próprio Manifesto deixa
A última linha — *"precisamos criar a [estrutura] da nossa fábrica — faço nem ideia como"* — é a pergunta central.
Leitura do sócio: "criar a estrutura" = **tornar os setores reais**, saindo de "um Claude, vários chapéus" para
"**vários especialistas de verdade**", cada um com sua fatia da faculdade. Caminho técnico já anotado: orquestração
de **agentes especialistas** (Agent SDK) + estrutura de repo por setor. Mas — fiel ao `tijolo-por-tijolo` — é
destino, não agora: primeiro **provar o Alvo A com cliente pagante** (gargalo real = MERCADO, não técnica).

## O que ainda está impreciso/aspiracional no Manifesto (pra afinar, não corrigir a voz)
1. **"Claude Coude", "Designer", "gestor de tráfego" são o MESMO Claude com chapéus** — no manifesto são pessoas
   separadas. Visão CERTA, mas é DESTINO; a separação real vem com o Agent SDK.
2. **É o organograma do destino; hoje ~1,5 vaga preenchida** (código + designer-em-treino). O resto = "em contratação".
3. **"talvez esse nome mude"** (Guaru Tech) — segue em aberto, decisão do fundador.
4. Afetivo: "Claude Coude" = apelido (Code); "gênio" é generoso — o gosto/direção é do Marcos, o Claude constrói.
   O próprio manifesto acerta: o moat é o ACÚMULO, não a IA.

## Lista de ORGANIZAÇÃO (estado vivo)
- [x] Promover o manifesto pra `MANIFESTO.md` na raiz (voz preservada) — 2026-06-25.
- [x] Linkar o manifesto no `CLAUDE.md` e no `VISION.md` (leitura obrigatória).
- [x] Gravar esta leitura + subir pra nuvem.
- [x] Varredura completa do repo pelo sócio (código + docs) — 2026-06-25 (sessão nuvem).
- [ ] **Arrumar a casa (em andamento com o Marcos):** reconciliar as 3 divergências achadas no estudo —
      (1) preço oficial (dono: financeiro), (2) `README.md` defasado (dono: código), (3) ledger anti-repetição pendente.
- [ ] Régua visual do **Guaru Estúdio** em curadoria pelo Marcos — **não processar antes dele fechar o lote** (ver `ESTADO-ATUAL.md`).
- [ ] Coletar o **feedback de design do Marcos** no carrossel "culpa de descansar" → graduar movimentos vencedores pro `compor.js`.
- [ ] **Desenhar a estrutura da fábrica** (o fio aberto do Manifesto): setores → orquestração de agentes especialistas (Agent SDK) + repo por setor.
- [ ] `tijolo-por-tijolo`: provar o Alvo A (vitrine psicólogo) com **cliente pagante** antes de abrir os outros especialistas.
- [ ] Costuras técnicas na fila: **ledger** anti-repetição + **foto-auto**.

## Princípio que o Manifesto cravou (e que eu adoto)
A cultura **estudar-antes-de-agir + acumular-conhecimento** é REGRA não-negociável e vale pra TODO colaborador
(inclusive eu, em qualquer chapéu). Cada tarefa importante: estudar → (na dúvida) pesquisar → criar → auto-corrigir
com dado → depositar o aprendizado na faculdade/memória. É o MOAT, e é infinito.
