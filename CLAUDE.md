# Guaru Tech — Diretrizes de Desenvolvimento

Guaru Tech opera no modelo **SwaS (Software with a Service)**: entregamos infraestrutura de
software e agentes autônomos de marketing/automação para pequenas empresas, vendidos como
serviço contínuo (não só projeto pontual). Cliente laboratório e MVP: **Guaru Estúdio**.

## Stack e princípios técnicos

- **Node.js** como runtime padrão para scripts, automações e integrações.
- **Código limpo e modular**: funções pequenas, responsabilidade única, nomes descritivos.
  Evitar abstrações prematuras — só extrair um módulo/helper quando há reaproveitamento real,
  não hipotético.
- **Arquivos locais leves**: preferir JSON/Markdown/CSV a bancos de dados pesados sempre que o
  volume de dados do cliente permitir. Cada cliente deve poder rodar sua própria pasta sem
  infraestrutura externa cara.
- **Reaproveitamento de componentes**: antes de criar uma automação/script novo, verificar se
  já existe algo parecido em `niches-library/` ou em outro cliente em `Projetos/`. Generalizar
  para a biblioteca de nichos em vez de duplicar.
- Sem dependências desnecessárias. Sem features especulativas. Sem comentários explicando o
  óbvio — só comentar o que não é óbvio pelo código (uma decisão não-trivial, um workaround).

## Estrutura do repositório

```
Guaru Tech/
├── CLAUDE.md                  ← este arquivo
├── niches-library/            ← regras de sucesso, prompts validados e lógicas por nicho/setor
│   └── design-principles/     ← Base Mãe: assinatura de design do Marcos, niche-agnóstica
├── template-client-base/      ← "molde de ouro" para clonar em cada novo cliente
│   ├── brand-dna.json         ← DNA visual do cliente (paleta, tipografia, formas, logos)
│   ├── references/            ← arquivos de logo/fotos/paleta do cliente
│   ├── learning-log.md        ← feedback de design por peça gerada
│   └── learned-lessons.md     ← aprendizados de negócio/tráfego/conteúdo em geral
└── Projetos/                  ← clientes/projetos ativos (cada um clonado do template)
```

Cada novo cliente nasce de uma cópia de `template-client-base/`. Nada de estrutura ad-hoc por
cliente — divergências de estrutura quebram o reaproveitamento entre projetos.

## Protocolo de Geração de Design (obrigatório)

Nenhum HTML/CSS de criativo nasce no vazio. Antes de gerar qualquer peça visual, ler nesta
ordem (cada camada é mais específica que a anterior):

1. **Base Mãe** — `niches-library/design-principles/design-rules.md`: qualidade técnica e
   diagramação aprovadas pelo Marcos, valem para qualquer cliente/nicho.
2. **Regras de nicho** — `niches-library/<nicho>/visual-references/design-rules.md`: padrões
   estéticos que funcionam para o setor do cliente.
3. **DNA do cliente** — `Projetos/<cliente>/brand-dna.json` + `references/`: identidade visual
   específica (paleta, tipografia, formas, logo) que veste o resultado final.

O design final tem a qualidade/diagramação da Base Mãe, ajustada aos padrões do nicho, vestida
com a identidade do cliente. **Nunca usar estilo genérico.** Se qualquer uma das três camadas
não tiver regra clara para o caso em mãos, perguntar ao Marcos antes de criar — não inventar
regra de design em nome dele.

## Modo de Execução

- Nunca pedir ao Marcos para editar arquivo de configuração manualmente — sou eu quem edita
  (`client-context.md`, `brand-dna.json`, `*.md` de regras, etc.).
- Buscar informação primeiro nos arquivos de `Projetos/<cliente>/`; só perguntar no chat o que
  genuinamente não está documentado em nenhum arquivo.
- Ao receber uma tarefa que envolve um cliente: primeiro identificar o cliente e ler a pasta
  dele (`Projetos/<cliente>/`), depois aplicar a Base Mãe de design — nessa ordem, não ao
  contrário.

## Ciclo de Aprendizado do Agente (obrigatório)

Esta é a peça central do modelo SwaS: cada interação com um cliente real é uma oportunidade de
acumular expertise reaproveitável. Sem isso, cada cliente novo recomeça do zero.

### Regra

Todo agente/automação que rodar para um cliente **deve documentar o resultado**, não só
executar a tarefa. Sucesso e falha são igualmente valiosos — falha evita repetir erro, sucesso
vira regra reaproveitável.

### Onde registrar

1. **`Projetos/<cliente>/learned-lessons.md`** — registro local, específico daquele cliente: o
   que funcionou, o que falhou, ajustes de tom/voz, peculiaridades do nicho (negócio, tráfego,
   conteúdo em geral).
2. **`Projetos/<cliente>/learning-log.md`** — registro específico de **feedback de design** por
   peça gerada (post, anúncio): o que o Marcos aprovou/pediu para ajustar visualmente. Separado
   do `learned-lessons.md` porque alimenta uma camada diferente (ver Protocolo de Geração de
   Design): aprendizados de design aqui só sobem para `niches-library/design-principles/`
   quando o Marcos confirma que é regra geral dele, não preferência pontual daquela peça.
3. **`niches-library/<nicho>/`** — quando um aprendizado de `learned-lessons.md` se prova válido
   em mais de um cliente do mesmo setor (ou é genérico o bastante para apostar nele de início),
   promover para a biblioteca do nicho, como regra/prompt validado.

### Formato de cada entrada de aprendizado

```markdown
## [AAAA-MM-DD] <título curto>
- **Contexto:** o que foi tentado (campanha, copy, automação, integração)
- **Resultado:** o que aconteceu (métrica, erro, reação do cliente)
- **Lição:** o que fazer diferente / o que repetir
- **Promovido para nicho?** sim/não — se sim, link para o arquivo em `niches-library/`
```

### Quando promover um aprendizado do cliente para a biblioteca de nicho

- A lição se repetiu em 2+ clientes do mesmo setor, **ou**
- A lição é sobre algo estrutural do nicho (ex: "restaurantes respondem melhor a CTA de
  reserva do que de cardápio"), não uma peculiaridade daquele cliente específico.

Lições puramente pessoais do cliente (tom de voz, preferências de aprovação, contatos) ficam
só no `client-context.md`/`learned-lessons.md` dele — não vão para a biblioteca de nicho.
