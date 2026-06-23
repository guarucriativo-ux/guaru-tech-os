# 02 — Content Generator

Gerador de conteúdo, roteiros e copys com agentes experts (um agente por tipo de conteúdo:
post, roteiro de vídeo, copy de anúncio, e-mail).

## Motor (`generate.js`)

Script Node.js que lê `../client-context.md` e `./engine-content.md`, chama a API da Anthropic
e salva o pacote semanal em `outputs/semana-<NN>.md`. Já vem pronto neste template — ao clonar
a pasta para um novo cliente, o motor funciona sem alterar nada no código (os paths são
relativos ao próprio script).

```bash
npm install
export ANTHROPIC_API_KEY="sk-ant-..."   # nunca commitar a chave
npm run generate -- --week=01 --focus="<foco comercial da semana>"
```

`engine-content.md` é o molde genérico de conteúdo — revisar/ajustar por cliente se o formato
de pacote (Criativo Visual + Roteiro de Reels + Copy/Legenda) não se aplicar 1:1 ao nicho.
