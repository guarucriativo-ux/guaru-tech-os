# Ambiente de build da fábrica — VSCode + Claude Code (decisão, não faculdade)

<!-- Marcos (2026-06-26), na sequência da análise do Lovable: "é o VSCode que vai criar as interfaces, ou estou
     errado?". Análise do papel do VSCode na fábrica. Liga com decisoes/avaliacao-lovable-dev.md e
     decisoes/infra-de-producao-e-rede.md. -->

## A pergunta do Marcos: "é o VSCode que cria as interfaces?"
**Certo em espírito — com uma nuance importante.** O VSCode **não cria nada sozinho**: ele é a **BANCADA/COCKPIT**
da fábrica. Quem CRIA é o **dev de IA (Claude Code = eu) + o código**. O VSCode é **onde** isso acontece: é o
chão de fábrica onde eu escrevo o código, a gente roda, prevê (preview), depura e publica. Então:
> **interface criada = (Claude Code escreve o front no repo) + (VSCode roda/preview) + (deploy num host que a
> gente escolhe).** O VSCode é o ambiente; o "app builder" é o agente. Não precisamos do Lovable pra isso.

## O que o VSCode dá pra fábrica (por que é o lugar certo)
1. **É a CASA do dev de IA.** No desktop, o Claude Code vive na extensão/terminal do VSCode. É onde o
   colaborador "designer/dev" opera com a mão na massa.
2. **Dono de TUDO, zero lock-in.** Tudo em arquivo, no nosso repo, no nosso git. Bate 100% com a cultura
   ("a nuvem/GitHub é a fonte da verdade"). O oposto do embrulho fechado do Lovable.
3. **Roda a fábrica inteira.** O terminal executa todo o nosso pipeline: `foto-auto`, `compor`, `render`,
   scripts, testes. Preview de HTML, debug, git — tudo num lugar.
4. **Um ambiente pra TODA a fábrica:** o criativo (compor/render) **e** as interfaces (mural/cockpit/landing)
   **e** o código de tráfego **e** os scripts. Não precisa de ferramenta separada por frente.
5. **Grátis e extensível** (live preview, linters, git, extensões) — sem custo recorrente.
6. **Multiplataforma + igual à nuvem.** O VSCode é o cockpit do DESKTOP; o Claude Code na **web/nuvem** é o
   mesmo agente, headless (sem GUI), no mesmo repo. A regra de sync mantém os dois idênticos.

## O que o VSCode NÃO dá (onde estão as decisões reais)
- **Host/deploy/produção:** o VSCode é de onde a gente configura e publica, mas **algo tem que hospedar** o app
  (Vercel/Netlify/Supabase/servidor nosso). **Essa é a decisão de verdade** — o "tijolo grande" do Estágio
  3→4 (ver `decisoes/infra-de-producao-e-rede.md`). Não é o editor que falta; é escolher a NOSSA stack de produção.
  - 🌐 **Domínio já existe (Marcos 2026-06-26):** `guaruestudio.com.br` (conferir se foi registrado com ou sem
    acento — IDN `guaruestúdio` é válido no .br, mas o comum é sem acento; idealmente ter os dois). É a primeira
    peça do host: quando subirmos o site/mural do Estúdio, é só apontar o domínio pro host escolhido.
- **Editor visual no-code pro Marcos:** VSCode é código. O Marcos **não edita código** — e não precisa. A
  interface DELE com a fábrica é o **chat (eu) + o preview/output**: ele dirige, eu construo. (Era o único
  "extra" real do Lovable, e a gente não precisa dele.)

## Conclusão (fecha o par com o Lovable)
- **Construir interfaces = VSCode + Claude Code.** Já temos. Não precisa Lovable (que só agregava embrulho
  gerenciado + edição no-code, com custo e lock-in).
- **O gargalo não é o "editor" nem o "builder"** — é **decidir o HOST/infra de produção** pra publicar o que a
  gente constrói. Esse é o próximo tijolo a resolver quando formos pôr uma interface no ar (ex.: o mural de
  aprovação): escolher Vercel/Supabase no nosso nome (dono de tudo) vs. servidor próprio.
- Disciplina mantida: o **crítico** (gasto/tráfego/segurança) é código nosso, controlado, testado — nunca
  terceirizado. O VSCode é justamente o lugar pra fazer isso com controle total.
