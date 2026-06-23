# 03 — Automation Bridge

Scripts de integração, webhooks e robôs de disparo: ponte entre o cliente (WhatsApp, e-mail,
formulários) e os outros módulos (ads-engine, content-generator, crm-systems).

## Motor de imagens (`image-engine.js`)

Transforma o "Texto no criativo" de um pacote semanal (gerado pelo `02-content-generator`) em
um post físico (.png, 1080x1080) usando Puppeteer + um template HTML. Já vem pronto neste
template — ao clonar a pasta para um novo cliente, o motor funciona sem alterar nada no código
(os paths são relativos ao próprio script).

```bash
npm install
npm run generate-image -- --week=01
```

- Lê `./templates-html/post-template.html` (estrutura/grid — Base Mãe, ver
  `niches-library/design-principles/`), `../brand-dna.json` (cor/tipografia/marca — DNA do
  Cliente) e `../02-content-generator/outputs/semana-<week>.md` (o texto da peça). O template
  é genérico (placeholders `{{BG_COLOR}}`, `{{TEXT_COLOR}}`, `{{TEXT_BOX_BG}}`,
  `{{TEXT_ON_BOX}}`, `{{FONT_FAMILY}}`, `{{BRAND_NAME}}`, `{{POST_TEXT}}`) — não precisa editar
  HTML por cliente, só preencher o `brand-dna.json` dele.
- Salva o resultado em `outputs/post-semana-<week>.png`.
- Paths configuráveis via `--content=<path>`, `--template=<path>` e `--brand=<path>` para reuso
  com outro template/cliente.
