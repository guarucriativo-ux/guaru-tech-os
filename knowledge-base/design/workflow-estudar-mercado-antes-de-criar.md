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

## ✅ VEREDITO FINAL (Marcos 2026-06-26): o MELHOR caminho é a CURADORIA do Marcos abastecendo a fábrica
> ⚠️ Correção: numa primeira versão o Claude rotulou a curadoria como "booster opcional" — **errado**. O
> Marcos corrigiu: **a curadoria manual dele é o caminho PRINCIPAL**, não um extra.

> 🔒 **Escopo da decisão (Marcos 2026-06-26): isto muda SÓ o WORKFLOW.** Todo o conhecimento de designer que
> o Marcos ensinou **CONTINUA valendo integralmente** — hábitos de designer (estudar antes, entrega em slides
> individuais, alinhamento intencional, destaque em frase, grafismo com função), foto de produto, doutrina do
> crop, classe B, ética, etc. (ver `design-rules.md` Base Mãe + notas da faculdade). A única coisa que se
> define aqui é **COMO a referência chega na fábrica** = curadoria manual do Marcos. As regras de craft/entrega
> são independentes do workflow e seguem firmes.

**Workflow OFICIAL = o Marcos abastece a fábrica com REFERÊNCIA, pela curadoria manual dele** (o olho do
Marcos é o filtro de qualidade — ainda mais no Behance, que é régua alta). Com a referência curada, a fábrica
**configura** (destila o sistema visual pro `brand-dna.json` / niche-lib) e **roda mais liso**. É o MOAT do
MANIFESTO: o taste do Marcos vira config reaproveitável; quanto mais ele cura, mais redonda a fábrica fica.
Casa com o CLAUDE.md ("cure o critério, não cada arquivo") e com a régua do Estúdio.

**Como o Marcos abastece (os dois jeitos que o Claude lê de verdade):**
1. **Salva as referências curadas** em `Projetos/<cliente>/references/` ou `niches-library/<nicho>/visual-
   references/` → o Claude lê a imagem (tool Read VÊ imagem), escreve a ficha de anatomia e **destila o
   sistema visual** pra config (DNA + regras de nicho). É o jeito que "configura a fábrica" pra rodar liso.
2. **Cola a referência no chat** → o Claude vê e destila na hora (rápido pra uma peça pontual).

**Papéis dos outros caminhos (apoio, não principal):**
- **WebSearch (texto)** = apoio pra entender o padrão do nicho de graça, mas NÃO substitui a curadoria do
  Marcos (foi o que gerou a Lume sem imagem — ficou bom, mas o teto sobe com a curadoria dele).
- **Raspar Behance/Pinterest na nuvem = descartado** (anti-bot 403 + proxy MITM; ver teste abaixo). Não revisitar.

## ✅ CAMINHO ESCOLHIDO (Marcos 2026-06-26): LIBERAR A REDE pra abrir as referências
Diagnóstico confirmado: o 403 é **negação de política de rede no gateway** (`connect_rejected: gateway
answered 403 to CONNECT — policy denial`), não bloqueio anti-bot. Logo, **adicionar os domínios na allowlist
resolve.** Marcos vai liberar em **Network → Custom** (mesma tela onde já tem `*.pexels.com`/`*.unsplash.com`):

- `behance.net` e `*.behance.net` (páginas + CDN de imagem `mir-s3-cdn-cf.behance.net`)
- `pinterest.com` e `*.pinterest.com` (páginas)
- `pinimg.com` e `*.pinimg.com` ← **domínio SEPARADO** do Pinterest (CDN das imagens, `i.pinimg.com`). Sem
  ele as páginas abrem mas as imagens não carregam.
- (opcional, ótimas refs de design e menos chato que o Pinterest) `dribbble.com`, `*.dribbble.com`, `cdn.dribbble.com`

⚠️ **Regra de sempre:** mudança de rede só vale em sessão nova (mas aqui pegou na hora).

### 🧪 TESTE REAL do acesso (2026-06-26) — VEREDITO: raspar Behance/Pinterest na nuvem NÃO rola
Marcos liberou `behance.net` + `pinterest.com` (deixou Dribbble e `pinimg.com` de fora; Behance é a régua alta).
Testei a fundo:
- **Política de rede:** OK — `behance.net` e `pinterest.com` agora passam o gateway (antes era 403 de policy).
- **MAS os sites BLOQUEIAM acesso automático:** Behance responde **403 anti-bot** a `curl`/WebFetch; Pinterest
  responde **200 na home** mas **403/login nas buscas** (`/search/`). Exigem navegador REAL logado.
- **Navegador headless (Chromium/Puppeteer) pelo proxy:** não atravessa o **MITM** deste ambiente —
  `ERR_CONNECTION_CLOSED` no túnel TLS. Sem `certutil` pra importar a CA no NSS do Chromium e `--ignore-
  certificate-errors` não basta (provável HTTP/2). O `render-creative` funciona porque carrega `file://` local,
  não site externo via proxy.
- **Imagens do Pinterest** moram em `pinimg.com` (domínio separado, **não liberado**) → não carregariam mesmo.

**➡️ CAMINHO QUE FUNCIONA (recomendado) — CURADORIA do Marcos (modelo régua do Estúdio):**
o Marcos (olho = filtro de qualidade, ainda mais no Behance que é régua alta) **cura 3–5 referências** e as
entrega de um destes jeitos, que a fábrica consegue ler de verdade:
1. **Cola as imagens no chat** — o Claude VÊ imagem no chat e destila na hora (mais rápido pra 1 peça).
2. **Salva os arquivos** em `Projetos/<cliente>/references/` (ou `niches-library/<nicho>/visual-references/`)
   — o Claude lê o arquivo de imagem direto (tool Read vê imagem) e escreve a ficha de anatomia + destila o
   sistema visual. (Imagem de terceiro = referência de ESTUDO, não asset licenciado pra publicar.)

Isso casa com o CLAUDE.md ("cure o critério, não cada arquivo") e com a régua do Estúdio. A pesquisa por
**WebSearch** (texto) segue válida pra entender o padrão do nicho de graça; a curadoria entra pra elevar o teto visual.
