"""Parse the OCR'd 'Book of MAP Growth Reading' into structured items.

Document shape:
  <quiz start page>  header, 'Directions:', then stimuli + numbered questions
  ...continuation pages...
  <ANSWERS page>     'N. <letter> <explanation>' lines
  <next quiz start>

Emits parsed.json plus a diagnostics report of everything that did not parse
cleanly, so the failures can be inspected rather than silently dropped.
"""
import re, json, glob, io, os, sys
from collections import defaultdict

# Question pages come from the gap-aware OCR, which restores the underscore
# blanks tesseract drops. Answer pages come from the plain OCR: their key
# column is a wide layout gap, which the gap detector would wrongly read as a
# fill-in-the-blank ('1. C ______ A joke is a cause ...').
QOCR = '/tmp/ocrgap'
AOCR = '/tmp/ocr600'
OUT = os.path.dirname(os.path.abspath(__file__))

def load(d):
    out = {}
    for f in sorted(glob.glob(f'{d}/p*.txt')):
        n = int(re.search(r'p(\d+)', f).group(1))
        out[n] = io.open(f, encoding='utf-8', errors='replace').read()
    return out

qpages = load(QOCR)
pages = load(AOCR)          # used for structure detection and answer parsing

# ----------------------------------------------------------------- cleaning
HEADER_PAT = re.compile(
    r'^(Reading Questions for the MAP Exam|4th? Grade|\d+ Questions?|Quiz \d+|'
    r'Directions:|Test \d+|©|\W*$)', re.I)
# Two intro styles appear in this book:
#   'Read the passage:'                                  (the quizzes)
#   'Read the following poem to answer questions 35 and 36.'  (the 42-q tests)
STIMULUS_PAT = re.compile(
    r'^(?:Read|Study|Look at|Use)\s+the\s+(?:following\s+)?'
    r'([A-Za-z][A-Za-z \-]{1,40}?)'
    r'(?:\s+to\s+answer\s+questions?[^.:]*)?'
    r'\s*[:.]\s*(.*)$', re.I)
QNUM_PAT = re.compile(r'^(\d{1,2})[\.\)]\s*(.*)$')
OPT_PAT = re.compile(r'^([A-D])[\.\)]\s*(.*)$')

def clean_lines(text, page_no):
    out = []
    for raw in text.split('\n'):
        l = raw.rstrip()
        s = l.strip()
        if not s:
            out.append('')
            continue
        # drop the page-number footer (a bare number close to the page index)
        if re.fullmatch(r'\d{1,3}', s) and abs(int(s) - page_no) <= 3:
            continue
        if re.fullmatch(r'(?i)(ANSWERS|Reading Questions for the MAP Exam.?®?|'
                        r'4th? Grade|\d+ Questions?|Qu[il1]z \d+|Test \d+|'
                        r'MAP ?\d? ?[-—] ?\w+|Directions:.*|©.*|\W{0,4})', s):
            continue
        if re.match(r'^Directions:', s, re.I):
            continue
        # section title lines like 'Literature - Basic'
        if re.fullmatch(r'(?i)(Foundational Skills and Vocabulary|Informational Text|'
                        r'Literature|Reading)\s*[-—]\s*(Basic|Proficient|Advanced)', s):
            continue
        out.append(l)
    return out

# --------------------------------------------------------- document blocks
starts = sorted(p for p, t in pages.items()
                if re.search(r'Questions for the MAP Exam', t[:400], re.I))
answers = sorted(p for p, t in pages.items()
                 if re.match(r'\s*ANSWERS', t[:200], re.I))

blocks = []
for i, sp in enumerate(starts):
    end = starts[i + 1] if i + 1 < len(starts) else max(pages) + 1
    ap = next((a for a in answers if sp < a < end), None)
    if ap is None:
        print(f'WARN: no answer page for quiz starting p{sp}', file=sys.stderr)
        continue
    head = pages[sp][:500]
    m = re.search(r'(Foundational Skills and Vocabulary|Informational Text|Literature|Reading)'
                  r'\s*[-—]\s*(Basic|Proficient|Advanced)', head, re.I)
    qm = re.search(r'Qu[il1]z\s*(\d+)', head, re.I)
    blocks.append({
        'qpages': list(range(sp, ap)),
        'apages': list(range(ap, end)),
        'domain': m.group(1).strip() if m else 'Unknown',
        'band': m.group(2).capitalize() if m else 'Unknown',
        'quiz': int(qm.group(1)) if qm else 1,
        'startPage': sp, 'answerPage': ap,
    })

