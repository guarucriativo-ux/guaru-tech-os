# Roadmap & Pontas Abertas — pra retomar no futuro

<!-- Pedido do Marcos (2026-06-26): "deixe as pontas abertas pra no futuro voltarmos pra esse assunto."
     Consolida tudo que ficou em aberto nesta sessão (e antes), organizado por tema, pra qualquer terminal
     retomar sem reler a conversa. É DECISÃO/roadmap (não faculdade) → mora aqui. -->

> Mapa vivo do que está em aberto. Antes de retomar um tema, ler o doc-fonte linkado. Prioridade no topo.

## 🔴 PRIORIDADE 1 — Construir o MOTOR DE RESULTADO (ligar o caixa)
A fábrica produz conteúdo, mas **não converte** ainda (ver `knowledge-base/sistema/operacao-da-fabrica-cadeia-de-valor.md`).
Os elos 2 (tráfego) e 3 (landing) são o gargalo. Construir, nesta ordem de segurança/valor:
1. **Gestor — 3 TETOS DE GASTO** (segurança primeiro): account limit + stop-loss + teto por cliente. Hoje só
   `daily_budget` num JSON. Spec em `knowledge-base/marketing/guardrails-gasto-3-tetos-canone.md`.
2. **Gestor — ponta real da Meta API** (criar campanha + ler relatório + loop). Hoje é maquete (PAUSED placeholder).
   - **Auto-postagem/agendamento em massa** (distribuição orgânica): pesquisa + spec "1 metro" em
     `decisoes/distribuicao-auto-postagem.md`. Recomendação: dono-de-tudo (self-host Postiz/Mixpost ou Graph API
     oficial + nosso scheduler), decidir junto com o HOST. Achado: auto-postagem orgânica = campo aberto no código
     (traffic-manager só faz blueprint de tráfego pago). Conta de cliente = só API oficial (nada de método cinza).
3. **Web — 1ª LANDING real** (começar pelo **Guaru Estúdio**, domínio `guaruestudio.com.br` já comprado).
   Método em `knowledge-base/web/landing-page-e-cro-canone.md`.
4. **DECISÃO DE HOST/infra de produção** (o "tijolo grande", Estágio 3→4): onde hospedar (Vercel/Netlify/
   Supabase/servidor nosso) + apontar o domínio. Ver `decisoes/ambiente-de-build-vscode.md` + `infra-de-producao-e-rede.md`.

## 🟡 PRIORIDADE 2 — Formar os colaboradores (modo caverna + crítica do Marcos)
A "prova" = crítica do Marcos por módulo + aplicar numa peça. Drafts v1 ≠ formado.
- **Designer Gráfico:** Fases 1–2 destiladas (8 módulos do cânone) — **aguardando a crítica do Marcos**.
- **Gestor de Tráfego:** teoria-base destilada (5 módulos) — falta crítica + a CONSTRUÇÃO (ver Prioridade 1).
- **Web Designer:** iniciado (W-N1 Landing/CRO + W-F1 UX). **Fila:** UI/componentes → landing-pra-tráfego →
  responsivo → acessibilidade/perf → stack/host → IA → interação → SEO/analytics. (`curriculos/web-designer.md`)
- **Próximas matrículas:** Olho (crítico visual) · Copywriter · CRM/Atendimento (o elo 4 da cadeia de valor).

## 🟡 TESTE pendente — Guaru Estúdio (PRONTO PRA RECEBER A CURADORIA)
- **Recepção organizada (Marcos vai mandar "bastante" imagem):** ele dropa as refs curadas em
  `Projetos/guaru-estudio/references/regua/` (no PC, e dá push) **ou** cola no chat → avisa **"cheguei a régua do
  estúdio"** → o Claude absorve. Protocolo no README da pasta + `sistema/doutrina-do-olho-referencia-como-regua.md`.
- **O que o Claude faz ao receber:** lê pixel a pixel → ficha de anatomia por imagem → renomeia pro padrão
  `estudio--<movimento>--NN.jpg` → extrai o SISTEMA VISUAL (ignora o produto) → **gradua pro `brand-dna.json` +
  motor + Olho** ("esse é o nosso look"). Guardrail: linguagem absorvida → peça AUTORAL, nunca clone.
