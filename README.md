# Guaru Tech — Fábrica de Agentes (operada pelo Chat-Mestre)

Fábrica digital de conteúdo/design para pequenos negócios, produzida por uma equipe de **agentes
seniores** (`.claude/agents/`) coordenada pelo **Chat-Mestre** (ver [CLAUDE.md](CLAUDE.md)). Os
especialistas criam do método deles — **não há régua de estilo, lista de fontes fixa nem banco de
referências pra imitar**. O conhecimento acumula a partir das entregas reais (o MOAT).

## Como uma peça é produzida (gate de realidade)

Cada etapa é um portão — a próxima só começa quando a anterior entrega. Nada nasce do achismo:

```
briefing → pesquisa real (fontes) → identidade → copy → FOTO real → design →
render → O OLHO (valida realidade, não gosto) → entrega → registra aprendizado
```

Exemplo vivo: [`Projetos/puro-acai/`](Projetos/puro-acai/) (carrossel de venda produzido por esse fluxo).

## Ferramentas (infraestrutura — convertem/buscam, não impõem estilo)

```
tools/render/render-creative.js   HTML+SVG → JPG (Puppeteer, --slides = 1 imagem por slide)
tools/foto-auto.mjs               busca a FOTO real que o conteúdo pede (Pexels/Unsplash/Openverse)
tools/fonte-auto.mjs              baixa sob demanda a FONTE que a marca pede (sem prateleira fixa)
tools/render/fonts/               cache de fontes já baixadas (não é lista; ver README de lá)
```

## Cultura (inegociável)

Ver [MANIFESTO.md](MANIFESTO.md): estudar antes de agir, dados de fonte real, zero achismo, baixo
custo, acúmulo de conhecimento = MOAT. Nunca vender "IA"/"automático" — vender benefício + toque
humano. Nunca usar identidade/@/rosto de terceiro (direito de imagem).
