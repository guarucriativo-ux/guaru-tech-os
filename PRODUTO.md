# Guaru Tech — Spec do Produto (planta do Estágio 3→4)

> A planta do produto que o cliente final usa: onboarding e operação pelo WhatsApp, com loop de
> feedback e upsell modular. Visão do Marcos (2026-06-22), com 5 correções de engenharia embutidas.
> Complementa [VISION.md](VISION.md), [BUSINESS-MODEL.md](BUSINESS-MODEL.md) (pricing) e
> [ESCOPO-AUTOMACAO.md](ESCOPO-AUTOMACAO.md) (o que falta construir).
> ⚠️ É **planta**, não está construído — é o destino (Estágio 3→4). Construir tijolo por tijolo,
> e **só vender o que já existe**.

---

## 1. Onboarding pelo WhatsApp (self-service)
Ao instalar a tecnologia no WhatsApp do cliente, um **briefing rápido** (questionário) coleta:
nicho, cores, fotos próprias, intenções, **como** ele quer o conteúdo e **em quais dias** quer postar.

→ As respostas **viram o perfil/briefing do cliente sozinhas** (hoje feito à mão) — dados reais
(nicho, cores, fotos), não régua de estilo. É o que torna o cadastro escalável (multi-inquilino);
a "pasta por cliente" já isola cada um.

## 2. Operação: gerar → confirmar → postar
No dia/horário programado, antes de ir pro Instagram, o cliente recebe a peça pra **confirmar o
layout**.

- **Formato à escolha do cliente:** **carrossel** ou **post único** (definido no briefing ou pedido por peça).
- **✅ Correção 1 — confirmação configurável (anti-fadiga):** o cliente escolhe o modo:
  *confirma cada post / confirma o lote da semana / automático total depois de N aprovações*.
  Confirmar tudo cansa; quem confia, libera.

## 3. Loop de feedback (Like / Dislike)
O cliente dá 👍 (aprovado, vai pro ar) ou 👎 (reprovado, não posta). O dislike entra na base como
material reprovado.

