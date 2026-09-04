"""Turn parsed.json into tools/bank.json for the adaptive engine.

Responsibilities, in order:
  1. repair OCR damage (merged words, merged option lines)
  2. apply the hand-verified answer keys for the three 42-question tests
  3. drop items that cannot work as text (visual stimuli, unreadable options)
  4. infer domain, skill and provisional difficulty (spec §2 and §23)
  5. emit bank.json plus a report of everything dropped and why
"""
import json, re, io, os, sys
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = '/home/user/Capybara'

parsed = json.load(io.open(f'{HERE}/parsed.json', encoding='utf-8'))
KEYS = json.load(io.open(f'{HERE}/keys.json', encoding='utf-8'))
KEYS = {int(k): v.split() for k, v in KEYS.items() if k.isdigit()}
# explanations recovered by block order for the three 42-question tests, whose
# answer pages have an OCR-unreadable key column
RECOVERED = {int(k): {int(n): t for n, t in v.items()}
             for k, v in json.load(io.open(f'{HERE}/recovered_expl.json',
                                           encoding='utf-8')).items()}

# ======================================================== OCR text repair ==
DICT = set()
for w in io.open('/usr/share/dict/words', encoding='utf-8', errors='ignore'):
    w = w.strip().lower()
    if w and "'" not in w:
        DICT.add(w)
DICT |= {'a', 'i', 'ok', 'tv', 'us', 'bodega', 'bodegas', 'wigwam', 'tepee',
         'haiku', 'diamante', 'telson', 'scorpion', 'scorpions'}

# Merges only ever happen where a short function word ran into the next word,
# so we only split tokens that BEGIN with one. That keeps proper nouns such as
# 'Petertown' intact, which a general word-splitter would wreck.
LEAD = ['the', 'a', 'an', 'we', 'he', 'she', 'it', 'is', 'as', 'in', 'of', 'to',
        'all', 'how', 'who', 'what', 'this', 'that', 'you', 'they', 'and', 'but',
        'not', 'so', 'if', 'at', 'on', 'for', 'there', 'their', 'its', 'his',
        'her', 'my', 'your', 'no', 'do', 'does', 'was', 'were', 'are', 'can',
        'when', 'where', 'why', 'which', 'some', 'most', 'both', 'one', 'two']
LEAD.sort(key=len, reverse=True)

def segment(rest):
    """Split `rest` into dictionary words; return list or None."""
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
    if rest in ('a', 'i'):
        return [rest]
    return None

_split_cache = {}
def split_merged(tok):
    core = tok
    if core.lower() in DICT or len(core) < 3 or not core.isalpha():
        return None
    if core in _split_cache:
        return _split_cache[core]
    low = core.lower()
    best = None
    for lead in LEAD:
        if low.startswith(lead) and len(low) >= len(lead) + 1:
            tail = segment(low[len(lead):])
            if tail and all(len(t) >= 2 or t in ('a', 'i') for t in tail):
                # fewest pieces wins: 'Astation' -> 'A station', not 'As tat ion'
                cand = [core[:len(lead)]] + tail            # keep original case
                if best is None or len(cand) < len(best):
                    best = cand
    out = ' '.join(best) if best else None
    _split_cache[core] = out
    return out

FIXES = [
    # The gap detector fires on the wide space after a question number, so a
    # stem can arrive as '______ Why does Emily ...'. A blank at the very
    # start or end of a stem is never a real cloze gap.
    (r'^\s*_{2,}\s*', ''),
    (r'\s*_{2,}\s*$', ''),
    # OCR debris where an underscore run half-survived: '_—_—«s', '___—_—s'
    (r'[_\u2014\u2013\u00ab\u00bb\s]{4,}(?=[a-z])', ' ______ '),
    (r'_{2,}', '______'),
    # a stray vertical bar at the very start of a line is a scan margin mark
    (r'^\s*\|\s*', ''),
    # elsewhere a lone '|' is the pronoun 'I' misread
    (r'(?<=\s)\|(?=\s)', 'I'),
    (r'^\|(?=\s)', 'I'),
    (r'\bH20\b', 'H2O'),
    (r'/iterally', 'literally'),
    (r'\bIiterally\b', 'literally'),
    (r'(?<=\w)—(?=\w)', '—'),
    (r'\s+([,.;:!?])', r'\1'),
    (r'\s{2,}', ' '),
]

