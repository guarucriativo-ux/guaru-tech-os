# Guaru Tech — Modelo de Negócio

> Documento de modelo de negócio. Complementa [VISION.md](VISION.md) (o norte) e
> [CLAUDE.md](CLAUDE.md) (o como operamos). Criado em 2026-06-22.
> ⚠️ **Números marcados como "(estimativa)" são ilustrativos** — ainda não validados com dados
> reais de mercado nem com clientes pagantes. Servem pra raciocínio, não pra projeção financeira.

---

## 1. Pitch em uma linha
**Marketing e design feitos-para-você, no automático, para o pequeno empreendedor — por uma
máquina de IA que aprende e fica mais barata de operar a cada cliente.**

O empreendedor preso na operação não tem tempo nem domínio pra fazer marketing/design com
maestria. A Guaru Tech executa isso por ele, como serviço recorrente.

---

## 2. O ativo: a máquina (não é "IA genérica")
Um cérebro alugado (API da Claude) dentro de um **corpo proprietário** que lembra, aprende e
trabalha sozinho:

- **Espinha/memória:** repositório + `ledger.jsonl` + `niches-library/` + arquivos de memória.
  É o que faz o sistema *crescer conforme trabalha*.
- **4 órgãos (por cliente):** conteúdo (copy/roteiro) · render de imagem (HTML+SVG→PNG) ·
  plano de campanha (Meta) · mini-CRM de leads.
- **Ciclo de aprendizado:** rotação de ângulo via ledger · feedback de design no `learning-log`
  (codifica o *olhar* do fundador) · promoção pra `niches-library` quando se prova · protocolo de
  3 camadas (Base Mãe → nicho → DNA do cliente).
- **Autonomia:** GitHub Action roda na nuvem, no agendamento, sem máquina ligada (comprovado
  2026-06-22 — o `guaru-bot` gerou e commitou um pacote semanal sozinho).

**O cérebro qualquer um aluga; o corpo (biblioteca + método + olhar acumulado) é o moat.**

---

## 3. Quem servimos
Pequenas e médias empresas / MEIs sem braço de marketing — começando por nichos onde a biblioteca
é mais funda (ex.: hamburguerias, salões/estética). Vertical primeiro, horizontal depois.

---

## 4. Oferta e preço (estimativa)
Assinatura recorrente em faixas:

| Plano | Entrega | Faixa (estimativa) |
|---|---|---|
| **Essencial** | Pacote de conteúdo/criativos gerados por mês | R$200–350/mês |
| **Pro** | Conteúdo + criativos + plano de anúncios + agendamento | R$400–600/mês |
| **Done-for-you** | Tudo no automático + publicação + relatório | R$700–1.200/mês |

> O cliente compra **o resultado** ("seus posts e anúncios prontos, toda semana"), não um painel.
> Login/self-service é fase posterior (ver Roadmap).

---

## 5. Unit economics — a métrica que decide tudo (North Star)
**O custo de servir cada novo cliente tem que cair conforme a `niches-library` cresce, com o
preço estável.**

- Cliente nº 1 de um nicho: caro (cria-se a biblioteca do zero).
- Cliente nº 50 do mesmo nicho: fração do custo (biblioteca já existe, reaproveita-se).
- Se isso acontece → assinatura vira margem alta e escalável. Se não acontece → vira consultoria
  que não escala. **Todo registro/promoção pra biblioteca existe pra fazer esse custo cair.**

**Cenário ilustrativo (estimativa):** 300 clientes × R$300/mês = **~R$90 mil/mês recorrente**
com estrutura enxuta. 1.000 clientes muda o patamar do negócio. (Depende 100% de retenção real.)

---

## 6. Moat (defensibilidade)
1. **Biblioteca proprietária por nicho** — o que converte em cada setor, acumulado e validado.
2. **Ciclo de aprendizado** — cada cliente melhora o sistema pro próximo (efeito de rede de dados).
3. **O olhar do fundador codificado** — taste vira regra; não se copia num fim de semana.

O concorrente tem a mesma API da Claude. Ele **não** tem a sua biblioteca nem os seus 50 clientes
de aprendizado. Esse é o fosso.

---

## 7. Valor de construção (custo de reconstruir o que existe) — (estimativa)
> Isto é **custo de build**, NÃO valuation do negócio. São coisas diferentes.

- Reconstruir o motor/MVP atual (IA de conteúdo + render de imagem + gerador de campanha +
  ledger/aprendizado + CLI + automação em nuvem): trabalho de **dev sênior full-stack com
  experiência em IA**, ~2–4 meses → faixa de **R$80 mil–R$250 mil** (freelance/contratação).
- Turnkey por software house (com design de produto + arquitetura): **R$200 mil–R$600 mil+**.
- **O que dinheiro não compra rápido:** a `niches-library`, o método de design e o olhar
  acumulado. Isso é IP, não serviço entregável.
- **Nota:** o fundador executou os papéis de dev sênior + diretor de criação + estrategista de
  produto usando IA como alavanca — comprimiu o output de um time.

⚠️ **Valor de build ≠ valor do negócio.** O negócio vale por **receita recorrente + retenção +
moat**, ainda a provar com os primeiros pagantes.

---

## 8. Go-to-market
- **Vertical primeiro:** dominar 1 nicho ("o sistema das hamburguerias") antes de abrir frentes.
- **Porta de entrada WhatsApp**, não app (zero fricção pra PME no Brasil).
- **Prova social:** portfólio de peças (ex.: carrosséis do Lanche do Seu Zé) como amostra viva.
- **Primeiros 1–3 pagantes** = o objetivo que destrava tudo (valida disposição a pagar + retenção).

---

## 9. Roadmap por estágios (onde estamos)
| Estágio | O que é | Status |
|---|---|---|
| 1. Forja/motor interno | Toolkit + método + biblioteca, operado manualmente | ✅ feito |
| 2. Serviço produtizado | Clientes **pagantes** recorrentes, "IA faz, humano aprova" | 🟡 **estamos entrando** |
| 3. Plataforma semi-automatizada | Render+publicação na nuvem, dashboards, cobrança | ⬜ costuras abertas |
| 4. SaaS multi-inquilino | Cliente loga/assina, agentes autônomos | ⬜ o destino |

**Costuras abertas (deixadas com intenção):** render de imagem na nuvem · publicação/agendamento
real (Instagram/Meta) · multi-inquilino + login · billing. (A execução-em-nuvem do *conteúdo* já
está fechada.)

---

## 10. Riscos honestos
1. **Escopo:** foco numa frente por vez; "fazer tudo" cedo demais mata.
2. **Autonomia:** hoje "IA faz 90%, humano aprova"; autonomia total por tarefa só quando as
   regras endurecerem — senão um self-serve entrega peça ruim e perde o cliente.
3. **Distribuição/retenção:** construir ≠ vender. Receita recorrente depende de **reter**.
4. **Dependência de fornecedor:** o cérebro é a API da Claude (custo/políticas de terceiro) — o
   moat (biblioteca) é o que protege disso.

---

## 11. Status comprovado vs. a provar (2026-06-22)
- ✅ **Comprovado:** geração de conteúdo autônoma na nuvem (GitHub Action + `guaru-bot`);
  render de imagem autoral (HTML+SVG→PNG); ciclo de aprendizado funcionando (erro→regra→acerto
  no mesmo dia); biblioteca de nichos crescendo.
- 🟡 **A provar:** clientes pagantes, retenção, custo-por-cliente caindo na prática, e o último
  metro (postar/anunciar sozinho).
