# ESTADO-ATUAL.md — ponto de parada vivo (bastão entre terminais)

> **Para o Claude que abrir este projeto em QUALQUER terminal (PC, celular/Claude Code na web):**
> Esta conversa não viaja entre sessões — mas este arquivo sim. Leia-o (+ `CLAUDE.md` + `MANIFESTO.md`)
> ANTES de agir, pra entrar no contexto de onde paramos. Ao terminar/mudar algo relevante, **atualize
> este arquivo** e dê `push`. É assim que os terminais se entendem sem confusão.

---

## ✅ FOTO-HERÓI PEXELS — CONFIRMADA EM ALTA (2026-06-26, sessão nova)
> Teste rodado de ponta a ponta nesta sessão nova: a `PEXELS_API_KEY` (56 chars) **apareceu** no ambiente e o
> comando `node tools/foto-auto.mjs "warm cozy coffee shop interior" --source=pexels ... --orient=portrait`
> **baixou um JPEG real: 1600×2133 (muito acima de 1080), RGB cor cheia (3 componentes), 446 KB**, com
> `.LICENSE.txt` correto (Pexels License, uso comercial OK). ➡️ **Foto-herói em ALTA via Pexels CONFIRMADA na
> nuvem.** Teste apagado depois (não deixar lixo). O `foto-auto` multi-banco está completo: Pexels (alta, com
> chave) + Openverse (fallback ~960px sem chave).
> **Único item que ainda falta (não bloqueia):** gerar a chave do **Unsplash** (`UNSPLASH_ACCESS_KEY`) e
> adicionar na mesma tela do ambiente — Pexels sozinho já entrega a foto-herói, Unsplash só amplia o leque.

## ✅ TESTE DESIGNER-GENERALISTA + DOUTRINA DO CROP (2026-06-26, sessão nova) — 4º NICHO VALIDADO
> Marcos pediu: escolher um nicho FICTÍCIO, estudar o social media dele e rodar a geração no automático;
> e atentar à qualidade de imagem (padrão Instagram, leve) **mas** sabendo que existe a prática de trabalhar
> com arquivo grande pra cortar um detalhe e diagramar texto por cima — "isso vai pra faculdade, o designer estuda".
> - **Nicho escolhido:** joalheria/ourivesaria autoral (não existia na biblioteca). Cliente fictício
>   **Lapidar** (`Projetos/lapidar-joalheria/`). Criada a niche-lib `niches-library/joalheria/` (pautas de social
>   media + design-rules) e o motor `compor.js` (estrutura conteudo-direto, DNA joalheria, **com foto-herói cor
>   cheia E slide de CROP de detalhe**).
> - **Rodou no automático:** carrossel "Alianças que não existem em vitrine", 6 slides 1080×1350 JPEG q88,
>   carrossel inteiro **~670 KB** (leve). Slides 2 e 6 = crop macro das alianças da MESMA foto-fonte grande
>   (Pexels 1600×2400). **4º registro distinto** (psi/estúdio/nutri/joalheria) = "designer = 1 cérebro + config".
> - **DOUTRINA DO CROP gravada na faculdade** (o pedido do Marcos): separar **FONTE** (grande ≥1600px, aguenta o
>   recorte em alta) de **OUTPUT** (padrão Instagram, leve). Amendment em `niches-library/design-principles/
>   design-rules.md` + nota `knowledge-base/design/crop-de-detalhe-fonte-grande.md`. O designer DEVE estudar.
> - **Infra consertada:** `tools/render/render-creative.js` agora **acha o Chromium do ambiente sozinho**
>   (varre `/opt/pw-browsers`), então render roda na nuvem sem ajuste manual. ⚠️ Sessão nova ainda precisa de
>   `npm install` em `tools/render/` (puppeteer; node_modules fica fora do Git por regra).

