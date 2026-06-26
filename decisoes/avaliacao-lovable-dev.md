# Avaliação — Lovable.dev pra fábrica (decisão, não faculdade)

<!-- Marcos pediu (2026-06-26) análise do Lovable.dev e se ajuda a fábrica. Pesquisa jun/2026 (direcional).
     É avaliação de FERRAMENTA/decisão → mora em decisoes/, não na knowledge-base. -->

## ⭐ REVISÃO (Marcos 2026-06-26): "isso a gente já faz com VSCode" — CORRETO
> Marcos cravou: o que o Lovable faz, a fábrica já faz com o que tem (Claude Code no VSCode). **Ele está certo,
> e eu tinha superestimado o Lovable.** **O Claude Code É um dev de IA** — gerar app full-stack (React/Supabase/
> login/Stripe/landing/dashboard) direto no NOSSO repo é exatamente o que eu faço. "Construir o app" **não é**
> uma capacidade que nos falta.
>
> **O que o Lovable adiciona de verdade (e só isso):** um **embrulho GERENCIADO** — (a) hosting/deploy 1-clique
> + Supabase pré-fiado + domínio (tira o trabalho de DevOps), e (b) **preview visual + edição por prompt pra
> não-programador** (o Marcos mexer sem mim). É **conveniência de infra/UX, não capacidade de código.**
>
> **Custo de adotar:** assinatura recorrente + **lock-in** + dados no Supabase deles + o "último 30%" que briga.
> Isso vai **contra** a nossa cultura (dono de tudo, sem lock-in, sem custo recorrente desnecessário, a fábrica
> constrói as próprias ferramentas).
>
> **VEREDITO REVISADO:** **default = construir nós mesmos** (eu + VSCode + host grátis tipo Vercel/Supabase
> que a gente controla). O Lovable **só se paga** se a gente quiser (1) pular DevOps num MVP bem rápido, ou (2)
> dar pro Marcos editar no visual sem mim. Pra agora, **não precisamos** — a gente já tem o dev (eu). O gargalo
> real não é "construir o app", é **decidir o host/infra de produção** (o tijolo grande do Estágio 3→4) — e isso
> a gente resolve escolhendo nossa stack, não terceirizando no Lovable. _(O texto abaixo é o estudo original,
> mantido como registro — mas lido sob esta revisão.)_

## O que é (em uma linha)
**Construtor de app full-stack por IA ("vibe coding"):** você descreve em texto e ele gera o app web pronto —
front (React/TypeScript/Tailwind) + back (Supabase: banco, login, pagamento Stripe, storage) + **deploy 1 clique**
+ **sync com GitHub** (você é dono do código). Pricing: free (5 créditos/dia), Pro $25/mês (100 créditos), Business $50.
Detalhe quente pra nós: tem **integração MCP com Claude/Claude Code** → o NOSSO agente pode dirigir o Lovable.

## Onde ele NÃO entra (pra não confundir)
- **Não é pra criar criativo** (carrossel/post). Isso é o nosso `compor.js`/render — Lovable não substitui nada disso.
- **Não é pra o núcleo crítico do tráfego** (Meta API + 3 tetos de gasto). Isso é **segurança financeira** → fica
  como NOSSO código controlado, testado, não "vibe-coded". (Regra: nunca terceirizar o que não pode falhar com dinheiro.)
- Limite conhecido: leva ~70% do caminho; os últimos 30% de SaaS complexo "brigam" com você (créditos/debug). Web-only.

## Onde ele AJUDA muito a fábrica (ranqueado por valor × baixo risco)
1. **🟢 Mural de aprovação + cockpit interno (MVP imediato).** O "mural de aprovação no Notion/Canva" que está
   pendente no ESTADO-ATUAL: o Lovable monta rápido um app com login + banco onde Marcos/cliente vê e **aprova
   a arte em tela cheia do celular**. E um **painel da fábrica** (clientes, outputs, gasto/3-tetos, status).
   Baixo risco (uso interno), alto ganho de operação. Casa com `04-crm-systems` (que é só stub hoje).
2. **🟢 Landing pages pra tráfego (liga designer ↔ gestor).** O gestor precisa de **página de captura** pra
   campanha (lead/agendamento). Lovable cospe landing com formulário + banco + pixel rápido → fecha o funil
   (criativo da fábrica → landing → conversão → relatório). Alto valor, risco médio.
3. **🟡 Web/app como SERVIÇO vendável (expansão de ticket).** O DNA do Estúdio já prevê "expansível: web
   design". Lovable permite **vender site/app simples pra pequeno negócio** (landing, agendamento, catálogo)
   com custo de produção perto de zero — nova linha de receita no modelo SwaS. (Validar último 30% por caso.)
4. **🟡 Protótipo de produto/ferramenta interna** (qualquer ferramenta com UI que hoje a gente não faz por
   falta de front). Antes era Node+terminal; com Lovable a fábrica ganha braço de **interface**.

## Por que combina com a nossa filosofia
- **Dono do código (GitHub sync)** = sem lock-in, bate com "tudo no Git / fonte da verdade". 
- **1 cérebro + config / agente:** com o **MCP**, o próprio Claude Code constrói o app → a fábrica passa a
  construir as PRÓPRIAS ferramentas e as do cliente, sem virar dev-house.
- **Custo baixo pra prototipar** (free/Pro $25) → testar sem compromisso, como fizemos com foto/vídeo.
- **SwaS:** transforma "site" de projeto pontual em serviço com produção barata (margem alta).

## Riscos / disciplina
- **Não vibe-codar o crítico** (gasto/tráfego/segurança) — só UI/MVP/landing/dashboard.
- **Dados do cliente saem pro Supabase/serviço** → LGPD/privacidade por caso.
- **Custo por crédito** escala com uso; complexo = caro/frustrante (o "último 30%").
- **Dependência externa** — ok pra ferramenta/MVP, cuidado em produção-core.

## Veredito
**Sim, ajuda — num lane específico:** é o **braço de INTERFACE/produto** que falta na fábrica (mural de
aprovação, cockpit, landing pages, e até web como serviço). NÃO toca o criativo (já temos) nem o crítico de
gasto (fica nosso). **Próximo passo barato:** prototipar o **mural de aprovação** no free tier (resolve uma dor
real já listada) e medir. Possível plugar via **MCP do Lovable** no nosso Claude Code.