- ⚠️ Já há **5 imagens cruas** na pasta (sem ficha/nome) — parte do lote; absorver junto quando o Marcos fechar.
- Depois da absorção → **testar uma peça do Estúdio** com a régua + a faculdade nova (é o teste que ficou pendente).

## 🟢 CONCLUÍDO nesta sessão — Pipeline de conteúdo com 2 portões + 3 peças de teste
- **Dois portões obrigatórios cravados** (não dependem mais da memória de sessão):
  **(1) gate de copy** `knowledge-base/copywriting/copy-primeiro-o-gate.md` (Regra Nº0 — copy primeiro) ·
  **(2) portão de craft** `knowledge-base/design/craft-primeiro-o-gate.md`. Ambos ligados no Protocolo de
  Geração de Design (`CLAUDE.md`, passos 0 e 4) + Base Mãe. Fluxo: copy pesquisada → 3 camadas → craft → entrega.
- **3 peças de teste geradas** (base no piloto de 4 refs, ANTES da absorção das 65) — índice e status em
  `Projetos/guaru-estudio/02-content-generator/outputs/_INDICE-CONTEUDOS.md`: régua v3 (craft no nível) ·
  preço-percepção (copy aprovada) · **seguidor-x-cliente (🟡 aguardando feedback do Marcos)**.
- **➡️ Retomar aqui:** feedback do Marcos na peça #3 (copy quente? craft na régua?) → o ajuste vira regra.

## 🟢 FACULDADE — manutenção (cultura cravada)
- **Auditoria semanal** (Teste dos 4): última 2026-06-26, **próxima ~2026-07-03**. (`ESCOPO-ESTUDO.md` + `decisoes/auditoria-faculdade-2026-06-26.md`)
- **Pendente de greenlight do Marcos:** fundir os 3 docs de cor (`design/teoria-das-cores-harmonia` + `psicologia-das-cores`
  + `cores-cultura-e-categoria`) num `cor.md` afiado (depth>breadth). Só com o ok dele (é editar ensino).
- **Workflow de referência:** curadoria do Marcos abastece (caminho oficial); raspar Behance/Pinterest na nuvem = descartado.

## ⚪ PARQUEADO — voltar quando fizer sentido
- **Lovable.dev:** NÃO adotar — construímos nós mesmos (VSCode + Claude Code). (`decisoes/avaliacao-lovable-dev.md`)
- **Motion/vídeo:** não construir motor; usar vídeo-como-API (JSON2Video/Creatomate) + IA image-to-video (fal.ai)
  quando priorizar. Mapa de custo + protótipo custo-zero prontos. (`decisoes/colaborador-de-motion-graphics.md`,
  `decisoes/mapa-de-custo-video-api-vs-ia.md`)
- **Unsplash key** (`UNSPLASH_ACCESS_KEY`): opcional, amplia o leque de foto (Pexels já entrega).
- **Aprender com VÍDEO (pipeline Nível 1):** yt-dlp + ffmpeg + Whisper + OCR → texto/frames → destilar. Método
  em `decisoes/aprender-com-video-metodo.md`. Hoje funciona o **Nível 0** (Marcos manda transcrição
  + prints → eu destilo). Construir o Nível 1 só quando for ingerir volume de videoaula (melhor no PC/API).
- **Render na nuvem:** precisa `npm install` em `tools/render/` (puppeteer; node_modules fora do Git). Chromium é auto-detectado.

## 🔧 DÍVIDAS antigas (não-bloqueantes, do estudo da fábrica)
- Preço divergente entre docs (BUSINESS-MODEL vs PRODUTO/PLANO-FINANCEIRO) — reconciliar a tabela oficial.
- README.md defasado (crava Alkimia como 1º cliente). 
- Ledger anti-repetição do psi.automatic (colisão de tema/assinatura) — construir.
- Centralizar motores duplicados em 5 clientes (depois de 2 roupagens funcionando).
