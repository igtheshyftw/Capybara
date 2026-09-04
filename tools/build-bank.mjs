#!/usr/bin/env node
/**
 * build-bank.mjs — compile tools/bank.json into adaptive-reading-practice.html
 *
 * The item bank is stored in the HTML as an obfuscated blob rather than plain
 * JSON so that answer keys are not sitting in the page source as an obvious
 * human-readable block (spec §30). This is NOT security: anything shipped to a
 * browser can be read by a determined reader. It only prevents casual
 * view-source answer lookup during a test.
 *
 *   node tools/build-bank.mjs              # build + validate
 *   node tools/build-bank.mjs --check      # validate only, do not write
 *
 * bank.json shape:
 *   {
 *     "meta":      { "subject": "...", "grade": 4, "placeholder": false },
 *     "passages":  { "<passageId>": { "title": "...", "text": "..." } },
 *     "items":     [ { id, domain, skill, grade, difficulty, type, stem,
 *                      options[], answer, explanation,
 *                      wrongAnswerExplanations{}, teachingTip,
 *                      scored?, passageId?, setOrder? } ]
 *   }
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BANK_PATH = join(ROOT, 'tools', 'bank.json');
const HTML_PATH = join(ROOT, 'adaptive-reading-practice.html');
const KEY = [0x41, 0x52, 0x50, 0x2d, 0x62, 0x61, 0x6e, 0x6b]; /* must match decodeBank() */

const checkOnly = process.argv.includes('--check');

/* ------------------------------------------------------------------ encode */
function encode(obj) {
  const bytes = Buffer.from(JSON.stringify(obj), 'utf8');
  const out = Buffer.alloc(bytes.length);
  for (let i = 0; i < bytes.length; i++) out[i] = bytes[i] ^ KEY[i % KEY.length];
  return out.toString('base64');
}

/* ---------------------------------------------------------------- validate */
const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim();

function validate(bank) {
  const errors = [];
  const warnings = [];
  const ids = new Set();
  const prints = new Map();

  if (!Array.isArray(bank.items)) {
    errors.push('bank.json has no "items" array');
    return { errors, warnings };
  }

  bank.items.forEach((it, i) => {
    const where = `item ${i + 1} (${it?.id ?? 'no id'})`;

    if (!it || typeof it !== 'object') { errors.push(`${where}: not an object`); return; }
    if (!norm(it.id))   errors.push(`${where}: missing id`);
    if (!norm(it.stem)) errors.push(`${where}: missing stem`);

    if (ids.has(it.id)) errors.push(`${where}: duplicate id "${it.id}"`);
    ids.add(it.id);

    const opts = Array.isArray(it.options) ? it.options.map(norm).filter(Boolean) : [];
    if (opts.length < 2) errors.push(`${where}: fewer than 2 options`);
    if (new Set(opts).size !== opts.length) errors.push(`${where}: duplicate option text`);

    const answer = norm(it.answer);
    if (!answer) errors.push(`${where}: missing answer`);
    else {
      const n = opts.filter((o) => o === answer).length;
      if (n === 0) errors.push(`${where}: answer is not one of the options`);
      if (n > 1)   errors.push(`${where}: answer text matches ${n} options (ambiguous)`);
    }

    if (it.difficulty != null && !Number.isFinite(Number(it.difficulty)))
      errors.push(`${where}: difficulty is not a number`);
    if (it.difficulty == null) warnings.push(`${where}: no difficulty, one will be inferred at load`);

    if (!norm(it.domain))      warnings.push(`${where}: no domain, will be filed under "General"`);
    if (!norm(it.skill))       warnings.push(`${where}: no skill, will be "Unclassified"`);
    if (!norm(it.explanation)) warnings.push(`${where}: no explanation`);
    if (!norm(it.teachingTip)) warnings.push(`${where}: no teachingTip`);

    const wrong = it.wrongAnswerExplanations ?? {};
    opts.filter((o) => o !== answer).forEach((o) => {
      if (!norm(wrong[o])) warnings.push(`${where}: no explanation for distractor "${o}"`);
    });
    Object.keys(wrong).forEach((k) => {
      if (!opts.includes(norm(k)))
        warnings.push(`${where}: wrongAnswerExplanations key "${k}" is not an option`);
    });

    if (it.passageId && !(bank.passages && bank.passages[it.passageId]) && !it.passageText)
      errors.push(`${where}: passageId "${it.passageId}" has no passage text`);

    const print = norm(it.stem).toLowerCase() + '||' + [...opts].sort().join('|').toLowerCase();
    if (prints.has(print)) warnings.push(`${where}: exact duplicate of ${prints.get(print)}`);
    else prints.set(print, where);
  });

  return { errors, warnings };
}

/* -------------------------------------------------------------------- main */
let bank;
try {
  bank = JSON.parse(readFileSync(BANK_PATH, 'utf8'));
} catch (e) {
  console.error(`Cannot read ${BANK_PATH}: ${e.message}`);
  process.exit(1);
}

const { errors, warnings } = validate(bank);
warnings.forEach((w) => console.warn(`warn:  ${w}`));
errors.forEach((e) => console.error(`ERROR: ${e}`));

if (errors.length) {
  console.error(`\n${errors.length} error(s). Bank not written.`);
  process.exit(1);
}

/* summary */
const items = bank.items;
const scored = items.filter((i) => i.scored !== false);
const byDomain = {};
scored.forEach((i) => { const d = norm(i.domain) || 'General'; byDomain[d] = (byDomain[d] || 0) + 1; });
const diffs = scored.map((i) => Number(i.difficulty)).filter(Number.isFinite).sort((a, b) => a - b);

console.log(`\nitems:       ${items.length} (${scored.length} scored, ${items.length - scored.length} field-test)`);
console.log(`passages:    ${Object.keys(bank.passages ?? {}).length}`);
console.log(`difficulty:  ${diffs.length ? `${diffs[0]}–${diffs[diffs.length - 1]} (median ${diffs[Math.floor(diffs.length / 2)]})` : 'none supplied'}`);
console.log('domains:');
Object.entries(byDomain).sort((a, b) => b[1] - a[1])
  .forEach(([d, n]) => console.log(`  ${String(n).padStart(4)}  ${(100 * n / scored.length).toFixed(1).padStart(5)}%  ${d}`));
console.log(`warnings:    ${warnings.length}`);

if (checkOnly) { console.log('\n--check: nothing written.'); process.exit(0); }

const payload = encode(bank);
let html = readFileSync(HTML_PATH, 'utf8');
const re = /(<script id="bank-data">\n)[\s\S]*?(\n<\/script>)/;
if (!re.test(html)) {
  console.error('Could not find the <script id="bank-data"> block in the HTML.');
  process.exit(1);
}
html = html.replace(re, `$1var BANK_PAYLOAD = "${payload}";$2`);
writeFileSync(HTML_PATH, html);

console.log(`\nwrote ${payload.length.toLocaleString()} base64 chars into ${HTML_PATH}`);
