# Fundamentos de UX & Usabilidade (cânone) · Módulo F1 do Web Designer

<!-- Faculdade · curriculo Web Designer, Fase 1. Destilação do CÂNONE: Norman "The Design of Everyday Things" ·
     Krug "Don't Make Me Think" · Nielsen Norman Group (10 heurísticas) · Yablonski "Laws of UX". Grounding:
     pesquisa 2026-06-26. Pré-requisito da camada web; herda a fundação visual do gráfico. Só o que muda a entrega. -->

> Web design não é só "ficar bonito" — é a pessoa **conseguir usar sem pensar**. Uma interface linda que
> confunde converte menos que uma simples que flui. (Forrester: cada $1 em UX retorna até $100.) Este módulo é a
> base de "fazer o usuário não pensar".

## 1. Os conceitos de Norman (como as coisas se tornam usáveis)
- **Affordance (affordância):** o que um elemento PERMITE fazer (um botão "convida" a clicar). 
- **Signifier (signo):** a pista visual que SINALIZA a affordância (parecer clicável: cor de acento, formato,
  sombra). Um "botão" que não parece botão não é clicado.
- **Feedback:** toda ação precisa de resposta imediata (clicou → algo acontece visível). Silêncio = confusão.
- **Mapeamento:** a relação entre controle e efeito ser natural/esperada.
- **Modelo mental:** a pessoa traz expectativas de outros sites — respeitá-las (consistência externa).
- **Restrições:** limitar opções pra evitar erro (form que só aceita o formato certo).

## 2. As 10 heurísticas de Nielsen (o checklist clássico de usabilidade)
1. **Visibilidade do estado** (mostrar o que está acontecendo: carregando, enviado). 
2. **Linguagem do usuário** (palavras dele, não jargão técnico). 
3. **Controle e liberdade** (desfazer, voltar, sair). 
4. **Consistência e padrões** (mesmo elemento = mesmo comportamento; seguir convenções conhecidas). 
5. **Prevenção de erro** (impedir antes de acontecer). 
6. **Reconhecer > lembrar** (opções visíveis, não exigir memória). 
7. **Flexibilidade/eficiência** (atalhos pro experiente, simples pro novato). 
8. **Estética minimalista** (só o essencial; cada item a mais compete). 
9. **Ajudar a reconhecer/resolver erros** (mensagem clara, em linguagem humana, com saída). 
10. **Ajuda/documentação** (quando preciso, fácil de achar).

## 3. As Leis de UX (Yablonski) — psicologia aplicada
- **Lei de Jakob:** o usuário espera que o seu site funcione como os outros que ele já usa → **não reinventar**
  padrões (o carrinho, o menu, o botão). Convenção converte; originalidade gratuita confunde.
- **Lei de Hick:** mais opções = mais tempo/paralisia → **reduzir escolhas** (menos links, menos campos).
- **Lei de Fitts:** alvo maior e mais perto = mais fácil de acertar → **CTA grande, no polegar** (mobile).
- **Lei de Miller:** memória de trabalho limitada (~7 itens) → **agrupar/chunking** (Gestalt!).
- **Lei de proximidade/similaridade:** (herdada da Gestalt do gráfico) — agrupar relacionados.

## 4. A síntese de Krug (o mantra prático)
- **"Don't make me think":** óbvio > esperto. Se a pessoa precisa parar pra entender o que é/o que clicar, falhou.
- **A pessoa NÃO lê — escaneia.** Projetar pra escaneabilidade: headings claros, blocos curtos, hierarquia
  visual forte (tipografia do gráfico), CTA óbvio.
- **Tudo clicável tem que PARECER clicável** (signifier) — e o não-clicável não pode parecer.
- **Reduzir o "ruído"** (Prägnanz/Gestalt): cada elemento que não ajuda, atrapalha.

## Como isto MUDA a entrega (backward)
1. **Botão parece botão** (signifier: cor de acento, estado hover/ativo) — clicável é óbvio.
2. **Feedback em toda ação** (loading, sucesso, erro humano).
3. **Seguir convenções** (Jakob) — não inventar UI; o usuário já sabe usar o padrão.
4. **Reduzir escolhas e campos** (Hick) — simplicidade converte.
5. **Projetar pra ESCANEAR** (hierarquia, blocos curtos, CTA óbvio) — ninguém lê tudo.
6. **CTA grande e ao alcance** (Fitts, mobile).

## Erros que este módulo proíbe
Botão que não parece botão · ação sem feedback · inventar padrão estranho (quebra Jakob) · excesso de opções/
campos (Hick) · texto denso não-escaneável · jargão técnico · erro sem mensagem clara · "bonito mas confuso".

## Pra aprofundar (cânone)
Norman, *The Design of Everyday Things* · Krug, *Don't Make Me Think* · Nielsen Norman Group (10 heurísticas) ·
Yablonski, *Laws of UX* (lawsofux.com). Fundação visual herdada: `design/principios-visuais-gestalt.md` etc.
