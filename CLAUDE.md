# Guaru Tech — Diretrizes de Desenvolvimento

Guaru Tech opera no modelo **SwaS (Software with a Service)**: entregamos infraestrutura de
software e agentes autônomos de marketing/automação para pequenas empresas, vendidos como
serviço contínuo (não só projeto pontual). Cliente laboratório e MVP: **Guaru Estúdio**.

> 📜 **Leitura obrigatória de cultura:** [MANIFESTO.md](MANIFESTO.md) — a alma da fábrica na voz do fundador
> (estudar antes de agir + acumular conhecimento = o MOAT; regra inegociável pra todo colaborador, humano ou
> agente). O `CLAUDE.md` é o *como operamos*; o MANIFESTO é o *porquê*.

## Stack e princípios técnicos

- **Node.js** como runtime padrão para scripts, automações e integrações.
- **Código limpo e modular**: funções pequenas, responsabilidade única, nomes descritivos.
  Evitar abstrações prematuras — só extrair um módulo/helper quando há reaproveitamento real,
  não hipotético.
- **Arquivos locais leves**: preferir JSON/Markdown/CSV a bancos de dados pesados sempre que o
  volume de dados do cliente permitir. Cada cliente deve poder rodar sua própria pasta sem
  infraestrutura externa cara.
- **Reaproveitamento de componentes**: antes de criar uma automação/script novo, verificar se
  já existe algo parecido em `niches-library/` ou em outro cliente em `Projetos/`. Generalizar
  para a biblioteca de nichos em vez de duplicar.
- Sem dependências desnecessárias. Sem features especulativas. Sem comentários explicando o
  óbvio — só comentar o que não é óbvio pelo código (uma decisão não-trivial, um workaround).

## Estrutura do repositório

```
Guaru Tech/
├── CLAUDE.md                  ← este arquivo
├── niches-library/            ← regras de sucesso, prompts validados e lógicas por nicho/setor
│   └── design-principles/     ← Base Mãe: assinatura de design do Marcos, niche-agnóstica
├── template-client-base/      ← "molde de ouro" para clonar em cada novo cliente
│   ├── brand-dna.json         ← DNA visual do cliente (paleta, tipografia, formas, logos)
│   ├── references/            ← arquivos de logo/fotos/paleta do cliente
│   ├── learning-log.md        ← feedback de design por peça gerada
│   └── learned-lessons.md     ← aprendizados de negócio/tráfego/conteúdo em geral
└── Projetos/                  ← clientes/projetos ativos (cada um clonado do template)
```

Cada novo cliente nasce de uma cópia de `template-client-base/`. Nada de estrutura ad-hoc por
cliente — divergências de estrutura quebram o reaproveitamento entre projetos.

## Sincronização e Nuvem (regra de ouro)

A fábrica precisa rodar **idêntica em todo lugar** — PC, celular (app do Claude / Claude Code na
web) e nuvem. O inimigo é a **divergência**: um terminal ficar desatualizado em relação ao outro.

- **A nuvem (GitHub) é a FONTE DA VERDADE.** Tudo que a fábrica **cria e precisa pra rodar vai
  pro Git** — scripts, regras, faculdade, brand-DNA, copy **e as artes geradas (outputs)**. É tudo
  leve (post otimizado ≈ centenas de KB), então cabe sem problema.
- **Só fica FORA do Git:** matéria-prima crua e pesada do cliente (vídeo `.MOV/.mp4`, `.psd`,
  catálogo `.pdf` grande, fotos originais gigantes), segredos e `node_modules`. Isso é pesado **e**
  é propriedade do cliente — fica na gaveta privada local/storage, não viaja entre terminais.
  (Foi o erro da Alkimia: subir uma pasta de material bruto inteira.)
- **Output sempre OTIMIZADO** (JPG leve, não PNG de vários MB), pra fábrica nunca mais engordar.
- **Ritmo anti-divergência (padrão automático, não preciso ser lembrado):** `git pull` ANTES de
  mexer em qualquer terminal; `git commit` + `git push` DEPOIS de qualquer mudança. O Claude do
  celular já trabalha direto na nuvem. Assim os terminais sempre se reencontram no GitHub.
