"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { vocabularyWords } from "@/lib/data/vocabulary";
import type { Passage } from "@/lib/types";

type Tool = "highlight" | "underline" | "comment" | "vocabulary" | "evidence";

const tools: { id: Tool; label: string; icon: IconName; hint: string }[] = [
  { id: "highlight", label: "Highlight", icon: "highlight", hint: "Mark text you may want to come back to" },
  { id: "underline", label: "Underline", icon: "underline", hint: "Mark the sentence carrying the argument" },
  { id: "evidence", label: "Evidence", icon: "target", hint: "Mark the line that proves a claim" },
  { id: "comment", label: "Comment", icon: "comment", hint: "Attach a note to the selection" },
  { id: "vocabulary", label: "Vocabulary", icon: "cards", hint: "Look a word up without leaving the page" },
];

interface Annotation {
  id: string;
  para: number;
  text: string;
  tool: Tool;
  note?: string;
}

const toolStyle: Record<Tool, string> = {
  highlight: "bg-ochre-soft",
  underline: "underline decoration-blue decoration-2 underline-offset-[3px]",
  evidence: "bg-sage-soft border-b-2 border-sage",
  comment: "bg-plum-soft",
  vocabulary: "bg-clay-soft",
};

/** Words in the passage that the vocabulary library also knows about. */
const glossary = new Map(vocabularyWords.map((w) => [w.word.toLowerCase(), w]));