# ------------------------------------------------------------ question side
def parse_questions(block):
    lines = []
    for p in block['qpages']:
        lines += clean_lines(qpages.get(p, pages[p]), p) + ['']

    # An option line is 'A. text', but the OCR also produces 'C5' and 'D.6'
    # (separator eaten). We only accept a letter that is the NEXT one expected
    # in the A-B-C-D run, which makes the loose form safe: a wrapped stem line
    # beginning with a capital letter cannot be mistaken for an option unless
    # it happens to be exactly the letter due next AND is punctuated or
    # followed immediately by a digit.
    def opt_match(s, expected):
        if not expected:
            return None
        m = re.match(r'^([A-D])([\.\)\:])\s*(.*)$', s)
        if m and m.group(1) == expected:
            return m.group(3)
        m = re.match(r'^([A-D])(?=\d)\s*(.*)$', s)      # 'C5'
        if m and m.group(1) == expected:
            return m.group(2)
        return None

    # A numbered line only starts a question if an 'A.' option appears before
    # the next numbered line. Poems in this bank have numbered lines, and this
    # is what tells '3. The nature of the rain ...' (a question) apart from
    # '3. Stopping kids at play' (line three of a poem).
    def starts_question(idx):
        for k in range(idx + 1, min(idx + 40, len(lines))):
            t = lines[k].strip()
            if not t:
                continue
            if QNUM_PAT.match(t) and not re.match(r'^[A-D][\.\)]', t):
                return False
            if STIMULUS_PAT.match(t) and len(t) < 90:
                return False
            if re.match(r'^A[\.\)\:]', t) or re.match(r'^A(?=\d)', t):
                return True
        return False

    qs, cur = [], None
    stim_kind, stim_buf, pending_stim = None, [], None

    def flush_stim():
        nonlocal stim_kind, stim_buf, pending_stim
        if stim_kind is not None:
            txt = '\n'.join(x.strip() for x in stim_buf if x.strip()).strip()
            pending_stim = {'kind': stim_kind, 'text': txt} if txt else None
        stim_kind, stim_buf = None, []

    def expected_of(q):
        return 'ABCD'[len(q['order'])] if len(q['order']) < 4 else None

    for idx, line in enumerate(lines):
        s = line.strip()
        if not s:
            continue
        sm = STIMULUS_PAT.match(s)
        qm = QNUM_PAT.match(s)

        if sm and len(s) < 90 and not (cur and opt_match(s, expected_of(cur))):
            flush_stim()
            if cur:
                qs.append(cur); cur = None
            stim_kind = sm.group(1).strip().lower()
            stim_buf = [sm.group(2)] if sm.group(2).strip() else []
            continue

        if qm and starts_question(idx):
            flush_stim()
            if cur: qs.append(cur)
            cur = {'n': int(qm.group(1)), 'stem': [qm.group(2)], 'options': {},
                   'order': [], 'stimulus': pending_stim}
            continue

        if stim_kind is not None:
            stim_buf.append(s)
            continue
        if cur is None:
            continue

        got = opt_match(s, expected_of(cur))
        if got is not None:
            letter = 'ABCD'[len(cur['order'])]
            cur['options'][letter] = [got]
            cur['order'].append(letter)
        elif cur['order']:
            cur['options'][cur['order'][-1]].append(s)   # option wrapped
        else:
            cur['stem'].append(s)                        # stem wrapped

    if cur: qs.append(cur)

    for q in qs:
        q['stem'] = re.sub(r'\s+', ' ', ' '.join(q['stem'])).strip()
        q['options'] = {k: re.sub(r'\s+', ' ', ' '.join(v)).strip()
                        for k, v in q['options'].items()}
    return qs

# -------------------------------------------------------------- answer side
# NB: '\b' cannot be used after the letter — '_' is a word character, and the
# OCR frequently renders the key as "2. D_ The opposite ...", which would then
# fail to match. A negative lookahead for a letter is both correct here and
# stops an explanation like "3. Chateau comes from ..." being read as key "C".
ANS_LINE = re.compile(r'^(\d{1,2})\s*[\.\,\)]?\s*[°"\'\.]*\s*([A-D])(?![A-Za-z])[_\.\-\s]*(.*)$')

def parse_answers(block):
    lines = []
    for p in block['apages']:
        lines += clean_lines(pages[p], p) + ['']
    out, cur = {}, None
    for line in lines:
        s = line.strip()
        if not s:
            continue
        m = ANS_LINE.match(s)
        if m:
            cur = int(m.group(1))
            out[cur] = {'letter': m.group(2), 'expl': [m.group(3)]}
        elif cur is not None:
            out[cur]['expl'].append(s)
    for k, v in out.items():
        v['expl'] = re.sub(r'\s+', ' ', ' '.join(v['expl'])).strip()
    return out

# ------------------------------------------------------------------- run it
items, problems = [], defaultdict(list)
for b in blocks:
    qs = parse_questions(b)
    ans = parse_answers(b)
    label = f"{b['domain']} - {b['band']} Q{b['quiz']} (p{b['startPage']})"
    b['nq'], b['na'] = len(qs), len(ans)
    for q in qs:
        ref = f"{label} #{q['n']}"
        a = ans.get(q['n'])
        rec = {
            'domain': b['domain'], 'band': b['band'], 'quiz': b['quiz'],
            'startPage': b['startPage'], 'n': q['n'],
            'stem': q['stem'], 'options': q['options'], 'optionOrder': q['order'],
            'stimulus': q['stimulus'],
            'answerLetter': a['letter'] if a else None,
            'explanation': a['expl'] if a else '',
            'ref': ref,
        }
        if len(q['options']) != 4:
            problems['option_count'].append(f"{ref}: {len(q['options'])} options")
        if not a:
            problems['no_answer'].append(ref)
        elif a['letter'] not in q['options']:
            problems['answer_letter_missing'].append(f"{ref}: letter {a['letter']}")
        if not q['stem']:
            problems['empty_stem'].append(ref)
        if a and not a['expl']:
            problems['no_explanation'].append(ref)
        items.append(rec)

json.dump({'blocks': blocks, 'items': items, 'problems': problems},
          io.open(f'{OUT}/parsed.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

print(f'blocks: {len(blocks)}   items parsed: {len(items)}')
print(f'{"section":52s} {"q":>4s} {"a":>4s}')
for b in blocks:
    flag = '' if b['nq'] == b['na'] else '   <-- mismatch'
    print(f"  {b['domain'][:28]+' - '+b['band']:50s} {b['nq']:4d} {b['na']:4d}{flag}")
print()
for k, v in sorted(problems.items()):
    print(f'{k}: {len(v)}')
    for x in v[:8]:
        print('   ', x)
