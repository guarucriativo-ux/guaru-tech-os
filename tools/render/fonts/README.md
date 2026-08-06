# Cache de fontes (baixadas sob demanda — NÃO é uma lista fixa)

Isto é um **cache**, não uma prateleira de fontes "da fábrica". Não existe régua tipográfica: o
especialista escolhe a fonte que **aquela marca** pede, igual a foto é escolhida por peça.

As fontes aqui são só o que **já foi baixado** por jobs anteriores. Para trazer qualquer outra:

```
node tools/fonte-auto.mjs "Nome Da Família" [--weights=400,700] [--italic]
```

Isso baixa o(s) `.ttf` do Google Fonts pra cá. O `render-creative.js` copia este cache pro
`~/.fonts` + roda `fc-cache` em toda renderização, então o Chromium acha a fonte pelo `font-family`
localmente (offline depois de baixada). O nome do arquivo não importa — o fontconfig lê a família
de dentro do `.ttf`.

> Não escolha a tipografia por estar "na lista". Escolha a que serve à marca; o `fonte-auto` traz.