- **Revisão por áudio (zero fricção, jeito BR):** em vez de só 👎, o cliente manda um áudio ("gostei,
  mas troca a foto / muda a cor"). Fluxo: áudio → **transcrição** → o sistema entende → **eco de
  confirmação** ("entendi: trocar a foto e clarear o fundo — confirma?", evita agir em cima de
  transcrição errada) → regenera → reentrega. **Cada revisão é feedback de ouro** (registrada →
  personalização do cliente + padrões do nicho). Política: **X revisões inclusas por peça**
  (anti-abuso/custo). Revisão complexa **escala pro humano** enquanto o sistema amadurece (autonomia cresce).
- **✅ Correção 2 — aprendizado por-cliente ≠ por-nicho:** o feedback do cliente X personaliza o
  conteúdo **do X**. Só **padrões anônimos entre muitos clientes** mexem na regra do nicho. O
  dislike do X **nunca** vaza pra gaveta de outro cliente (regra de isolamento — ver CLAUDE.md).
- **✅ Correção 3 — não fabricar o motivo da rejeição (não envenenar o dado):** dislike sem motivo
  NÃO pode virar "foi bom" (instinto certo do Marcos). Mas inventar uma "característica negativa
  padrão" ensina o sistema errado. Em vez disso:
  - No dislike, oferecer **3–4 botões de 1 toque** (ex.: *muito poluído / cor errada / foto não
    combina / texto fraco*) → motivo estruturado, sem digitar.
  - Se pular, registrar **"rejeitado, motivo desconhecido"** = peso negativo naquela peça, **sem
    inventar a causa**. Dado honesto > dado chutado. (Isto alimenta o ciclo de aprendizado de verdade.)

## 4. Rotatividade do banco de imagens
A base se renova pra o cliente não ver sempre o mesmo.

- **✅ Correção 4 — expiração inteligente, não só por data:** ponderar **desempenho (likes) +
  idade + nº de usos**. Campeã aprovada fica mais tempo (varia-se só a composição); fraca ou
  muito usada sai rápido. Expirar **só por tempo** jogaria fora a melhor imagem junto com o lixo.

## 5. Upsell modular (land-and-expand)
Base barata, expansão por add-on — aumenta o LTV sem buscar cliente novo. Exemplo (estimativa):

| Item | Preço (estimativa) |
|---|---|
| Base — automação de posts | R$147/mês |
| + Gerador de campanha de tráfego pago | +R$79,90/mês |
| + CRM do negócio com automação de WhatsApp | +R$119/mês |

- **✅ Correção 5 — tiers = mapa de monetização do roadmap:** tráfego e CRM ainda são **costuras
  abertas** (ver ESCOPO). Vender **só o que já existe**; cada motor pronto vira um upsell. Não
  prometer o CRM antes do CRM existir.

---

## 6. Matrículas e cobrança (billing) — [Estágio 3-4]
**Não construir infraestrutura de pagamento.** Integrar uma plataforma de **cobrança recorrente
brasileira** (ex.: Asaas, Iugu, Vindi, Pagar.me, Stripe Billing, Mercado Pago). Ela vira a **fonte
da verdade da "matrícula"** e cuida do que dói:
- **Métodos:** **Pix Automático** (recorrente, taxa baixa — forte no Brasil) · **cartão recorrente**
  (padrão, mas tem churn involuntário por cartão vencido/recusado → exige dunning) · **boleto**
  (pior pra recorrência, alta inadimplência).
- **Inadimplência:** a plataforma faz **régua de cobrança** (retry automático, lembrete, notificação)
  e marca o inadimplente. Via **webhook**, avisa o nosso sistema → o sistema **pausa o serviço**
  (para de postar/gerar) até regularizar, e reativa quando o pagamento volta.
- **Matrícula = estado:** ativo / inadimplente / cancelado, **lido da plataforma**, não controlado à mão.
> ⚠️ Pesquisa pendente: comparar taxas/recursos das plataformas BR + estado do **Pix Automático**
> (regras/custo atuais) antes de escolher.

## 7. Bônus de tráfego na assinatura (gancho de aquisição) — [Estágio 3-4]
Ao assinar, o cliente ganha **X (valor simbólico) de tráfego automatizado** — mostra resultado
rápido (o "aha"), demonstra a capacidade de tráfego e puxa o upsell do plano pago.

⚠️ **Estruturar certo, senão queima conta e dinheiro:**
- **É dinheiro real = CAC budgetado.** "Grátis" sai do bolso da Guaru → manter literalmente
  simbólico, como custo de aquisição (ou usar **créditos de anúncio da Meta** quando houver).
- **Estrutura de conta (landmine):** NÃO rodar todos os clientes por uma única conta pessoal de
  anúncios (mistura billing, fere termos da Meta, risco de ban). O certo: **Meta Business Manager
  com conta de anúncio POR cliente** (Guaru com acesso de gestor), e o **cliente dono do próprio
  pixel/audiência** (ativo dele — regra de isolamento).
- **Depende da automação de tráfego:** hoje o ads-engine gera blueprint, não sobe campanha (costura
  aberta do Estágio 3). O bônus só entrega quando esse último metro existir, já com a conta estruturada.
- **Teto de gasto rígido** (guardrail) — gasto automatizado sem limite duro pode sangrar dinheiro.

## 8. Gestor de tráfego conversacional + crédito (WhatsApp) — [Estágio 3-4]
O cliente acompanha e comanda a campanha **falando** (áudio) com o "gestor", e vê resumo no WhatsApp.

**Acompanhar e comandar por voz:**
- "Como está a campanha? qual está dando certo?" → o gestor lê métricas reais (Meta Marketing API:
  gasto, CPC, conversões, leads) e responde simples, **com honestidade** (diz o que está caro, não só elogia).
- Objetivo em linguagem natural ("conversão pro site" / "mais vendas no e-commerce" / "mais
  seguidores") → mapeia pro objetivo Meta certo. ⚠️ **Pré-requisito técnico:** conversão/venda exige
  **pixel** (e **catálogo** no e-commerce) — o gestor guia o setup ou avisa que falta. E **gerencia
  expectativa**: otimiza pra venda, não garante venda (oferta/preço/produto pesam) — prometer demais = churn.
- **Autonomia gradual:** cedo REPORTA + RECOMENDA, humano aprova ajustes; com dados + guardrails, ajusta sozinho.

**Crédito (abastecer pelo WhatsApp):**
- Crédito acabando → gestor **avisa proativamente**; cliente abastece pelo próprio zap.
- ⚠️ **Sempre via a plataforma de cobrança (§6), nunca cartão no chat:** link/QR **Pix** (paga na
  hora, webhook confirma) ou cartão recorrente **com confirmação do valor** → crédito sobe.
- ⚠️ **Separar dois fluxos:** (1) **assinatura do serviço** (matrícula/receita) e (2) **carteira de
  verba de anúncio** (vai pra Meta). Não misturar — clareza contábil.
- ⚠️ **Decisão estrutural (verba):** o limpo/baixo-risco é a **conta de anúncio do PRÓPRIO cliente,
  no cartão dele** (Guaru gerencia, cliente paga a Meta). Guaru segurar o dinheiro e pagar a Meta =
  **intermediária de verba** (peso financeiro/fiscal + regras de revenda Meta) — evitar salvo se valer muito.

**Acompanhamento (CRM/Dashboard):** começa como **resumo no WhatsApp** (gestor conta os números, lê
do ledger + Meta — barato) e evolui pra **dashboard visual** + CRM de leads (`04-crm-systems`, hoje stub).

## Onde isso se encaixa
Tudo aqui é **Estágio 3→4** (ver [ESCOPO-AUTOMACAO.md](ESCOPO-AUTOMACAO.md)): WhatsApp +
onboarding self-service + aprovação do cliente + billing modular. Cada peça tem componente
correspondente já mapeado — é a planta da casa, coerente com a arquitetura. Pré-requisito:
**provar o Alvo A (um nicho real) antes**, pra construir isto sobre caso validado.
