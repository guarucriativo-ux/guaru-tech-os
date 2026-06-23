# Learned Lessons

Aprendizados de negócio/tráfego/conteúdo em geral. Para feedback de design por peça gerada
(post, anúncio), ver `learning-log.md`.

<!--
Formato de cada entrada (ver CLAUDE.md > Ciclo de Aprendizado do Agente):

## [AAAA-MM-DD] <título curto>
- **Contexto:**
- **Resultado:**
- **Lição:**
- **Promovido para nicho?**
-->

## [2026-06-22] Bootstrap da biblioteca do nicho cabelo-loiro
- **Contexto:** ads-engine exige `--playbook` e o Protocolo de Design exige a camada 2 de nicho,
  mas não existia `niches-library/` para cabelo/loiro — só apparel, alimentacao, arquitetura.
- **Resultado:** criado `niches-library/cabelo-loiro/` com `traffic-playbook.md`,
  `audience-insights.md` e `visual-references/design-rules.md`, espelhando a estrutura do nicho
  arquitetura. Marcados como hipótese inicial (sem dados reais de campanha nem peça aprovada).
- **Lição:** o nicho destrava ads-engine (apontar `--playbook` para cá, não cair no baseline
  apparel) e a geração de design (camada 2). Validar/ajustar conforme o `learning-log.md` for
  acumulando feedback do Marcos nas primeiras peças.
- **Promovido para nicho?** sim — é a própria criação do nicho `cabelo-loiro/`.

## [2026-06-22] Referência "Presença Digital" é DNA do cliente, não do nicho
- **Contexto:** cliente enviou prints do pack Behance "Presença Digital" como referência visual
  desejada. Análise mostrou ser um template **genérico de marketing** (placeholders SEU NOME/SEU
  NICHO, copys sobre branding), não material de salão.
- **Resultado:** brand-dna.json refinado (paleta de 2 rosas + vinho + creme + preto; script
  corrigido de Sacramento para Pinyon Script; shapes expandidos). Referência documentada em
  references/presenca-digital-ref.md com a URL (não consegui gravar os binários dos prints).
- **Lição:** o visual escolhido pela cliente é a **camada 3 (DNA do cliente)**, não a estética do
  nicho cabelo-loiro — reforça que o design-rules.md do nicho deve ser neutralizado (decisão
  ainda pendente com o Marcos). Adaptar copys de branding → autoridade técnica em loiro.
- **Promovido para nicho?** não — é identidade específica deste cliente.
