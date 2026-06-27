#!/usr/bin/env node
// foto-auto.mjs — busca automática da foto certa a partir do `foto_busca`, em vários bancos.
// O conteúdo define a foto que precisa (foto_busca) → ISTO baixa a foto certa → salva em assets/ + .LICENSE.txt
// → imprime o nome pra passar em `compor --foto=`. A foto SEMPRE serve ao conteúdo (nunca aleatória).
//
// Uso: node tools/foto-auto.mjs "rain window night" --out=Projetos/<cli>/.../assets --name=ansiedade-mood
//        [--n=1] [--source=auto|pexels|unsplash|openverse] [--orient=portrait|landscape|square] [--w=1600]
//
// BANCOS (ordem do modo `auto`): alta-resolução primeiro, fallback sem chave por último.
//   1. Pexels    — chave em PEXELS_API_KEY.      Entrega ≥1080 cor cheia (foto-herói). Host: images.pexels.com.
//   2. Unsplash  — chave em UNSPLASH_ACCESS_KEY. Entrega ≥1080 cor cheia (foto-herói). Host: images.unsplash.com.
//   3. Openverse — sem chave. Teto ~960px no host liberado (api.openverse.org) — serve FUNDO tratado, não herói.
// `auto` usa os bancos de alta SE a chave existir; senão cai no Openverse. Force um com --source=.
//
// POR QUE dois níveis de qualidade (não é detalhe — é design): o tratamento da foto é DECISÃO do designer por
// peça (régua, não regra). Duotone, foto-herói nítida em cor, recorte — são MÉTODOS de referência que o designer
// ESCOLHE caso a caso ("com esta foto e este texto, fica melhor assim ou assado?"). O psi hoje usa duotone (aí
// ~960px do Openverse basta), mas isso é UMA escolha, não regra. Como o designer decide caso a caso, as duas
// capacidades têm que estar SEMPRE disponíveis — a ferramenta nunca limita a decisão dele.
// A ferramenta nunca limita a decisão do designer — serve os dois níveis. Ver ESTADO-ATUAL.md.
//
// Portável PC + nuvem: na nuvem os hosts de imagem precisam estar liberados em Network→Custom
// (images.pexels.com · images.unsplash.com · api.openverse.org). No PC (rede aberta) roda direto.
import { writeFile, mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const query = args.filter((a) => !a.startsWith("--")).join(" ").trim();
const arg = (n, d) => { const a = args.find((x) => x.startsWith(`--${n}=`)); return a ? a.split("=").slice(1).join("=") : d; };
const outDir = path.resolve(arg("out", "."));
const name = arg("name", "foto");
const n = Number(arg("n", "1"));
const source = arg("source", "auto");
const orient = arg("orient", "");      // portrait|landscape|square — vazio = qualquer
const largura = Number(arg("w", "1600")); // largura-alvo dos bancos de alta (≥1080 com folga, otimizado)

if (!query) {
  console.error('Uso: node tools/foto-auto.mjs "<foto_busca>" --out=<dir> --name=<nome> [--n=1] [--source=auto|pexels|unsplash|openverse] [--orient=portrait|landscape|square]');
  process.exit(1);
}

// Proxy-aware: na nuvem o fetch nativo precisa do proxy explícito (ver /root/.ccr/README.md).
if (process.env.HTTPS_PROXY) {
  try {
    const { ProxyAgent, setGlobalDispatcher } = await import("undici");
    setGlobalDispatcher(new ProxyAgent(process.env.HTTPS_PROXY));
  } catch { /* undici ausente — gateway transparente já roteia hosts liberados */ }
}

const UA = "GuaruTech-foto-auto/1.0";

// ===================== ADAPTADORES DE BANCO =====================
// Cada um devolve candidatos { idKey, title, source, license, attribution, page, urls:[melhor→pior], trigger? }.
// `urls` é tentada em ordem (1ª que baixar vence). `trigger` (Unsplash) é batido após salvar, por exigência da API.

async function buscaPexels() {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return { erro: "sem PEXELS_API_KEY" };
  const o = { portrait: "portrait", landscape: "landscape", square: "square" }[orient];
  const u = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=20${o ? `&orientation=${o}` : ""}`;
  const r = await fetch(u, { headers: { Authorization: key, "User-Agent": UA } });
  if (!r.ok) return { erro: `Pexels HTTP ${r.status}` };
  const d = await r.json();
  return {
    candidatos: (d.photos || []).map((p) => ({
      idKey: `pexels:${p.id}`,
      title: p.alt || "(sem título)",
      source: `Pexels — foto de ${p.photographer}`,
      license: "Pexels License — uso comercial OK, sem atribuição exigida (crédito é boa prática)",
      attribution: `${p.photographer} (${p.photographer_url || "Pexels"})`,
      page: p.url,
      // src.original aceita params de resize/compress do Pexels → entrega ≥1080 otimizado, não o cru de vários MB.
      urls: [`${p.src.original}?auto=compress&cs=tinysrgb&w=${largura}`, p.src.large2x, p.src.large],
    })),
  };
}

async function buscaUnsplash() {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return { erro: "sem UNSPLASH_ACCESS_KEY" };
  const o = { portrait: "portrait", landscape: "landscape", square: "squarish" }[orient];
  const u = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20${o ? `&orientation=${o}` : ""}`;
  const r = await fetch(u, { headers: { Authorization: `Client-ID ${key}`, "User-Agent": UA } });
  if (!r.ok) return { erro: `Unsplash HTTP ${r.status}` };
  const d = await r.json();
  return {
    candidatos: (d.results || []).map((p) => ({
      idKey: `unsplash:${p.id}`,
      title: p.description || p.alt_description || "(sem título)",
      source: `Unsplash — foto de ${p.user?.name}`,
      license: "Unsplash License — uso comercial OK, sem permissão; atribuição apreciada (boa prática)",
      attribution: `${p.user?.name} — ${p.user?.links?.html || "Unsplash"}`,
      page: p.links?.html,
      // urls.raw aceita params Imgix → tamanho sob medida ≥1080, otimizado.
      urls: [`${p.urls.raw}&w=${largura}&fm=jpg&q=80&fit=max`, p.urls.regular, p.urls.full],
      trigger: p.links?.download_location ? `${p.links.download_location}` : null, // exigência da API Unsplash
      key,
    })),
  };
}

async function buscaOpenverse() {
  const u = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license=cc0,pdm&size=large&page_size=20&mature=false`;
  const r = await fetch(u, { headers: { "User-Agent": UA } });
  if (!r.ok) return { erro: `Openverse HTTP ${r.status}` };
  const d = await r.json();
  return {
    candidatos: (d.results || []).filter((x) => x.url).map((x) => ({
      idKey: `openverse:${x.id}`,
      title: x.title || "(sem título)",
      source: `Openverse/${x.source || x.provider || "?"}`,
      license: `${x.license}${x.license_version ? " " + x.license_version : ""} — uso comercial OK, modificação OK, sem atribuição exigida`,
      attribution: x.creator || "—",
      page: x.foreign_landing_url || "—",
      // original (melhor no PC) → proxy de thumbnail do Openverse (host liberado na nuvem, mas teto ~960px).
      urls: [x.url, `https://api.openverse.org/v1/images/${x.id}/thumb/?full_size=true&compressed=false`],
      nota: "Openverse: alta só pelo CDN original (PC/rede aberta); na nuvem cai no proxy ~960px (fundo, não herói).",
    })),
  };
}

