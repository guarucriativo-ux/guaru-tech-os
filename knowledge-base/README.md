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

## Princípio (não cair no mito)
Encher a pasta NÃO deixa o modelo (Claude) mais inteligente sozinho — ele é congelado. O que fica
mais inteligente é o **sistema**, porque passa a **consultar** este acervo ao gerar, e porque a
curadoria daqui vira **regra** na `niches-library/`. A sabedoria mora na biblioteca + nas regras,
alimentadas pelo Marcos. Sem curadoria humana de âncora, estudo automático deriva (ver ESCOPO-ESTUDO).

## Licença / origem
Anote a origem de cada texto. Conteúdo de terceiros entra como **referência de estudo**, não para
republicação literal — o sistema aprende o princípio, não copia o texto.
