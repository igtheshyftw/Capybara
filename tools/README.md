# Adaptive Reading Practice — item bank pipeline

`../adaptive-reading-practice.html` is a single self-contained file: HTML, CSS, the
adaptive engine, the item bank, scoring, reporting and localStorage persistence, with
no external libraries and no network access. These tools only regenerate the item
bank embedded inside it.

## Status

The bank is populated: **363 items** from *The Book of MAP Growth Reading — Reading
Questions for the MAP Exam, 4th Grade* (201-page scanned PDF, `Question bank.pdf`).

The source has no text layer, so every item was recovered by OCR. The pipeline that
produced `bank.json` lives in this repo's history and worked as follows:

1. **Render + OCR** each page at 600 dpi greyscale, `tesseract --psm 6`.
   `OMP_THREAD_LIMIT=1` is essential — tesseract's OpenMP contention makes a single
   page take over 120 s in a small container, versus ~0.5 s pinned to one thread.
2. **A second, gap-aware OCR pass** over the question pages using TSV word boxes.
   Tesseract silently drops the long underscore runs the book uses for
   fill-in-the-blank items, turning "Part of the \_\_\_\_ involves chanting" into
   "Part of the involves chanting". A blank is still visible as an abnormally wide
   gap between two words, so blanks are re-inserted from the word geometry. This
   pass is used for question pages only — on answer pages the wide key column would
   be misread as a blank.
3. **Parse** quizzes into stems, options, stimuli and answer keys. Poems in this book
   have numbered lines, so a numbered line only starts a question if an `A.` option
   appears before the next numbered line.
4. **Repair** OCR damage: run-together words are split against a dictionary, but only
   where the token begins with a short function word, so proper nouns such as
   "Petertown" survive. Merged option lines (`B. in Cc. im D. ir`) are split back out.
5. **Verify** the answer keys. The three 42-question tests print their keys in a
   column the OCR cannot read (it produced `i B`, `PA D`, `3a DOD`, `ae ao`), so those
   126 keys were transcribed by reading the rendered key column directly. Where the
   600 dpi OCR did produce a letter for Reading–Basic, all 40 agreed with that
   transcription — which is the main evidence that the OCR path is trustworthy.
6. **Classify** domain, skill and provisional difficulty, and drop what cannot work.

60 of the 423 parsed questions were dropped; see the "Known gaps" section below.

## Item schema

```jsonc
{
  "meta":     { "subject": "Reading", "grade": 4, "placeholder": false },
  "passages": { "p1": { "title": "…", "text": "Paragraph.\n\nParagraph." } },
  "items": [{
    "id":         "unique_item_id",       // required, unique
    "domain":     "Informational Text",
    "skill":      "Vocabulary in context",
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

## Known gaps

**60 questions were dropped** and are not in the bank:

| Reason | Count |
|---|---|
| Stimulus is a chart, map, table, timetable, poster, label or ticket that cannot be shown as text | 53 |
| Question refers to a visual that is not part of the text | 2 |
| Options could not be recovered from the scan | 4 |
| Answer key missing or not matching an option | 1 |

`dropped.json` in the build directory lists every one with its reason. These are
recoverable if the images are supplied separately — the engine already supports
passage sets, so an image-backed stimulus would slot in the same way.

**Distractor explanations.** The source book gives one explanation per question
(why the correct answer is correct), not one per wrong option. `wrongAnswerExplanations`
is therefore empty for every item, and the app composes its wrong-answer feedback from
the item's own explanation plus a skill-level teaching rule. Per-distractor text would
have to be written; none was invented.

**Difficulty is provisional, not calibrated.** It is anchored on the book's own
Basic / Proficient / Advanced banding (mean 190 / 202 / 214) and nudged within each
band by surface complexity. The bank spans 186–222, so the adaptive test measures
readers between about 188 and 212 efficiently; outside that range the estimate stays
accurate (bias within ±1.3 practice points, RMSE under 4.3 in simulation) but the
test cannot find items at the reader's level, so accuracy drifts away from the ~50%
a fully-matched adaptive test would produce.

**All items are grade 4**, faithful to the source. The `gradeProximityReward` term is
therefore constant across this bank and has no differentiating effect on selection.
It remains in the engine for banks that mix grades.

## Verifying the engine

The engine is exposed on `window.ReadingPractice` for console use:

```js
ReadingPractice.selfTest(true)          // spec §26 profiles A–E, logs pass/fail
ReadingPractice.simulate({ theta: 1 })  // one synthetic reader
ReadingPractice.bank.problems           // what was rejected at load, and why
```

`selfTest` checks ability recovery, ordering, difficulty targeting, SEM decrease,
absence of repeats, blueprint balance, domain divergence and length bounds. Against the
current bank all 31 checks pass: profiles A/B/C recover to within 1.1–3.2 practice
points, last-10 mean difficulty separates a weak from a strong reader by 18.6 points,
SEM falls from 11.7 to ~3.5, no item repeats, the blueprint stays within 5% of target,
and domain estimates diverge in the right direction for the uneven profiles D and E.

## Reproducing the bank

`ocr/` holds the pipeline, to be run in order from that directory:

```sh
python3 ocr/ocr_text.py      # 600dpi OCR of every page          (~3 min)
python3 ocr/ocr_gap.py       # gap-aware pass, restores blanks   (~2 min)
python3 ocr/parse.py         # -> parsed.json
python3 ocr/recover_expl.py  # -> recovered_expl.json
python3 ocr/build.py         # -> bank.json + dropped.json
node build-bank.mjs          # -> embeds into the HTML
```

`ocr/keys.json` holds the 126 hand-transcribed answer keys and is an input, not a
generated file.
