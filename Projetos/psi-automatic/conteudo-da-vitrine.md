# Conteúdo da vitrine @psi.automatic — 1 nicho, 2 tipos de post (NÃO são 2 nichos)

A vitrine tem **uma audiência** (o psicólogo) e **um objetivo** (virar cliente). Faz isso com
**dois tipos de post** — não confundir com "dois nichos".

## Tipo A — "olha o que eu FAÇO" (PROVA)
- Conteúdo de psicologia exemplo (carrossel pro paciente) → prova a qualidade do que entregamos.
- **Fonte:** `niches-library/psicologia/` (pautas-conteudo, design-rules). O MESMO motor que serve
  clientes reais → alimentar o nicho serve a prova E os clientes (sem trabalho dobrado).
- **DNA/visual:** registro suave de psicologia (DNA demo/nosso). **CTA:** suave (siga/salve).
- É o que testa o motor (a 1ª peça é Tipo A).

## Tipo B — "olha o que eu RESOLVO" (PITCH)
- Post sobre a dor do psicólogo + a oferta ("você é ótimo, mas invisível"; "conteúdo no automático";
  depoimentos; bastidor).
- **Fonte:** `niches-library/psicologia/oferta-v1.md` + `DIFERENCIAL.md` (já prontos).
- **DNA/visual:** marca psi.automatic. **CTA:** forte (clique na bio / fale com a gente → LP).

## Como a SaaS diferencia "vitrine" de "cliente" (Marcos perguntou 2026-06-23)
NÃO é base de nicho nova — é a MESMA base de psicologia (`niches-library/psicologia/`), com
OBJETIVO + TEMPLATE + DNA diferentes (a "receita"):
| | @psi.automatic (vitrine) | cliente psicólogo |
|---|---|---|
| Objetivo | VENDER nosso serviço | ATRAIR pacientes / educar |
| Template | fórmula dor→prova→CTA | conteúdo educativo puro |
| DNA | psi.automatic | do cliente (cores/CRP dele) |
| CTA | "fale com a gente → link" | suave / "agende" (dele) |
| Conhecimento psi | niches-library/psicologia | O MESMO |
Mecânica: a engine lê a CONFIG da "conta" e aplica a receita. @psi.automatic = uma "conta" interna
configurada pra VENDER. Encaixa na arquitetura pasta-por-cliente (Projetos/psi-automatic/ = DNA +
este template). HOJE (MVP) quem diferencia é o operador (manual); auto-diferenciação por config = Estágio 3.

## O que NÃO confundir
- "Marketing para psicólogos" NÃO é um nicho da biblioteca — é **o que NÓS fazemos**. Nicho = o
  mercado servido (psicologia).
- Não se alimenta "dois nichos": alimenta-se UM (psicologia) + usa-se o material de oferta/diferencial.
- As referências visuais de psicologia (curadas pelo Marcos) são pro **Tipo A**. O Tipo B é a nossa
  marca (referência seria de post de marca/pitch, não de psicologia).

## ⭐ A FÓRMULA-REGRA do carrossel Psi Automatic (Marcos cravou 2026-06-23)
Não postar prova e pitch SEPARADOS — FUNDIR num carrossel só. NUNCA postar conteúdo de psicologia
"pelado" (vira "mais uma conta de psicologia"). Estrutura padrão:
1. **Slide 1 — HOOK no PSICÓLOGO** (Marcos corrigiu 2026-06-24, validado por pesquisa PAS/AIDA — ver
   `knowledge-base/copywriting/estrutura-carrossel-venda.md`). É carrossel de VENDA → o slide 1 fala
   com o **psicólogo (usuário)**, NÃO com o paciente. Chama o público + nomeia a objeção/dor + **open
   loop** que faz arrastar. Ex.: *"Psicólogo: você acha que conteúdo de qualidade é caro e dá trabalho.
   Os próximos slides provam o contrário."* (dor = sem tempo / acha caro / acha que precisa de agência).
   ⚠️ NÃO começar com a dor do PACIENTE (isso é capa de post de CLIENTE, não da vitrine — slide certo,
   carrossel errado).
