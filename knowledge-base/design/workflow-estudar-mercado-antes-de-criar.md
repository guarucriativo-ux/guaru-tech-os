# Workflow: ESTUDAR o mercado validado antes de criar (caminho do designer humano)

Nota da faculdade. Origem: Marcos propôs testar (2026-06-26) um caminho mais próximo de como designer
humano trabalha — pesquisar referência de mercado ANTES, em vez de criar "no escuro". Testado no nicho de
odontologia (cliente fictício Lume) e o resultado subiu de patamar vs. o teste anterior (joalheria sem
pesquisa). É o MANIFESTO aplicado: **estudar antes de agir**.

## O processo (passo a passo)

1. **Escolher o nicho** — preferir **classe B** (serviço/autoridade; ver `niches-library/mercado-classe-b.md`).
2. **Pesquisar referência de mercado** (como designer faz):
   - **Behance** e **Pinterest**, busca `nicho + social media` (ex.: "dental social media", "social media
     odontologia"). Ver projetos populares e boards de paleta/feed.
   - Ver **como as empresas do nicho se comportam no Instagram** (feeds reais, blogs de conteúdo do setor).
3. **Destilar os conceitos VISUAIS validados** — paleta dominante, tipografia, composição, respiro,
   motivos gráficos, uso de foto vs. design-led. + **padrões de COPY** (ganchos, tom, CTA, jargão→humano).
   Salvar isso como **estudo de referências** na niche-lib (`<nicho>/visual-references/estudo-de-referencias.md`).
4. **Montar o DNA do cliente** (pode ser fictício) **DENTRO do nicho** — as cores/tipografia têm que bater
   com o mercado. ⛔ Não inventar fora do nicho (ex.: preto pra empresa de saúde — saúde é claro/fresco).
5. **Criar aplicando** os conceitos do mercado + as regras da faculdade (craft, entrega) + o DNA do cliente.
6. **Entregar** em slides individuais, qualidade cheia.

## Por que funciona
- Estudar primeiro **eleva o piso e dá direção** antes da primeira linha de design — bate com a lição
  "designer sem boas referências não é ninguém". Evita criar genérico/no escuro.
- O resultado já nasce no **estilo que o mercado provou que converte** — peça autoral nossa, mas no registro
  validado (não clone — linguagem absorvida vira composição própria, igual à doutrina da régua do Estúdio).

## Atrito real (registrar pra resolver)
- **Behance/Pinterest/blogs bloqueiam scraping pelo proxy da nuvem (HTTP 403).** Não dá pra abrir a página e
  "baixar a imagem de referência" automaticamente no terminal da nuvem. Contorno usado: **WebSearch**
  (resumos dos resultados) + destilação dos conceitos. Imagem de terceiro é referência de ESTUDO, **não
  entra no repo** (não é asset licenciado) — fica como conceito destilado + link.
- **No PC (rede aberta)** dá pra abrir e montar moodboard à mão.
- **Hipótese a decidir com o Marcos:** o caminho mais confiável talvez seja **o Marcos curar 3–5 referências
  do nicho** (como na régua do Estúdio) e a fábrica destilar — em vez de a IA garimpar sozinha. Curar o
  critério > garimpar arquivo (CLAUDE.md). A pesquisa por texto (WebSearch) é boa pra entender o padrão, mas
  o olho humano na curadoria das imagens é o que garante referência de qualidade.

## Veredito preliminar (a confirmar com o feedback do Marcos)
Estudar antes pareceu o melhor caminho (peça mais coesa e "de mercado"). O gargalo não é o método — é o
ACESSO às imagens na nuvem. Resolver o acesso (curadoria do Marcos ou rede aberta) destrava o workflow.

## ✅ CAMINHO ESCOLHIDO (Marcos 2026-06-26): LIBERAR A REDE pra abrir as referências
Diagnóstico confirmado: o 403 é **negação de política de rede no gateway** (`connect_rejected: gateway
answered 403 to CONNECT — policy denial`), não bloqueio anti-bot. Logo, **adicionar os domínios na allowlist
resolve.** Marcos vai liberar em **Network → Custom** (mesma tela onde já tem `*.pexels.com`/`*.unsplash.com`):

- `behance.net` e `*.behance.net` (páginas + CDN de imagem `mir-s3-cdn-cf.behance.net`)
- `pinterest.com` e `*.pinterest.com` (páginas)
- `pinimg.com` e `*.pinimg.com` ← **domínio SEPARADO** do Pinterest (CDN das imagens, `i.pinimg.com`). Sem
  ele as páginas abrem mas as imagens não carregam.
- (opcional, ótimas refs de design e menos chato que o Pinterest) `dribbble.com`, `*.dribbble.com`, `cdn.dribbble.com`

⚠️ **Regra de sempre:** mudança de rede só vale em **sessão NOVA** (iniciada DEPOIS de salvar) — igual à
`PEXELS_API_KEY`. Na sessão nova eu uso o **Chromium do ambiente (Puppeteer já funciona)** pra abrir as
páginas e **screenshotar/baixar** o moodboard de verdade. Ressalva: Pinterest às vezes exige login e pode
bot-bloquear mesmo com rede liberada → os **CDNs de imagem** (`pinimg.com`, `mir-s3-cdn-cf.behance.net`) e o
**Dribbble** tendem a ser mais fáceis. Se algum resistir, a curadoria do Marcos (3–5 refs) continua sendo o plano B.
