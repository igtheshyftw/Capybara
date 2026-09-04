# Adaptive Reading Practice — item bank pipeline

`../adaptive-reading-practice.html` is a single self-contained file: HTML, CSS, the
adaptive engine, the item bank, scoring, reporting and localStorage persistence, with
no external libraries and no network access. These tools only regenerate the item
bank embedded inside it.

## Status

**The bank is currently empty.** `bank.json` is a scaffold — the source question bank
(`MAP 4th Grade Reading Tests (2).pdf`) has not been received, and no substitute
questions have been invented. Until it is populated the app loads, validates and
reports "No items are loaded", and the Start button stays disabled.

## Populating the bank

1. Add items to `bank.json` (schema below).
2. `node tools/build-bank.mjs` — validates, prints a summary, and writes the encoded
   bank into the HTML.
3. `node tools/build-bank.mjs --check` validates without writing.

The bank is stored in the page as an obfuscated blob rather than plain JSON, so answer
keys are not sitting in the source as an obvious readable block. **This is not
security** — anything shipped to a browser is readable by a determined reader. It only
prevents casual view-source answer lookup mid-test. Edit `bank.json` and rebuild;
never hand-edit the blob.

## Item schema

```jsonc
{
  "meta":     { "subject": "Reading", "grade": 4, "placeholder": false },
  "passages": { "p1": { "title": "…", "text": "Paragraph.\n\nParagraph." } },
  "items": [{
    "id":         "unique_item_id",       // required, unique
    "domain":     "Vocabulary Acquisition and Use",
    "skill":      "context clues",
    "grade":      4,
    "difficulty": 204,                    // practice scale; inferred if omitted
    "type":       "multiple_choice",
    "stem":       "Question text.",
    "options":    ["A", "B", "C", "D"],   // >= 2, distinct
    "answer":     "B",                    // must appear in options exactly once
    "explanation": "Why the correct answer is correct.",
    "wrongAnswerExplanations": { "A": "Why A is wrong.", "C": "…", "D": "…" },
    "teachingTip": "A short rule to remember.",

    "scored":     true,                   // false = field-test, never scored
    "passageId":  "p1",                   // groups an item set
    "setOrder":   0,                      // order within the set
    "lockOptionOrder": false              // true to suppress option shuffling
  }]
}
```

Only `id`, `stem`, `options` and `answer` are strictly required. Missing `domain`,
`skill`, `grade` and `difficulty` are filled in at load; missing explanations degrade
the feedback but do not break anything. Difficulty is on the practice scale
(`b = (difficulty − 200) / 10`), roughly: 175–185 prerequisite, 185–195 basic Grade 4,
195–205 typical Grade 4, 205–215 more demanding, 215–225 advanced, 225+ extension.
These are provisional, never calibrations.

Domains are **not hard-coded** — the blueprint, domain scores and reports are all
derived from whatever domains the bank actually contains, defaulting to an even target
share. Options are shuffled per presentation with the answer tracked by value, and
shuffling is suppressed automatically for order-sensitive options
("all of the above", "both A and B", …).

## Validation

`build-bank.mjs` refuses to write on: missing id/stem/answer, duplicate ids, fewer
than two options, duplicate option text, an answer absent from the options or matching
more than one, a non-numeric difficulty, or a `passageId` with no passage text. It
warns on missing metadata, missing explanations and exact-duplicate content. The
runtime repeats these checks and drops anything unusable rather than crashing.

## Verifying the engine

The engine is exposed on `window.ReadingPractice` for console use:

```js
ReadingPractice.selfTest(true)          // spec §26 profiles A–E, logs pass/fail
ReadingPractice.simulate({ theta: 1 })  // one synthetic reader
ReadingPractice.bank.problems           // what was rejected at load, and why
```

`selfTest` checks ability recovery, ordering, difficulty targeting, SEM decrease,
absence of repeats, blueprint balance, domain divergence and length bounds. It needs a
populated bank — with the empty scaffold it reports "bank has items: 0".
