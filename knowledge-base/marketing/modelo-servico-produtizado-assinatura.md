# Modelo de negócio: serviço produtizado por assinatura (o molde do Psi.automatic)

<!-- Origem: pesquisa do Claude (sessão nuvem 2026-06-25) a pedido do Marcos, pra entender e validar o
     modelo de negócio do Psi.automatic SEM achismo (cultura da fábrica: dados validados, fontes verídicas).
     Destila benchmarks reais de players + faixas de preço BR + riscos conhecidos. Liga com: BUSINESS-MODEL.md,
     PRODUTO.md, PLANO-FINANCEIRO.md, DIFERENCIAL.md e niches-library/psicologia/oferta-v1.md. -->

## O que é (o nome do modelo)
**Serviço produtizado por assinatura** (*productized service* + recorrência) — também chamado de
*creative/design-as-a-service*. Não é orçamento por projeto (agência tradicional) nem ferramenta DIY: é um
**pacote FIXO, recorrente e padronizado** entregue como "linha de montagem" por cliente. O cliente assina,
faz pedidos dentro de um escopo definido, e recebe pronto.

É exatamente o molde do **Psi.automatic**: ~R$97/mês, o psicólogo tem "um designer de bolso" — cadastra-se o
DNA + referências dele no onboarding, e depois ele só **pede conteúdo pelo WhatsApp** e recebe pronto, já
guiado por pesquisa (o sistema sugere o assunto que converte, não espera ele ter ideia).

## Players que validam o modelo (benchmarks reais)
- **Design genérico (requests ilimitados):** Penji ~US$499/mês · Design Pickle (migrou pra ~US$1.900/mês por
  horas) · ManyPixels · Superside.
- **Conteúdo de social done-for-you (mais perto do nosso):** **Feedbird US$99/mês** · **Glow Social US$99/mês** ·
  100 Pound Social £100/mês — mês a mês, sem contrato, time cria e o cliente aprova.
- **Leitura:** já existe mercado provado de assinatura de conteúdo done-for-you na faixa de ~US$99/mês. O
  diferencial não é "ter o modelo" (commodity) — é a verticalização + custo de entrega baixo (ver abaixo).

## Faixas de preço no Brasil (contexto de mercado)
- Gestão de redes por **agência:** R$500–1.500/mês (básico, 8–12 posts) → R$1.500–4.500 (intermediário) →
  R$5.000–10.000+ (avançado/premium).
- **Freelancer:** R$500–4.000/mês.
- **Implicação pro Psi.automatic:** R$97/mês ocupa um **espaço quase vazio** — o "vão do meio" entre o
  Canva-faça-você-mesmo (~R$40) e a agência (R$500+). Um humano NÃO entrega a R$97; a fábrica entrega (custo
  de geração ≈ centavos). **Esse gap é o fosso, não um preço baixo por desespero.**

## Regras de precificação (destiladas)
1. **Preço não se ancora no custo, e sim no VALOR percebido + churn.** O custo da fábrica é baixíssimo, então
   margem não é o problema; o limite é quanto o cliente valoriza e por quanto tempo fica.
2. **Método de sanidade de preço:** custo real de entrega × buffer 15–20% × margem-alvo (mín. 30–40%). A
   fábrica mira ~80% de margem — folga enorme; o R$97 passa fácil no teste de custo.
3. **LTV:CAC ideal = 3:1.** CAC do Psi.automatic tende a ~zero (vitrine de nicho + indicação) — alavanca forte.
4. **Tiers reduzem churn** melhor que preço único (flat): o flat cobra demais do cliente leve e entrega de
   menos pro pesado. Pensar em 1–2 degraus acima do R$97 no futuro (não no MVP — tijolo-por-tijolo).

## Os 3 riscos conhecidos do modelo (e como o nosso já responde)
1. **A armadilha do "ilimitado" (scope creep)** — o nº1 que mata a margem em serviço produtizado.
   ✅ Resposta: escopo FIXO (X posts/mês + X revisões inclusas), nunca "ilimitado". Já está no `oferta-v1.md`
   e nas 5 correções do `PRODUTO.md`.
2. **Churn é o assassino do modelo.** Perto de ~US$25k MRR, ~60% dos players batem na parede do churn.
   ✅ Resposta: bate com o `PLANO-FINANCEIRO.md` (*"reter > vender"*); reforça investir em retenção/resultado
   percebido desde o 1º cliente, não só em aquisição.
3. **Preço flat aumenta churn** (desalinha cliente leve × pesado). ✅ Resposta: roadmap de tiers (acima).

## O que nos diferencia dos players (o pulo do gato)
Os genéricos (Design Pickle/Penji) **executam o que mandam**. O Psi.automatic é **VERTICAL** (só psicólogo) +
**ESTRATÉGICO** (já diz o que converte, baseado em pesquisa do nicho) + entregue por **WhatsApp** (zero
fricção, jeito BR). É o `DIFERENCIAL.md` na prática: *"GPT é uma faca; nós somos o chef que já cozinhou seu
prato mil vezes."* Nenhum player global sabe o que converte pra psicólogo no Brasil — a fábrica sabe, e o
saber acumula (MOAT).

## Nota de aplicação
O preço NÃO é tabela única global da Guaru Tech — **é por projeto/braço**. O Psi.automatic tem a lógica de
assinatura de nicho (este doc); o Guaru Estúdio terá outra (serviço premium humano). O `PLANO-FINANCEIRO.md`
é uma projeção especulativa, não a tabela cravada. Tratar preço como "a definir por projeto", não como
divergência a corrigir.

## Fontes
- Penji × Design Pickle (modelo de requests ilimitados): https://penji.co/design-pickle-reviews/
- ManyPixels — comparativo 2026: https://www.manypixels.co/blog/get-a-designer/design-pickle-vs-manypixels-vs-superside
- Feedbird (US$99/mês, assinatura de marketing): https://feedbird.com/pricing
- 100 Pound Social (£100/mês done-for-you): https://100poundsocial.com/plans/social-media/
- Preços de gestão de redes no Brasil (2026): https://aintegrare.com.br/quanto-custa-gestao-redes-sociais
- Guia de serviços produtizados: https://assembly.com/blog/productized-services
- Recurring services — preço, escopo, margem: https://wayfront.com/blog/recurring-service
- Benchmarks de receita/churn em serviços produtizados: https://www.winsavvy.com/productized-service-business-models-revenue-churn-benchmarks/
