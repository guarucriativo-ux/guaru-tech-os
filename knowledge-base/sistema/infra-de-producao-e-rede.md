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

## Como abrir a rede neste terminal (passo a passo — ação do Marcos)
1. No app do Claude Code, achar o **ícone de nuvem** (aparece onde se inicia a sessão na nuvem / configura routine).
2. **Abrir o environment para edição** → usar o seletor **"Network access"**.
3. Escolher **Custom** → no campo **"Allowed domains"** colar (1 por linha) e manter marcado *"include default
   package managers"*:
   `design.canva.ai` · `*.canva.com` · `api.openverse.org` · `images.openverse.org` · `*.pexels.com` · `*.unsplash.com`
   *(ou escolher **Full** = libera tudo, mais simples/menos seguro.)*
4. Salvar. Pronto — foto do Canva e dos bancos passam a fluir neste terminal.
> ⚠️ É config de ambiente, **não** de repo — o Claude **não** consegue mudar de dentro. Doc oficial: `claude-code-on-the-web`.

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
