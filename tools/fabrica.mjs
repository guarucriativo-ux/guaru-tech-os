#!/usr/bin/env node
// fabrica.mjs — LINHA DE PRODUÇÃO HEADLESS (o "produtor" virou código; roda via API/CLI, sem humano no chat).
// Executa o MESMO gate de realidade que o Chat-Mestre faz na mão: pesquisa → identidade → copy → foto →
// fonte → design → render → OLHO (loop de correção). Cada portão é um `claude -p` (agente sênior) OU uma
// ferramenta determinística (foto-auto/fonte-auto/render). Sem régua de estilo: o time decide; ancora no real.
//
// Uso:
//   node tools/fabrica.mjs --slug=burger --nicho="hamburgueria artesanal" --objetivo="gerar pedido" --praca="Guarujá/Baixada"
//
// Saída: Projetos/<slug>/{pesquisa-realidade.md, identidade-visual.md, copy-carrossel.md, assets/, outputs/}
import { execFile } from "node:child_process";
import { writeFile, mkdir, readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const arg = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.split("=").slice(1).join("=") : d; };

const slug = arg("slug");
const nicho = arg("nicho");
const objetivo = arg("objetivo", "gerar contato/venda");
const praca = arg("praca", "Guarujá / Baixada Santista — SP");
if (!slug || !nicho) { console.error('Uso: node tools/fabrica.mjs --slug=<slug> --nicho="<nicho>" --objetivo="..." --praca="..."'); process.exit(1); }

const PROJ = path.join(ROOT, "Projetos", slug);
const ASSETS = path.join(PROJ, "assets");
const OUT = path.join(PROJ, "outputs");
const log = (m) => console.log(`\n[fabrica:${slug}] ${m}`);

// roda um agente sênior headless via claude -p. Retorna o texto final. Os arquivos que ele escreve ficam no disco.
function claude(prompt, { tools = "Read,Write,Edit,Glob,Grep", timeoutMs = 600000 } = {}) {
  return new Promise((resolve, reject) => {
    const a = ["-p", prompt, "--output-format", "text", "--permission-mode", "acceptEdits", "--allowedTools", tools];
    execFile("claude", a, { cwd: ROOT, timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) return reject(new Error(`claude -p falhou (${err.code || err.signal}): ${String(stderr || err.message).slice(0, 500)}`));
      resolve(String(stdout).trim());
    });
  });
}
function tool(file, toolArgs, timeoutMs = 180000) {
  return new Promise((resolve, reject) => {
    execFile("node", [path.join("tools", file), ...toolArgs], { cwd: ROOT, timeout: timeoutMs, maxBuffer: 32 * 1024 * 1024 },
      (err, stdout, stderr) => err ? reject(new Error(`${file}: ${String(stderr || err.message).slice(0, 300)}`)) : resolve(String(stdout).trim()));
  });
}
const readIf = async (p) => existsSync(p) ? readFile(p, "utf8") : "";
function lastJsonBlock(text) {
  const blocks = [...text.matchAll(/```json\s*([\s\S]*?)```/g)].map((m) => m[1]);
  const raw = blocks.length ? blocks[blocks.length - 1] : (text.match(/\{[\s\S]*\}/)?.[0] || "");
  try { return JSON.parse(raw); } catch { return null; }
}

await mkdir(ASSETS, { recursive: true });
await mkdir(OUT, { recursive: true });

