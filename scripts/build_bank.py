#!/usr/bin/env python3
"""
Build the Build a Sentence bank and inject it into public/build-a-sentence.html.

Items are authored as a context line plus the finished reply:

    ("Did the advisor say anything?",
     "She asked [when] [I] [planned] [to] [submit] the application.")

The brackets record how the sentence was first written, but the builder does
NOT use them as the chunking. Chunking is a presentation decision, and the
real task chunks far more aggressively than a careful author does -- cutting
across phrase boundaries, blanking the opening word, leaving little or no
fixed text. So the builder reconstructs the plain sentence and re-chunks it
to the distribution measured from 35 real items in scripts/calibration.py.

Difficulty is a property of the chunking, not of the grammar: a hard item is
the same kind of everyday sentence cut into more, nastier pieces.
"""
import json, math, random, re, sys, importlib.util
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "bank"
HTML = ROOT / "public" / "build-a-sentence.html"
sys.path.insert(0, str(ROOT / "scripts"))
from calibration import REFERENCE, shape, profile          # noqa: E402

SPEAKERS = ["Classmate", "Roommate", "Professor", "Advisor", "Friend", "Coach",
            "Librarian", "Teammate", "Neighbor", "Tutor", "Lab partner",
            "Counselor", "Colleague", "Supervisor", "Host", "Coworker",
            "Group member", "Dorm RA", "Trainer", "Mentor"]

BRACKET = re.compile(r"\[([^\]]+)\]")
KEEP_CASE = {"I", "I'm", "I've", "I'd", "I'll"}

# Grammar targets retired after calibration: written-literary syntax that does
# not appear anywhere in 35 real items, and does not belong in a spoken reply.
RETIRED = {
    "Fronted <i>no sooner</i> and <i>hardly</i>",
    "Preposition before <i>whom</i> or <i>which</i>",
    "Concessive inversion",
    "Absolute participial construction",
    "Comparative with an elliptical <i>than</i> clause",
    "Locative inversion",
    "Reporting passive with a perfect infinitive",
    "Quantifier with <i>of whom</i> or <i>of which</i>",
    "Inversion after fronted <i>only</i>",
    "Mandative subjunctive",
}

# how many words per chunk to aim for: hard cuts finer, so more pieces
# together these reproduce the 4/5/6/7 mix measured from the real items
BLANK_WEIGHTS = {"standard": {4: 20, 5: 31, 6: 49}, "hard": {6: 40, 7: 60}}
WORDS_PER_CHUNK = {"standard": 1.26, "hard": 1.30}
FIXED_WEIGHTS = {"standard": {0: 30, 1: 36, 2: 25, 3: 9},
                 "hard":     {0: 62, 1: 27, 2: 11}}


def norm(t):
    return re.sub(r"\s+([,.;:?!])", r"\1", t)


def weighted(rng, weights):
    total = sum(weights.values())
    roll = rng.random() * total
    for k, w in weights.items():
        roll -= w
        if roll <= 0:
            return k
    return list(weights)[-1]


def lower_initial(word):
    """the real bank shows the opening chunk lowercased; the page capitalises it"""
    if word in KEEP_CASE or word[1:] != word[1:].lower():
        return word
    return word[0].lower() + word[1:]