def fix_text(s):
    if not s:
        return ''
    s = str(s)
    for pat, rep in FIXES:
        s = re.sub(pat, rep, s)
    out = []
    for tok in s.split(' '):
        m = re.match(r'^([\("“‘\']*)([A-Za-z]+)([\)\.,;:!?"”’\']*)$', tok)
        if m:
            sp = split_merged(m.group(2))
            if sp:
                tok = m.group(1) + sp + m.group(3)
        out.append(tok)
    return re.sub(r'\s{2,}', ' ', ' '.join(out)).strip()

# =================================================== merged-option repair ==
# The OCR frequently runs options together: 'B. in Cc. im D. ir'. Letter
# variants seen in this scan: C -> C Cc c G € ¢ ( ; D -> D 0 D,
CMARK = re.compile(r'\s+(?:C|Cc|c|G|€|¢|\(C)\s*[\.,\)]+\s*')
DMARK = re.compile(r'\s+(?:D|0|D)\s*[\.,\)]+\s*')

def repair_options(opts, order):
    """Try to recover 4 options when C/D were swallowed into an earlier line."""
    if len(opts) >= 4:
        return opts
    o = dict(opts)
    if not order:
        return o
    last = order[-1]
    text = o.get(last, '')
    # split trailing 'D.' first, then 'C.'
    if 'D' not in o:
        m = DMARK.search(text)
        if m:
            o['D'] = text[m.end():].strip()
            text = text[:m.start()].strip()
    if 'C' not in o:
        m = CMARK.search(text)
        if m:
            o['C'] = text[m.end():].strip()
            text = text[:m.start()].strip()
    o[last] = text
    # a trailing 'Read the ...' block belongs to the next question's stimulus
    for k in list(o):
        o[k] = re.split(r'\s+Read (?:the|this|and) ', o[k])[0].strip()
    return o

# ============================================ classification and difficulty ==
VISUAL_KIND = re.compile(
    r'chart|table|timetable|map|graph|label|poster|ticket|graphic|diagram|picture', re.I)
VISUAL_STEM = re.compile(
    r'\b(?:the|this|following|accompanying)\s+(?:map|chart|graph|table|timetable|'
    r'poster|diagram|label|ticket|picture|graphic|pie chart)\b|'
    r'\bwhich (?:letter|shape) on the\b|\bbased on the (?:chart|map|graph|table)\b', re.I)