// ───────────────────────── PORTÃO 1 — PESQUISA REAL ─────────────────────────
log("Portão 1: pesquisa real (fonte real, sem achismo)…");
await claude(
`Você é market-researcher sênior. Pesquise a REALIDADE (WebSearch/WebFetch, fontes reais com URL — proibido inventar) para um carrossel de Instagram.
NICHO: ${nicho}. PRAÇA: ${praca}. OBJETIVO: ${objetivo}.
Cubra: (1) público real + como ele fala; (2) o produto/serviço de verdade + preço real; (3) dores, medos e gatilhos de ${objetivo}; (4) REGRAS/ÉTICA do nicho (conselho/órgão/ANVISA/OAB/CONAR/CDC, se houver — restrição real, não invente); (5) concorrência e o CLICHÊ visual batido do nicho (pra DIFERENCIAR) + onde dá pra se destacar.
Escreva um documento objetivo em português, com fontes (URLs), e SALVE em ${path.relative(ROOT, path.join(PROJ, "pesquisa-realidade.md"))}. Foque no acionável pra ${objetivo}.`,
  { tools: "WebSearch,WebFetch,Read,Write,Edit", timeoutMs: 700000 }
);
if (!existsSync(path.join(PROJ, "pesquisa-realidade.md"))) throw new Error("pesquisa não foi salva");
log("✓ pesquisa-realidade.md");

// ───────────────────────── PORTÃO 2 — IDENTIDADE (time escolhe fonte/paleta) ─────────────────────────
log("Portão 2: identidade (a equipe escolhe a própria tipografia/paleta)…");
await claude(
`Você é brand-strategist sênior. Você é SÊNIOR e cria do SEU método — NÃO há régua de estilo, lista de fontes fixa nem referência pra imitar. Escolha a tipografia (QUALQUER família do Google Fonts) e a paleta que servem a ESTA marca, com base nos dados reais.
Leia: ${path.relative(ROOT, path.join(PROJ, "pesquisa-realidade.md"))}.
Cliente novo do nicho "${nicho}" em ${praca}, objetivo ${objetivo}. NÃO use nome de pessoa real (direito de imagem). NÃO caia no clichê visual do nicho sem intenção.
Entregue: conceito/posicionamento (1 frase), nome conceitual, paleta (HEX + função), tipografia (família(s) Google Fonts + pesos + uso), tratamento de foto (cena ideal — sem rosto identificável de terceiro como cliente), e o que a marca NÃO faz.
SALVE em ${path.relative(ROOT, path.join(PROJ, "identidade-visual.md"))}.
AO FINAL da resposta (não no arquivo), imprima SÓ um bloco \`\`\`json com: {"fontes":[{"familia":"Nome Exato","pesos":"400,700","italic":true|false}], "foto_busca":"query curta EM INGLÊS pro banco de imagens (cena ideal, sem rosto identificável)"}\`\`\``,
  { tools: "Read,Write,Edit", timeoutMs: 600000 }
);
const idText = await readIf(path.join(PROJ, "identidade-visual.md"));
// o JSON pode vir no stdout do agente; re-peço de forma barata se não achei
let meta = lastJsonBlock(idText);
if (!meta || !meta.fontes) {
  const ask = await claude(
`Leia ${path.relative(ROOT, path.join(PROJ, "identidade-visual.md"))} e imprima SÓ um bloco \`\`\`json com {"fontes":[{"familia":"...","pesos":"400,700","italic":false}],"foto_busca":"english query"}\`\`\` extraído da identidade. Nada além do bloco.`,
    { tools: "Read", timeoutMs: 180000 });
  meta = lastJsonBlock(ask);
}
if (!meta || !Array.isArray(meta.fontes) || !meta.fontes.length) throw new Error("não consegui extrair fontes/foto_busca da identidade");
log(`✓ identidade — fontes: ${meta.fontes.map((f) => f.familia).join(", ")} | foto: "${meta.foto_busca}"`);

