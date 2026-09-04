"""Recover explanations for the three 42-question Reading tests.

Their answer pages have an unreadable 'N. <letter>' key column, so the normal
line-anchored parse loses many of them. The explanations are blank-line
separated blocks in question order, so we take them in order and use whatever
leading numbers ARE readable as checkpoints to keep the alignment honest.
"""
import re, io, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
OCR = '/tmp/ocr600'
N_Q = 42

DICT = set()
for w in io.open('/usr/share/dict/words', encoding='utf-8', errors='ignore'):
    w = w.strip().lower()
    if w and "'" not in w:
        DICT.add(w)
DICT |= {'a', 'i', 'ok', 'tv', 'bodega', 'bodegas', 'diamante', 'haiku'}

LEAD = ['the', 'a', 'an', 'we', 'he', 'she', 'it', 'is', 'as', 'in', 'of', 'to',
        'all', 'how', 'who', 'what', 'this', 'that', 'you', 'they', 'and', 'but',
        'not', 'so', 'if', 'at', 'on', 'for', 'there', 'their', 'its', 'his',
        'her', 'my', 'your', 'no', 'do', 'does', 'was', 'were', 'are', 'can',
        'when', 'where', 'why', 'which', 'some', 'most', 'both', 'one', 'two']
LEAD.sort(key=len, reverse=True)

def segment(rest):
    if not rest:
        return []
    if len(rest) > 28:
        return None
    for i in range(len(rest), 0, -1):
        head = rest[:i]
        if head in DICT and (len(head) >= 2 or head in ('a', 'i')):
            tail = segment(rest[i:])
            if tail is not None:
                return [head] + tail
    return [rest] if rest in ('a', 'i') else None

def split_merged(tok):
    """Split a run-together token. All viable leads are tried and the
    segmentation with the FEWEST pieces wins: 'Astation' must become
    'A station' (2 pieces), not 'As tat ion' (3), which is what taking the
    first matching lead would give."""
    if tok.lower() in DICT or len(tok) < 3 or not tok.isalpha():
        return None
    low = tok.lower()
    best = None
    for lead in LEAD:
        if low.startswith(lead) and len(low) >= len(lead) + 1:
            tail = segment(low[len(lead):])
            if tail and all(len(t) >= 2 or t in ('a', 'i') for t in tail):
                cand = [tok[:len(lead)]] + tail
                if best is None or len(cand) < len(best):
                    best = cand
    return ' '.join(best) if best else None

def unmerge(s):
    out = []
    for tok in s.split(' '):
        m = re.match(r'^([\("“‘\']*)([A-Za-z]+)([\)\.,;:!?"”’\']*)$', tok)
        if m:
            sp = split_merged(m.group(2))
            if sp:
                tok = m.group(1) + sp + m.group(3)
        out.append(tok)
    return ' '.join(out)

PREFIX = re.compile(r'^\s*(?:[0-9]{1,2}\s*[\.\,\)]?\s*)?'
                    r'(?:[A-Za-z°|_\(\)\-–—\*\.]{1,4}\s+){0,2}')

def strip_prefix(block, key_letter=None):
    """Remove the OCR-mangled 'N. <letter>' prefix.

    Merged words are split first ('Thesixth' -> 'The sixth'), otherwise the
    real opening of the sentence looks like junk and gets cut away with the
    prefix. The key letter, where known, resolves the one genuinely ambiguous
    case: 'A Shack begins ...' (key A) is prefix + sentence, while
    'A station is a place ...' (key B) is the sentence itself.
    """
    t = unmerge(block).strip()

    # 1. drop a leading 'N.' / 'N,' question number
    t = re.sub(r'^\s*\d{1,2}\s*[\.\,\)]\s*', '', t)

    # 2. drop the key letter when it stands alone at the front
    # tolerate OCR debris before the key letter: '13° ‘D A very ...', '2%. B "..."'
    if key_letter:
        pat = rf'^[^A-Za-z]{{0,6}}{key_letter}(?![A-Za-z])[^A-Za-z]*\s+(?=\S)'
        if re.match(pat + r'\S', t) or re.match(pat, t):
            t = re.sub(pat, '', t, count=1)

    # 3. cut to the first capitalised dictionary word that is itself followed
    #    by a dictionary word - but only if it sits near the very start, so a
    #    real sentence is never truncated mid-way
    toks = t.split()
    words = [re.sub(r"[^A-Za-z]", '', x).lower() for x in toks]
    pos = 0
    for i, tok in enumerate(toks):
        w, nxt = words[i], (words[i + 1] if i + 1 < len(words) else '')
        at = t.find(tok, pos)
        if at > 18:
            break
        # test the case of the first LETTER, not the first character, so a
        # word opening with a curly quote ("Hard") is still seen as capitalised
        alpha = re.search(r'[A-Za-z]', tok)
        cap = bool(alpha and alpha.group().isupper())
        if len(w) >= 3 and w in DICT and cap and (not nxt or nxt in DICT):
            while at > 0 and t[at - 1] in '“"\'‘':
                at -= 1
            return t[at:].strip()
        pos = at + len(tok)
    return t.strip()