def rechunk(sentence, tier, rng):
    """plain sentence -> (frame, answer chunks)"""
    words = sentence.split()
    tail = ""
    m = re.match(r"^(.*?)([.?!]+)$", words[-1])
    if m and m.group(1):
        words[-1], tail = m.group(1), m.group(2)
    W = len(words)

    per = WORDS_PER_CHUNK[tier]

    # aim for a blank count, then keep back however many words are needed to
    # leave the right amount of text for it -- the real items blank almost
    # everything and lean on the context line instead
    n = weighted(rng, BLANK_WEIGHTS[tier])
    f = max(0, min(3, W - int(round(n * (per + rng.uniform(-0.1, 0.1))))))
    nf = W - f
    n = max(4, min(n, nf, 7))
    n = max(n, math.ceil(nf / 2.0))
    n = min(n, nf, 7)
    if n < 4:
        return None

    # where the fixed words sit: a prefix, a suffix, or one word inside
    kinds = ["none"] if f == 0 else (
        ["prefix", "suffix", "interior"] if f == 1 else ["prefix", "suffix", "split"])
    kind = rng.choice(kinds)
    fixed = set()
    if kind == "prefix":
        fixed = set(range(f))
    elif kind == "suffix":
        fixed = set(range(W - f, W))
    elif kind == "interior":
        fixed = {rng.randrange(1, W - 1)} if W > 2 else {0}
    elif kind == "split":
        fixed = {0} | set(range(W - (f - 1), W))

    runs, cur = [], []
    for i, w in enumerate(words):
        if i in fixed:
            if cur:
                runs.append(cur)
                cur = []
        else:
            cur.append(i)
    if cur:
        runs.append(cur)
    if sum(len(r) for r in runs) < n or len(runs) > n:
        return None

    # split the chunk budget across the runs, then cut each run into pieces
    budget = [1] * len(runs)
    for _ in range(n - len(runs)):
        options = [i for i, r in enumerate(runs) if budget[i] < len(r)]
        if not options:
            return None
        budget[rng.choice(options)] += 1

    chunks, pos = [], 0
    for run, k in zip(runs, budget):
        sizes = [len(run) // k] * k
        for i in range(len(run) - sum(sizes)):
            sizes[rng.randrange(k)] += 1
        rng.shuffle(sizes)
        i = 0
        for sz in sizes:
            chunks.append((run[i], run[i + sz - 1]))
            i += sz

    chunks.sort()
    answer, frame, used = [], [], 0
    i = 0
    while i < W:
        if i in fixed:
            frame.append(words[i])
            i += 1
        else:
            a, b = chunks[used]
            used += 1
            text = " ".join(words[a:b + 1])
            if a == 0:
                text = lower_initial(text)
            answer.append(text)
            frame.append("_")
            i = b + 1
    if tail:
        frame.append(tail)
    return " ".join(frame), answer


def load_modules():
    mods = []
    for f in sorted(SRC.glob("items_*.py")):
        spec = importlib.util.spec_from_file_location(f.stem, f)
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        mods.append((f.name, m))
    return mods


def build():
    patterns, rows, problems, shapes = [], [], [], []
    seen, speaker_n, serial = set(), 0, 0

    for fname, mod in load_modules():
        for pat in mod.PATTERNS:
            if pat["target"] in RETIRED:
                continue
            pi = len(patterns)
            patterns.append({"target": pat["target"], "why": pat["why"]})
            default_extras = pat.get("extras", [])

            for n, entry in enumerate(pat["items"]):
                ctx, authored = entry[0], entry[1]
                extras = list(entry[2]) if len(entry) > 2 else list(default_extras)
                sentence = norm(BRACKET.sub(r"\1", authored))
                where = f"{fname} / {pat['target']} / item {n+1}"

                # alternate tiers so half the bank is hard, deterministically
                tier = "hard" if serial % 2 else "standard"
                rng = random.Random(f"{pat['target']}|{n}|{tier}")
                out = None
                for _ in range(40):
                    out = rechunk(sentence, tier, rng)
                    if out:
                        break
                serial += 1
                if not out:
                    problems.append(f"{where}: could not chunk ({len(sentence.split())} words)")
                    continue
                frame, answer = out

                # the real task offers a spare word on about one item in nine
                keep_extra = extras and serial % 9 == 0
                extras = extras[:1] if keep_extra else []

                if norm(" ".join(a for a in
                                 (frame.replace("_", "{}", 1) for _ in [0]))) and False:
                    pass
                rebuilt = frame
                for w in answer:
                    rebuilt = rebuilt.replace("_", w, 1)
                if norm(rebuilt).lower() != sentence.lower():
                    problems.append(f"{where}: chunking does not rebuild the sentence")
                if frame.split().count("_") != len(answer):
                    problems.append(f"{where}: blank/answer mismatch")
                if not (4 <= len(answer) <= 7):
                    problems.append(f"{where}: {len(answer)} blanks")
                if not (4 <= len(answer) + len(extras) <= 8):
                    problems.append(f"{where}: bank of {len(answer)+len(extras)}")
                extras = [x for x in extras if x not in answer]
                if sentence.lower() in seen:
                    problems.append(f"{where}: duplicate sentence")
                seen.add(sentence.lower())

                shapes.append(shape(" ".join(
                    f"[{a}]" if t == "_" else t
                    for t, a in zip(frame.split(), _interleave(frame, answer))), extras))
                rows.append([pi, SPEAKERS[speaker_n % len(SPEAKERS)], ctx, frame,
                             answer, extras, 1 if tier == "hard" else 0])
                speaker_n += 1
    return patterns, rows, problems, shapes


def _interleave(frame, answer):
    it = iter(answer)
    return [next(it) if t == "_" else t for t in frame.split()]


def emit(patterns, rows):
    pj = ",\n".join(json.dumps(p, ensure_ascii=False) for p in patterns)
    rj = ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows)
    block = f"/* BANK:START */\nconst PATTERNS = [\n{pj}\n];\nconst BANK = [\n{rj}\n];\n/* BANK:END */"
    html = HTML.read_text()
    HTML.write_text(re.sub(r"/\* BANK:START \*/.*?/\* BANK:END \*/",
                           lambda _: block, html, flags=re.S))
    (ROOT / "public" / "build-a-sentence-bank.json").write_text(
        json.dumps({"patterns": patterns, "items": rows}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    patterns, rows, problems, shapes = build()
    for p in problems[:15]:
        print("  !", p)
    hard = sum(r[6] for r in rows)
    print(f"{len(patterns)} targets, {len(rows)} questions "
          f"({len(rows)-hard} standard / {hard} hard), {len(problems)} problems")
    mine = profile(shapes)
    print(f"{'':24s} {'ours':<28s} real")
    for k in REFERENCE:
        if k == "n":
            continue
        print(f"{k:24s} {str(mine[k]):<28s} {REFERENCE[k]}")
    if problems and "--force" not in sys.argv:
        sys.exit(1)
    emit(patterns, rows)
    print("written to", HTML)
