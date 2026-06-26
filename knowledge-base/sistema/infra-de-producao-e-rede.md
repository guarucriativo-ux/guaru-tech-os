# Onde a fábrica roda: dev (sandbox restrito) vs produção (infra nossa, rede aberta)

<!-- Origem: dúvida do Marcos (sessão nuvem 2026-06-26) — "o bloqueio de imagem vai existir quando o usuário usar
     pelo WhatsApp?". Esclarece a arquitetura de execução/rede. Liga com: PRODUTO.md, ESCOPO-AUTOMACAO.md. -->

## A regra (resolve a confusão recorrente)
O **bloqueio de imagem/host é característica do SANDBOX de desenvolvimento** (Claude Code na web, política de rede
restrita por segurança) — **NÃO do produto.** Em produção, a fábrica roda em **infra NOSSA**, onde **nós** controlamos
a rede e liberamos exatamente os hosts necessários (bancos de imagem, Canva, Meta, Anthropic). Sem bloqueio.

## Ambiente de DEV (hoje, este terminal)
- Claude Code na web = sandbox com rede nível **Trusted** (só registries/GitHub). Canva-pixels, Openverse, Pexels = 403.
- Para usar imagem aqui: abrir **Network access → Custom** (allowlist) ou **Full** — **ação do Marcos** no app
  (não dá pra mudar por código/de dentro). Ou rodar no PC (rede livre).
- O conector MCP (ex.: Canva metadados) funciona mesmo no Trusted, pois roteia pela Anthropic — mas **pixels** não.

## Ambiente de PRODUÇÃO (o destino — Estágio 3→4, a construir)
```
Usuário (WhatsApp dele) ↔ WhatsApp Business API ↔ NOSSO SISTEMA (servidor/infra nossa, nuvem)
   gera copy (API Anthropic) → busca a foto certa (banco/Canva) → compõe (HTML+SVG) → renderiza → devolve no zap
```
- Roda em **infra nossa** (servidor/container/função na nuvem), **não** no sandbox do Claude Code.
- **Nós abrimos a rede** no que precisa (bancos, Canva, Meta, Anthropic) → **sem bloqueio de imagem**.
- O usuário nunca toca em sandbox; só conversa no WhatsApp. O trabalho roda do nosso lado.

## Conclusão
A limitação de rede do dev **não ameaça o produto** — é só ambiente. O produto exige montar essa **infra de produção
24/7** (render na nuvem + WhatsApp API + busca de imagem aberta), que é uma das costuras do Estágio 3→4
(ver `ESCOPO-AUTOMACAO.md`). Hoje: conteúdo roda em GitHub Actions; render no PC. Falta o servidor de produção.