SKILLS = [
    ('Word structure: prefixes, suffixes and roots',
     r'\b(prefix\w*|suffix\w*|affix\w*|root word|the root of|word part|'
     r'made into its opposite by prefixing|becomes its opposite)\b|'
     r'\bwhich (?:prefix|suffix)\b|“-?[a-z]{1,4}”\s*(?:means|is)'),
    ('Phonics and word sounds',
     r'/[a-z:ĭəʊ]+/|\b(rhymes? with|does not rhyme|syllables?|stressed on|'
     r'vowel sound|digraph|trigraph|silent letter|silent [a-z]\b|same sound|'
     r'begins with the|ends with|consonant blend|divide the syllables)\b'),
    ('Vocabulary in context',
     r'\b(most nearly means?|probably means?|what does .{1,45} mean|'
     r'correct definition|definition of|as it is used|can best replace|'
     r'which word means|could replace|words? could replace|means? “|'
     r'in this (?:passage|story|sentence|text)\b.{0,30}\bword\b)'),
    ('Word relationships and shades of meaning',
     r'\b(odd one out|opposite of|most nearly opposite|synonym|antonym|'
     r'does not belong|is not (?:a|an|part of)|which one is not|'
     r'NOT an? (?:opposite|example)|could NOT replace|all of the following.{0,30}EXCEPT)\b'),
    # NB: a fill-in-the-blank '______' is a question FORMAT, not a skill - most
    # blanks in this book test vocabulary. Only the explicit phrasing counts.
    ('Grammar and parts of speech',
     r'\b(in which sentence is|is “?\w+”? (?:a|an) (?:verb|noun|adjective|adverb)|'
     r'which sentence is (?:INCORRECT|correct)|part of speech|used as a verb|'
     r'used as a noun|adverb it follows)\b'),
    ('Word choice and sentence completion',
     r'\b(completes the sentence|best completes|which word completes|'
     r'word best fits)\b'),
    ('Main idea, theme and summary',
     r'\b(main idea|best title|what is (?:this|the) (?:story|passage|poem) about|'
     r'central (?:idea|message)|summar\w+|theme of|primarily about|mainly about|'
     r'best summ\w+|sums up|what is the passage about)\b'),
    ('Inference and drawing conclusions',
     r'\b(infer\w*|we can (?:guess|tell|conclude|say|assume)|most likely|probably|'
     r'suggests?\b|conclusion can you draw|conclude|implied|implies|impl(?:y|ies)|'
     r'we know that|can we tell|likely (?:feel|TRUE)|statement is (?:likely )?TRUE)\b'),
    ("Author's purpose, tone and point of view",
     r'\b(author.{0,3}s (?:purpose|use|feeling|view|intent|attitude)|point of view|'
     r'\btone\b|how does the (?:author|narrator|speaker) feel|why did the author|'
     r'why does the author|aimed at|persuade|narrator|serves to|'
     r'who is telling the story|whose perspective|which perspective|'
     r'the (?:story|passage) is told (?:from|by))\b'),
    ('Figurative and descriptive language',
     r'\b(personif\w+|metaphor|simile|figurative|literal\w*|imagery|'
     r'proverb|idiom|verbal picture|what does .{1,40} mean\b.{0,25}(?:poem|line))\b'),
    ('Character, setting and plot',
     r'\b(character|where (?:does|is) the (?:story|passage)|take place|setting|'
     r'who is the (?:speaker|narrator)|how does .{1,25} feel|what happens|'
     r'MOST likely set|what was .{1,20} doing)\b'),
    ('Text structure and organisation',
     r'\b(text structure|organi[sz]ation|organi[sz]ed|chronological|sequence|'
     r'which line|rhyme scheme|stanza|order of|structure of|first line|last line|'
     r'which stanza|(?:is )?(?:not necessary|unnecessary) to the text|'
     r'sentence is unnecessary|alphabetical order|which part suggests)\b'),
    ('Text evidence and detail',
     r'\b(according to the (?:passage|text|story)|the passage says|which detail|'
     r'evidence|supports? the (?:claim|idea)|how many|how much|what is the|'
     r'which choice shows|which line shows)\b'),
]
SKILLS = [(n, re.compile(p, re.I)) for n, p in SKILLS]

LITERARY = {'poem', 'story', 'haiku by natsume soseki'}
VOCAB_SKILLS = {'Word structure: prefixes, suffixes and roots',
                'Phonics and word sounds',
                'Vocabulary in context',
                'Word relationships and shades of meaning',
                'Word choice and sentence completion',
                'Grammar and parts of speech'}

def classify_skill(stem, stim_kind):
    for name, pat in SKILLS:
        if pat.search(stem):
            return name
    return 'General comprehension'

def classify_domain(section, skill, stim_kind):
    """The three section-based domains are used as-is. Items from the mixed
    42-question 'Reading' tests carry no section domain, so they are assigned
    by stimulus type and skill — inference the spec explicitly allows (§2)."""
    if section != 'Reading':
        return {'Foundational Skills and Vocabulary': 'Foundational Skills & Vocabulary',
                'Informational Text': 'Informational Text',
                'Literature': 'Literature'}[section]
    if stim_kind in LITERARY:
        return 'Literature'
    if skill in VOCAB_SKILLS and not stim_kind:
        return 'Foundational Skills & Vocabulary'
    if stim_kind in ('passage', 'text'):
        return 'Informational Text'
    return 'Foundational Skills & Vocabulary' if skill in VOCAB_SKILLS else 'Informational Text'

BAND = {'Basic': (190, 180, 198), 'Proficient': (202, 196, 210), 'Advanced': (213, 206, 226)}

