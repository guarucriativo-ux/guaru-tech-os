# Avaliação — Xquads / Squads (sowsales/raxo · repo ohmyjahh/xquads-squads)

> Marcos mandou estudar (2026-06-26): https://www.sowsales.com.br/xquads/downloads (deu 403/anti-bot; estudei
> via repo público + páginas). É DECISÃO/avaliação (build-vs-buy), não faculdade. Compare com avaliacao-lovable-dev.md.

## O que é
Produto BR que vende um **pacote de ~96–136 agentes de IA** organizados em **12 "squads" temáticos**, pra rodar
**dentro do Claude Code** por comandos em português. Cada agente é uma **persona de um expert lendário**
("pensa como" Gary Halbert/Ogilvy/Schwartz na copy, Hormozi na oferta, Pedro Sobral no tráfego, **David Aaker/
Neumeier/Al Ries no branding"). Squads: advisory-board, brand, c-level, claude-code-mastery, copy, cybersecurity,
data, design, hormozi, movement, storytelling, traffic-masters.

## A arquitetura (é isto que interessa pra nós)
Padrão tipo **BMAD/agent-OS**. Cada squad é uma pasta com:
- `squad.yaml` — **manifesto** (lista agentes, tasks, workflows).
- `agents/` — definição de cada agente: **persona · role · focus · greeting** (+ orquestrador do squad).
- `tasks/` — unidades executáveis com **inputs/outputs** (ex. brand-squad: audit-brand, diagnose, create-
  positioning, generate-names, build-identity, create-brand-story, map-archetype…).
- `workflows/` — **sequências multi-agente** (ex.: brand-creation, rebrand — encadeia estrategista → copy → preço).
- `checklists/` — **portão de qualidade** (ex.: output-quality).
- `data/` — frameworks + routing-catalog (qual agente pra qual problema).

## Como isso MAPEIA na nossa fábrica (quase 1:1 — valida o caminho)
| Xquads | O que já temos / estamos construindo |
|---|---|
| agents/ (persona Aaker, Halbert…) | colaboradores (designer, gestor, copywriter, web) + **cânone destilado** na faculdade (já destilamos Aaker/Wheeler/Neumeier, Ogilvy/Cialdini, Schwartz) |
| tasks/ (inputs→outputs) | nossos **gates** (copy-primeiro, craft-primeiro) e protocolos |
| workflows/ (encadeia agentes) | nosso **Protocolo de Geração de Design** (copy → 3 camadas → craft) |
| checklists/ (output-quality) | os **checklists-portão** dos nossos gates |
| data/ (frameworks, routing) | `knowledge-base/` + a lógica de qual regra aplicar |
| squad.yaml (manifesto) | (não temos um manifesto por colaborador — é o que falta formalizar) |

## Leitura (build vs buy — alinhado à nossa cultura)
- **NÃO comprar o pacote pelo conteúdo.** O valor deles é **amplitude** (136 personas genéricas). Nossa doutrina
  é **curadoria** (conhecimento errado/excesso = "gordura no cérebro") + **acúmulo por cliente real com o taste
  do Marcos**. Persona genérica de expert ≠ o nosso MOAT (faculdade validada + feedback real). Já temos o cânone
  de branding/copy/tráfego destilado e PROVADO no nosso fluxo.
- **SIM, aprender a ARQUITETURA.** O padrão `manifesto + agents + tasks + workflows + checklists + data` é uma
  forma limpa de **formalizar nossos colaboradores como agentes invocáveis** e amarrar nossos gates como
  tasks/workflows. Hoje nossos gates e currículos existem soltos em `.md`; um "squad.yaml" por colaborador
  deixaria a fábrica orquestrável (e é o pattern aberto BMAD, não IP deles — dá pra adotar sem copiar arquivos).
- **Cautela de IP/marca:** não clonar os arquivos deles (produto pago). E coerente com a nossa regra: a fábrica
  é invisível, vende-se o toque humano — agentes são motor interno.

## Nossa vantagem que um pacote não dá
Feedback real do Marcos virando regra (taste) + acúmulo por nicho/cliente. Xquads é genérico e estático; a nossa
faculdade **aprende com cada peça** (este loop de design inteiro é prova disso).

## Recomendação
1. **Não comprar pelo conteúdo** — já temos cânone melhor (curado + validado) pro nosso escopo.
2. **Adotar o PADRÃO de organização** quando formos formalizar os colaboradores: dar a cada um um manifesto
   (agente: persona/role/focus) + tasks (nossos gates) + workflow (Protocolo) + checklist (portão). Mantém a
   nossa lógica de "colaborador consulta a faculdade", agora orquestrável.
3. **Roubar 1 ideia útil já:** o **routing-catalog** (mapa "qual problema → qual agente/regra") e o **orquestrador
   de squad** (um dispatcher) — úteis quando tivermos vários colaboradores rodando.
4. Decidir com o Marcos se vale, no futuro, empacotar nossos colaboradores nesse formato (provavelmente sim, na
   fase de escalar) — mas **tijolo por tijolo**, sem abrir frente agora.

## Pendência
- Marcos decidir: adotar o padrão squad/manifesto pros nossos colaboradores agora ou deixar como ponta aberta?
