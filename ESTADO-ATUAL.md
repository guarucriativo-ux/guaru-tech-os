# ESTADO-ATUAL.md — ponto de parada vivo (bastão entre terminais)

> **Para o Claude que abrir este projeto em QUALQUER terminal (PC, celular/Claude Code na web):**
> Esta conversa não viaja entre sessões — mas este arquivo sim. Leia-o (+ `CLAUDE.md` + `MANIFESTO.md`)
> ANTES de agir, pra entrar no contexto de onde paramos. Ao terminar/mudar algo relevante, **atualize
> este arquivo** e dê `push`. É assim que os terminais se entendem sem confusão.

---

## Última atualização
- **Data:** 2026-06-25
- **Terminal:** PC (notebook do Marcos, VS Code)
- **Quem vai assumir a seguir:** Marcos pelo **celular** (app do Claude → aba "Code" → repo `guaru-tech-os`)

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

## Próximo passo imediato (o que o Marcos vai testar AGORA no celular)
- **Testar abastecer o projeto pelo celular:** no app do Claude → Code → sessão do `guaru-tech-os`,
  tocar no **"+"** → "Adicionar arquivos ou fotos" → anexar **1 foto de referência** da galeria →
  pedir: *"salva essa imagem em `references/` e me confirma"*.
- **Objetivo do teste:** confirmar que foto da galeria → vira arquivo no repo (commit/push) =
  fluxo de abastecimento remoto funcionando, sem navegador, com PC desligado.
- ⚠️ Claude Code na web está em "research preview"; há bug conhecido de upload de imagem em iPad/Safari.
  Se der erro, é hiccup de plataforma, não erro do Marcos.

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