## 🔁 RETOMADA (leia PRIMEIRO se você é uma sessão nova — 2026-06-26)
> ✅ **O trabalho recente JÁ FOI MESCLADO NA `main`** (2026-06-26 noite) — a `main` voltou a ser a fonte da
> verdade. Sessão nova nasce com tudo: o `foto-auto` multi-banco + este contexto. Não precisa trocar de branch.
> (A branch `claude/sync-resume-progress-4nd64x` foi a de trabalho; agora `main` == ela.)
>
> ### ✅ TESTE DO foto-auto (2026-06-26, sessão nova) — REDE OK + foto-auto CONSERTADO E RODANDO NA NUVEM
> A rede **pegou nesta sessão nova**: `api.openverse.org` responde **HTTP 200** (antes era 403). Mas o teste
> ainda falhava no 2º passo — diagnóstico conclusivo: a busca (API) funciona, mas o **download da imagem** dava
> **403** porque o Openverse aponta pra **CDNs de terceiros** (`cdn.stocksnap.io`, flickr, wikimedia…) que **não
> estão na allowlist** — e não adianta liberar um a um (cada foto usa um CDN diferente).
> **Conserto (no código, sem depender da rede):** o `foto-auto.mjs` agora baixa a imagem pelo **proxy de
> thumbnail do próprio Openverse** (`/v1/images/<id>/thumb/?full_size=true&compressed=false`), que roda no host
> **já liberado** (`api.openverse.org`). Tenta o original primeiro (melhor no PC com rede aberta) e cai no proxy
> na nuvem. **Testado de ponta a ponta: baixou um JPEG cc0 real, 960×720, ~754 KB. EXIT 0.** ➡️ **foto-auto
> agora funciona na nuvem** (download automático de foto nova, não só as ~30 já curadas). Detalhe técnico do
> proxy fica registrado em cada `.LICENSE.txt` quando o fallback é usado.
> _(Obs.: `undici` não está instalado no sandbox, então o proxy explícito do fetch não é setado — mas o gateway
> transparente já roteia os hosts liberados, então não bloqueou. Não-crítico.)_
>
> ### ✅ QUALIDADE DA FOTO + 2 NÍVEIS DISPONÍVEIS (2026-06-26) — foto-auto agora é MULTI-BANCO
> Marcos perguntou se a foto vem boa pro Instagram e fez duas correções de DOUTRINA (importantes, foram pra
> faculdade): **(a)** a peça final é sempre 1080×1350 (render fixa o canvas; foto é `background:cover`), então
> foto de ~960px não faz o post sair pequeno; **(b)** o tratamento da foto (duotone/grayscale do psi) **NÃO é
> regra** — é DECISÃO do designer por peça (régua, não regra): ele olha referências e escolhe se fica melhor
> duotone, ou foto-herói nítida em cor, ou recorte. Lição gravada em `niches-library/design-principles/
> metodo-criativo.md` ("Referência é régua, não regra") — o designer deve estudar.
> **Consequência no código:** como o designer decide caso a caso, as DUAS qualidades têm que estar sempre
> disponíveis. O `foto-auto.mjs` virou **multi-banco**: **Pexels** + **Unsplash** (alta ≥1080 cor cheia, foto-herói
> — via chave) → **Openverse** (fallback sem chave, ~960px, bom pra fundo tratado). Modo `auto` usa alta se a
> chave existir, senão cai no Openverse. Testado: sem chave cai no Openverse (compat OK); `--source=pexels` sem
> chave falha limpo com instrução.
> **➡️ PRA LIGAR A ALTA (ação do Marcos, 2 passos):** (1) gerar as chaves grátis e pôr no ambiente como env
> `PEXELS_API_KEY` e `UNSPLASH_ACCESS_KEY`; (2) liberar `images.pexels.com` + `images.unsplash.com` (e os hosts
> de API `api.pexels.com`/`api.unsplash.com`) em Network→Custom. No PC (rede aberta) já roda só com as chaves.

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
1. **Rede** — ✅ **RESOLVIDO em sessão nova 2026-06-26.** A rede pegou (`api.openverse.org` = 200) e o `foto-auto`
   foi consertado pra baixar via proxy de thumbnail do Openverse (host liberado), driblando os CDNs bloqueados.
   **Download automático de foto nova funciona na nuvem agora.** (Ver bloco ✅ no topo deste arquivo.) Nada mais
   pendente do Marcos aqui — se um dia quiser o original em resolução máxima sempre, aí sim Network→Full libera
   os CDNs; mas pro fluxo da fábrica o proxy já entrega resolução de sobra.
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