export function ReadingPassage({
  passage, defaultBookmarked = false, onBookmark,
}: {
  passage: Passage;
  defaultBookmarked?: boolean;
  onBookmark?: (v: boolean) => void;
}) {
  const [tool, setTool] = useState<Tool>("highlight");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [pendingNote, setPendingNote] = useState<Annotation | null>(null);
  const [noteText, setNoteText] = useState("");
  const [lookup, setLookup] = useState<{ word: string; x: number; y: number } | null>(null);
  const [bookmarked, setBookmarked] = useState(defaultBookmarked);
  const containerRef = useRef<HTMLDivElement>(null);

  const capture = useCallback(
    (paraIndex: number) => {
      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 2) return;

      if (tool === "vocabulary") {
        const entry = glossary.get(text.toLowerCase().replace(/[^a-z]/g, ""));
        const rect = sel?.getRangeAt(0).getBoundingClientRect();
        const box = containerRef.current?.getBoundingClientRect();
        if (rect && box) {
          setLookup({
            word: entry ? entry.word : text,
            x: rect.left - box.left + rect.width / 2,
            y: rect.bottom - box.top + 8,
          });
        }
        sel?.removeAllRanges();
        return;
      }

      const ann: Annotation = { id: `a${Date.now()}`, para: paraIndex, text, tool };
      if (tool === "comment") {
        setPendingNote(ann);
        setNoteText("");
      } else {
        setAnnotations((a) => [...a, ann]);
      }
      sel?.removeAllRanges();
    },
    [tool],
  );

  /** Wraps every recorded annotation for this paragraph in its mark style. */
  function render(text: string, paraIndex: number) {
    const marks = annotations.filter((a) => a.para === paraIndex);
    if (marks.length === 0) return text;

    const ranges: { start: number; end: number; tool: Tool }[] = [];
    for (const m of marks) {
      const start = text.indexOf(m.text);
      if (start >= 0) ranges.push({ start, end: start + m.text.length, tool: m.tool });
    }
    ranges.sort((a, b) => a.start - b.start);

    const out: React.ReactNode[] = [];
    let cursor = 0;
    ranges.forEach((r, i) => {
      if (r.start < cursor) return;
      if (r.start > cursor) out.push(text.slice(cursor, r.start));
      out.push(
        <mark key={i} className={`rounded-[2px] bg-transparent px-[1px] text-ink ${toolStyle[r.tool]}`}>
          {text.slice(r.start, r.end)}
        </mark>,
      );
      cursor = r.end;
    });
    if (cursor < text.length) out.push(text.slice(cursor));
    return out;
  }

  const entry = lookup ? glossary.get(lookup.word.toLowerCase()) : undefined;

  return (
    <div className="paper-card overflow-hidden">
      {/* ---------- toolbar ---------- */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-surface-2/50 px-4 py-2.5">
        <div className="no-scrollbar flex gap-1 overflow-x-auto" role="toolbar" aria-label="Annotation tools">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              aria-pressed={tool === t.id}
              title={t.hint}
              className={`flex shrink-0 items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-[12.5px] font-medium transition-colors duration-150 ${
                tool === t.id ? "bg-ink text-ink-inv" : "text-ink-2 hover:bg-surface-3 hover:text-ink"
              }`}
            >
              <Icon name={t.icon} size={14} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1">
          {annotations.length > 0 && (
            <button
              onClick={() => setAnnotations([])}
              className="rounded-[8px] px-2.5 py-1.5 text-[12px] text-ink-3 transition-colors hover:bg-surface-3 hover:text-ink"
            >
              Clear {annotations.length}
            </button>
          )}
          <button
            onClick={() => { setBookmarked(!bookmarked); onBookmark?.(!bookmarked); }}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? "Remove bookmark" : "Bookmark this passage"}
            className={`rounded-[8px] p-1.5 transition-colors ${bookmarked ? "text-ochre" : "text-ink-3 hover:bg-surface-3 hover:text-ink"}`}
          >
            <Icon name="bookmark" size={16} />
          </button>
        </div>
      </div>

      <p className="border-b border-line px-4 py-2 text-[11.5px] text-ink-3 sm:px-6">
        Select any text to {tools.find((t) => t.id === tool)?.label.toLowerCase()} it.
      </p>

      {/* ---------- passage ---------- */}
      <div ref={containerRef} className="relative px-4 py-6 sm:px-8 sm:py-8">
        <header className="mb-5 max-w-[62ch]">
          <div className="mb-2.5 flex items-center gap-2">
            <Tag tone="plum">{passage.genre}</Tag>
            {bookmarked && <Tag tone="ochre">Bookmarked</Tag>}
          </div>
          <h2 className="serif-display text-[24px] sm:text-[28px]">{passage.title}</h2>
          <p className="mt-1.5 text-[12.5px] italic text-ink-3">{passage.attribution}</p>
        </header>

        <div className="max-w-[62ch] space-y-4">
          {passage.paragraphs.map((p, i) => (
            <p
              key={i}
              onMouseUp={() => capture(i)}
              onTouchEnd={() => capture(i)}
              className="relative font-serif text-[16.5px] leading-[1.72] text-ink selection:bg-ochre-soft"
            >
              <span className="tabular absolute -left-7 top-1 hidden text-[11px] text-ink-3 sm:block">{i + 1}</span>
              {render(p, i)}
            </p>
          ))}
        </div>

        {/* ---------- vocabulary lookup card ---------- */}
        <AnimatePresence>
          {lookup && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ left: Math.max(8, Math.min(lookup.x - 140, 520)), top: lookup.y }}
              className="absolute z-20 w-[280px] rounded-[12px] border border-line bg-surface p-4 shadow-[var(--shadow-float)]"
              role="dialog"
              aria-label={`Definition of ${lookup.word}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-[17px] text-ink">{lookup.word}</p>
                  {entry && <p className="tabular mt-0.5 text-[12px] text-ink-3">{entry.ipa} · {entry.pos}</p>}
                </div>
                <button onClick={() => setLookup(null)} aria-label="Close" className="-mr-1 -mt-1 rounded p-1 text-ink-3 hover:text-ink">
                  <Icon name="close" size={13} />
                </button>
              </div>
              {entry ? (
                <>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">{entry.definition}</p>
                  {entry.confusion && (
                    <p className="mt-2.5 rounded-[8px] bg-surface-2 px-2.5 py-2 text-[12px] leading-snug text-ink-2">{entry.confusion}</p>
                  )}
                </>
              ) : (
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
                  Not in your vocabulary library yet. Select a single word to look it up.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- note composer ---------- */}
      <AnimatePresence>
        {pendingNote && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-surface-2/50"
          >
            <div className="p-4 sm:px-6">
              <p className="eyebrow mb-2">Note on selection</p>
              <blockquote className="mb-3 border-l-2 border-plum pl-3 font-serif text-[14px] italic text-ink-2">
                &ldquo;{pendingNote.text}&rdquo;
              </blockquote>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={2}
                autoFocus
                placeholder="What did you notice here?"
                className="w-full resize-none rounded-[10px] border border-line-strong bg-surface p-3 text-[13.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
              />
              <div className="mt-2.5 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setAnnotations((a) => [...a, { ...pendingNote, note: noteText }]);
                    setPendingNote(null);
                  }}
                >
                  Save note
                </Button>
                <Button size="sm" variant="tertiary" onClick={() => setPendingNote(null)}>Cancel</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- annotation list ---------- */}
      {annotations.length > 0 && (
        <div className="border-t border-line px-4 py-4 sm:px-6">
          <p className="eyebrow mb-3">Your annotations ({annotations.length})</p>
          <ul className="space-y-2">
            {annotations.map((a) => (
              <li key={a.id} className="flex items-start gap-2.5 text-[13px]">
                <span className={`mt-1 size-2.5 shrink-0 rounded-[2px] ${
                  a.tool === "highlight" ? "bg-ochre" : a.tool === "underline" ? "bg-blue"
                  : a.tool === "evidence" ? "bg-sage" : "bg-plum"
                }`} />
                <span className="min-w-0 flex-1">
                  <span className="block text-ink-2">&ldquo;{a.text.slice(0, 90)}{a.text.length > 90 ? "…" : ""}&rdquo;</span>
                  {a.note && <span className="mt-0.5 block text-[12.5px] text-ink-3">{a.note}</span>}
                </span>
                <button
                  onClick={() => setAnnotations((list) => list.filter((x) => x.id !== a.id))}
                  className="shrink-0 rounded p-1 text-ink-3 transition-colors hover:text-wrong"
                  aria-label="Remove annotation"
                >
                  <Icon name="close" size={12} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
