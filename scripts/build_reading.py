#!/usr/bin/env python3
"""
Validate the Reading content and inject it into public/reading-module.html.

Checks enforced (from the calibrated spec):
  Complete the Words  exactly 10 blanks; the visible stem is always
                      word-initial; the first and last sentences carry no
                      blanks; paragraph 70-100 words.
  Read in Daily Life  text 15-150 words; 2-3 questions.
  Academic passage    150-220 words in 4 paragraphs; exactly 5 questions;
                      every highlight span occurs verbatim in the passage;
                      an inference key may not use absolute language
                      (all / always / only / the best / prove); a negative
                      detail stem must say NOT or EXCEPT.
  All questions       four options, a valid key, no duplicate options.
"""
import json, re, sys, importlib.util
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "scripts" / "reading"
HTML = ROOT / "public" / "reading-module.html"

BLANK = re.compile(r"\[([A-Za-z]+)\]([A-Za-z']+)")
WARN = re.compile(r"\b(all|always|only|never|every|the best|prove[ns]?|entirely)\b", re.I)


def words(t):
    return len(re.findall(r"[A-Za-z0-9']+", t))


def sentences(t):
    return [s for s in re.split(r"(?<=[.!?])\s+", t.strip()) if s]


def parse_ctw(text):
    """-> (segments, answers) where a segment is text or a blank spec"""
    segs, answers, pos = [], [], 0
    for m in BLANK.finditer(text):
        segs.append({"t": "text", "v": text[pos:m.start()]})
        segs.append({"t": "blank", "stem": m.group(1), "n": len(m.group(2))})
        answers.append(m.group(2))
        pos = m.end()
    segs.append({"t": "text", "v": text[pos:]})
    return segs, answers


def check_question(q, where, problems, haystack=None):
    if len(q["options"]) != 4:
        problems.append(f"{where}: {len(q['options'])} options")
    if not 0 <= q.get("key", -1) < len(q["options"]):
        problems.append(f"{where}: key out of range")
    if len(set(q["options"])) != len(q["options"]):
        problems.append(f"{where}: duplicate options")
    if q["type"] == "negative detail" and not re.search(r"\bNOT\b|\bEXCEPT\b", q["stem"]):
        problems.append(f"{where}: negative detail stem says neither NOT nor EXCEPT")
    if q["type"] == "inference":
        hit = WARN.search(q["options"][q["key"]])
        if hit:
            problems.append(f"{where}: inference key uses absolute language {hit.group(0)!r}")
    if q.get("highlight") and haystack is not None:
        if q["highlight"] not in haystack:
            problems.append(f"{where}: highlight {q['highlight']!r} not found in passage")


def build():
    spec = importlib.util.spec_from_file_location("content_01", SRC / "content_01.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    problems, out = [], {"ctw": [], "daily": [], "academic": []}

    for item in m.COMPLETE_THE_WORDS:
        where = f"ctw/{item['id']}"
        segs, answers = parse_ctw(item["text"])
        plain = BLANK.sub(lambda mm: mm.group(1) + mm.group(2), item["text"])
        if len(answers) != 10:
            problems.append(f"{where}: {len(answers)} blanks, want 10")
        if not 70 <= words(plain) <= 100:
            problems.append(f"{where}: {words(plain)} words, want 70-100")
        ss = sentences(item["text"])
        if BLANK.search(ss[0]):
            problems.append(f"{where}: first sentence carries a blank")
        if BLANK.search(ss[-1]):
            problems.append(f"{where}: last sentence carries a blank")
        out["ctw"].append({"id": item["id"], "segs": segs, "answers": answers})

    for item in m.DAILY_LIFE:
        where = f"daily/{item['id']}"
        body = " ".join(item["body"])
        if not 15 <= words(body) <= 150:
            problems.append(f"{where}: {words(body)} words, want 15-150")
        if not 2 <= len(item["questions"]) <= 3:
            problems.append(f"{where}: {len(item['questions'])} questions, want 2-3")
        for i, q in enumerate(item["questions"]):
            check_question(q, f"{where} q{i+1}", problems, body)
        out["daily"].append(item)

    for item in m.ACADEMIC:
        where = f"academic/{item['id']}"
        passage = " ".join(item["paragraphs"])
        if not 150 <= words(passage) <= 220:
            problems.append(f"{where}: {words(passage)} words, want 150-220")
        if len(item["paragraphs"]) != 4:
            problems.append(f"{where}: {len(item['paragraphs'])} paragraphs, want 4")
        if len(item["questions"]) != 5:
            problems.append(f"{where}: {len(item['questions'])} questions, want 5")
        for i, q in enumerate(item["questions"]):
            check_question(q, f"{where} q{i+1}", problems, passage)
        out["academic"].append(item)
    return out, problems


def emit(data):
    block = ("/* CONTENT:START */\nconst CONTENT = "
             + json.dumps(data, ensure_ascii=False, indent=1)
             + ";\n/* CONTENT:END */")
    html = HTML.read_text()
    HTML.write_text(re.sub(r"/\* CONTENT:START \*/.*?/\* CONTENT:END \*/",
                           lambda _: block, html, flags=re.S))


if __name__ == "__main__":
    data, problems = build()
    for p in problems:
        print("  !", p)
    print(f"{len(data['ctw'])} Complete the Words, {len(data['daily'])} daily-life texts "
          f"({sum(len(d['questions']) for d in data['daily'])} questions), "
          f"{len(data['academic'])} academic passages "
          f"({sum(len(a['questions']) for a in data['academic'])} questions), "
          f"{len(problems)} problems")
    if problems and "--force" not in sys.argv:
        sys.exit(1)
    if HTML.exists():
        emit(data)
        print("written to", HTML)
    else:
        print("(engine not written yet)")
