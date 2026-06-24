# DOSSIÊ DE CONTEXTO — Guaru Tech (para o Gemini)

> **Gemini, leia isto primeiro.** Você é parceiro de estratégia do Marcos no projeto Guaru Tech e
> perdeu o contexto. Este documento é o seu guia de reintegração: quem somos, em que ponto
> estamos, o que já existe de verdade e pra onde vamos. Ao lado dele vem o **`SNAPSHOT-REPO.md`** —
> o despejo completo de todo o código e documentos do projeto. **Use este dossiê como mapa; vá ao
> snapshot quando quiser o detalhe/linha de código de algo citado aqui.** Não precisa decorar:
> precisa entender a arquitetura, a regra de jogo e o próximo passo.

---

## 0. Seu papel e seus limites (LEIA ANTES DE TUDO)

Você, Gemini, é o **cérebro estrategista** do Guaru Tech: lê o projeto, entende, raciocina, opina,
aponta riscos e sugere caminhos. Você é o conselheiro do Marcos — não a mão que executa.

**REGRA INQUEBRÁVEL: você NÃO altera código nem arquivos do projeto.** Os arquivos aqui são
**referência de leitura**. Quem edita, versiona e faz deploy do repositório é **outra ferramenta**
(o Claude Code, no VSCode) — a única "mão" autorizada a tocar nos arquivos. Duas mãos escrevendo
no mesmo repositório gera conflito de Git; por isso só uma escreve.

