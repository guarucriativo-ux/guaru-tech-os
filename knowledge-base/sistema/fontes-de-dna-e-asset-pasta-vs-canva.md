# Fontes de DNA e de asset: PASTA (brand-dna) vs CANVA — quando usar cada

<!-- Origem: estudo do Claude a pedido do Marcos (sessão nuvem 2026-06-26). Testou os dois mundos de verdade
     (chamadas reais ao conector Canva + teste de download pelo proxy). Decide como abastecer DNA e foto.
     Liga com: metodo-criativo.md (regra de ouro), agent-skills-e-externas.md, CLAUDE.md (protocolo 3 camadas). -->

## Decisão (a regra)
- **DNA do cliente → SEMPRE pelo sistema de PASTAS** (`Projetos/<cliente>/brand-dna.json` + `assets/` + `references/`
  + régua). É mais certeiro: hex/fontes/motivos EXATOS, estruturado, versionado no Git, diff-ável, curável — o MOAT
  acumula. (Decisão do Marcos, validada por teste.)
- **Foto/asset → (1) foto do PRÓPRIO cliente** na pasta `assets/` (contexto perfeito; "foto do cliente primeiro");
  **(2) Canva como FONTE** quando os pixels forem alcançáveis (no PC); **(3) banco livre** via `foto_busca` quando
  a rede permitir. NUNCA foto aleatória — a foto serve ao conteúdo (ver `foto_busca` abaixo).
- **Composição → SEMPRE o nosso motor** (HTML+SVG→render). Canva é fonte de asset, **jamais compositor**
  (regra de ouro, `metodo-criativo.md`).

## O que cada mundo entrega (testado 2026-06-26)
### Canva (conector MCP, roteado pela Anthropic)
- ✅ Conector ATIVO e autenticado na sessão (sem precisar liberar host). Funciona: `list-brand-kits` (achou o
  brand kit "GUARU"), `search-designs` (designs reais do Marcos), pastas, `get-assets`, `export-design` (gera URL).
- ❌ **Pixels bloqueados na nuvem:** baixar a imagem (`design.canva.ai` / CDN de export) dá **403** pela política de
  rede → não dá pra trazer a foto pra dentro da composição NESTE ambiente. (No PC flui; ou liberar `design.canva.ai`
  em Network→Custom.)
- ❌ **Brand kit ≠ DNA estruturado:** `list-brand-kits` devolve só id/nome/thumbnail — não os hex/fontes. Vira
  caixa-preta; impreciso pra virar `brand-dna.json`.
- Papel ideal: **catálogo/referência** e **fonte de foto no PC**. Não usar como fonte de DNA.

### Pastas + brand-dna.json (o jeito da casa)
- ✅ Precisão e controle totais; estruturado; versionado; reproduzível; funciona offline; acumula como MOAT.
- ✅ Cliente real: a foto dele em `assets/` é o combustível de contexto perfeito.
- ⚠️ Depende do Marcos abastecer a pasta — que é o modelo desejado ("o fundador abastece o combustível").

## A foto vem DEPOIS do conteúdo (princípio, do Marcos 2026-06-26)
Foto não pode vir antes/aleatória, senão foge do contexto e fica genérica — "designer não faz isso". A nossa
arquitetura já faz certo: o cérebro (`gerar-peca.js`) gera o campo **`foto_busca`** (2–4 palavras EN descrevendo a
foto EXATA que aquele conteúdo precisa). Fluxo: **pesquisa → conteúdo → `foto_busca` → busca ESSA foto** (no banco
livre ou no Canva por essas palavras). Nunca aleatória; sempre a serviço da mensagem.

## Restrição de ambiente (nuvem vs PC)
A política de rede do Claude Code na web (nível **Trusted**) bloqueia Canva-pixels, Openverse, Pexels, etc. (403).
Para puxar foto na nuvem: **Network access → Custom** e liberar `design.canva.ai`, `api.openverse.org`, `*.pexels.com`
(ver doc `claude-code-on-the-web`), **ou** rodar no PC (rede livre). O conector Canva (metadados/comandos) funciona
sem isso, pois passa pela Anthropic.
