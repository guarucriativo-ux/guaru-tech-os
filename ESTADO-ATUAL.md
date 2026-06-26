# ESTADO-ATUAL.md — ponto de parada vivo (bastão entre terminais)

> **Para o Claude que abrir este projeto em QUALQUER terminal (PC, celular/Claude Code na web):**
> Esta conversa não viaja entre sessões — mas este arquivo sim. Leia-o (+ `CLAUDE.md` + `MANIFESTO.md`)
> ANTES de agir, pra entrar no contexto de onde paramos. Ao terminar/mudar algo relevante, **atualize
> este arquivo** e dê `push`. É assim que os terminais se entendem sem confusão.

---

## 🔁 RETOMADA (leia PRIMEIRO se você é uma sessão nova — 2026-06-26)
> ⚠️ **Todo o trabalho recente está na branch `claude/sync-resume-progress-4nd64x`, NÃO na `main`.**
> Se você abriu na `main`, você NÃO está vendo o trabalho. Faça antes de tudo:
> ```
> git fetch origin && git checkout claude/sync-resume-progress-4nd64x && git pull
> ```
> Confirme com `git branch --show-current` (tem que ser `claude/sync-resume-progress-4nd64x`).
>
> ### ❌ TESTE DO foto-auto (2026-06-26, sessão nova) — A REDE AINDA ESTÁ FECHADA
> Rodei `node tools/foto-auto.mjs "colorful healthy food bowl" ... --n=1` → **403**. Diagnóstico conclusivo
> (não é o Openverse, é o ambiente): `curl` ao host devolve **`CONNECT tunnel failed, response 403`** = o
> **gateway da rede do sandbox NEGOU a conexão por política** (`api.openverse.org` não está na allowlist desta sessão).
> Ou seja: **mesmo sendo sessão nova, a rede NÃO pegou.** Provável causa: o environment ainda está em **Trusted**,
> ou foi salvo em **Custom sem `api.openverse.org`** na lista.
> **➡️ AÇÃO DO MARCOS (só ele faz, é config de ambiente, não de repo):** abrir o environment no app →
> **Network access → Full** (mais simples) **ou Custom** colando estes domínios (1 por linha, manter "include
> default package managers"): `api.openverse.org` · `images.openverse.org` · `*.pexels.com` · `*.unsplash.com`
> · `design.canva.ai` · `*.canva.com`. **Salvar e ABRIR UMA SESSÃO NOVA** (a política só vale em sessão iniciada
> DEPOIS de salvar). Passo a passo: `knowledge-base/sistema/infra-de-producao-e-rede.md`.

---

## Última atualização
- **Data:** 2026-06-25
- **Terminal:** celular/nuvem (Claude Code na web)
- **Quem vai assumir a seguir:** Marcos — **terminando a curadoria do lote de régua do Guaru Estúdio** (ver abaixo)

## 🔴 FRENTE ATIVA — Régua visual do Guaru Estúdio (NÃO processar antes da hora)
- **Onde:** `Projetos/guaru-estudio/references/regua/`. Já tem **5 imagens cruas** lá (`1.png` + 4 `.jpg` de hash),
  **ainda sem ficha nem nome-padrão** — são o 1º lote, mas **incompleto**.
- **⚠️ TRAVA DO MARCOS (2026-06-25):** ele **ainda está curando** essas refs. **NÃO ler/renomear/destilar agora** —
  ler um lote incompleto contamina a destilação do sistema visual que vai pro DNA. **Esperar ele avisar que fechou.**
- **Protocolo QUANDO ele fechar a curadoria:** absorver o lote inteiro → ler **pixel a pixel** → escrever a ficha de
  anatomia de cada uma → renomear pro padrão `estudio--<movimento>--NN.jpg` → **extrair o sistema visual IGNORANDO o
  produto** (diagramação · equilíbrio · cores · grafismos · tratamento de tipo) → **graduar pro `brand-dna.json` +
  motor + Olho** ("esse É o nosso look"). Guardrail: linguagem absorvida vira peça AUTORAL com copy nossa, nunca clone.
  Doutrina completa: `Projetos/guaru-estudio/references/regua/README.md` (adendos só-do-estúdio).

## Estudo profundo da fábrica (sessão nuvem 2026-06-25)
- A pedido do Marcos, o Claude fez **varredura completa do repo** — leu TODO o código-máquina linha a linha
  (`core/`, `cli/`, `tools/`, motores psi/template, hooks, CI, configs) + destilou TODA a documentação densa
  (estratégia raiz, `knowledge-base/`, `niches-library/`, todas as pastas de `Projetos/`). Contexto 100% absorvido.
- **Achados a resolver quando der (não-bloqueantes):** (1) **preço divergente** entre docs — BUSINESS-MODEL diz
  R$200–1.200/mês vs PRODUTO/PLANO-FINANCEIRO base R$147/mês (falta reconciliar a tabela oficial); (2) **README.md
  defasado** (crava Alkimia como 1º cliente "com caixa", contradito pelo foco atual psi.automatic + 0 pagante);
  (3) **ledger anti-repetição** do motor novo psi.automatic segue como prioridade nº1 a construir (colisão de tema/assinatura).

## Novidades 2026-06-26 (sessão de design + Canva)
- **Designer sênior do Estúdio implementado:** `compor.js` (estrutura `conteudo-direto`) + `checar-guardrails.js`
  do Estúdio + lixo de laboratório limpo. **Vitrine do psi validada** (bracket marca→prova→pitch). **3 nichos
  testados** (psi/estúdio/nutri) = mesmo designer, 3 registros → "designer = 1 cérebro + config" comprovado.
- **Entrega de carrossel = arquivos individuais por slide** (Marcos preferiu, pra baixar/testar cada um). Folha
  de revisão (1 imagem) foi descartada.
- **Foto/asset:** bancos livres (Openverse/Pexels) E **pixels do Canva** (`design.canva.ai`) **bloqueados pela
  rede da nuvem (403)**. **Conector Canva (metadados/comandos) ATIVO** (achou brand kit "GUARU", designs reais).
  **Decisão: DNA pelas PASTAS** (`brand-dna.json`), não pelo brand kit do Canva (caixa-preta). Foto = do cliente
  na pasta / Canva no PC / ou liberar `design.canva.ai`+bancos em Network→Custom. Detalhe:
  `knowledge-base/sistema/fontes-de-dna-e-asset-pasta-vs-canva.md`.
- **foto-auto (esclarecido, pra não repetir a dúvida "isso já não estava pronto?"):** usar foto na arte JÁ
  funciona (`compor --foto`) e o psi tem **~30 fotos reais já curadas no Git** (com licença) → dá pra fazer
  carrossel COM foto **offline, neste terminal**. O que **NUNCA foi codado** é o **download automático**
  (`foto_busca` → baixar do banco): isso é **manual** (ver `LICENSES.md`, "Baixado: …"). "Funciona no desktop e
  não no celular" = no desktop dá pra baixar foto nova à mão (rede livre); na nuvem a rede bloqueia o banco.
  Logo: nicho que JÁ tem foto curada (psi) roda com foto aqui; nicho novo precisa de rede aberta/PC pra baixar.

## Backlog técnico — alinhamento código × visão ampla (auditado 2026-06-25)
Auditoria do código contra `visao-ampla-forca-de-trabalho-digital.md`. Fundação alinhada (faculdade/kb-query,
ledger/aprendizado, modelo clone template→cliente, designer sênior `compor`/`gerar-peca`). Buracos a fechar, em ordem:
1. **🔴 Designer sênior NÃO está no Guaru Estúdio** (braço de caixa). O motor bom (`compor`/`gerar-peca`) vive só
   no `psi-automatic`; o Guaru Estúdio roda o motor velho (`generate.js`+`image-engine.js`) + tem lixo de teste
   (academia/simulados/mona/kameleon). ⚠️ Nuance: o `compor.js` do psi é motor de VITRINE (bracket marca→prova→
   pitch) — não copia verbatim; o Estúdio precisa de estrutura de conteúdo de cliente. Régua do Estúdio segue
   CONGELADA (curadoria) → usar Base Mãe + DNA por enquanto, sem a régua.
2. **Guardrail de marca do Guaru Estúdio não existe** (`checar-guardrails.js` é só do psi). Regras do Estúdio:
   nunca vender "IA", estrutura PAS.
3. **🔴 Gestor de tráfego é maquete** — zero integração real com a API da Meta (só placeholder; gera blueprint
   PAUSED). Falta o loop criar-campanha + ler-relatório + aprender 24/7.
4. **🔴 Os 3 tetos de gasto não existem em código** — só um `daily_budget` num JSON. Falta account spending
   limit + stop-loss + config de guardrail por cliente.
5. Motor duplicado em 5 clientes (cada um tem cópia de `traffic-manager`/`image-engine`) → centralizar (modelo:
   `tools/render` já é compartilhado). Abstrair só DEPOIS de 2 roupagens funcionando (CLAUDE.md: nada de
   abstração prematura).
6. *(Destino)* Olho (crítico visual) em código; especialistas como agentes separados (Agent SDK).

**Ordem acordada com o Marcos:** (1) designer sênior no Estúdio + limpar lixo → (2) guardrail de marca do Estúdio
→ (3) fechar ponta da Meta + 3 tetos → (4) centralizar motores → (depois) Olho/agentes.

## Onde paramos (o que foi feito nesta sessão)
1. **Acesso pelo celular destravado.** Caminho oficial = app do Claude → aba **"Code"** (Claude Code na
   nuvem, PC pode estar desligado), conectado ao repo via GitHub (conta `guarucriativo-ux`). O modo
   "controle remoto / Dispatch" foi DESCARTADO (exige PC ligado 24h).
2. **Erro do PC resolvido:** `claude.ps1` não rodava por ExecutionPolicy → corrigido com
   `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` (abrir terminal novo pra valer).
3. **REGRA DE OURO DE SYNC cravada** (ver `CLAUDE.md` › "Sincronização e Nuvem"): a nuvem/GitHub é a
   fonte da verdade; tudo que a fábrica cria e precisa pra rodar vai pro Git (incl. as artes/outputs,
   tudo leve); só material cru pesado do cliente fica fora (vídeo/PSD/PDF catálogo/fotos originais —
   foi o erro da Alkimia). Output sempre OTIMIZADO. `.gitignore` ajustado. 230 artes subiram pro Git.

## Próximo passo imediato — plano "POR PARTES" (acordado 2026-06-26, mão na massa)
Ordem proposta (cada parte é um tijolo; 2 e 3 rodam neste terminal SEM rede):
1. **Rede** — ✅ **Marcos ABRIU a rede (Full/Custom) em 2026-06-26.** ⚠️ **Mas só vale em SESSÃO NOVA** — a
   sessão onde ele abriu já estava na política antiga (Trusted) e a rede fica travada pra vida da sessão (proxy
   não mudou ao vivo). **➡️ NESTA SESSÃO NOVA, 1ª COISA: testar a foto.** Rode:
   `node tools/foto-auto.mjs "colorful healthy food bowl" --out=Projetos/guaru-estudio/references --name=teste --n=1`
   — se baixar a foto, a rede está OK (apaga o teste depois). Se vier **403**, a política não pegou: conferir o
   **Network access** do environment no app (pedir print ao Marcos). Como fazer: `knowledge-base/sistema/infra-de-producao-e-rede.md`.
2. **▶️ AFINAR O DESIGNER (recomendado começar aqui)** — Marcos manda alterações (Estúdio "Seu negócio, bem visto"
   e/ou psi "procrastinação"); Claude itera peça/motor e **grava o aprendizado** no `learning-log` do cliente
   (gradua de estagiário). Não precisa de rede. É a base — o gestor depende do designer pronto.
3. **Gestor de tráfego** — código: fechar a ponta da Meta API + os 3 tetos de gasto.
4. **Infra de produção** — servidor 24/7 + WhatsApp API (Estágio 3→4, o tijolo grande).

## Protocolo entre terminais (sempre seguir)
- `git pull` ANTES de mexer em qualquer terminal; `commit` + `push` DEPOIS de qualquer mudança.
- **Um lugar de cada vez** — não editar o mesmo arquivo no celular e no PC ao mesmo tempo sem sincronizar.
- **Como a nuvem devolve trabalho:** o Claude Code na web trabalha numa BRANCH isolada e empurra como
  **PR** (não escreve direto na `main`). Então mudança feita pelo celular fica num PR até ser mesclada.
- **Ao salvar algo pelo celular (ex.: foto em `references/`):** push na branch + criar o PR + anotar o
  nome da branch aqui no ESTADO-ATUAL, pra facilitar mesclar depois.
- **Ao voltar ao PC depois do celular:** o Marcos diz **"sincroniza"** (ou "voltei do celular") →
  eu rodo **`node tools/sincronizar.mjs`**, que faz TUDO por ele: busca da nuvem, mescla na `main`
  o trabalho feito pelo celular, empurra de volta e resume o que chegou. Marcos não encosta em git.
  (Seguro: para se houver mudança local não salva; aborta mescla com conflito e avisa.)

## Ideias/pendências abertas (não-bloqueantes)
- **Mural de aprovação no Notion/Canva** (apps que o Marcos já tem) pra ver/aprovar arte em tela cheia
  do celular — discutido, ainda não montado. Decidir depois do teste de upload.
- Otimizar os ~45 PNGs antigos de ~4 MB em `03-automation-bridge/creativos/outputs/` (gerados antes da
  regra de output otimizado) — opcional, regenerável.

## Mapa rápido do projeto (pra orientar em qualquer terminal)
- `Projetos/<cliente>/` — clientes (psi-automatic, guaru-estudio, freitas-hair, lanche-do-seu-ze,
  Alkimia, studio-meta-espaco). Artes do psi em `Projetos/psi-automatic/02-content-generator/outputs/`.
- `niches-library/` — a faculdade / regras de design por nicho. `references/regua/` = régua visual.
- `CLAUDE.md` = como operamos · `MANIFESTO.md` = porquê/cultura · `template-client-base/` = molde.
