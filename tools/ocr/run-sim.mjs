/* Runs the shipped engine in Node against a bank, with a minimal DOM shim.
   Usage: node run-sim.mjs <html-path> <bank-json-path> */
import { readFileSync } from 'node:fs';

const [htmlPath, bankPath] = process.argv.slice(2);
const html = readFileSync(htmlPath, 'utf8');
const bank = JSON.parse(readFileSync(bankPath, 'utf8'));

/* encode the bank exactly as build-bank.mjs does */
const KEY = [0x41, 0x52, 0x50, 0x2d, 0x62, 0x61, 0x6e, 0x6b];
const raw = Buffer.from(JSON.stringify(bank), 'utf8');
const enc = Buffer.alloc(raw.length);
for (let i = 0; i < raw.length; i++) enc[i] = raw[i] ^ KEY[i % KEY.length];
const payload = enc.toString('base64');

/* pull the engine out of the HTML */
const scripts = [...html.matchAll(/<script(?: id="[^"]*")?>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
if (!scripts.length) throw new Error('no <script> found in HTML');
const engine = scripts[scripts.length - 1];

/* minimal DOM/browser shim — boot() is expected to bail out harmlessly */
const noop = () => {};
const stubEl = () => ({ style: {}, setAttribute: noop, appendChild: noop, click: noop,
                        removeChild: noop, focus: noop, select: noop });
globalThis.document = {
  readyState: 'complete',
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  addEventListener: noop,
  removeEventListener: noop,
  createElement: stubEl,
  body: { appendChild: noop, removeChild: noop }
};
globalThis.window = {
  addEventListener: noop, removeEventListener: noop,
  setTimeout, clearTimeout, scrollTo: noop, print: noop
  /* window.localStorage intentionally absent: exercises the storage-disabled path */
};
globalThis.Event = class { constructor(t) { this.type = t; } };
globalThis.Blob = class { constructor(p) { this.parts = p; } };
globalThis.URL.createObjectURL = () => 'blob:stub';
globalThis.URL.revokeObjectURL = noop;

const errors = [];
const origError = console.error;
console.error = (...a) => { errors.push(a.join(' ')); };

new Function('BANK_PAYLOAD_INJECT', `var BANK_PAYLOAD = BANK_PAYLOAD_INJECT;\n${engine}`)(payload);

console.error = origError;

const RP = globalThis.window.ReadingPractice;
if (!RP) { console.log('engine did not initialise'); process.exit(1); }

console.log(`bank loaded: ${RP.bank.stats.total} items, ${RP.bank.stats.scored} scored, ` +
            `domains ${RP.bank.domains.length}, difficulty ${RP.bank.stats.minDifficulty}-${RP.bank.stats.maxDifficulty}`);
const p = RP.bank.problems;
Object.entries(p).forEach(([k, v]) => { if (v.length) console.log(`  bank issue ${k}: ${v.length}`); });
if (errors.length) console.log(`  (boot reported ${errors.length} handled error(s), expected without a DOM)`);

console.log('\n=== SPEC §26 SIMULATION ===\n');
const res = RP.selfTest(true);

console.log('\n=== PROFILE DETAIL ===');
for (const [k, v] of Object.entries(res.profiles)) {
  console.log(`\nProfile ${k}: true ${v.trueIndex} -> estimated ${v.estimatedIndex} ` +
              `(SEM ${v.sem}, ${v.items} items, ${v.percentCorrect}% correct, ended: ${v.endReason})`);
  console.log(`  difficulty  first5 ${v.meanDifficultyFirst5}  last10 ${v.meanDifficultyLast10}`);
  console.log(`  SEM         first  ${v.semFirst}  last ${v.semLast}`);
  console.log('  domains     ' + Object.entries(v.domains)
    .map(([d, o]) => `${d.split(':')[0].slice(0, 22)}=${o.index}(n${o.items})`).join('  '));
}

process.exit(res.passed ? 0 : 1);
