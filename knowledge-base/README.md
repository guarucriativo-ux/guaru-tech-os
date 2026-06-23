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

## Princípio (não cair no mito)
Encher a pasta NÃO deixa o modelo (Claude) mais inteligente sozinho — ele é congelado. O que fica
mais inteligente é o **sistema**, porque passa a **consultar** este acervo ao gerar, e porque a
curadoria daqui vira **regra** na `niches-library/`. A sabedoria mora na biblioteca + nas regras,
alimentadas pelo Marcos. Sem curadoria humana de âncora, estudo automático deriva (ver ESCOPO-ESTUDO).

## Licença / origem
Anote a origem de cada texto. Conteúdo de terceiros entra como **referência de estudo**, não para
republicação literal — o sistema aprende o princípio, não copia o texto.
