# Ferramenta × Colaborador — e o que REALMENTE acumula conhecimento

<!-- Origem: dúvida do Marcos (2026-06-26) — "o VSCode é colaborador ou ferramenta? ele aprende com cada site
     que cria?". Esclarece o nó central da fábrica. Conferido no código (kb-query.js, learning.js, ledger-query.js,
     generate.js). Liga com ESCOPO-ESTUDO.md ("não cair no mito") e metodo-do-designer-cerebro-e-config.md. -->

> **O nó:** "o VSCode aprende com mais construções?" **NÃO.** Nem o VSCode, nem o modelo (eu) aprendem sozinhos.
> Quem acumula é o **REPO** (a faculdade + as regras + os logs), e só **se** a gente destilar cada trabalho em
> regra. Entender isto é entender por que o nosso modelo funciona e o "só IA" dos outros não.

## As 3 categorias (não confundir nunca)

### 1. FERRAMENTA — não aprende, é inerte
A bancada e os equipamentos. **Zero memória, zero inteligência.** Exemplos nossos: **VSCode** (o cockpit/IDE),
`tools/render` (Puppeteer), `foto-auto`, `ffmpeg`, git, o terminal. Uma furadeira não fica melhor furando mais
parede. **O VSCode é FERRAMENTA** — ele não "cria" nem "aprende"; é onde o colaborador trabalha.

### 2. COLABORADOR — um PAPEL, não um programa
Um especialista da fábrica (designer, gestor de tráfego, **web designer**, copywriter). É feito de **3 partes**:
- **Cérebro** = o modelo de IA (eu, Claude). ⚠️ **CONGELADO** — não lembra de ontem, não aprende entre sessões.
- **Config** = a função/cliente (DNA, estrutura, nicho) — ver `metodo-do-designer-cerebro-e-config.md`.
- **Conhecimento que ele CONSULTA** = a faculdade + a memória do cliente (abaixo).
> O colaborador **usa** ferramentas (o web designer usa o VSCode), mas **não é** a ferramenta. E como o cérebro
> é congelado, **o colaborador não fica mais esperto sozinho** — ele fica melhor porque CONSULTA mais conhecimento.

### 3. O QUE ACUMULA — o conhecimento no REPO (o MOAT)
A única coisa que de fato cresce e dura. Mora em arquivo, no git, e é **consultada** a cada trabalho:
- **Faculdade** (`knowledge-base/`) — regras/cânone. Consultada por `core/kb-query.js` (RAG) antes de criar.
- **Memória do cliente** (`learning-log.md`, `learned-lessons.md`, ledger) — o que funcionou/falhou naquele
  cliente. Consultada por `core/learning.js` / `shared/ledger-query.js` (anti-repetição) antes de criar.
- **Regras de nicho / Base Mãe** — o que foi destilado e promovido.

## Então o colaborador "aprende com cada construção"? SÓ se a gente fechar o loop
Aprender NÃO é automático nem mágico. O loop (conferido no código — os `generate.js` chamam kb-query + ledger):
```
cria a peça/site → CRÍTICA (Marcos = âncora) → DESTILA a lição num arquivo (log/regra)
   → o PRÓXIMO trabalho CONSULTA esse arquivo → sai melhor
```
- **Sem o passo de destilar, nada é retido.** Cada build começa do zero (o cérebro é congelado; o VSCode não
  lembra). "Fazer 100 landing pages" sem destilar = 100 vezes do zero.
- **Com o loop:** cada landing vira regra ("o que converteu/falhou") que a próxima consulta → o web designer
  "amadura" — mas o que amadureceu foi o ACERVO, não o VSCode nem o modelo.
- **Âncora humana é obrigatória** (anti-deriva, ver ESCOPO-ESTUDO): IA corrigindo a si mesma sem o Marcos
  deriva. Por isso a destilação é curada, não automática.

## Aplicando ao WEB DESIGNER (o exemplo do Marcos)
- **"O web designer usa o VSCode?"** Sim — o VSCode é a **ferramenta** dele (a bancada). 
- **"Ele acumula com cada site?"** Só se existir (a) uma **faculdade de web** (cânone de UX/UI, landing que
  converte, etc.) e (b) um **learning-log de web** (o que funcionou em cada site). Hoje **não temos** isso —
  então, se formos pra web, o web designer precisa **virar uma matrícula** (currículo + faculdade + loop),
  igual fizemos com o designer gráfico e o gestor. Sem isso, ele recomeça do zero a cada site.

## Estado atual (honesto, conferido no código)
- ✅ A **consulta** está ligada nos geradores de cliente (`generate.js`/`gerar-peca.js` chamam kb-query + ledger).
- 🟡 A **destilação** (crítica → regra) é **manual/curada** (eu + Marcos) — por design (anti-deriva).
- ⬜ Não há faculdade/loop de **web** ainda (seria a próxima matrícula se entrarmos em web/interfaces).

## Resumo de uma linha
**VSCode = ferramenta (não aprende). Modelo = cérebro congelado (não aprende sozinho). Colaborador = papel que
CONSULTA conhecimento. O que acumula é o REPO — e só quando a gente destila cada trabalho em regra.** Esse é o MOAT.
