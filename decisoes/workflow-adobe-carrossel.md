# Workflow do carrossel — versão Adobe (rodar em sessão com Adobe conectado)

> Playbook pra a SESSÃO NOVA (com o conector **Adobe for creativity** ligado). Esta sessão atual não tem o
> Adobe na config (travada no boot) — por isso abrimos uma nova. As ferramentas Adobe são **tools de sessão (MCP)**,
> então este workflow roda DENTRO do chat (o Chat-Mestre chamando os tools), não via `node`.
>
> **Regra-mãe (inegociável):** mesmo com Adobe, NÃO volta a régua. O time cria do método dele; o orquestrador faz
> DIREÇÃO DE ARTE (curar/tratar/compor), nunca reescreve a decisão criativa pra um template salvo. Referência no QA
> serve pra MEDIR nível — nunca pra IMITAR. Tudo ancorado em dado real (gate de realidade).

## Pré-checagem (no início da sessão nova)
1. `git checkout claude/pexels-hero-photo-test-0vbct1 && git pull` (este é o terminal limpo — fonte da verdade).
2. Confirmar Adobe: `ToolSearch "select:mcp__Adobe_for_creativity__get_account_type"` → chamar `get_account_type`
   e `asset_search` (Stock) pra ver que está de pé. Se não aparecer, a sessão não pegou o conector.

## Os 7 portões (cada um é gate — o próximo só começa com o anterior pronto)

**0. Briefing** — nicho, objetivo, praça, cliente. Sem isso, não começa.

**1. PESQUISA + BRANDING → brand-strategist** [WebSearch]
   Entrega: pesquisa real (fontes citadas, regras/ética do nicho) + identidade (conceito, paleta HEX, **fonte**,
   tom de voz, o que a marca NÃO faz). A fonte é escolha do time (qualquer Google Font; baixar com `fonte-auto` se
   for usar no render HTML, ou usar `find_fonts`/`font_recommend` do Adobe se compor no Adobe).
   Salva: `Projetos/<slug>/pesquisa-realidade.md` + `identidade-visual.md`.

**2. ESTRATÉGIA DO CARROSSEL → social-strategist** [WebSearch]
   Entrega: roteiro/narrativa dos slides (qual a função de cada slide, arco, nº de slides). Salva: `estrategia-carrossel.md`.

**3. COPY DOS SLIDES → copywriter-specialist**
   Entrega: texto final exato de cada slide (hook + corpo), na linguagem real do público, dentro da ética do nicho,
   sem inventar dado (placeholders [entre colchetes]). Salva: `copy-carrossel.md`.

**4. CURADORIA DE FOTO → ORQUESTRADOR** [Adobe Stock]
   - `asset_search` no Adobe Stock pela cena que a identidade pede (sem rosto identificável de terceiro como cliente).
   - VER as opções (mostrar thumbnails) e ESCOLHER a on-brand. Licenciar/baixar: `asset_license_and_download_stock`.
   - Direção de arte = escolher a foto certa. Não é régua.

**5. TRATAMENTO → ORQUESTRADOR** [Adobe]
   On-brand, conforme a identidade. Ferramentas: `image_apply_monochromatic_tint`/duotone, `image_add_grain`,
   `image_apply_halftone`, `image_remove_background` (cutout), `image_generative_expand` (Firefly Expand p/ completar
   enquadramento 1080x1350), `image_adjust_*` (cor/contraste/temperatura). Resultado: foto que "pertence" à marca.

**6. COMPOSIÇÃO + RENDER → ORQUESTRADOR**
   Duas vias possíveis (escolher por peça):
   - **Adobe/vetor:** `document_render_vector` / `document_render_layout` com a fonte da marca + lettering vetorial.
   - **HTML→JPG (a casa):** `tools/render/render-creative.js --slides` (1080x1350), fonte via `fonte-auto`.
   Saída: `Projetos/<slug>/outputs/slide-*.jpg`.

**7. QA (técnico + benchmark) → ORQUESTRADOR / O OLHO**
   `ui-visual-validator` valida REALIDADE (foto real, paleta da identidade, sem clichê, regras do nicho, nada
   inventado, legibilidade, fonte certa) — loop reprova→corrige. + Benchmark: comparar nível com referência de
   mercado SÓ pra medir (nunca copiar). Aprovado → entrega.

   **Entrega → `Projetos/<slug>/outputs/` (ou `/entregas/`).** Registrar aprendizado (knowledge-synthesizer).

## Guardrails (o que matamos e não pode voltar)
- Sem prateleira fixa de fontes (a marca escolhe; `fonte-auto`/`find_fonts` trazem).
- Sem banco de referências "pra imitar". Referência = input pontual de UM job OU medida de QA — nunca régua salva.
- O orquestrador não reescreve a entrega do time pro "padrão da casa". Cura e trata foto, compõe — sim. Re-treina o gosto deles — não.
- Tudo de dado real (gate de realidade); placeholders pro que é do cliente.