const BANCOS = { pexels: buscaPexels, unsplash: buscaUnsplash, openverse: buscaOpenverse };
function ordemBancos() {
  if (source !== "auto") return [source];
  // auto: alta primeiro (se tiver chave), Openverse por último (sempre disponível).
  const ordem = [];
  if (process.env.PEXELS_API_KEY) ordem.push("pexels");
  if (process.env.UNSPLASH_ACCESS_KEY) ordem.push("unsplash");
  ordem.push("openverse");
  return ordem;
}

// ===================== ANTI-REPETIÇÃO =====================
async function jaUsada(idKey, page) {
  try {
    for (const f of await readdir(outDir)) {
      if (!/\.(LICENSE\.txt|md)$/i.test(f)) continue;
      const txt = await readFile(path.join(outDir, f), "utf-8");
      if (txt.includes(idKey) || (page && page !== "—" && txt.includes(page))) return true;
    }
  } catch {}
  return false;
}

// ===================== DOWNLOAD =====================
async function baixar(urls) {
  for (let i = 0; i < urls.length; i++) {
    if (!urls[i]) continue;
    try {
      const img = await fetch(urls[i], { headers: { "User-Agent": UA } });
      if (!img.ok) continue;
      return { bytes: Buffer.from(await img.arrayBuffer()), url: urls[i], fallback: i > 0 };
    } catch { /* tenta a próxima */ }
  }
  return null;
}

