#!/usr/bin/env python3
"""
Build the Build a Sentence question bank and inject it into
public/build-a-sentence.html between the BANK markers.

Each item is authored as a context line plus the finished reply, with the
words that become blanks wrapped in square brackets:

    ("Did the advisor say anything?",
     "She asked [when] [I] [planned] [to] [submit] the application.")

The builder derives the frame, the answer key and the bank from that single
string, so a frame can never drift out of step with its answer.
"""
import json, re, sys, importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "bank"
HTML = ROOT / "public" / "build-a-sentence.html"

SPEAKERS = ["Classmate", "Roommate", "Professor", "Advisor", "Friend", "Coach",
            "Librarian", "Teammate", "Neighbor", "Tutor", "Lab partner",
            "Counselor", "Colleague", "Supervisor", "Host", "Coworker",
            "Group member", "Dorm RA", "Trainer", "Mentor"]

PROPER = {"I", "I'm", "I'll", "I've", "I'd"}
BRACKET = re.compile(r"\[([^\]]+)\]")


def norm(text):
    """collapse the space that separating punctuation introduces"""
    return re.sub(r"\s+([,.;:?!])", r"\1", text)


def parse(sentence):
    """-> (frame string with _ per blank, answer list)"""
    answer = BRACKET.findall(sentence)
    frame = BRACKET.sub("_", sentence)
    # a blank must survive as its own whitespace-delimited token, so punctuation
    # written tight against a bracket gets a space: "[stops]," -> "_ ,"
    frame = re.sub(r"_(?=[^\s])", "_ ", frame)
    return frame, answer


def load_modules():
    mods = []
    for f in sorted(SRC.glob("items_*.py")):
        spec = importlib.util.spec_from_file_location(f.stem, f)
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        mods.append((f.name, m))
    return mods


def build():
    patterns, rows, problems = [], [], []
    seen = set()
    speaker_n = 0

    for fname, mod in load_modules():
        for pat in mod.PATTERNS:
            pi = len(patterns)
            patterns.append({"target": pat["target"], "why": pat["why"]})
            default_extras = pat.get("extras", [])

            for n, entry in enumerate(pat["items"]):
                ctx, sent = entry[0], entry[1]
                extras = list(entry[2]) if len(entry) > 2 else list(default_extras)
                # the real task only sometimes offers more words than blanks
                if n % 4 == 3:
                    extras = []

                frame, answer = parse(sent)
                where = f"{fname} / {pat['target']} / item {n+1}"

                if not (4 <= len(answer) <= 7):
                    problems.append(f"{where}: {len(answer)} blanks (want 4-7)")
                if not (4 <= len(answer) + len(extras) <= 8):
                    problems.append(f"{where}: bank of {len(answer)+len(extras)} (want 4-8)")
                if frame.split().count("_") != len(answer):
                    problems.append(f"{where}: {frame.split().count('_')} blank tokens for {len(answer)} answers")
                if frame.split()[0] == "_":
                    problems.append(f"{where}: opens on a blank, so capitalisation would leak")
                if not ctx.strip() or ctx.strip()[-1] not in ".?!":
                    problems.append(f"{where}: context line must end in . ? or !")
                for w in answer:
                    if w[0].isupper() and w not in PROPER:
                        problems.append(f"{where}: answer word {w!r} is capitalised")
                for x in extras:
                    if x in answer:
                        problems.append(f"{where}: distractor {x!r} duplicates an answer word")
                key = sent.lower()
                if key in seen:
                    problems.append(f"{where}: duplicate sentence")
                seen.add(key)
                # the frame must rebuild the authored sentence exactly
                rebuilt = frame
                for w in answer:
                    rebuilt = rebuilt.replace("_", w, 1)
                if norm(rebuilt) != norm(BRACKET.sub(r"\1", sent)):
                    problems.append(f"{where}: frame does not rebuild the sentence")

                rows.append([pi, SPEAKERS[speaker_n % len(SPEAKERS)], ctx, frame, answer, extras])
                speaker_n += 1

    return patterns, rows, problems


def emit(patterns, rows):
    pj = ",\n".join(json.dumps(p, ensure_ascii=False) for p in patterns)
    rj = ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows)
    block = f"/* BANK:START */\nconst PATTERNS = [\n{pj}\n];\nconst BANK = [\n{rj}\n];\n/* BANK:END */"
    html = HTML.read_text()
    new = re.sub(r"/\* BANK:START \*/.*?/\* BANK:END \*/", lambda _: block, html, flags=re.S)
    HTML.write_text(new)
    (ROOT / "public" / "build-a-sentence-bank.json").write_text(
        json.dumps({"patterns": patterns, "items": rows}, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    patterns, rows, problems = build()
    for p in problems:
        print("  !", p)
    print(f"{len(patterns)} grammar targets, {len(rows)} questions, {len(problems)} problems")
    if problems and "--force" not in sys.argv:
        sys.exit(1)
    emit(patterns, rows)
    counts = {}
    for r in rows:
        counts[r[0]] = counts.get(r[0], 0) + 1
    thin = [patterns[i]["target"] for i, c in counts.items() if c < 15]
    if thin:
        print("thin targets:", thin)
    print("written to", HTML)
