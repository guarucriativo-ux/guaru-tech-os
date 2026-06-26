# Distribuição: auto-postagem em massa (decisão + spec pra fechar depois)

<!-- Marcos (2026-06-26): pesquisar auto-postagem (gancho do reel "100 perfis"), salvar, conferir o código e
     deixar "a 1 metro" de fechar. Pesquisa jun/2026 (direcional). É capacidade/infra → decisoes/, não faculdade. -->

> O elo de **distribuição** da cadeia de valor (postar o conteúdo às pessoas, sozinho). Hoje a fábrica **gera
> mas não posta**. Isto fecha parte do gargalo (`sistema/operacao-da-fabrica-cadeia-de-valor.md`).

## ✅ Achado no NOSSO código (conferido 2026-06-26)
- `01-ads-engine/traffic-manager.js` = só **blueprint de tráfego PAGO** (gera config de campanha; maquete, não
  publica de verdade). 
- `03-automation-bridge/image-engine.js` = motor de **imagem** (criativo), não postagem.
- **Auto-postagem ORGÂNICA = campo aberto** (não existe no código). É o que falta construir.

## As 3 estradas (mesma lógica do Lovable: preferir DONO DE TUDO)
### 1. 🟢 CONSTRUIR no oficial — Meta Graph API (Content Publishing) + nosso scheduler
- Postar em IG Business/Creator pela **API oficial** + um **agendador nosso** (cron/fila lendo de `outputs/` +
  um calendário). Dono de tudo, sem assinatura, no nosso código (VSCode + Claude Code).
- **Caveats (importantes):** exige **conta IG Business ligada a Página do FB** + **app na Meta + token** (+
  app review pra publicar). **Reels só até 90s via API** (a API não acompanha os 3min do app). **Limites:**
  ~25–100 posts/24h por conta; ~200 req/h. Reels precisam de **polling** (o vídeo processa antes de publicar).
- É a base durável pra postar nas contas dos NOSSOS clientes com segurança.

### 2. 🟢 SELF-HOST open-source — Postiz ou Mixpost (o meio-termo pragmático)
- **Mixpost** / **Postiz** = agendadores open-source **self-hosted**, multi-plataforma (IG/FB/TikTok/YouTube/X),
  **sem assinatura/sem limite** (só o teu servidor), com UI de calendário. **Postiz é "agentic"** (encaixa no
  nosso modelo de agente). Dono de tudo, e mais rápido que construir do zero. **Casa com a decisão de HOST** (a
  gente já vai escolher onde hospedar — sobe o Postiz junto).
- Ótimo pra ter UI de agendamento sem virar dev-house de scheduler.

### 3. 🟡 SaaS (Publer / Metricool / Buffer / speedpost) — só pra começar rápido/validar
- **Publer** = bulk/CSV em massa, barato, multi-conta. **Metricool** = forte em analytics. Rápido, mas
  **custo recorrente + lock-in + limites** deles. ⚠️ **speedpost e "post como humano"**: muitos usam métodos
  NÃO-oficiais → **risco de ban**. Pra conta de CLIENTE real, **nunca** arriscar com API cinza → usar oficial.

## Recomendação (consistente com a nossa cultura)
- **Curto prazo / validar:** se precisar postar JÁ, um SaaS barato (Publer) resolve — mas só pra testar, ciente do lock-in.
- **A fábrica de verdade = DONO DE TUDO:** **self-host Postiz/Mixpost** (UI + multi-plataforma, sem assinatura),
  e/ou **Graph API oficial + nosso scheduler** quando quiser controle total e integração com o motor (publicar
  direto de `outputs/`). Decidir junto com o **HOST** (Estágio 3→4) — é o mesmo servidor.
- ⛔ Nada de método cinza em conta de cliente (ban). Conteúdo AUTORAL nosso, contas reais — não o spam do reel.

## O "1 METRO" — spec pra voltar e fechar (não construir agora; sem código especulativo)
Quando formos construir a distribuição (depois do host + motor de resultado), o módulo `poster`/distribuição:
- [ ] Conectar conta IG Business (token Graph API) por cliente — guardar credencial com segurança.
- [ ] **Scheduler** (cron/fila): lê os `outputs/` aprovados + um **calendário** (X posts/dia, horários) → publica.
- [ ] Publicar **reel/imagem/carrossel** via Graph API (com polling pro reel processar) + legenda/CTA.
- [ ] **Aprovação antes de postar** (portão — Marcos aprova no mural; liga com o mural de aprovação/Lovable-não).
- [ ] **Log no ledger** (o que postou, quando) — anti-repetição + relatório.
- [ ] Respeitar limites (25–100/dia, 200 req/h) e fila por conta.
- **Decisão pendente:** construir do zero (Graph API) **vs** subir Postiz self-host e integrar. Resolver no momento do host.

## Liga com
`sistema/operacao-da-fabrica-cadeia-de-valor.md` (elo distribuição) · `decisoes/ambiente-de-build-vscode.md` +
`infra-de-producao-e-rede.md` (host) · `decisoes/aprendizados-de-mercado.md` (o reel que levantou o tema) · roadmap.
