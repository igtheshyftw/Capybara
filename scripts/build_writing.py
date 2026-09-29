#!/usr/bin/env python3
"""
Validate the writing prompts and inject them into public/writing-tasks.html.

Write an Email      3-4 bullets, each tagged with one of the task's four
                    functions; scenario 25-90 words; a band-5 model of
                    80-140 words that opens with a greeting and ends with a
                    sign-off, and that actually contains cues for every
                    bullet function it claims to answer.
Academic Discussion a professor question of 30-60 words; exactly two student
                    posts of 20-60 words; a model of at least 100 words that
                    names at least one classmate and states a position.
"""
import json, re, sys, importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "writing"
HTML = ROOT / "public" / "writing-tasks.html"

FUNCTIONS = {"purpose", "request", "details", "thanks"}
CUES = {
  "purpose": ["because", "since", "interested", "reason", "i am writing", "i would like to",
              "writing about", "writing to", "hoping"],
  "request": ["could", "would it be possible", "please", "may i", "i would like to know",
              "whether", "can you", "would you"],
  "details": [],
  "thanks":  ["thank", "thanks", "grateful", "appreciate"],
}
GREETING = re.compile(r"^\s*(dear|hi|hello|good morning|good afternoon)\b", re.I)
SIGNOFF = re.compile(r"\b(sincerely|regards|best wishes|best,|yours|thanks,|thank you,)", re.I)
OPINION = re.compile(r"\b(i think|i believe|in my view|i would|i agree|i disagree|my view|"
                     r"i lean|i am convinced|i find|seems to me)\b", re.I)
SUPPORT = re.compile(r"\b(because|since|for example|for instance|in practice|one reason|this is why|which is why|so that|therefore|as a result|the result|given that|after all|evidence|research|studies|study|data|found that|shows that|suggests|my own)\b", re.I)


def words(t):
    return len(re.findall(r"\S+", t))


def load(name, attr):
    bag = []
    for f in sorted(SRC.glob(name)):
        spec = importlib.util.spec_from_file_location(f.stem, f)
        m = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(m)
        bag.extend(getattr(m, attr, []))
    return bag


def build():
    emails = load("emails_*.py", "EMAILS")
    discussions = load("discussions_*.py", "DISCUSSIONS")
    problems, ids = [], set()

    for e in emails:
        w = f"email/{e['id']}"
        if e["id"] in ids:
            problems.append(f"duplicate id {e['id']!r}")
        ids.add(e["id"])
        if not 3 <= len(e["bullets"]) <= 4:
            problems.append(f"{w}: {len(e['bullets'])} bullets, want 3-4")
        for fn, _ in e["bullets"]:
            if fn not in FUNCTIONS:
                problems.append(f"{w}: unknown bullet function {fn!r}")
        if not 25 <= words(e["scenario"]) <= 90:
            problems.append(f"{w}: scenario {words(e['scenario'])} words, want 25-90")
        if not 80 <= words(e["model"]) <= 140:
            problems.append(f"{w}: model {words(e['model'])} words, want 80-140")
        if not GREETING.search(e["model"]):
            problems.append(f"{w}: model has no greeting")
        if not SIGNOFF.search(e["model"]):
            problems.append(f"{w}: model has no sign-off")
        if len(e.get("topic", [])) < 3:
            problems.append(f"{w}: needs at least 3 topic words for the detail check")
        low = e["model"].lower()
        for fn, text in e["bullets"]:
            if CUES[fn] and not any(c in low for c in CUES[fn]):
                problems.append(f"{w}: model shows no {fn} cue, so the check would fail its own model")

    for d in discussions:
        w = f"discussion/{d['id']}"
        if d["id"] in ids:
            problems.append(f"duplicate id {d['id']!r}")
        ids.add(d["id"])
        if not 30 <= words(d["question"]) <= 60:
            problems.append(f"{w}: question {words(d['question'])} words, want 30-60")
        if len(d["students"]) != 2:
            problems.append(f"{w}: {len(d['students'])} student posts, want 2")
        for name, text in d["students"]:
            if not 20 <= words(text) <= 60:
                problems.append(f"{w}: {name}'s post {words(text)} words, want 20-60")
        if words(d["model"]) < 100:
            problems.append(f"{w}: model {words(d['model'])} words, want 100 or more")
        low = d["model"].lower()
        if not any(n.lower() in low for n, _ in d["students"]):
            problems.append(f"{w}: model names neither classmate")
        if not OPINION.search(d["model"]):
            problems.append(f"{w}: model states no position")
        if not SUPPORT.search(d["model"]):
            problems.append(f"{w}: model gives no signalled reason or evidence")

    return {"emails": emails, "discussions": discussions, "cues": CUES}, problems


def emit(data):
    block = ("/* CONTENT:START */\nconst CONTENT = "
             + json.dumps(data, ensure_ascii=False, indent=1) + ";\n/* CONTENT:END */")
    html = HTML.read_text()
    HTML.write_text(re.sub(r"/\* CONTENT:START \*/.*?/\* CONTENT:END \*/",
                           lambda _: block, html, flags=re.S))


if __name__ == "__main__":
    data, problems = build()
    for p in problems:
        print("  !", p)
    print(f"{len(data['emails'])} email prompts, {len(data['discussions'])} discussion prompts, "
          f"{len(problems)} problems")
    if problems and "--force" not in sys.argv:
        sys.exit(1)
    if HTML.exists():
        emit(data)
        print("written to", HTML)
    else:
        print("(engine not written yet)")