2. **Miolo — A PROVA** = um post de psicologia exemplo (a saída real do motor; rodar isso = dogfooding).
   Demonstra a qualidade. Aqui o conteúdo fala com o paciente (é a amostra). Em cor de psicologia.
3. **Último slide — PITCH + CTA**, na **COR PRÓPRIA da psi.automatic** (ver abaixo). Fala da psi.automatic
   resolvendo a dor DELE (sem tempo, postar todo dia, agência cara), ângulo **dor + economia**, CTA
   **visual** (keyword-to-DM, sem botão). Quem faz = "**nossa equipe**". → hook(psicólogo) → prova → pitch.

### 🎨 Cor própria da @psi.automatic (Marcos cravou 2026-06-24)
A vitrine é uma MARCA, separada do conteúdo de psicologia → tem **cor de assinatura própria** que
**bracketa** o carrossel: slide 1 (hook) e último slide (pitch) na cor da psi.automatic; o miolo-prova
na paleta de psicologia (navy/creme/dourado). A cor sozinha conta a história: marca → prova → marca,
e o último slide fica "visualmente distinto" (regra de CTA). Cor definida em `brand-dna-psi-automatic.json`.

### ⚠️ O último slide é o PITCH — regras (Marcos 2026-06-24)
- **Troca de público é o mecanismo:** slides 1–N falam com o paciente; o último vira pro psicólogo.
  É o que torna "portfólio-que-vende": ele pensa "meus seguidores amariam" → e o último diz "e você
  não fez nada disso".
- **Ângulo = DOR + ECONOMIA, não mecanismo.** Bater na dor do psicólogo (sem tempo, postar todo dia
  cansa, agência caríssima) e na economia: "conteúdo todo dia", "a agência de marketing no seu bolso",
  "por menos de R$ 4/dia" (= R$97/mês ÷ 30, ver `oferta-v1.md`), "sem você fazer nada".
- **NÃO usar "no automático" como bordão/headline de venda** — pesa pro lado IA (fere a regra de marca).
  "Automático" é só o NOME (@psi.automatic); o selling é benefício/dor/preço. Linha-âncora boa:
  *"Você cuida dos seus pacientes. A gente cuida do seu Instagram."*
- **⚠️ ESTA FÓRMULA É SÓ DA VITRINE @psi.automatic.** A virada/pitch no último slide existe PORQUE a
  vitrine vende a psi.automatic pro psicólogo. **No carrossel do CLIENTE psicólogo o padrão é OUTRO:**
  conteúdo educativo pro paciente do começo ao fim, **SEM virada, SEM mencionar a psi.automatic** —
  último slide é **CTA de paciente** (salve/agende) + assinatura nome+CRP do cliente. Pôr nossa
  propaganda no perfil do cliente seria tiro no pé. (Ver tabela "vitrine × cliente" acima.)

## 🚫 REGRA DE MARCA (serve pra TUDO): zero menção a "feito por IA"
- ✅ Vender o BENEFÍCIO/DOR/ECONOMIA: "conteúdo todo dia / sem você fazer nada / agência no seu bolso
  / por menos de R$ 4 por dia / pronto".
- ❌ NÃO vender o MECANISMO: "feito por IA". IA é só a SaaS (interno), nunca a mensagem.
- ⚠️ **"No automático" NÃO serve como bordão de venda** (Marcos 2026-06-24): pesa pro lado IA/robô.
  "Automático" fica só no NOME (@psi.automatic), nunca na headline de venda. Prefira dor + economia.
- Por quê: (1) leigo hoje tem preconceito com IA; (2) protege a autenticidade do psicólogo (gritar
  "IA fez" mina o conteúdo dele aos olhos do paciente). Ver [[regra-marca-nao-mencionar-ia]].
- Legenda-ponte correta: "conteúdo profissional pro seu consultório, todo dia, sem você fazer nada
  → link na bio" (NÃO "feito pela IA").
