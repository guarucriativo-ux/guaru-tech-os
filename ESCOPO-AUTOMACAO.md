# Guaru Tech — Escopo de Automação (mapa de execução)

> Onde estamos no caminho até a máquina rodar sozinha, e o que falta. Complementa
> [VISION.md](VISION.md) (norte), [BUSINESS-MODEL.md](BUSINESS-MODEL.md) (negócio) e
> [CLAUDE.md](CLAUDE.md) (como operamos).
> 📅 Fotografia de **2026-06-22**. **Documento vivo** — atualizar os % conforme as costuras fecham.
> ⚠️ % são **estimativas** de engenharia, não medições exatas.

---

## Dois alvos (não confundir)
A pergunta "quanto falta?" tem duas respostas, porque há dois alvos diferentes:

- **🎯 Alvo A — Prova social (um Instagram de nicho, conteúdo bom e consistente, semi-automático):**
  **~70% pronto.** Não exige automação total — exige consistência + qualidade, que a máquina já
  entrega. É o alvo a perseguir AGORA.
- **🎯 Alvo B — 100% automático ponta a ponta (gera + posta + anuncia + capta lead + dashboard,
  sem humano):** **~40% pronto.** É o destino, não o próximo passo.

> Regra que explica o gap: **os últimos 20% são 80% do trabalho.** A base (o difícil de conceber)
> está alta; o "último metro" automático é o pesado e está quase todo por construir.

---

## Mapa por peça (estimativa, 2026-06-22)
| Peça da máquina | Status | ~% |
|---|---|---|
| Geração de conteúdo / copy | ✅ autônomo na nuvem (GitHub Action + guaru-bot), provado | 95% |
| Geração de imagem (motor autoral HTML+SVG→PNG) | 🟡 funciona, mas roda manual/local | 70% |
| Biblioteca do nicho específico | 🟡 template + método prontos; falta o conteúdo do nicho | 40% |
| Orquestração (colar gera→render→agenda num loop) | 🟡 só o passo de conteúdo está colado | 35% |
| Postagem automática no Instagram | ❌ só intenção (precisa Meta Graph API + conta business) | 10% |
| Tráfego real (subir a campanha, não só o blueprint) | 🟡 gera o plano, não sobe | 25% |
| Dashboard / relatório | ❌ dados são logados no ledger; falta visualizar | 20% |
| Lead → oferta → venda | ❌ módulo CRM ainda é stub | 15% |
| Qualidade sem supervisão (confiabilidade p/ postar sozinho) | 🟡 hoje o Marcos aprova | 35% |
| **Média ponderada → Alvo B (100% automático)** | | **~40%** |

---

## Recomendação de rota
**Mirar no Alvo A primeiro.** Prova social não exige automação total; exige um Instagram de nicho
de pé, postando peças boas com regularidade — vitrine viva que já capta cliente e valida o modelo.
A automação 100% (Alvo B) se costura **depois** da prova social, quando já houver caso real pra
justificar o último metro e a biblioteca do nicho já estiver endurecida com peças reais.

> Princípio (do próprio fundador): **um flywheel girando vale mais que dez pela metade.** Provar
> UM nicho inteiro antes de abrir os outros — clonar depois é "copia o nicho, troca a biblioteca".

---

## O que falta, em ordem

### Para o Alvo A (prova social — semanas, não meses)
1. **Escolher o nicho** do 1º Instagram de prova.
2. **Estudar o nicho de fonte real** (pesquisa validada — sem régua de design nem referência pré-salva; o especialista cria do método dele).
3. **Cadência de postagem** semi-automática (a máquina gera; scheduler simples ou pessoa posta).
4. **Consistência por algumas semanas** — virar vitrine viva.

### Para o Alvo B (100% automático — depois da prova)
5. **Render de imagem na nuvem** (Puppeteer no runner / serverless) — fechar o motor de imagem auto.
6. **Postagem automática** via Instagram/Meta Graph API (conta business + app aprovado).
7. **Tráfego real** — conectar o blueprint à Meta (upload de imagem + subir/ativar campanha).
8. **Dashboard** lendo o `ledger.jsonl` (desempenho, CPC, leads).
9. **Lead → oferta → venda** (sair do stub no módulo CRM).
10. **Qualidade-em-código** boa o bastante pra postar sem o olho do Marcos.

---

## Automação planejada: reabastecimento do banco de imagens (Flux)
Ideia do Marcos (2026-06-22). Loop programado que abastece os bancos de nicho — mesma receita da
Action de conteúdo que já roda, trocando o miolo.

**Fluxo:**
```
cron (Seg/Qua/Sex) → para cada nicho:
   monta o prompt a partir das regras do nicho
   → chama a API do Flux (4 imagens; uso barato p/ fundo/textura/mood, NÃO produto real de cliente)
   → sobe pro storage de nuvem
   → registra no image-bank.json com status "pendente"
   → avisa o Marcos (e-mail/WhatsApp) com as miniaturas
Marcos aprova/rejeita → aprovadas viram "ativas" (a máquina passa a usar); rejeitadas descartadas.
```

**Princípio que NÃO pode faltar (senão vira mito):** acumular imagem **não** faz o modelo (Flux,
congelado) ficar mais inteligente. O sistema fica mais exigente **só se** cada aprovar/rejeitar
for **registrado com o motivo** (ciclo de aprendizado) — e esse critério acumulado refina o prompt
e sobe a régua do auto-aceite. **Rejeição tem que virar regra escrita.** O acervo é matéria-prima;
as decisões registradas sobre ele é que compõem ("cure o critério, não o arquivo").

**Caminho mais fundo (opcional, deliberado, não automático):** style-reference (alimentar
aprovadas como referência de estilo, barato) e, com acervo grande/consistente, fine-tune/LoRA
(treino real do estilo — etapa paga).

## Marcos já comprovados (base que sustenta os %)
- ✅ Execução autônoma de conteúdo na nuvem (2026-06-22, commit `ca42efa`, `guaru-bot`).
- ✅ Render de imagem autoral (carrosséis do Lanche do Seu Zé).
- ✅ Ciclo de aprendizado funcionando (erro→regra→acerto no mesmo dia).
- ✅ Biblioteca de nichos crescendo (`cabelo-loiro`, base de hamburgueria via Lanche do Seu Zé).