- **Comando "sincroniza" (vale em qualquer terminal, comportamento se adapta):** o Marcos pode dizer
  "sincroniza" (ou "voltei", "tá tudo certo?") em qualquer lugar — sempre confiro o estado antes de seguir.
  - **No PC:** rodar `node tools/sincronizar.mjs` — busca da nuvem, mescla na `main` o trabalho feito
    pelo celular (branches), empurra de volta e resume. É AQUI que a sincronização mais importa (o PC
    precisa baixar as novidades). Seguro: para se houver mudança local não salva e aborta mescla com conflito.
  - **No celular/nuvem:** a sessão já abre da versão mais nova (clona do zero), então "sincroniza" =
    confirmar que estou na última e que o trabalho subiu; o "juntar na main" acontece no retorno ao PC.
  - **"Ninguém se perde na fábrica"** independe do script: garantido pelo `ESTADO-ATUAL.md`, lido no
    início de TODA sessão em TODO terminal. ESTADO-ATUAL cuida do CONTEXTO; "sincroniza" cuida dos ARQUIVOS.

### Continuidade entre terminais — `ESTADO-ATUAL.md` (bastão de contexto)

Cada sessão é isolada: o Claude de um terminal **não herda a conversa** de outro. O contexto de
"onde paramos" vive no repo, em **`ESTADO-ATUAL.md`** (ponto de parada vivo, que viaja via GitHub):

- **No INÍCIO de toda sessão:** ler `ESTADO-ATUAL.md` (+ este `CLAUDE.md` + `MANIFESTO.md`) pra
  entrar no contexto de onde a fábrica parou.
- **No FIM de toda sessão ou mudança relevante:** atualizar `ESTADO-ATUAL.md` (o que foi feito,
  onde paramos, próximo passo, pendências) e dar `push`. Nunca deixá-lo envelhecer.

## Protocolo de Geração de Design (obrigatório)

Nenhum HTML/CSS de criativo nasce no vazio. Antes de gerar qualquer peça visual, ler nesta
ordem (cada camada é mais específica que a anterior):

1. **Base Mãe** — `niches-library/design-principles/design-rules.md`: qualidade técnica e
   diagramação aprovadas pelo Marcos, valem para qualquer cliente/nicho.
2. **Regras de nicho** — `niches-library/<nicho>/visual-references/design-rules.md`: padrões
   estéticos que funcionam para o setor do cliente.
3. **DNA do cliente** — `Projetos/<cliente>/brand-dna.json` + `references/`: identidade visual
   específica (paleta, tipografia, formas, logo) que veste o resultado final.

O design final tem a qualidade/diagramação da Base Mãe, ajustada aos padrões do nicho, vestida
com a identidade do cliente. **Nunca usar estilo genérico.** Se qualquer uma das três camadas
não tiver regra clara para o caso em mãos, perguntar ao Marcos antes de criar — não inventar
regra de design em nome dele.

## Regras de Assets e Imagens (obrigatório)

### Isolamento de assets (regra inquebrável)
Existem duas gavetas de imagem, e elas NUNCA se misturam:
- **Gaveta privada do cliente** (`Projetos/<cliente>/assets`, `references/`) — fotos, logo e
  material do cliente. São **propriedade dele**. NUNCA entram no banco compartilhado e NUNCA são
  entregues/reutilizadas em outro cliente. A arquitetura de pasta-por-cliente já isola isto: ao
  gerar para o cliente X, só se enxerga (assets do X) + (banco do nicho) — jamais a pasta de outro cliente.
- **Banco compartilhado do nicho** — só imagens **licenciadas que a Guaru tem direito** (stock
  pago, banco livre com licença anotada, ou geradas por IA). Essas, sim, rodam entre clientes do nicho.

### Anti-genérico / anti-repetição (4 camadas, nesta ordem)
Banco fixo e pequeno faz todo cliente do nicho ficar igual. Para evitar peça repetida/genérica:
1. **Foto do cliente primeiro** (única e isolada) — sempre que o cliente real tiver material.
2. **Anti-repetição via ledger** — o `shared/ledger-query.js` (`avoidRepeats`) já evita reusar o
   mesmo asset nos últimos outputs; estende-se a imagem (lembra o que cada cliente usou e evita repetir).
3. **Variação de composição** — a mesma foto base rende peças diferentes via diagramação autoral
   (lettering, corte, cor, grafismo). Multiplicador grátis de variedade.
4. **Geração por IA** — imagem única por post quando necessário (mata repetição e licença de uma vez).