// ───────────────────────── PORTÃO 3 — COPY ─────────────────────────
log("Portão 3: copy…");
await claude(
`Você é copywriter-specialist sênior. Escreva o copy de um carrossel de Instagram, do seu método, na linguagem REAL do público (não genérico).
Leia: ${path.relative(ROOT, path.join(PROJ, "pesquisa-realidade.md"))} e ${path.relative(ROOT, path.join(PROJ, "identidade-visual.md"))}.
Nicho "${nicho}", ${praca}, objetivo ${objetivo}. RESPEITE as regras/ética do nicho apontadas na pesquisa (não prometa o que não pode, nada de dado inventado). NÃO invente @, telefone, endereço, preço, depoimento — use PLACEHOLDER [entre colchetes]. Decida o nº de slides (6-8). Separe hook (display) do corpo em cada slide.
SALVE em ${path.relative(ROOT, path.join(PROJ, "copy-carrossel.md"))}.`,
  { tools: "Read,Write,Edit", timeoutMs: 600000 }
);
if (!existsSync(path.join(PROJ, "copy-carrossel.md"))) throw new Error("copy não foi salvo");
log("✓ copy-carrossel.md");

// ───────────────────────── PORTÃO 4 — FONTE (sob demanda) + FOTO (real) ─────────────────────────
log("Portão 4: baixando fontes escolhidas + foto real…");
for (const f of meta.fontes) {
  const fa = ["fonte-auto.mjs", f.familia, `--weights=${f.pesos || "400,700"}`]; if (f.italic) fa.push("--italic");
  try { await tool("fonte-auto.mjs", fa.slice(1).length ? fa.slice(1) : [], 180000); } catch (e) { /* fallback abaixo */ }
}
// (fonte-auto recebe args sem o nome do arquivo)
for (const f of meta.fontes) {
  const fa = [f.familia, `--weights=${f.pesos || "400,700"}`]; if (f.italic) fa.push("--italic");
  try { await tool("fonte-auto.mjs", fa, 180000); log(`  ✓ fonte: ${f.familia}`); } catch (e) { log(`  ! fonte ${f.familia}: ${e.message}`); }
}
try {
  await tool("foto-auto.mjs", [meta.foto_busca || nicho, `--out=Projetos/${slug}/assets`, "--name=foto", "--orient=portrait", "--n=3", "--source=pexels", "--w=1400"], 180000);
} catch (e) { log(`  ! foto-auto: ${e.message}`); }
const fotos = (await readdir(ASSETS)).filter((f) => /\.jpg$/i.test(f));
log(`✓ ${fotos.length} foto(s) candidata(s)`);
// curadoria por visão (o produtor escolhia olhando): claude lê as fotos e escolhe a que serve à marca
let fotoEscolhida = fotos[0];
if (fotos.length > 1) {
  const cur = await claude(
`Você é diretor de arte. Leia a identidade ${path.relative(ROOT, path.join(PROJ, "identidade-visual.md"))} e VEJA estas fotos candidatas (use Read em cada caminho):
${fotos.map((f) => path.join("Projetos", slug, "assets", f)).join("\n")}
Escolha a que melhor serve à marca (cena/cor/sem rosto identificável de terceiro). Imprima SÓ um bloco \`\`\`json {"manter":"<arquivo.jpg>"}\`\`\`.`,
    { tools: "Read", timeoutMs: 300000 });
  const pick = lastJsonBlock(cur);
  if (pick?.manter && fotos.includes(pick.manter)) fotoEscolhida = pick.manter;
}
log(`✓ foto escolhida: ${fotoEscolhida}`);

