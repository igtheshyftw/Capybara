#!/usr/bin/env python3
"""
Assemble the whole writing section into public/writing-section.html:
Build a Sentence, Write an Email and Write for an Academic Discussion.

Both content sets are validated by their own builders first, so the
section can never ship content the standalone pages would reject.
"""
import importlib.util, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "public" / "writing-section.html"
sys.path.insert(0, str(ROOT / "scripts"))


def load(mod):
    spec = importlib.util.spec_from_file_location(mod, ROOT / "scripts" / f"{mod}.py")
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


def main():
    bank = load("build_bank")
    writing = load("build_writing")

    patterns, rows, sent_problems, _ = bank.build()
    wdata, w_problems = writing.build()
    problems = ([f"sentences: {p}" for p in sent_problems]
                + [f"writing: {p}" for p in w_problems])

    for p in problems[:15]:
        print("  !", p)
    hard = sum(r[6] for r in rows)
    print(f"{len(rows)} sentence items ({len(rows)-hard} standard / {hard} hard), "
          f"{len(wdata['emails'])} email prompts, {len(wdata['discussions'])} discussion prompts, "
          f"{len(problems)} problems")
    if problems and "--force" not in sys.argv:
        sys.exit(1)

    pj = ",\n".join(json.dumps(p, ensure_ascii=False) for p in patterns)
    rj = ",\n".join(json.dumps(r, ensure_ascii=False) for r in rows)
    block = ("/* CONTENT:START */\n"
             f"const PATTERNS = [\n{pj}\n];\n"
             f"const BANK = [\n{rj}\n];\n"
             f"const WRITING = {json.dumps(wdata, ensure_ascii=False)};\n"
             "/* CONTENT:END */")
    if not HTML.exists():
        print("(engine not written yet)")
        return
    html = HTML.read_text()
    HTML.write_text(re.sub(r"/\* CONTENT:START \*/.*?/\* CONTENT:END \*/",
                           lambda _: block, html, flags=re.S))
    print("written to", HTML)


if __name__ == "__main__":
    main()
