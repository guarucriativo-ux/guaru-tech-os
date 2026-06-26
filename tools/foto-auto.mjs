#!/usr/bin/env node
// foto-auto.mjs — busca automática de foto do banco livre (Openverse) a partir do `foto_busca`.
// O conteúdo define a foto que precisa (foto_busca) → ISTO baixa a foto certa → salva em assets/ + .LICENSE.txt
// → imprime o nome pra passar em `compor --foto=`. A foto SEMPRE serve ao conteúdo (nunca aleatória).
//
// Uso: node tools/foto-auto.mjs "rain window night" --out=Projetos/<cli>/.../assets --name=ansiedade-mood [--n=1]
//
// Portável PC + nuvem: se houver HTTPS_PROXY (nuvem), roteia o fetch pelo proxy (precisa do host liberado em
// Network→Custom: api.openverse.org + CDNs de imagem). No PC (sem proxy) vai direto. Licença filtrada cc0/pdm
// (uso comercial + modificação OK, sem atribuição exigida) — mesma regra das fotos já curadas.
import { writeFile, mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const query = args.filter((a) => !a.startsWith("--")).join(" ").trim();
const arg = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.split("=").slice(1).join("=") : d; };
const outDir = path.resolve(arg("out", "."));
const name = arg("name", "foto");
const n = Number(arg("n", "1"));

if (!query) { console.error('Uso: node tools/foto-auto.mjs "<foto_busca>" --out=<dir> --name=<nome> [--n=1]'); process.exit(1); }

// Proxy-aware: na nuvem o fetch nativo precisa do proxy explícito (ver /root/.ccr/README.md).
if (process.env.HTTPS_PROXY) {
  try {
    const { ProxyAgent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
  } catch { /* undici ausente — segue tentando direto */ }
}

const API = "https://api.openverse.org/v1/images/";
const url = `${API}?q=${encodeURIComponent(query)}&license=cc0,pdm&size=large&page_size=12&mature=false`;

async function jaUsada(srcUrl) {
  try {
    for (const f of await readdir(outDir)) {
      if (!/\.(LICENSE\.txt|md)$/i.test(f)) continue;
      if ((await readFile(path.join(outDir, f), "utf-8")).includes(srcUrl)) return true;
    }
  } catch {}
  return false;
}

async function main() {
  let resp;
  try {
    resp = await fetch(url, { headers: { "User-Agent": "GuaruTech-foto-auto/1.0" } });
  } catch (e) {
    console.error(`✖ Rede indisponível pra ${API} (${e.message}).`);
    console.error("  → Abra Network→Custom liberando 'api.openverse.org' + CDNs de imagem, OU rode no PC.");
    console.error("  → Detalhe: knowledge-base/sistema/infra-de-producao-e-rede.md");
    process.exit(2);
  }
  if (!resp.ok) {
    console.error(`✖ Openverse respondeu HTTP ${resp.status}. Se for 403, o host está bloqueado pela rede deste ambiente (abra Network→Custom ou rode no PC).`);
    process.exit(2);
  }
  const data = await resp.json();
  const results = (data.results || []).filter((r) => r.url);
  if (!results.length) { console.error(`✖ Nada encontrado pra "${query}". Tente outras palavras.`); process.exit(3); }

  await mkdir(outDir, { recursive: true });
  let salvos = 0;
  for (const r of results) {
    if (salvos >= n) break;
    if (await jaUsada(r.url)) continue; // anti-repetição: não rebaixa a mesma foto
    let bytes;
    try { const img = await fetch(r.url, { headers: { "User-Agent": "GuaruTech-foto-auto/1.0" } }); if (!img.ok) continue; bytes = Buffer.from(await img.arrayBuffer()); }
    catch { continue; }
    const file = salvos === 0 ? `${name}.jpg` : `${name}-${salvos + 1}.jpg`;
    await writeFile(path.join(outDir, file), bytes);
    const lic = [
      `## ${file}`,
      `- Título: "${r.title || "(sem título)"}" · Fonte: ${r.source || r.provider || "Openverse"}`,
      `- Licença: ${r.license}${r.license_version ? " " + r.license_version : ""} — uso comercial OK, modificação OK, sem atribuição exigida`,
      `- Busca (foto_busca): "${query}"`,
      `- Baixado: ${new Date().toISOString().slice(0, 10)} · URL: ${r.url}`,
      `- Página: ${r.foreign_landing_url || "—"}`,
      "",
    ].join("\n");
    await writeFile(path.join(outDir, `${file.replace(/\.jpg$/, "")}.LICENSE.txt`), lic);
    console.log(`✓ ${file}  (${r.license}, ${r.source || r.provider})`);
    salvos++;
  }
  if (!salvos) { console.error("✖ Não consegui baixar nenhuma candidata (todas já usadas ou falharam)."); process.exit(3); }
  console.log(`\n[foto-auto] ${salvos} foto(s) em ${path.relative(process.cwd(), outDir)} → passe em: compor --foto=${name}.jpg`);
}
main().catch((e) => { console.error("Falha no foto-auto:", e.message); process.exit(1); });
