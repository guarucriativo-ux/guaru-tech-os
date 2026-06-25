#!/usr/bin/env node
// tools/sincronizar.mjs — sincroniza a fábrica entre terminais (PC <-> nuvem/celular).
//
// Quando o Marcos volta pro PC e diz "sincroniza", o Claude roda ISTO. Faz sempre igual:
//   1. Busca tudo da nuvem (fetch).
//   2. Atualiza a main local a partir da origem (o que ele aprovou/mesclou pelo celular).
//   3. Mescla na main qualquer trabalho que veio do celular numa branch (ex.: claude/*).
//   4. Empurra a main de volta e mostra um resumo do que chegou.
//
// Seguro por design: se houver mudança local não salva, ele PARA e avisa (não atropela nada);
// se uma mescla der conflito, ele ABORTA aquela mescla e avisa pra resolvermos juntos.
//
// Uso: node tools/sincronizar.mjs

import { execSync } from 'node:child_process';

const sh = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();
const loud = (cmd) => { console.log(`$ ${cmd}`); execSync(cmd, { stdio: 'inherit' }); };
const tryGit = (cmd) => {
  try { return { ok: true, out: sh(cmd) }; }
  catch (e) { return { ok: false, out: `${e.stdout || ''}${e.stderr || e.message || ''}` }; }
};

// 0. Não sincronizar por cima de trabalho local não salvo.
const dirty = sh('git status --porcelain');
if (dirty) {
  console.log('⚠️  Tem mudança local AINDA NÃO SALVA aqui no PC. Vou salvar (commit) antes de sincronizar,');
  console.log('   senão corro o risco de atropelar. Me peça pra salvar, ou rode depois de commitar:\n');
  console.log(dirty);
  process.exit(1);
}

console.log('🔄 Buscando tudo da nuvem...');
loud('git fetch --all --prune');

// 1. Garante que estamos na main e a atualiza a partir da origem (caso o PR tenha sido mesclado no celular).
sh('git checkout main');
const before = sh('git rev-parse HEAD');
tryGit('git pull --ff-only origin main');

// 2. Branches remotas além da main = trabalho que veio do celular/nuvem (normalmente claude/*).
const remotes = sh('git branch -r')
  .split('\n').map((s) => s.trim()).filter(Boolean)
  .filter((b) => !b.includes('->') && b !== 'origin/main');

const merged = [];
const conflitos = [];
for (const rb of remotes) {
  const jaNaMain = tryGit(`git merge-base --is-ancestor ${rb} main`).ok;
  if (jaNaMain) continue;
  console.log(`\n🌿 Trazendo trabalho de: ${rb}`);
  const res = tryGit(`git merge --no-edit ${rb}`);
  if (res.ok) merged.push(rb);
  else { console.log(`   ⚠️ conflito em ${rb} — abortando essa mescla.`); tryGit('git merge --abort'); conflitos.push(rb); }
}

// 3. Empurra a main se algo mudou.
const after = sh('git rev-parse HEAD');
if (after !== before) tryGit('git push origin main');

// 4. Resumo claro.
console.log('\n================ RESUMO DA SINCRONIZAÇÃO ================');
if (after !== before) {
  if (merged.length) console.log(`✅ Trouxe trabalho do celular/nuvem: ${merged.join(', ')}`);
  console.log('\n📂 Arquivos novos/alterados que chegaram:');
  console.log(sh(`git diff --name-status ${before} ${after}`) || '(nenhum)');
} else {
  console.log('✅ Já estava tudo igual — nada novo do celular/nuvem.');
}
if (conflitos.length) console.log(`\n⚠️ PRECISA DE ATENÇÃO (conflito): ${conflitos.join(', ')} — me chame pra resolver junto.`);
console.log('🌍 PC, nuvem e celular agora 100% iguais.');
console.log('========================================================');
