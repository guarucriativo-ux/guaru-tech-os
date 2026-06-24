# Learned Lessons — psi.automatic

Aprendizados de negócio/processo/conteúdo. Feedback de design por peça → `learning-log.md`.
**Ler ESTE arquivo + learning-log ANTES de criar qualquer peça** (ciclo de aprendizado; ver memória
`estudar-antes-de-criar-protocolo`). O feedback alimenta dia após dia e é sempre consultado.

<!--
## [AAAA-MM-DD] <título>
- **Contexto:** - **Resultado:** - **Lição:** - **Promovido para nicho?**
-->

## [2026-06-24] Geração é A COMANDO; treino é manual (não estourar API/lote sozinho)
- **Contexto:** ao reconstruir o motor, gerei dezenas de imagens de teste por conta própria; antes já
  tinha rodado o cérebro (API) várias vezes sem pedido.
- **Resultado:** queimei créditos à toa e poluí os outputs; Marcos cobrou alinhamento.
- **Lição:** **geração é a comando.** Afiar designer/social-media é **manual/artesanal** (barato) +
  alimentar a faculdade; a **API (gerar-peca.js) custa e roda só quando o Marcos pede**, pra testar o
  pipeline (que é por onde o usuário usa a fábrica). `compor.js` renderiza local = zero crédito, mas
  também só a comando. Memória `geracao-a-comando-treino-manual`.
- **Promovido para nicho?** Não — modo de execução geral (vale pra toda a fábrica).

## [2026-06-24] A prova social é o miolo — varia em TODO slide; conteúdo nasce de pesquisa
- **Contexto:** tratei o carrossel da vitrine como molde fixo de 6 vagas e variei só os 2 frames da marca.
- **Resultado:** o miolo-prova ficou templatado — quebra a prova social (cada entrega no feed precisa ser única).
- **Lição:** o conteúdo de psicologia **nasce do ZERO via pesquisa de mercado** (tema + composição únicos);
  replica **só o DNA** (paleta + tipografia do nicho), a arte é outra toda vez. Variedade vale em TODO
  slide, sobretudo a prova. Memória `variedade-em-toda-criacao-prova-e-pesquisa`.
- **Promovido para nicho?** Sim (estrutural) — destilado em `knowledge-base/design/variedade-no-mesmo-dna.md`.

## [2026-06-24] Estudar ANTES de criar — e consultar o feedback passado (FALHA #1)
- **Contexto:** ao resolver peças "iguais/genéricas", entrei na reatividade (rodar API, buscar imagem,
  improvisar) sem rodar o protocolo de estudo nem consultar feedback passado.
- **Resultado:** derrapei repetidamente, repeti correções já dadas; Marcos cobrou ~5x; saiu genérico.
- **Lição:** ANTES de compor QUALQUER post, rodar o protocolo (memória `estudar-antes-de-criar-protocolo`):
  (0) ler feedback passado [este arquivo + learning-log + memórias] → (1) faculdade kb-query → (2) Base
  Mãe → (3) regra de nicho → (4) OLHAR refs visuais no pixel → (5) aplicar motivos do brand-DNA → (6)
  compor→validar no olho→capturar. Skill `guaru-creative` empacota.
- **Promovido para nicho?** Não — processo geral (já no CLAUDE.md/metodo-criativo); reforço durável.

## [2026-06-24] Aplicar os MOTIVOS do brand-DNA, não improvisar grafismo
- **Contexto:** identidade da psi.automatic segue o sistema "Tramontina ADS" (capturado no `brand-dna.json`:
  selo ∞, ribbons de gradiente, moldura tracejada, mockups de device, chips, emoji 3D, kicker topo+rodapé,
  headline two-tone, fundos off-white `#F2F1EE` + preto `#0A0A0A`). Eu compus com orbe de gradiente
  genérico flutuando, sem usar NENHUM desses motivos.
- **Resultado:** ficou "mais uma tech genérica", não a linguagem de agência da marca. Reprovado.
- **Lição:** compor APLICANDO os motivos do DNA (`brand-dna.json` motivos_marca + `references/referencias-marca.md`),
  olhando as refs no pixel. A variedade mora na DIAGRAMAÇÃO dentro da linguagem da marca, não em inventar grafismo.
- **Promovido para nicho?** Não — específico da marca-vitrine; o sistema-agência já está no DNA.

## [2026-06-24] Foto da vitrine = banco free (não "base do cliente")
- **Contexto:** o prompt do cérebro cravava 3 fotos locais como se fossem material enviado pelo cliente.
- **Resultado:** toda peça reusava as mesmas 3 fotos genéricas (sem relação com o tema).
- **Lição:** vitrine (classe B, sem cliente) → foto de **banco free** (Unsplash/Pexels licença GERAL sem
  chave, ou CC0/Openverse) baixada pra nossa pasta, **licença salva ao lado**, modificada em duotone.
  Achado: **gente/identificação = Unsplash/Pexels** (CC0 é fraco em pessoas); **mood/natureza = CC0 keyless**.
  Estudo de licença em `knowledge-base/design/` (a fazer) — uso comercial + modificação OK, sem atribuição.
- **Promovido para nicho?** Parcial — o COMO (licença geral, sem chave, baixar+salvar licença) é novo e vale subir.
