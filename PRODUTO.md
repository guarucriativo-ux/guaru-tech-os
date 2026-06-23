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

→ As respostas **preenchem o `brand-dna.json` do cliente sozinhas** (hoje feito à mão). É o que
torna o cadastro de cliente escalável (multi-inquilino). A "pasta por cliente" já isola cada um.

## 2. Operação: gerar → confirmar → postar
No dia/horário programado, antes de ir pro Instagram, o cliente recebe a peça pra **confirmar o
layout**.

- **✅ Correção 1 — confirmação configurável (anti-fadiga):** o cliente escolhe o modo:
  *confirma cada post / confirma o lote da semana / automático total depois de N aprovações*.
  Confirmar tudo cansa; quem confia, libera.

## 3. Loop de feedback (Like / Dislike)
O cliente dá 👍 (aprovado, vai pro ar) ou 👎 (reprovado, não posta). O dislike entra na base como
material reprovado.

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

## Onde isso se encaixa
Tudo aqui é **Estágio 3→4** (ver [ESCOPO-AUTOMACAO.md](ESCOPO-AUTOMACAO.md)): WhatsApp +
onboarding self-service + aprovação do cliente + billing modular. Cada peça tem componente
correspondente já mapeado — é a planta da casa, coerente com a arquitetura. Pré-requisito:
**provar o Alvo A (um nicho real) antes**, pra construir isto sobre caso validado.
