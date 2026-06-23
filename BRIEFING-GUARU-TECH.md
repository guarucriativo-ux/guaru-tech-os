# Briefing Guaru Tech — Recontextualização

> Documento de onboarding para reapresentar o projeto a um assistente de IA que perdeu o
> contexto. Resumo de quem somos, aonde queremos chegar, como operamos e a estrutura do sistema.
> Atualizado em 2026-06-22.

## 1. Quem somos
**Guaru Tech** opera no modelo **SwaS (Software with a Service)**: entregamos infraestrutura de
software + agentes autônomos de marketing/automação para **pequenas empresas**, vendidos como
**serviço contínuo** (não projeto pontual). Não vendemos uma peça avulsa — vendemos um sistema
que cuida do marketing do cliente de forma recorrente.

## 2. Aonde queremos chegar (visão)
Um sistema onde **cada cliente atendido deixa o sistema mais inteligente para o próximo**. O
conhecimento é **cumulativo e composto**: o que funciona com um cliente vira regra reaproveitável
para o nicho inteiro. O objetivo é escalar o atendimento de marketing para pequenas empresas sem
recomeçar do zero a cada cliente — a expertise mora em arquivos versionados, não na cabeça de
ninguém nem na memória volátil de uma IA.

## 3. Princípio central: o Ciclo de Aprendizado
Toda ação para um cliente **deve ser documentada**, não só executada. Sucesso e falha valem igual
(falha evita repetir erro; sucesso vira regra). Onde se registra:
- `Projetos/<cliente>/learned-lessons.md` — aprendizados de negócio/tráfego/conteúdo do cliente.
- `Projetos/<cliente>/learning-log.md` — feedback de **design** por peça gerada.
- `niches-library/<nicho>/` — quando um aprendizado se prova em 2+ clientes do setor, sobe pra cá.

## 4. Como criamos design (Protocolo de 3 camadas)
Nenhuma peça nasce no vazio. Antes de criar, lê-se nesta ordem (cada camada é mais específica):
1. **Base Mãe** — `niches-library/design-principles/`: qualidade técnica/diagramação universais.
2. **Regras do nicho** — `niches-library/<nicho>/visual-references/`: estética que funciona no setor.
3. **DNA do cliente** — `Projetos/<cliente>/brand-dna.json` + `references/`: paleta, tipografia, logo.

Resultado = qualidade da Base Mãe, ajustada ao nicho, vestida com a identidade do cliente.

### Regra de ouro do criativo
A peça final é **composição autoral em HTML + SVG renderizada a PNG** (controle total de
tipografia/diagramação, seguindo as referências). **Não** se usa IA generativa de imagem como
compositora final — ela entrega genérico. Ferramentas externas (ex.: Canva) servem como **fonte
de foto/asset e identidade**, não como o designer. Referência visual de cliente deve vir em
**imagem de resolução cheia, um design por imagem** — print de tela comprimido não dá pra analisar.

## 5. Stack e princípios técnicos
- **Node.js** como runtime padrão. Sem dependências desnecessárias, sem features especulativas.
- **Arquivos locais leves** (JSON/Markdown/CSV) em vez de bancos pesados — cada cliente roda sua
  própria pasta sem infraestrutura cara.
- **Reaproveitamento antes de duplicar**: checar `niches-library/` e outros clientes antes de criar.
- Código limpo e modular; comentar só o não-óbvio.

## 6. Estrutura do repositório
```
Guaru Tech/
├── CLAUDE.md                  ← diretrizes mestras do projeto
├── BRIEFING-GUARU-TECH.md     ← este documento
├── cli/ · core/ · leads/      ← "Guaru Tech OS": CLI 'guaru' de gestão de clientes/leads (Node, zero deps)
├── niches-library/            ← biblioteca de regras/prompts validados por nicho
│   ├── design-principles/     ← Base Mãe (design + metodo-criativo.md) — niche-agnóstica
│   ├── apparel/ · alimentacao/ · arquitetura/ · cabelo-loiro/   ← nichos com regras próprias
│   └── <nicho>/visual-references/, audience-insights.md, traffic-playbook.md
├── template-client-base/      ← "molde de ouro"; todo cliente nasce de uma cópia disto
│   └── 01-ads-engine / 02-content-generator / 03-automation-bridge / 04-crm-systems
│       + brand-dna.json, client-context.md, learning-log.md, learned-lessons.md, references/
├── Projetos/                  ← clientes ativos (cada um clonado do template)
│   ├── guaru-estudio/         ← cliente-laboratório / MVP do modelo
│   ├── studio-meta-espaco/    ← nicho arquitetura de alto padrão
│   ├── lanche-do-seu-ze/      ← hamburgueria (teste de expertise)
│   ├── freitas-hair/          ← salão/loiro (teste de expertise)
│   └── Alkimia/               ← cliente com material de rebrand/portfólio
├── Referencias/               ← biblioteca de referências de design (boas práticas)
└── sandbox/                   ← protótipos e experimentos (metodo-foto-real, testes de peça)
```

### Os 4 módulos de cada cliente
- **01-ads-engine** — inteligência de campanhas/tráfego (blueprint de campanha Meta).
- **02-content-generator** — gera o pacote semanal de conteúdo (copy/roteiro/criativo).
- **03-automation-bridge** — render de imagem (HTML+SVG→PNG via Puppeteer) e integrações.
- **04-crm-systems** — mini-CRM local (leads, funil) em arquivos leves.

## 7. Estado atual (2026-06-22)
- **Modelo e estrutura**: estabelecidos. Template, biblioteca de nichos e ciclo de aprendizado ativos.
- **Guaru Tech OS** (CLI de gestão de clientes): núcleo já commitado.
- **Pipeline criativo**: método autoral HTML+SVG→PNG validado; documentado em
  `niches-library/design-principles/metodo-criativo.md`.
- **Clientes-laboratório/teste em andamento**: Guaru Estúdio (MVP), Studio Meta-Espaço
  (arquitetura), Lanche do Seu Zé e Freitas Hair (testes de expertise de design).
- **Foco imediato**: aprimorar a qualidade da geração de imagem/criativo via testes repetidos,
  acumulando regras de design por nicho.

---
*Nota de fidelidade: as seções 1–6 refletem as diretrizes mestras (CLAUDE.md) e o método já
documentado. Detalhes internos de `cli/core/leads` e do cliente Alkimia não foram inspecionados a
fundo neste resumo — confirmar nos próprios arquivos se precisar de precisão sobre eles.*