def difficulty(item, stem, options, passage):
    """Provisional difficulty. Anchored on the book's own Basic / Proficient /
    Advanced banding, then nudged within the band by surface complexity.
    These are NOT calibrations (spec §23)."""
    base, lo, hi = BAND.get(item['band'], (202, 196, 210))
    d = float(base)
    words = len(stem.split())
    d += max(-4, min(5, (words - 13) * 0.30))
    avg_opt = sum(len(o.split()) for o in options.values()) / max(1, len(options))
    d += max(-3, min(5, (avg_opt - 4) * 0.55))
    hard_words = sum(1 for w in re.findall(r'[A-Za-z]{9,}', stem))
    d += min(4, hard_words * 1.2)
    if re.search(r'\b(infer|conclude|implied|implies|most likely|author.{0,3}s purpose|'
                 r'point of view|theme|summar|personif|metaphor|figurative)\b', stem, re.I):
        d += 3.0
    if re.search(r'\b(NOT|LEAST|EXCEPT|WORST)\b', stem):
        d += 1.5                      # negative stems are reliably harder
    if passage:
        d += min(3.0, len(passage.split()) / 90.0)
    return int(round(max(lo, min(hi, d))))

TIPS = {
    'Word structure: prefixes, suffixes and roots':
        'Break the word into parts. The root carries the core meaning; a prefix in front changes it '
        '(un-, dis-, il-, mis-) and a suffix on the end usually changes the word’s job in the sentence.',
    'Phonics and word sounds':
        'Say the word out loud and listen, rather than looking at the spelling. English often spells '
        'the same sound several ways, and the same letters several sounds.',
    'Vocabulary in context':
        'Read the whole sentence, not just the word. The words around an unfamiliar word are clues, '
        'and the meaning has to fit the sentence you were actually given.',
    'Word relationships and shades of meaning':
        'Check each choice against the exact relationship the question asks for. Words can be close in '
        'meaning yet still differ in strength, cause, or how they are used.',
    'Main idea, theme and summary':
        'The main idea covers the whole text, not one interesting detail. Ask: what would I lose if I '
        'removed this? If the text still makes sense without it, it is a detail.',
    'Inference and drawing conclusions':
        'An inference must be supported by something written in the text. Find the line that backs your '
        'answer — if you cannot point to it, it is a guess, not an inference.',
    "Author's purpose, tone and point of view":
        'Look at the words the author chose. Word choice shows how the author feels and what they want '
        'the reader to think, even when they never say it directly.',
    'Figurative and descriptive language':
        'Ask whether the words are literally true. If they are not, the author is creating a picture — '
        'work out what the comparison is showing you.',
    'Character, setting and plot':
        'Characters and places are shown by details rather than stated. Collect the small clues — what '
        'people do, say and notice — and see what they add up to.',
    'Text structure and organisation':
        'Notice how the text is arranged: time order, problem and solution, or compare and contrast. '
        'The structure is a clue to what the author thinks is important.',
    'Text evidence and detail':
        'Go back and find the exact line that answers the question. Reading from memory is where most '
        'detail questions are lost.',
    'Word choice and sentence completion':
        'Read the whole sentence with each choice in the gap and listen to how it sounds. The right word '
        'has to fit the meaning AND the grammar of the sentence around it.',
    'Grammar and parts of speech':
        'A word\u2019s part of speech comes from the job it does in that sentence, not from the word itself. '
        'The same word can be a noun in one sentence and a verb in the next.',
    'General comprehension':
        'Reread the question, then check every choice against the text. The best answer is the one the '
        'text supports fully, not the one that merely sounds right.',
}

# ================================================================== build ==
items, dropped, passages = [], [], {}
pass_ids, seen_fp = {}, {}
counts = Counter()

