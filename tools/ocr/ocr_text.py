"""Render each page at 400dpi greyscale and OCR it with tesseract --psm 6.

Two things matter for speed here:
  * OMP_THREAD_LIMIT=1 — tesseract's OpenMP contention makes a single page take
    over 120s in this container; pinned to one thread it takes ~0.5s. We
    parallelise at the process level instead.
  * the PDF is opened once per worker, not once per page (it is 18 MB).
"""
import os, subprocess
from concurrent.futures import ProcessPoolExecutor
import pymupdf

PDF = '/home/user/Capybara/Question bank.pdf'
OUT = '/tmp/ocr'
TMP = '/tmp/render'
ENV = dict(os.environ, OMP_THREAD_LIMIT='1')

os.makedirs(OUT, exist_ok=True)
os.makedirs(TMP, exist_ok=True)

_doc = None
def doc():
    global _doc
    if _doc is None:
        _doc = pymupdf.open(PDF)
    return _doc

def do_page(i):
    stem = f'{OUT}/p{i+1:03d}'
    if os.path.exists(stem + '.txt') and os.path.getsize(stem + '.txt') > 0:
        return (i, 'cached')
    png = f'{TMP}/r{os.getpid()}.png'
    try:
        doc()[i].get_pixmap(dpi=400, colorspace=pymupdf.csGRAY).save(png)
        r = subprocess.run(['tesseract', png, stem, '--psm', '6'],
                           capture_output=True, text=True, env=ENV, timeout=120)
        if r.returncode != 0:
            return (i, 'tesseract: ' + r.stderr.strip()[:120])
        return (i, 'ok')
    except subprocess.TimeoutExpired:
        return (i, 'timeout')
    except Exception as e:
        return (i, f'{type(e).__name__}: {str(e)[:120]}')

if __name__ == '__main__':
    n = pymupdf.open(PDF).page_count
    bad = 0
    with ProcessPoolExecutor(max_workers=4) as ex:
        for done, (i, status) in enumerate(ex.map(do_page, range(n)), 1):
            if status not in ('ok', 'cached'):
                bad += 1
                print(f'page {i+1}: {status}', flush=True)
            if done % 40 == 0:
                print(f'  {done}/{n}', flush=True)
    ok = sum(1 for f in os.listdir(OUT) if f.endswith('.txt') and os.path.getsize(f'{OUT}/{f}') > 0)
    print(f'complete: {ok}/{n} pages produced text, {bad} problem(s)')
