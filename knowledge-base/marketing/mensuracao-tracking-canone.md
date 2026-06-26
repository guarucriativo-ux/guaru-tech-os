# Mensuração & Tracking (cânone) · Módulo N3 do Gestor de Tráfego

<!-- Faculdade · curriculo Gestor de Tráfego, Fase 2. Destilação: Meta Pixel + Conversions API (CAPI) +
     GA4/GTM + KPIs + atribuição. Grounding: pesquisa 2026-06-26. "Sem medir, não é tráfego, é torcida." -->

> **Regra-mãe:** o algoritmo só otimiza pro que ele CONSEGUE MEDIR. Tracking ruim = a IA otimiza às cegas =
> dinheiro desperdiçado. Medição não é relatório bonito — é o **combustível de sinal** da campanha.

## 1. O sinal de conversão (Pixel + CAPI)
- **Pixel** (navegador) sozinho captura só **40–60%** das conversões (bloqueio de cookie/iOS). 
- **Conversions API (CAPI)** = envio **server-side** dos eventos → Pixel+CAPI+Advanced Matching capturam
  **90–98%**, e dá ~**18% menor custo por resultado** (dados Meta 2026). **Hoje CAPI é obrigatório**, não opcional.
- **Eventos** = as ações que importam (lead, agendamento, compra, contato). Definir o evento certo de
  otimização (frequente o bastante pra sair do aprendizado — ver módulo F2).

## 2. KPIs (o que olhar, e o que é vaidade)
- **De entrega:** CPM (custo/mil impressões), CTR (clique), frequência (fadiga se alta).
- **De resultado (os que importam):** **CPL** (custo por lead), **CPA** (custo por aquisição), **ROAS**
  (retorno sobre investimento em ads), **CAC** vs **LTV**.
- **Vaidade (cuidado):** curtidas/alcance isolados não pagam conta. Subir até o resultado de negócio.
- **Por estágio (F1):** topo = CPM/CTR/view; meio = CPL; fundo = CPA/ROAS.

## 3. Atribuição (com humildade)
- **Janela de atribuição** (ex.: 7-day click/1-day view) muda o número — comparar sempre a mesma janela.
- Last-click engana (ignora o topo que preparou). Olhar o conjunto; em local/serviço, considerar ligações/
  DM/visita que não viram "evento web".
- **GA4 + GTM** = a infra de tracking cross-channel (site/landing). Pixel/CAPI = o sinal pra Meta.

## 4. Relatório ao cliente (a entrega visível)
- Traduzir métrica em **resultado de negócio** (não jargão): "R$X investido → Y leads → custo Z por lead".
- 3–4 números que importam + 1 aprendizado + 1 próximo passo. Honesto (incl. o que não foi bem). Liga com
  `marketing/metricas-relatorio-redes-sociais.md`.

## Como isto MUDA a entrega (backward)
1. **Tracking ANTES de gastar:** Pixel + **CAPI** + evento certo configurados, senão a IA otimiza cego.
2. **Otimizar pelo KPI de resultado** (CPL/CPA/ROAS), não vaidade.
3. **Mesma janela de atribuição** pra comparar; ler o funil inteiro, não só last-click.
4. **Relatório = resultado de negócio** traduzido, honesto.

## Erros que este módulo proíbe
Rodar sem CAPI (perde 40-60% do sinal) · otimizar por curtida/alcance · evento de otimização raro demais ·
comparar janelas diferentes · last-click cego · relatório de vaidade/jargão.

## Pra aprofundar (cânone)
**Google Skillshop — Measurement (GA4)** · Meta — Pixel & Conversions API docs · `marketing/metricas-relatorio-redes-sociais.md`.