async function main() {
  await mkdir(outDir, { recursive: true });
  let salvos = 0;
  const motivos = [];

  for (const banco of ordemBancos()) {
    if (salvos >= n) break;
    const fn = BANCOS[banco];
    if (!fn) { motivos.push(`fonte desconhecida: ${banco}`); continue; }

    let res;
    try { res = await fn(); }
    catch (e) { motivos.push(`${banco}: rede falhou (${e.message})`); continue; }
    if (res.erro) { motivos.push(`${banco}: ${res.erro}`); continue; }
    if (!res.candidatos?.length) { motivos.push(`${banco}: nada pra "${query}"`); continue; }

    for (const c of res.candidatos) {
      if (salvos >= n) break;
      if (await jaUsada(c.idKey, c.page)) continue; // não rebaixa a mesma foto
      const dl = await baixar(c.urls);
      if (!dl) continue;

      const file = salvos === 0 ? `${name}.jpg` : `${name}-${salvos + 1}.jpg`;
      await writeFile(path.join(outDir, file), dl.bytes);

      // Unsplash exige bater o endpoint de download ao usar a foto (termos da API). Best-effort.
      if (c.trigger && c.key) {
        try { await fetch(c.trigger, { headers: { Authorization: `Client-ID ${c.key}`, "User-Agent": UA } }); } catch {}
      }

      const kb = Math.round(dl.bytes.length / 1024);
      const lic = [
        `## ${file}`,
        `- ID: ${c.idKey}  ·  Título: "${c.title}"`,
        `- Fonte: ${c.source}`,
        `- Licença: ${c.license}`,
        `- Crédito (se for usar): ${c.attribution}`,
        `- Busca (foto_busca): "${query}"`,
        `- Baixado: ${new Date().toISOString().slice(0, 10)} · ${kb}KB · URL: ${dl.url}`,
        `- Página: ${c.page}`,
        dl.fallback ? `- ⚠️ Veio de fonte secundária do banco (menor resolução que a ideal).` : null,
        c.nota ? `- Obs.: ${c.nota}` : null,
        "",
      ].filter(Boolean).join("\n");
      await writeFile(path.join(outDir, `${file.replace(/\.jpg$/, "")}.LICENSE.txt`), lic);
      console.log(`✓ ${file}  (${banco}, ${kb}KB${dl.fallback ? ", fonte secundária" : ""})`);
      salvos++;
    }
  }

  if (!salvos) {
    console.error(`✖ Não consegui baixar nenhuma foto pra "${query}".`);
    for (const m of motivos) console.error(`  · ${m}`);
    console.error("  → Alta (Pexels/Unsplash): exporte PEXELS_API_KEY / UNSPLASH_ACCESS_KEY e libere images.pexels.com / images.unsplash.com na rede.");
    console.error("  → Detalhe: knowledge-base/sistema/infra-de-producao-e-rede.md");
    process.exit(3);
  }
  console.log(`\n[foto-auto] ${salvos} foto(s) em ${path.relative(process.cwd(), outDir)} → passe em: compor --foto=${name}.jpg`);
}
main().catch((e) => { console.error("Falha no foto-auto:", e.message); process.exit(1); });
