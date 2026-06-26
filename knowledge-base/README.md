# Knowledge Base — a "Faculdade" do Guaru Tech

A base de conhecimento que o sistema **consulta antes de criar** (RAG — o sistema lê a parte certa
da biblioteca toda vez que trabalha). Não é o modelo "decorando" livros — é o sistema tendo uma
biblioteca de referência consultável. Ver `ESCOPO-ESTUDO.md` na raiz para a arquitetura completa.

## Como usar
1. **Despeje conhecimento aqui em texto** (`.md` ou `.txt`) — livros, artigos, transcrições de
   videoaula, anotações de curadoria. **Só texto** (nada de imagem nesta pasta).
2. Organize por área (pastas abaixo). Um arquivo por fonte; no topo do arquivo, anote a origem
   (título, autor, link) numa linha de comentário.
3. Consulte com: `node core/kb-query.js "sua pergunta aqui"` — retorna os trechos mais relevantes.
   (É a v1, busca por palavra-chave; evolui pra busca semântica por embeddings depois.)

## Estrutura (por área)
```
knowledge-base/
├── design/          ← teoria de design, diagramação, tipografia, cor
├── copywriting/     ← copy, headlines, persuasão, storytelling
├── marketing/       ← tráfego, funil, posicionamento, branding
└── por-nicho/       ← conhecimento específico de setor (ex.: hamburgueria, cabelo-loiro)
```

## O que alimentar (e o que NÃO)
A faculdade é **TEXTO** (o "porquê"/raciocínio). Imagem é outra coisa — vai pro banco visual, NÃO aqui.

**Organize por DISCIPLINA, não por formato.** Não faça pasta "livros" ou "vídeos"; o formato é só a
fonte (livro → texto; videoaula → transcrição → texto; artigo/anotação → texto), e vai pra pasta do assunto.

Hierarquia de valor (o que rende mais pro RAG):
1. 🥇 **Frameworks e regras** — fórmulas/leis que viram regra reutilizável (CRAP, AIDA/PAS, teoria de
   cor, hierarquia tipográfica, leis de UX, gatilhos de Cialdini).
2. 🥈 **Estudos de caso com o raciocínio** ("funcionou por causa de X").
3. 🥉 **Livros densos** (puxa-se em pedaços; capítulo denso = ouro, livro enrolado = ruído).
4. ❌ Baixa alavanca: inspiração puramente visual (→ banco de imagem) e listicle genérico.

**Destilar > despejar:** uma página sua de princípios afiados vale mais que um livro enrolado.
**Legal/qualidade:** alimentar para o sistema **aprender o princípio**, nunca para republicar texto
literal numa peça de cliente. Anote a origem de cada arquivo.

## Regra de captura — NO MOMENTO, nunca "depois" (alinhamento Marcos 2026-06-26)
"Organizar a faculdade depois" é hábito ruim: vira dívida, obriga a reler tudo pra decidir o que importa, e
queima produtividade. **Captura-se o aprendizado na HORA em que ele acontece** — e usa-se o roteador abaixo pra
não pensar caso a caso.

**Teste rápido:** *"isso vai ser CONSULTADO/REUSADO depois?"* — Não → **não salva**. Sim → vai pro lugar certo, AGORA:

| O aprendizado é… | Onde mora |
|---|---|
| Framework/regra/método que ajuda a **FAZER uma peça** | `knowledge-base/<área>/` (faculdade) |
| Como a **fábrica/o especialista OPERA** (doutrina de método) | `knowledge-base/sistema/` |
| Conhecimento de **UM cliente** (o que funcionou/falhou) | `Projetos/<cliente>/learned-lessons.md` |
| **Feedback de design** por peça de um cliente | `Projetos/<cliente>/learning-log.md` |
| Regra de design que virou **GERAL** (Marcos confirma OU 2+ clientes) | `niches-library/design-principles/` (Base Mãe) |
| **QUEM somos / pra ONDE vamos / quanto valemos** (estratégia/identidade) | raiz do repo |
| ❌ **Teste descartável, exercício, craft pontual não-validado, qualquer coisa que não se reusa** | **não salva** |

## 🎓 Portão de curadoria (cultura da faculdade — constituição em `ESCOPO-ESTUDO.md`)
Faculdade = **ensino que vira RESULTADO na entrega**, não depósito. Excesso = **gordura no cérebro** (dilui o
RAG). **Curar é subtrair tanto quanto somar.** Um doc só entra/permanece se passa nos **4 testes**:
1. **Backward da entrega** — qual peça/entrega de qual colaborador isto melhora? Não muda nada → fora.
2. **Transferível, não fato avulso** — vale em vários casos/clientes? Fato/decisão pontual → fora.
3. **Profundidade > amplitude** — uma página afiada > dez; tem duplicata? **funde**.
4. **Alinhado** — diz QUAL colaborador usa e QUAL entrega melhora; órfão → corte.

**NÃO é faculdade** (vai pra `decisoes/` ou raiz): decisão, estratégia, preço de fornecedor, roadmap/capacidade
não-construída, infra, status, teste. **Auditoria SEMANAL** (`decisoes/auditoria-faculdade-<data>.md`): o que
não passa nos 4 testes, funde/move/poda.

> ⭐ **Exceção que manda em tudo:** o que o **Marcos ensina** é currículo PRIMÁRIO — **sempre entra** e o
> colaborador **segue à risca** (lição do Marcos = REGRA, não régua). A poda é só pra gordura (decisão/
> duplicata/órfão/não-ensino), **nunca** pras lições dele. Faculdade = curadoria do Marcos **+** estudos, juntos.

## Princípio (não cair no mito)
Encher a pasta NÃO deixa o modelo (Claude) mais inteligente sozinho — ele é congelado. O que fica
mais inteligente é o **sistema**, porque passa a **consultar** este acervo ao gerar, e porque a
curadoria daqui vira **regra** na `niches-library/`. A sabedoria mora na biblioteca + nas regras,
alimentadas pelo Marcos. Sem curadoria humana de âncora, estudo automático deriva (ver ESCOPO-ESTUDO).

## Licença / origem
Anote a origem de cada texto. Conteúdo de terceiros entra como **referência de estudo**, não para
republicação literal — o sistema aprende o princípio, não copia o texto.
