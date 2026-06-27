# ESTADO-ATUAL.md — bastão de contexto entre terminais

> Leia no início de toda sessão (+ `CLAUDE.md` + `MANIFESTO.md`). Atualize no fim de cada sessão.

## 🟢 MARCO ZERO — Fábrica renascida (2026-06-27)
A fábrica foi **reconstruída do zero no setor criativo**. Decisão do Marcos: os agentes já são SENIORES;
a régua antiga (faculdade, Base Mãe, regras de copy/design, memórias de cliente e **todas as referências
visuais**) era arcaica e os algemava → **aposentada**. Tudo recuperável no histórico do Git.

### O que foi APOSENTADO (não usar)
- `knowledge-base/` inteira (faculdade) · Base Mãe + regras por nicho (`niches-library/<nicho>`, `design-principles`)
- regras/canon de copy e design · skill `guaru-creative` (protocolo velho)
- memória + identidade de TODOS os clientes (`learned-lessons`, `learning-log`, `brand-dna`, `client-context`)
- **todas as referências visuais** (pastas `references/` + banco de imagens curado)

### O que FICOU (as paredes que sustentam)
- **O OLHO:** `tools/render/render-creative.js` (render HTML→JPG) + validação visual em loop antes de entregar.
- Ferramentas: `tools/foto-auto.mjs`, `tools/sincronizar.mjs`.
- A equipe de **agentes seniores** (`.claude/agents/` — ~160). O `MANIFESTO.md` (cultura). Estruturas de cliente em `Projetos/` (engines/assets/outputs).

### O novo modelo
`CLAUDE.md` agora É o **CHAT-MESTRE**: o Marcos fala só com ele; pra cada pedido ele roteia ao especialista
sênior certo (tabela de roteamento no `CLAUDE.md`). Linha: pesquisa → copy → design → **OLHO** → entrega →
aprendizado. O conhecimento (MOAT) **acumula de novo, do zero**, a partir das entregas reais.

## ⏭️ PRÓXIMO PASSO (a definir com o Marcos)
- Ligar o **OLHO** de verdade: amarrar o `ui-visual-validator` + render obrigatório no fluxo de design (o agente
  renderiza, OLHA o JPG, reprova/corrige sozinho — sem humano no meio).
- Rodar a 1ª peça no novo modelo (Chat-Mestre orquestrando) e ver a fábrica girar limpa.
- (Opcional) abrir sessão nova pra o Chat-Mestre nascer 100% sem vestígio de conversa.
