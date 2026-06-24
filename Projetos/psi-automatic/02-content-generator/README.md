# Fábrica da vitrine @psi.automatic

Dois pedaços (ver memória `claude-construtor-vs-sistema-saas`):
- 🧠 **Cérebro** — `gerar-peca.js`: lê brand-DNA + pautas do nicho + consulta a faculdade (kb-query) e
  pede pra **API da Anthropic** produzir o `outputs/conteudo.json` (com os guardrails da marca). Precisa de chave.
- 🏭 **Corpo** — `montar.js`: pega o `conteudo.json`, monta o HTML na identidade da marca (bracket:
  frames preto+gradiente × prova de psicologia navy/creme) e **renderiza** os 6 slides + legenda. Não precisa de chave.

## Rodar
1. **Uma vez:** `npm install` (instala o SDK da Anthropic).
2. **Cole a chave:** abra o `.env` na raiz do repo e troque `sua_chave_aqui` pela sua ANTHROPIC_API_KEY.
3. **Fábrica completa (cérebro + corpo):** `npm run peca` (ou `node gerar-peca.js --tema=ansiedade && npm run montar`).
4. **Só o corpo (sem chave, conteúdo de exemplo):** `npm run exemplo` → renderiza de `conteudo.exemplo.json`.

Saídas em `outputs/` (slides `peca-<tema>-1..6.jpg` + `legenda-<tema>.txt`). Formato 1080×1350 JPEG (spec Meta).

## Pendências de identidade (leap do Marcos)
Logo/selo/monograma da psi.automatic; banco de imagem maior (hoje 3 fotos de teste). O DNA capturado
está em `knowledge-base/design/dna-agencia-trafego-pago.md` e `../brand-dna.json`.
