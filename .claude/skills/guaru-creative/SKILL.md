---
name: guaru-creative
description: Protocolo Guaru Tech para criar/iterar peça de social media (vitrine @psi.automatic ou cliente). Use ao gerar carrossel/post: garante identidade, guardrails e que o aprendizado volte pra pasta compartilhada (faculdade/DNA/molde), pra build = fábrica.
---

# Skill: guaru-creative

A "pasta do designer" empacotada. É o protocolo que mantém minha criação no build IGUAL à da fábrica
automática. **Invariante:** todo aprendizado/asset que eu produzir tem que cair na pasta compartilhada
(faculdade/brand-DNA/molde/banco) — senão a fábrica não reproduz e a entrega diverge.

## Quando usar
Sempre que for criar/iterar uma peça (carrossel, post) da @psi.automatic ou de um cliente.

## Passo a passo (nesta ordem)
1. **Identificar conta + ler a pasta.** Cliente ou vitrine? Ler `Projetos/<conta>/brand-dna.json`
   (paleta, tipografia, motivos) + `conteudo-da-vitrine.md` (fórmula) se for a vitrine.
2. **Protocolo de design em 3 camadas** (CLAUDE.md): Base Mãe `niches-library/design-principles/design-rules.md`
   → nicho `niches-library/<nicho>/visual-references/design-rules.md` → DNA do cliente. Validar NO OLHO.
3. **Estrutura (vitrine = venda):** hook no PSICÓLOGO (PAS + foto de identificação) → ponte → prova
   (conteúdo de psicologia, paleta calma) → pitch (cor da marca, CTA keyword-to-DM). Bracket loud×calm.
4. **Guardrails (inquebráveis):** sem "feito por IA", sem "no automático" como bordão, sem promessa de
   cura/diagnóstico (CFP), CTA tipográfico (nunca botão de app), emoji no estilo da arte. Rodar o
   verificador: `node Projetos/psi-automatic/02-content-generator/checar-guardrails.js <arquivo>`.
5. **Render no spec da Meta:** 1080×1350 JPEG sRGB via `tools/render/render-creative.js ... --slides`
   (ou `montar.js` da fábrica). Entregar imagens + legenda (mesmo tópico).
6. **CAPTURAR o aprendizado (passo que NÃO pode faltar):** todo princípio novo → depositar na faculdade
   `knowledge-base/<área>/`; todo asset gerado (ex.: textura/mood por skill externa) → `banco de imagem`
   do nicho; feedback do Marcos → `learned-lessons`/`learning-log`. **É isso que mantém build = fábrica.**

## Skills externas (ex.: Adobe) — disciplina
Usar UPSTREAM (banco de imagem, tratamento de foto, vídeo), NUNCA pra gerar o produto final (fere a
regra de ouro: peça final é composição autoral nossa). O OUTPUT vai pro banco/faculdade — não os textos
internos da skill da Adobe. Ver `knowledge-base/sistema/agent-skills-e-externas.md`.