// ───────────────────────── PORTÃO 5–7 — DESIGN → RENDER → OLHO (loop) ─────────────────────────
const htmlRel = path.relative(ROOT, path.join(OUT, "carrossel.html"));
const fontnames = meta.fontes.map((f) => `"${f.familia}"`).join(" e ");
log("Portão 5: design (método do designer)…");
await claude(
`Você é graphic-designer sênior. Diagrame em HTML o carrossel. LAYOUT e tratamento são SEU método — sem régua imposta; seu vínculo é com os dados reais.
Leia: ${path.relative(ROOT, path.join(PROJ, "copy-carrossel.md"))}, ${path.relative(ROOT, path.join(PROJ, "identidade-visual.md"))}, ${path.relative(ROOT, path.join(PROJ, "pesquisa-realidade.md"))}.
FOTO REAL (use de verdade, proibido gradiente CSS no lugar de foto): ../assets/${fotoEscolhida} (e outras em ../assets/ se quiser). Marque "imagem ilustrativa" se for foto de banco.
FONTES (já no cache local, use pelos nomes): ${fontnames}. NÃO use @import do Google Fonts.
TÉCNICO (obrigatório): cada slide = <div class="slide"> com width:1080px;height:1350px;overflow:hidden;box-sizing:border-box. Foto via <img>/background url('../assets/...') object-fit:cover com contraste garantido.
Respeite a paleta/tipografia da identidade e o que a marca NÃO faz. Use o copy EXATO. Mantenha os PLACEHOLDERS [entre colchetes]. Evite clichês de carrossel (01/0X, "ARRASTE →", chip) — ache solução sua se quiser indicar progressão.
SALVE um HTML autossuficiente em ${htmlRel}.`,
  { tools: "Read,Write,Edit", timeoutMs: 700000 }
);
if (!existsSync(path.join(OUT, "carrossel.html"))) throw new Error("HTML não foi salvo");

async function render() {
  await tool("render/render-creative.js", [path.join(OUT, "carrossel.html"), path.join(OUT, "slide.jpg"), "1080", "1350", "--slides"], 300000);
}
log("Portão 6: render…"); await render();

async function olho() {
  const slides = (await readdir(OUT)).filter((f) => /^slide-\d+\.jpg$/i.test(f)).sort();
  const verd = await claude(
`Você é ui-visual-validator (O OLHO). Verifique REALIDADE e COERÊNCIA (não gosto). VEJA cada slide (Read):
${slides.map((s) => path.join("Projetos", slug, "outputs", s)).join("\n")}
Confira contra a identidade ${path.relative(ROOT, path.join(PROJ, "identidade-visual.md"))} e copy ${path.relative(ROOT, path.join(PROJ, "copy-carrossel.md"))}:
foto real (não gradiente no lugar de imagem)? paleta da identidade? sem clichê do nicho? regras/ética do nicho respeitadas? nada inventado (placeholders ok)? fontes certas, nada cortado/estourado? legibilidade? arco e CTA claros?
Liste correções objetivas por slide se houver. TERMINE com uma linha exatamente: "VEREDITO: APROVADO" ou "VEREDITO: REPROVADO".`,
    { tools: "Read", timeoutMs: 400000 });
  return verd;
}
log("Portão 7: O OLHO valida…");
let verd = await olho();
let rounds = 0;
while (/VEREDITO:\s*REPROVADO/i.test(verd) && rounds < 2) {
  rounds++;
  log(`OLHO reprovou — rodada de correção ${rounds}…`);
  await claude(
`Você é o graphic-designer. O OLHO reprovou o carrossel ${htmlRel}. Aplique SÓ as correções abaixo (não mexa no que passou; mantenha placeholders e copy). Laudo do OLHO:\n\n${verd.slice(0, 6000)}`,
    { tools: "Read,Write,Edit", timeoutMs: 600000 });
  await render();
  verd = await olho();
}
const aprovado = /VEREDITO:\s*APROVADO/i.test(verd);
log(`${aprovado ? "✓ APROVADO" : "✗ não aprovado após " + rounds + " rodada(s)"} — slides em ${path.relative(ROOT, OUT)}/slide-*.jpg`);
await writeFile(path.join(PROJ, "run-fabrica.log"), `nicho: ${nicho}\nobjetivo: ${objetivo}\npraca: ${praca}\nfontes: ${meta.fontes.map(f=>f.familia).join(", ")}\nfoto: ${fotoEscolhida}\nrodadas OLHO: ${rounds}\naprovado: ${aprovado}\n\n--- último laudo ---\n${verd}\n`, "utf8");
console.log(`\n[fabrica:${slug}] FIM. aprovado=${aprovado}`);
process.exit(aprovado ? 0 : 2);
