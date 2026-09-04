"""Re-OCR with word bounding boxes so fill-in-the-blank gaps can be restored.

Tesseract silently drops the long underscore runs this book uses for blanks,
turning 'Part of the __________ involves chanting' into 'Part of the involves
chanting'. The blank is still visible in the layout as an abnormally wide gap
between two words on the same line, so we rebuild each line from the TSV word
boxes and re-insert a blank wherever the gap is far wider than that line's
normal word spacing.
"""
import os, subprocess, csv, io, re
from concurrent.futures import ProcessPoolExecutor
import pymupdf

PDF = '/home/user/Capybara/Question bank.pdf'
OUT = '/tmp/ocrgap'
TMP = '/tmp/rendergap'
ENV = dict(os.environ, OMP_THREAD_LIMIT='1')
DPI = 600
BLANK = '______'

os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

_doc = None
def doc():
    global _doc
    if _doc is None:
        _doc = pymupdf.open(PDF)
    return _doc

def lines_from_tsv(path):
    rows = []
    with io.open(path, encoding='utf-8', errors='replace', newline='') as fh:
        for r in csv.DictReader(fh, delimiter='\t', quoting=csv.QUOTE_NONE):
            try:
                if int(r['level']) != 5:
                    continue
                txt = (r['text'] or '').strip()
                if not txt:
                    continue
                rows.append((int(r['block_num']), int(r['par_num']), int(r['line_num']),
                             int(r['word_num']), int(r['left']), int(r['width']), txt))
            except (ValueError, KeyError, TypeError):
                continue
    groups = {}
    for b, p, l, w, left, width, txt in rows:
        groups.setdefault((b, p, l), []).append((w, left, width, txt))

    out = []
    for key in sorted(groups):
        ws = sorted(groups[key])
        if not ws:
            continue
        gaps = [ws[i + 1][1] - (ws[i][1] + ws[i][2]) for i in range(len(ws) - 1)]
        pos = [g for g in gaps if g > 0]
        med = sorted(pos)[len(pos) // 2] if pos else 0
        # a normal word space at 600dpi in this book runs ~25-40px; a blank is
        # several times that. Require both a multiple of the line's own spacing
        # and a hard floor, so ordinary kerning is never mistaken for a blank.
        thresh = max(med * 3.0 if med else 0, 90)
        parts = [ws[0][3]]
        for i, g in enumerate(gaps):
            if g > thresh:
                parts.append(BLANK)
            parts.append(ws[i + 1][3])
        out.append(' '.join(parts))
    return out

def do_page(i):
    stem = f'{OUT}/p{i + 1:03d}'
    if os.path.exists(stem + '.txt') and os.path.getsize(stem + '.txt') > 0:
        return (i, 'cached')
    png = f'{TMP}/r{os.getpid()}.png'
    base = f'{TMP}/o{os.getpid()}'
    try:
        doc()[i].get_pixmap(dpi=DPI, colorspace=pymupdf.csGRAY).save(png)
        r = subprocess.run(['tesseract', png, base, '--psm', '6', 'tsv'],
                           capture_output=True, text=True, env=ENV, timeout=180)
        if r.returncode != 0:
            return (i, 'tesseract: ' + r.stderr.strip()[:100])
        io.open(stem + '.txt', 'w', encoding='utf-8').write(
            '\n'.join(lines_from_tsv(base + '.tsv')) + '\n')
        return (i, 'ok')
    except Exception as e:
        return (i, f'{type(e).__name__}: {str(e)[:100]}')

if __name__ == '__main__':
    n = pymupdf.open(PDF).page_count
    bad = 0
    with ProcessPoolExecutor(max_workers=4) as ex:
        for done, (i, st) in enumerate(ex.map(do_page, range(n)), 1):
            if st not in ('ok', 'cached'):
                bad += 1
                print(f'page {i + 1}: {st}', flush=True)
            if done % 50 == 0:
                print(f'  {done}/{n}', flush=True)
    blanks = 0
    for f in os.listdir(OUT):
        blanks += io.open(f'{OUT}/{f}', encoding='utf-8').read().count(BLANK)
    print(f'complete, {bad} problems, {blanks} blanks restored across the book')