DROP_LINE = re.compile(
    r'^(ANSWERS|Reading\s*[-—]\s*\w+|MAP\s*\d?\s*[-—]\s*\w+|Test \d+|\d{1,3})$', re.I)
RANGES = {147: range(161, 165), 165: range(179, 183), 183: range(197, 202)}
KEYS = {int(k): v.split() for k, v in
        json.load(io.open(f'{HERE}/keys.json', encoding='utf-8')).items() if k.isdigit()}

JUNK = re.compile(r'^[A-Za-z°|_\(\)\-–—\*\.]{1,4}$')

def polish(text, key_letter):
    """Final prefix cleanup, using the hand-verified key letter to resolve the
    genuinely ambiguous case: 'A Shack begins ...' is the key letter A followed
    by the explanation, while 'A station is a place ...' (key B) is the
    explanation itself starting with the article."""
    t = text.strip()
    if key_letter and re.match(rf'^{key_letter}\s+\S', t):
        t = t[len(key_letter):].strip()
    # drop up to three leading junk tokens if a real word follows
    for _ in range(3):
        toks = t.split()
        if len(toks) < 2:
            break
        head = re.sub(r'[^A-Za-z]', '', toks[0]).lower()
        if JUNK.match(toks[0]) and head not in DICT:
            t = ' '.join(toks[1:])
        else:
            break
    return t.strip()

def blocks_for(pages):
    lines = []
    for p in pages:
        f = f'{OCR}/p{p:03d}.txt'
        if not os.path.exists(f):
            continue
        for l in io.open(f, encoding='utf-8', errors='replace').read().split('\n'):
            s = l.strip()
            if not DROP_LINE.match(s):
                lines.append(s)
        lines.append('')
    out, cur = [], []
    for s in lines:
        if s:
            cur.append(s)
        elif cur:
            out.append(' '.join(cur)); cur = []
    if cur:
        out.append(' '.join(cur))
    return [b for b in out if len(b) > 20]

result, report = {}, {}
for start, pages in RANGES.items():
    blks = blocks_for(pages)
    assigned, last, checkpoints = {}, 0, 0
    for b in blks:
        m = re.match(r'^\s*(\d{1,2})\s*[\.\,\)]', b)
        n = int(m.group(1)) if m else None
        if n is not None and 1 <= n <= N_Q and n >= last:
            checkpoints += 1                 # a readable number re-anchors us
        else:
            n = last + 1
        if n > N_Q:
            continue
        kl = KEYS.get(start, [])
        text = strip_prefix(b, kl[n - 1] if 1 <= n <= len(kl) else None)
        if n in assigned:
            assigned[n] = (assigned[n] + ' ' + text).strip()   # continuation
        else:
            assigned[n] = text
            last = n
    result[str(start)] = {str(k): v for k, v in sorted(assigned.items())}
    report[start] = (len(assigned), checkpoints, len(blks))

io.open(f'{HERE}/recovered_expl.json', 'w', encoding='utf-8').write(
    json.dumps(result, indent=1, ensure_ascii=False))

for start, (n, cp, nb) in report.items():
    print(f'p{start}: {n}/{N_Q} explanations from {nb} blocks, {cp} readable-number checkpoints')

# flag anything that still looks like it carries OCR junk
print()
for start in RANGES:
    for n, t in sorted(result[str(start)].items(), key=lambda x: int(x[0])):
        first = t.split()[0] if t.split() else ''
        clean = re.sub(r'[^A-Za-z]', '', first).lower()
        if not (t[:1].isupper() or t[:1] in '“"‘') or (len(clean) <= 2 and clean not in DICT):
            print(f'  SUSPECT p{start} #{n}: {t[:90]}')
print('\n=== p183 first 10 ===')
for i in range(1, 11):
    print(f"  {i:2d}. {result['183'].get(str(i), '(missing)')[:110]}")
