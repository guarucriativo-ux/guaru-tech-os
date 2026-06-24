# Agent Skills (padrão aberto) + como absorver skills externas (ex.: Adobe) na fábrica
<!-- Origem: pesquisa 2026-06-24 (Anthropic docs/engineering, github anthropics/skills, Adobe blog,
     PetaPixel). Gatilho: Marcos — "skills da Adobe devem ser boas pra gente; estude como plugar". -->

## O que é Agent Skills
**Padrão ABERTO** (`SKILL.md` = pasta com YAML frontmatter + instruções + `scripts/` `references/`
`assets/`). Criado pela Anthropic, virou padrão da indústria. **Portátil:** construa uma vez, rode em
qualquer agente compatível (Claude Code, **API da Anthropic, Agent SDK**, Cursor, Codex, Gemini CLI…).
Carregamento por *progressive disclosure*: o agente lê o SKILL.md só quando aciona, e os arquivos
referenciados sob demanda. Repo oficial: github.com/anthropics/skills.

## Adobe for Creativity (abr/2026)
Conector pro Claude com **50+ ferramentas pro-grade** (Photoshop, Illustrator, Firefly, Express,
Premiere, Lightroom, InDesign, Stock) + **Creative Skills** prontas (retoque com presets, gerar assets
sociais, redimensionar vídeo p/ Reels/Shorts). É conector (estilo MCP = acesso a ferramentas) + skills
(procedimentos). Premissa: Adobe é fera em design → expertise que a gente não tem internamente.

## Como plugar na NOSSA fábrica (3 caminhos)
- **(a) API:** subir/usar skills pela API da Anthropic (o cérebro `gerar-peca.js` evoluiria pra carregar skills).
- **(b) Agent SDK:** rodar o cérebro no Agent SDK com uma pasta de skills (+ subagentes).
- **(c) MCP/conector:** o conector da Adobe expõe as ferramentas dela (Firefly, Express…) via MCP.
Hoje a fábrica usa a Messages API crua → absorver skills = graduação (Agent SDK/API+skills). No BUILD
(Claude Code) dá pra usar skills JÁ.

## ⚠️ FILTRO da regra de ouro (a disciplina — onde plugar e onde NÃO)
Regra de ouro: peça final = **composição autoral nossa** (molde HTML→render), NÃO arte de IA genérica.
Adobe é forte em GERAR/EDITAR a arte final → isso **NÃO** entra no produto final (fere autoria +
consistência do molde). Usar como **ajudante UPSTREAM**, onde temos buraco:
- ✅ Banco de imagem: Firefly p/ **textura/fundo/mood** (IA cirúrgica, não o produto — regra já existente).
- ✅ Tratamento de foto: padronizar duotone/cor das fotos do banco (Lightroom/PS).
- ✅ Vídeo: resize/reframe p/ Reels (frente futura).
- ✅ Conhecimento de design empacotado → insumo da faculdade.
- ❌ Firefly/Express gerando o criativo final (perde autoria e consistência).

## O reframe estratégico (o mais importante)
Como SKILL.md é padrão aberto, a gente **empacota a NOSSA expertise como skill**: brand-DNA + protocolo
de design + guardrails + faculdade → uma **skill `guaru-creative` versionada e portátil** que a fábrica
carrega. **Consome a da Adobe E exporta a nossa.** Skill = "conhecimento procedural versionado" = o que
a faculdade quer virar. Conecta com o loop de aprendizado (gera→policia→APRENDE→entrega).

## ⚠️ INVARIANTE de consistência build × fábrica (Marcos cravou 2026-06-24)
Risco real: se eu (Claude-construtor) uso uma skill no BUILD e o resultado NÃO cai na pasta compartilhada
(faculdade/brand-DNA/molde/banco), a minha entrega fica DIFERENTE da fábrica automática (que só enxerga a
pasta). **Regra:** todo aprendizado/asset que uma skill produzir TEM que virar artefato na pasta
compartilhada — OU a fábrica tem que ter a MESMA skill (via Agent SDK). Senão, divergência proibida.
- Skill ensina princípio → vira regra na faculdade (em palavras NOSSAS; não copiar textos proprietários da Adobe).
- Skill gera asset → vai pro BANCO de imagem compartilhado.
- Skill gera a peça final só no build → ❌ proibido (fábrica não reproduz).
Nossa própria skill `guaru-creative` (.claude/skills/) = a pasta do designer EMPACOTADA → zero divergência
por construção (mesma fonte). Skills externas entram só UPSTREAM, com o output capturado na pasta.

## Catálogo "Adobe for Creativity" (instalada 2026-06-24) — 7 skills e o NOSSO uso
Conector MCP "Adobe for creativity" + 7 habilidades. Avaliadas pelo filtro da regra de ouro
(usar UPSTREAM, output→banco; NUNCA gerar o produto final):
- 🟢 `/adobe-retouch-portraits` — tratar foto do psicólogo (rosto=conversão) → banco do cliente. OURO.
- 🟢 `/adobe-batch-edit-photos` — padronizar duotone/cor do banco em lote. OURO.
- 🟢 `/adobe-resize-photos-and-videos` — adaptar ASSETS multi-formato (a peça final a gente RE-RENDERIZA por formato, não estica).
- 🟢 `/adobe-edit-quick-cut` — edição de vídeo/Reels (frente futura).
- 🟡 `/adobe-create-pdfs-from-data` — relatório de performance do cliente em PDF (futuro; ver `knowledge-base/marketing/metricas-relatorio-redes-sociais.md`).
- 🟡 `/adobe-create-social-variations` — só pra variar ASSET/fundo (vai pro banco), NUNCA a peça final.
- 🔴 `/adobe-design-from-template` — gerar arte de template Adobe = armadilha "Canva-AI" → fere a regra de ouro. No máx referência, nunca entrega.
**Padrão:** a Adobe entra como fornecedora de MATÉRIA-PRIMA TRATADA (asset→banco), não como geradora do
produto. Todo output capturado na pasta compartilhada (invariante build×fábrica). 1º teste disciplinado:
retouch/batch numa foto → salvar no banco do nicho.

### A própria Adobe valida nossa regra de ouro (achado da leitura linha-a-linha, 2026-06-24)
As skills pro-grade marcam no frontmatter o selo **`Gen AI: ❌`**: retouch, batch-edit, social-variations,
design-from-template e resize **não usam IA generativa** — tratam foto/asset como **craft** (corte, tom,
reframe), reservando o generativo (Firefly) só pro insumo upstream (textura/fundo/mood). A ÚNICA que gera
arte final a partir de template Adobe Express (`design-from-template`) é justamente a "armadilha Canva-AI"
que marcamos 🔴. Ou seja: **a taxonomia da própria Adobe espelha nossa doutrina** — craft no produto final,
generativo só na matéria-prima. Confirmação externa de peso (empresa que investiu milhões em IA generativa
e mesmo assim não a usa pro produto pro-grade). Doutrina de DECISÃO destilada em
`doutrina-de-motor-decisao.md`; o conector é **MCP HTTP** (`adobe-creativity.adobe.io/mcp`) → pluga no
Agent SDK como provedor de ferramentas remoto quando a fábrica migrar.

## Status / próximo passo
Aprovado em conceito (Marcos 2026-06-24). Roadmap: (1) testar uma skill no BUILD (rápido, Claude Code);
(2) planejar migração do cérebro p/ Agent SDK + skills + MCP. Não bloqueia a fábrica atual (já funciona).