for it in parsed['items']:
    ref = it['ref']
    section = it['domain']
    stem = fix_text(it['stem'])
    opts = repair_options(it['options'], it['optionOrder'])
    opts = {k: fix_text(v) for k, v in opts.items() if fix_text(v)}

    letter = it['answerLetter']
    kb = KEYS.get(it['startPage'])
    if kb and 1 <= it['n'] <= len(kb):
        letter = kb[it['n'] - 1]          # hand-verified key wins

    stim = it['stimulus'] or {}
    kind = (stim.get('kind') or '').strip().lower() or None
    ptext = fix_text(stim.get('text', '')) if stim.get('text') else ''

    def drop(why):
        dropped.append({'ref': ref, 'reason': why, 'stem': stem[:110]})
        counts[why] += 1

    if kind and VISUAL_KIND.search(kind):
        drop('stimulus is a visual (chart/map/table/poster) that cannot be shown as text'); continue
    if VISUAL_STEM.search(stem):
        drop('question refers to a visual that is not part of the text'); continue
    if len(opts) != 4:
        drop(f'options could not be recovered from the scan ({len(opts)} of 4)'); continue
    if not letter or letter not in opts:
        drop('answer key missing or does not match an option'); continue
    if not stem or len(stem) < 8:
        drop('stem too short / not recovered'); continue
    if len(set(opts.values())) != 4:
        drop('duplicate option text after cleanup'); continue

    expl = fix_text(it['explanation'])
    rec = RECOVERED.get(it['startPage'], {}).get(it['n'])
    if rec and len(rec) > len(expl):
        expl = fix_text(rec)
    if len(expl) < 12:
        drop('no usable explanation in the answer key'); continue

    fp = re.sub(r'\W+', ' ', stem.lower()).strip() + '||' + \
         '|'.join(sorted(re.sub(r'\W+', ' ', v.lower()).strip() for v in opts.values()))
    if fp in seen_fp:
        drop(f'exact duplicate of {seen_fp[fp]}'); continue
    seen_fp[fp] = ref

    skill = classify_skill(stem, kind)
    domain = classify_domain(section, skill, kind)

    pid = None
    if ptext and len(ptext.split()) >= 12:
        key = (it['startPage'], ptext[:60])
        if key not in pass_ids:
            pid = f'p{len(pass_ids) + 1:03d}'
            pass_ids[key] = pid
            passages[pid] = {'title': 'Read the ' + (kind or 'passage'), 'text': ptext}
        pid = pass_ids[key]

    band_tag = it['band']
    items.append({
        'id': f"{section.split()[0].lower()[:4]}_{it['band'][:3].lower()}_{it['startPage']}_{it['n']:02d}",
        'domain': domain,
        'skill': skill,
        'grade': 4,
        'difficulty': difficulty(it, stem, opts, ptext),
        'type': 'multiple_choice',
        'stem': stem,
        'options': [opts[k] for k in 'ABCD'],
        'answer': opts[letter],
        'explanation': expl,
        'wrongAnswerExplanations': {},
        'teachingTip': TIPS.get(skill, TIPS['General comprehension']),
        'scored': True,
        'sourceBand': band_tag,
        **({'passageId': pid, 'setOrder': it['n']} if pid else {}),
    })

# passages that ended up with only one item are inlined rather than kept as sets
used = Counter(i.get('passageId') for i in items if i.get('passageId'))
bank = {
    'meta': {
        'subject': 'Reading', 'grade': 4, 'placeholder': False,
        'source': 'The Book of MAP Growth Reading — Reading Questions for the MAP Exam, 4th Grade',
        'note': 'Items transcribed by OCR from a 201-page scanned PDF. Difficulty is provisional, '
                'anchored on the book’s own Basic/Proficient/Advanced banding — not a calibration.',
    },
    'passages': passages,
    'items': items,
}

io.open(f'{HERE}/bank.json', 'w', encoding='utf-8').write(
    json.dumps(bank, indent=1, ensure_ascii=False))
io.open(f'{HERE}/dropped.json', 'w', encoding='utf-8').write(
    json.dumps(dropped, indent=1, ensure_ascii=False))

# ================================================================= report ==
print(f'items kept:    {len(items)}')
print(f'items dropped: {len(dropped)}')
for why, n in counts.most_common():
    print(f'   {n:3d}  {why}')
print(f'passages:      {len(passages)}  (sets of >1 item: {sum(1 for p,c in used.items() if c>1)})')

print('\nby domain:')
for d, n in Counter(i['domain'] for i in items).most_common():
    print(f'   {n:4d}  {100*n/len(items):5.1f}%  {d}')
print('\nby source band:')
for b, n in Counter(i['sourceBand'] for i in items).most_common():
    ds = [i['difficulty'] for i in items if i['sourceBand'] == b]
    print(f'   {n:4d}  {b:11s} difficulty {min(ds)}-{max(ds)} (mean {sum(ds)/len(ds):.0f})')
print('\nby skill:')
for s, n in Counter(i['skill'] for i in items).most_common():
    print(f'   {n:4d}  {s}')
ds = sorted(i['difficulty'] for i in items)
print(f'\ndifficulty range {ds[0]}-{ds[-1]}, median {ds[len(ds)//2]}')
