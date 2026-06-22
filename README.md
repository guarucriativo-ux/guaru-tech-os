# Guaru Tech

> Criado em 21/06/2026. Marca/linha de serviço separada do Guaru Estúdio (DTF/apparel/e-commerce):
> desenvolvimento de software e sites vendido para terceiros, com branding/design como parte do
> pacote quando o cliente precisa. Diferente das frentes em `Status_Frentes.md` (que ainda são
> pré-faturamento), Guaru Tech já tem caixa entrando.

## Estrutura

```
Guaru Tech/
└── Projetos/
    └── Alkimia/          ← 1º projeto/cliente ativo
        ├── Briefing/      Briefing_Novo_Cliente.pdf é o template genérico de onboarding —
        │                  reaproveitar para o próximo cliente, não é específico da Alkimia
        ├── Logo/
        ├── Conteudo/
        ├── Fotos Originais/
        ├── Porfolio Rebrand/   referências de campanha (4NLogic, Old Rats Metal Parts)
        ├── Preview Projeto/    alkimia-demo-site.html — demo de redesign (21/06/2026)
        ├── Ref. Catalogo/
        └── alkimia_teste1/
```

## Core — CLI `guaru` (Node.js)

Camada de gestão de clientes e do ciclo de aprendizado. Zero dependências (Node puro, ESM).

```
guaru new <nome>                    Clona template-client-base em Projetos/<slug>
guaru list                          Lista clientes + status de conformidade
guaru doctor <cliente>              Valida se o cliente segue o template
guaru dna <cliente> [campo[=valor]] Lê/escreve brand-dna.json (ex: palette.primary=#FF6600)
guaru learn <cliente> --titulo ... --contexto ... --resultado ... --licao ...
guaru log <cliente> --peca ... --feedback ... --acao ...
```

Rodar via `node cli/index.js <comando>` (ou `npm run guaru -- <comando>`).

```
cli/index.js        parser de args + dispatch
cli/commands/       um arquivo por comando
core/client-repo.js localizar/clonar/listar/validar clientes
core/brand-dna.js   ler/escrever/validar brand-dna.json
core/learning.js    anexar entradas em learned-lessons.md / learning-log.md
```

`Projetos/<cliente>/` (clonado de `template-client-base/`) é o padrão único. `guaru doctor`
sinaliza clientes fora do molde — hoje a Alkimia diverge (estrutura legada, pré-CLI).

## Status — Alkimia

- Cliente: **Alkimia Produções**
- Entregável em andamento: demo de redesign de site (`Preview Projeto/alkimia-demo-site.html`)
- Próximo cliente: usar `Briefing/Briefing_Novo_Cliente (1).pdf` como ponto de partida

## Pendências de organização

- Nenhum outro projeto/cliente cadastrado ainda além da Alkimia
- Sem registro de preço/proposta padrão para esse serviço (escopo, ticket médio, contrato)