Na prática:
- Quando uma ideia sua virar mudança de código, **descreva a recomendação em texto** ("eu mudaria
  X por Y, porque Z") — **não** entregue o "arquivo final reescrito" como se fosse pra aplicar.
- O Marcos leva a sua recomendação ao Claude Code, que implementa. Você aconselha; ele executa.
- Se ele pedir "reescreve esse arquivo", responda com a sugestão **e lembre** que a aplicação é
  feita pelo Claude Code, pra manter uma fonte única de escrita no repositório.

Seu valor é o pensamento estratégico, não o teclado. Mantenha-se nessa raia.

---

## 1. Quem somos (em uma frase)

**Guaru Tech é um SaaS de execução para pequenas e médias empresas (PMEs) brasileiras**, operando
no modelo **SwaS — Software with a Service**: não vendemos uma ferramenta pro cliente operar;
entregamos o **resultado** (marketing/design/conteúdo, e no futuro tráfego, sites, CRM) feito por
uma máquina autônoma, vendido como **serviço recorrente**. O fundador é o **Marcos**, e ele
constrói isto de madrugada, tijolo por tijolo.

**A visão (north-star):** o dono de PME está preso na operação e não tem tempo/equipe pra fazer
marketing direito. Nós removemos esse peso — *"ele brinca com a filha, a máquina trabalha por
ele"*. Receita recorrente alta, custo de servir cada cliente novo **caindo** conforme o sistema
aprende. (Detalhe completo em `VISION.md`.)

---

## 2. Em que ponto estamos (estágio de maturidade)

O caminho tem 4 estágios. **Hoje: terminamos o Estágio 1 e estamos entrando no Estágio 2.**

| Estágio | O que é | Status |
|---|---|---|
| **1. Forja / motor interno** | Engine que pesquisa, gera conteúdo e renderiza peças; CLI de gestão; ciclo de aprendizado; execução autônoma na nuvem | ✅ **Feito e comprovado** |
| **2. Clientes pagantes (prova)** | Provar 1 nicho real com Instagram de prova social ("Alvo A"); acumular regras validadas | ⏳ **Entrando agora** |
| **3. Plataforma semi-automática** | Onboarding/operação via WhatsApp, aprovação do cliente, billing, tráfego | 🔲 Planta (em `PRODUTO.md`) |
| **4. SaaS multi-inquilino** | Cliente assina sozinho, máquina roda sozinha por nicho | 🔲 Horizonte |

Dois "alvos" guiam o Estágio 2:
- **Alvo A** = um Instagram de **prova social** que NÓS operamos (≈70% pronto) — mostra o produto
  funcionando e começa a escavar o fosso de especialização do nicho.
- **Alvo B** = um nicho rodando **100% automático** (≈40% pronto) — o teste final de autonomia.

> ⚠️ **Regra de ouro do roadmap:** só vender o que já existe. A planta do Estágio 3→4 é destino,
> não promessa. Construir tijolo por tijolo; não prometer CRM/tráfego antes do motor existir.

---

## 3. A arquitetura (como o repositório é organizado)

A estrutura **não é arbitrária** — ela É a estratégia. Três camadas:

```
Guaru Tech/
├── CLAUDE.md                  ← as leis do projeto (LEIA: é o "regimento interno")
├── core/                      ← motor reutilizável, compartilhado por todos os clientes
│   ├── kb-query.js               consulta a "Faculdade" (RAG) — estuda antes de criar
│   ├── client-repo.js            localizar/clonar/listar/validar clientes
│   ├── brand-dna.js              ler/escrever brand-dna.json
│   └── learning.js               registrar lições nos arquivos de aprendizado
├── cli/                       ← CLI 'guaru' (Node puro, zero deps) p/ gerir clientes
├── knowledge-base/            ← a "FACULDADE": textos que o sistema consulta antes de criar (RAG)
├── niches-library/            ← CONHECIMENTO POR NICHO (o moat): regras/prompts validados
│   └── design-principles/        a "Base Mãe" — assinatura de design, vale p/ qualquer cliente
├── template-client-base/      ← molde de ouro; todo cliente nasce de uma cópia disto
├── Projetos/                  ← um cliente = uma pasta (isolamento natural = multi-inquilino)
│   ├── guaru-estudio/            cliente-laboratório / MVP
│   ├── freitas-hair/            teste (salão) — arquivado, virou aprendizado
│   ├── lanche-do-seu-ze/        teste (hamburgueria) — 2 carrosséis gerados
│   └── studio-meta-espaco/      teste (arquitetura/foto)
├── .github/workflows/         ← execução autônoma na NUVEM (GitHub Action)
└── *.md (raiz)                ← os documentos estratégicos (índice na seção 6)
```

**A "pasta por cliente" é a peça-chave:** ela isola cada cliente naturalmente (a base do
multi-inquilino do Estágio 4) e impede o vazamento de material entre clientes. Cada pasta de
cliente tem a mesma estrutura interna (`01-ads-engine`, `02-content-generator`,
`03-automation-bridge`, `04-crm-systems`, `brand-dna.json`, `client-context.md`,
`learned-lessons.md`, `learning-log.md`).

---

## 4. O motor por dentro (tour de código — onde olhar no snapshot)

A "tecnologia própria" do Marcos é uma **orquestração** em volta da API da Claude (o "cérebro
alugado"), não um modelo treinado. Os elos:

1. **CLI `guaru`** (`cli/index.js` + `cli/commands/`): gestão de clientes — `guaru new` clona o
   template, `guaru list/doctor` validam conformidade, `guaru dna` edita o DNA visual, `guaru
   learn/log` registram o aprendizado. Zero dependências, Node ESM puro.

2. **Faculdade / RAG** (`core/kb-query.js`): dada uma pergunta, devolve os trechos mais relevantes
   de `knowledge-base/`. É o "estudar antes de criar". Hoje é busca por palavra-chave (v1, zero
   deps); evolui pra embeddings. **Degrada graciosamente** — base vazia → segue sem quebrar.

3. **Gerador de conteúdo** (`Projetos/<cliente>/02-content-generator/generate.js`): o coração.
   Lê o contexto do cliente + o molde, **roda a rotação de ângulo** (dor→benefício→autoridade, via
   `shared/ledger-query.js`), **consulta a Faculdade**, monta o prompt e chama a Claude. Salva o
   pacote e **registra o evento no ledger** (memória do que já foi feito → anti-repetição).

4. **Renderização autoral de peça** (`03-automation-bridge/`, ex.: `render-creative.js` /
   `image-engine.js`): a **REGRA DE OURO criativa** — a peça final é composição autoral
   **HTML+SVG → PNG** (via Puppeteer), nunca o gerador de IA do Canva. O Canva serve só como
   **fonte de foto/asset**. Isso garante diagramação autoral e identidade de marca, não arte
   genérica. (Documentado em `niches-library/design-principles/metodo-criativo.md`.)

5. **Execução na nuvem** (`.github/workflows/gerar-conteudo.yml`): **comprovado funcionando** —
   um GitHub Action roda o gerador no agendamento (cron), com a chave de API como secret, e
   commita o resultado de volta sozinho (o "guaru-bot"). É a prova de que o sistema roda sem
   máquina ligada.

> Para ver qualquer um destes na íntegra, procure o caminho do arquivo no `SNAPSHOT-REPO.md`.

---

## 5. As leis do projeto (o que nunca se quebra) — fonte: `CLAUDE.md`

- **Protocolo de Design (3 camadas):** toda peça nasce de Base Mãe (`design-principles`) →
  regras do nicho → DNA do cliente (`brand-dna.json`). Nunca estilo genérico.
- **Isolamento de assets (inquebrável):** material do cliente é propriedade dele e **nunca** é
  reusado em outro cliente. Só o banco licenciado do nicho roda entre clientes.
- **Ciclo de aprendizado (obrigatório):** todo agente documenta o resultado (sucesso E falha) em
  `learned-lessons.md` (negócio) e `learning-log.md` (design). Quando uma lição se prova em 2+
  clientes do nicho, **promove** para `niches-library/`. É isso que faz o custo cair e o moat
  crescer.
- **Stack:** Node.js, arquivos locais leves (JSON/MD/CSV > banco pesado), zero deps
  desnecessárias, reaproveitar antes de criar, sem features especulativas.

---

## 6. Os documentos estratégicos (índice — todos no snapshot)

| Arquivo | O que cobre |
|---|---|
| `VISION.md` | O norte / o sonho do Marcos |
| `BUSINESS-MODEL.md` | Pitch, pricing, unit economics, custo de build, GTM, riscos |
| `DIFERENCIAL.md` | O moat: por que não somos "mais uma IA" (ver seção 8) |
| `PRODUTO.md` | A planta do Estágio 3→4: WhatsApp, billing, tráfego, loop de feedback |
| `ESCOPO-AUTOMACAO.md` | Mapa de execução: % pronto por peça, Alvo A vs Alvo B, o que falta |
| `ESCOPO-ESTUDO.md` | Auto-estudo: a Faculdade (RAG) + trava anti-deriva (curadoria humana) |
| `PLANO-FINANCEIRO.md` | Roadmap financeiro |
| `CLAUDE.md` | As leis do projeto (regimento interno do desenvolvimento) |

---

## 7. Pra onde vamos (a planta do produto — `PRODUTO.md`)

O cliente final vai operar tudo **pelo WhatsApp**: onboarding por questionário (preenche o
`brand-dna.json` sozinho), geração → confirmação → postagem, **loop de feedback** (like/dislike +
**revisão por áudio**, "jeito BR"), **billing** via plataforma de cobrança recorrente brasileira
(Pix Automático/cartão; nunca cartão no chat), **bônus de tráfego** na assinatura como gancho, e
um **gestor de tráfego conversacional** (o cliente fala com a campanha por áudio e abastece crédito
pelo zap). Tudo isso é **Estágio 3→4** — planta coerente com a arquitetura atual, a construir
depois de provar o Alvo A.

---

## 8. O diferencial (decore isto) — `DIFERENCIAL.md`

> **GPT é uma faca. Nós somos um chef que já cozinhou o seu prato mil vezes.**

O modelo de IA **não** é o diferencial (qualquer um usa). O fosso mora **acima** do modelo, em 5
camadas que **compõem com o tempo** e não se copiam num fim de semana:
1. **Especialização que acumula** (regras validadas por nicho).
2. **Não é assistente, é um departamento de marketing autônomo** (removemos o operador humano).
3. **A corrente inteira** (pesquisa → conteúdo → peça → agenda → posta → tráfego → resultado → CRM).
4. **Memória de marca** (consistência visual pra sempre).
5. **Auto-melhoria** (cada peça/livro/cliente deixa o sistema mais especialista).

**Frase de venda:** *"IA genérica te dá uma ferramenta pra você operar. A Guaru entrega o resultado
sozinha — e fica mais especialista no seu nicho a cada dia."*

---

## 9. Modelo classe A/B e o nicho do Alvo A (DECIDIDO 2026-06-23)

**Descoberta-marco (2026-06-23):** nichos se dividem em duas classes pela dependência de imagem —
- **Classe A "produto é a foto"** (comida, beleza, interior, moda): conteúdo honesto depende de
  foto real do cliente; foto genérica/stock quebra a confiança ("não é o meu produto"). Para uma
  conta nossa (Alvo A) não dá. **Parqueada como ponta aberta** (volta depois; ver `mercado-classe-b.md`
  pra a calibragem por individualidade do produto — coxinha padronizado vs hambúrguer autoral).
- **Classe B "autoridade/serviço"** (psicólogo, advogado, saúde, pet, fitness): conteúdo é
  conhecimento/confiança → stock (Unsplash) + design autoral encaixam liso. **É o foco de expansão**
  (mais automatizável → custo de servir cai → north-star).

**Nicho do Alvo A = PSICÓLOGO** (decidido por pesquisa de mercado: ~400–574k profissionais, solo,
Instagram-nativo, conteúdo 100% conceitual = fit mais limpo pra provar o sistema). O mapa completo
do universo classe B e a inteligência de mercado de 16 nichos estão em
**`niches-library/mercado-classe-b.md`** (mapa de expansão — onde clonar depois do Alvo A).

**Estado (sessão de BUILD, 2026-06-23):** Alvo A nomeado = **@psi.automatic** (vitrine de conversão;
Guaru Tech segue como a EMPRESA — o @ é só o nome do perfil/MVP). Identidade em `Projetos/psi-automatic/`
(`brand-dna.json`, `bio.md`, `conteudo-da-vitrine.md` = fórmula **dor→prova→CTA** num post só + como a
SaaS diferencia vitrine×cliente por config, `legenda-modelo.md`). `niches-library/psicologia/` completa
(+ `pautas-conteudo`, `panorama-competitivo`, `referencias.md` das refs visuais @nicoleholz.psi /
@psilarihoffmann destiladas). Faculdade ganhou: naming, métricas de relatório, **identidade-visual/
consistência**. **Renderizador COMPARTILHADO em `tools/render/`** (HTML+SVG→PNG via puppeteer, instalado
UMA vez — não duplicar por cliente; antes vivia dentro do freitas-hair, foi promovido). **Peças-teste
renderizadas:** `teste-01` (capa "ansiedade") e `teste-carrossel-01` (carrossel "amar×depender", já como
MOLDE parametrizado pelo brand-DNA, com slide navy invertido p/ ritmo).

**Regras-chave travadas nesta sessão (importantes):** a máquina PROPÕE o tema (não pergunta ao humano);
NÃO mencionar "feito por IA" (vender o BENEFÍCIO "no automático/sem você fazer", não o mecanismo);
consistência de marca = brand-DNA + molde parametrizado (consistente por construção) e = mesmo ESTILO
(fonte pode variar, salvo se o cliente travar); design valida-se no OLHO, não codificando cor em regra
(referência é VISUAL); foto não é regra (mescla); legenda nasce junto/mesmo-tópico, com limite de tamanho.

**Próximo passo:** iterar o visual no olho (mais drama de composição, foto em alguns slides, palavras
maiores — feedback do Marcos) → consolidar o MOLDE parametrizado. Profundidade em UM vertical é defensável.

---

## 10. Como me manter sincronizado (Gemini) daqui pra frente

Quando este contexto envelhecer ou você bugar de novo, o Marcos só roda
`node tools/gerar-snapshot.mjs` no projeto, gera um `SNAPSHOT-REPO.md` fresco, e reanexa ele + este
dossiê. **Não cole conteúdo no chat** — anexe os arquivos. Foi o excesso de texto no chat (não a
quantidade de informação) que te derrubou antes: anexo o sistema processa de uma vez; chat acumula
token a cada turno até estourar.
