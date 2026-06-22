# 02 — Content Generator

Gerador de conteúdo, roteiros e copys com agentes experts (um agente por tipo de conteúdo:
post, roteiro de vídeo, copy de anúncio, e-mail).

## Uso

```bash
npm install
export ANTHROPIC_API_KEY="sk-ant-..."   # nunca commitar a chave
npm run generate -- --week=02 --focus="<foco comercial da semana>"
```

O resultado é salvo em `outputs/semana-<week>.md`. O script lê `../client-context.md` e
`./engine-content.md` por padrão (paths relativos a ele mesmo) — para reaproveitar em outro
cliente, clone a pasta inteira (`generate.js` incluso) e os defaults já apontam para o
`client-context.md` do novo cliente. Para apontar para um contexto fora do padrão, use
`--context=<path>` e `--engine=<path>`.
