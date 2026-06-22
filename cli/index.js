#!/usr/bin/env node
import { commands } from './commands/index.js';

// Parser leve: separa posicionais de flags "--chave valor" (sem dependências).
function parseArgs(argv) {
  const positionals = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i++;
      }
    } else {
      positionals.push(a);
    }
  }
  return { positionals, flags };
}

function printHelp() {
  console.log('guaru — CLI do Guaru Tech OS\n');
  console.log('Comandos:');
  for (const [name, cmd] of Object.entries(commands)) {
    console.log(`  ${name.padEnd(8)} ${cmd.summary ?? ''}`);
  }
  console.log('\nUse "guaru <comando> --help" para detalhes.');
}

async function main() {
  const argv = process.argv.slice(2);
  const cmdName = argv[0];

  if (!cmdName || cmdName === 'help' || cmdName === '--help') {
    printHelp();
    return;
  }

  const command = commands[cmdName];
  if (!command) {
    console.error(`Comando desconhecido: ${cmdName}\n`);
    printHelp();
    process.exitCode = 1;
    return;
  }

  const { positionals, flags } = parseArgs(argv.slice(1));
  if (flags.help) {
    console.log(command.usage);
    return;
  }

  try {
    await command.run({ positionals, flags });
  } catch (err) {
    console.error(`✖ ${err.message}`);
    process.exitCode = 1;
  }
}

main();
