# 01 — Ads Engine

Inteligência de campanhas e tráfego automatizado: criação/otimização de anúncios, regras de
budget, leitura de métricas e ajustes automáticos por nicho.

## Motor de campanhas (`traffic-manager.js`)

Lê o pacote semanal (`../02-content-generator/outputs/semana-NN.md`), a imagem gerada
(`../03-automation-bridge/outputs/post-semana-NN.png`) e o `traffic-playbook.md` do nicho do
cliente, e monta um blueprint de campanha (`campaign`/`adSet`/`ad`) no formato da Meta Marketing
API em `outputs/campaign-semana-NN.json`. Sem dependências externas — só Node.js nativo.

```bash
npm run build-campaign -- --week=01 --playbook=../../../niches-library/<nicho-do-cliente>/traffic-playbook.md
```

**`--playbook` é obrigatório e não tem default** — de propósito: o baseline embutido no script
(constante `BASELINE`, no topo do arquivo) foi herdado do bootstrap do Guaru Estúdio (nicho
apparel/DTF). Passar o path errado faz o motor usar interesses/orçamento de outro nicho sem
avisar que está errado (só avisa quando o playbook está vazio, não quando é do nicho errado).
Para um cliente de nicho diferente: aponte `--playbook` para o `traffic-playbook.md` certo em
`niches-library/`, e revise se o `BASELINE` ainda faz sentido como fallback antes da primeira
campanha real.

O JSON gerado é um **blueprint**, não um payload pronto para `POST` na Graph API — falta upload
da imagem para obter `image_hash`, e preencher `ad_account_id`/`page_id`/`access_token` reais
(ver `_meta.notes` no próprio JSON gerado).
