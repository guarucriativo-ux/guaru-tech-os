# Guardrails de Gasto — os 3 Tetos (cânone de segurança) · Módulo E2 do Gestor 🔴

<!-- Faculdade · curriculo Gestor de Tráfego, Fase 3 — matéria de SEGURANÇA (prioridade nº1). Doutrina + spec
     do que construir (liga com o backlog do ESTADO-ATUAL: "3 tetos de gasto não existem em código"). -->

> **Antes de saber escalar, o gestor tem que saber NÃO QUEBRAR ninguém.** Gastar dinheiro de cliente exige
> segurança de nível bancário. Um bug ou erro de config NÃO pode esvaziar o cartão do cliente. Esta é a
> matéria que protege a fábrica (reputação) e o cliente (bolso) — inegociável, vem antes de performance.

## A regra de ouro
**Toda campanha nasce PAUSADA**, com tetos configurados ANTES de qualquer veiculação. Liga-se só depois de
conferir os 3 tetos. Falha de segurança = parar tudo (fail-safe), nunca "deixar rodando na dúvida".

## Os 3 TETOS (defesa em camadas — cada um pega o que o outro deixou passar)
1. **Teto da CONTA (account spending limit):** limite duro de gasto total na conta de anúncios. É a última
   barreira — mesmo que tudo dê errado, a conta para sozinha ao bater o teto. Configurado na plataforma.
2. **STOP-LOSS (gatilho de prejuízo):** regra automática que **pausa** campanha/ad set quando uma métrica
   estoura (ex.: CPA > X, ou gasto sem nenhuma conversão após R$Y, ou ROAS < mínimo). Corta a sangria antes
   de virar rombo. (Meta Automated Rules / Google rules + monitor próprio.)
3. **Teto por CLIENTE (config de guardrail):** o limite combinado com AQUELE cliente (orçamento mensal/diário
   acordado), no nosso config — a fábrica nunca gasta além do contratado, por cliente, independente da plataforma.

## Princípios de operação segura
- **Defaults conservadores:** orçamento diário baixo no começo; subir só por decisão (escala gradual, módulo E1).
- **Tudo logado e auditável:** quanto cada cliente gastou, quando, por quê. (Liga com o ledger/learning-log.)
- **Alarmes antes do teto:** avisar em 70–80% do teto, não só ao estourar.
- **Princípio do menor susto:** na dúvida entre gastar e pausar → **pausar** e avisar o humano.
- **Separação por cliente:** o gasto de um cliente nunca toca o de outro (isolamento, como os assets).

## Spec do que construir (roadmap — backlog nº4 do ESTADO-ATUAL)
- [ ] `daily_budget` hoje é só um número num JSON → virar **3 tetos reais**: account limit (via API) +
  stop-loss (regras automáticas + monitor) + teto-cliente (config + checagem antes de subir/escalar).
- [ ] Campanha nasce `PAUSED`; checklist de segurança antes de ativar.
- [ ] Log de gasto por cliente + alarme em 70–80%.
- [ ] Kill-switch global (pausar tudo de um cliente/da conta num comando).

## Como isto MUDA a entrega (backward)
1. **Configurar os 3 tetos ANTES de veicular** — sem teto, não liga.
2. **Campanha nasce pausada**; ativar só após checklist.
3. **Stop-loss automático** + alarme antes do teto.
4. **Na dúvida, pausa e avisa** (fail-safe).

## Erros que este módulo proíbe (graves)
Subir campanha sem teto de conta · confiar só no orçamento diário (sem stop-loss) · gastar além do contratado
com o cliente · deixar rodando "na dúvida" · não ter kill-switch · gasto de um cliente afetar outro · não logar/alarmar.

## Pra aprofundar
Meta — Account Spending Limit & Automated Rules · Google Ads — budget caps & automated rules. Doutrina da
fábrica: este módulo + backlog do `ESTADO-ATUAL.md`.