**[Longo prazo — vigiar quando escalar, papo de pós-validação]** Limite de uso por imagem em todo
o nicho, **ponderado por sobreposição de audiência/geografia**: clientes do mesmo setor se enxergam
(se seguem + a Meta agrupa audiência de nicho), então dois vizinhos com público sobreposto NUNCA
podem dividir a mesma foto; cidades/públicos distintos = risco baixo. Não é só "N usos", é "N
ponderado por proximidade". Reforça o caminho de imagem única por IA (mais único = menos colisão).

### Banco de imagem por nicho — manifesto leve, arquivo pesado fora do Git
- Metadados no repo: `niches-library/<nicho>/visual-references/image-bank.json` (tags, licença,
  URL no storage) — leve, queryável pela máquina. Arquivos pesados ficam em **storage de nuvem**,
  nunca no Git (regra de infra: GitHub rejeita arquivo grande).
- **Cure o critério, não cada arquivo:** o olho do Marcos define o que é "boa foto para o nicho"
  como regra/filtro — que então guia stock em escala ou geração por IA, sem ele garimpar à mão.

### Economia de imagem (não escalar custo por post)
IA generativa é cara **por imagem** se usada por post. A regra: **IA (e a curadoria Firefly do
Marcos) alimenta o BANCO; o banco alimenta os posts.** Geração vira reabastecimento periódico
(custo amortizado por reuso), não custo por unidade. Stock por assinatura + variação de composição
derrubam o custo-por-post pra perto de zero. IA usada cirurgicamente (fundo/textura/mood), não para
o produto real de um cliente.

## Modo de Execução

- Nunca pedir ao Marcos para editar arquivo de configuração manualmente — sou eu quem edita
  (`client-context.md`, `brand-dna.json`, `*.md` de regras, etc.).
- Buscar informação primeiro nos arquivos de `Projetos/<cliente>/`; só perguntar no chat o que
  genuinamente não está documentado em nenhum arquivo.
- Ao receber uma tarefa que envolve um cliente: primeiro identificar o cliente e ler a pasta
  dele (`Projetos/<cliente>/`), depois aplicar a Base Mãe de design — nessa ordem, não ao
  contrário.

## Ciclo de Aprendizado do Agente (obrigatório)

Esta é a peça central do modelo SwaS: cada interação com um cliente real é uma oportunidade de
acumular expertise reaproveitável. Sem isso, cada cliente novo recomeça do zero.

### Regra

Todo agente/automação que rodar para um cliente **deve documentar o resultado**, não só
executar a tarefa. Sucesso e falha são igualmente valiosos — falha evita repetir erro, sucesso
vira regra reaproveitável.

### Onde registrar

1. **`Projetos/<cliente>/learned-lessons.md`** — registro local, específico daquele cliente: o
   que funcionou, o que falhou, ajustes de tom/voz, peculiaridades do nicho (negócio, tráfego,
   conteúdo em geral).
2. **`Projetos/<cliente>/learning-log.md`** — registro específico de **feedback de design** por
   peça gerada (post, anúncio): o que o Marcos aprovou/pediu para ajustar visualmente. Separado
   do `learned-lessons.md` porque alimenta uma camada diferente (ver Protocolo de Geração de
   Design): aprendizados de design aqui só sobem para `niches-library/design-principles/`
   quando o Marcos confirma que é regra geral dele, não preferência pontual daquela peça.
3. **`niches-library/<nicho>/`** — quando um aprendizado de `learned-lessons.md` se prova válido
   em mais de um cliente do mesmo setor (ou é genérico o bastante para apostar nele de início),
   promover para a biblioteca do nicho, como regra/prompt validado.

### Formato de cada entrada de aprendizado

```markdown
## [AAAA-MM-DD] <título curto>
- **Contexto:** o que foi tentado (campanha, copy, automação, integração)
- **Resultado:** o que aconteceu (métrica, erro, reação do cliente)
- **Lição:** o que fazer diferente / o que repetir
- **Promovido para nicho?** sim/não — se sim, link para o arquivo em `niches-library/`
```

### Quando promover um aprendizado do cliente para a biblioteca de nicho

- A lição se repetiu em 2+ clientes do mesmo setor, **ou**
- A lição é sobre algo estrutural do nicho (ex: "restaurantes respondem melhor a CTA de
  reserva do que de cardápio"), não uma peculiaridade daquele cliente específico.

Lições puramente pessoais do cliente (tom de voz, preferências de aprovação, contatos) ficam
só no `client-context.md`/`learned-lessons.md` dele — não vão para a biblioteca de nicho.
