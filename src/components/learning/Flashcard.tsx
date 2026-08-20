"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import type { ReviewGrade, VocabularyWord } from "@/lib/types";

const grades: { id: ReviewGrade; label: string; key: string; tone: string; hint: string }[] = [
  { id: "again", label: "Again", key: "1", tone: "border-wrong/35 bg-wrong-soft text-wrong-ink hover:border-wrong/60", hint: "No recall — back tomorrow" },
  { id: "hard", label: "Hard", key: "2", tone: "border-clay/35 bg-clay-soft text-clay-ink hover:border-clay/60", hint: "Recalled slowly" },
  { id: "good", label: "Good", key: "3", tone: "border-sage/35 bg-sage-soft text-sage-ink hover:border-sage/60", hint: "Recalled correctly" },
  { id: "easy", label: "Easy", key: "4", tone: "border-blue/35 bg-blue-soft text-blue-ink hover:border-blue/60", hint: "Instant — push it further out" },
];

/**
 * Tactile flashcard. Space or click flips; 1–4 grade it. The card turns on the
 * Y axis rather than crossfading, because the physical metaphor is the point.
 */
export function Flashcard({
  word, onGrade, index, total,
}: {
  word: VocabularyWord;
  onGrade: (g: ReviewGrade) => void;
  index: number;
  total: number;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => { setFlipped(false); }, [word.id]);

  const grade = useCallback((g: ReviewGrade) => { onGrade(g); }, [onGrade]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space" || e.key === "Enter") { e.preventDefault(); setFlipped((f) => !f); return; }
      if (!flipped) return;
      const hit = grades.find((g) => g.key === e.key);
      if (hit) { e.preventDefault(); grade(hit.id); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, grade]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[12.5px] text-ink-3">
        <span className="tabular">Card {index + 1} of {total}</span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <kbd className="rounded-[5px] border border-line bg-surface px-1.5 py-[1px] text-[11px]">space</kbd>
          to flip
        </span>
      </div>

      <div className="relative" style={{ perspective: 1400 }}>
        <motion.button
          type="button"
          onClick={() => setFlipped(!flipped)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative block w-full text-left"
          aria-label={flipped ? "Show the word" : "Show the definition"}
        >
          {/* front */}
          <span
            className="flex min-h-[300px] w-full flex-col items-center justify-center rounded-[18px] border border-line bg-surface p-8 shadow-[var(--shadow-lift)] sm:min-h-[340px]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="eyebrow mb-4">{word.tier} vocabulary</span>
            <span className="font-serif text-[38px] leading-tight tracking-[-0.015em] text-ink sm:text-[46px]">{word.word}</span>
            <span className="tabular mt-3 text-[13.5px] text-ink-3">{word.ipa}</span>
            <span className="mt-8 flex items-center gap-2 text-[12.5px] text-ink-3">
              <Icon name="reset" size={14} />
              Tap to reveal
            </span>
          </span>

          {/* back */}
          <span
            className="absolute inset-0 flex flex-col rounded-[18px] border border-line bg-surface p-6 shadow-[var(--shadow-lift)] sm:p-8"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="flex items-baseline gap-3">
              <span className="font-serif text-[24px] leading-none text-ink">{word.word}</span>
              <span className="text-[13px] italic text-ink-3">{word.pos}</span>
            </span>
            <span className="mt-3.5 block text-[16px] leading-relaxed text-ink">{word.definition}</span>
            <span className="mt-4 block border-l-2 border-line-2 pl-3.5 font-serif text-[14.5px] italic leading-relaxed text-ink-2">
              {word.example}
            </span>
            <span className="mt-auto grid gap-2 border-t border-line pt-4 text-[13px] sm:grid-cols-2">
              <span className="block">
                <span className="eyebrow mb-1 block">Synonyms</span>
                <span className="text-ink-2">{word.synonyms.join(", ")}</span>
              </span>
              <span className="block">
                <span className="eyebrow mb-1 block">Memory cue</span>
                <span className="text-ink-2">{word.cue}</span>
              </span>
              {word.confusion && (
                <span className="block sm:col-span-2">
                  <span className="eyebrow mb-1 block">Careful</span>
                  <span className="text-ink-2">{word.confusion}</span>
                </span>
              )}
            </span>
          </span>
        </motion.button>
      </div>

      {/* ---------- grading ---------- */}
      <AnimatePresence mode="wait">
        {flipped ? (
          <motion.div
            key="grades"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4"
          >
            {grades.map((g) => (
              <button
                key={g.id}
                onClick={() => grade(g.id)}
                title={g.hint}
                className={`flex flex-col items-center gap-1 rounded-[11px] border px-3 py-3 text-[13.5px] font-medium transition-[transform,border-color] duration-150 active:scale-[0.97] ${g.tone}`}
              >
                {g.label}
                <kbd className="rounded-[4px] border border-current/25 px-1.5 text-[10.5px] opacity-70">{g.key}</kbd>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="mt-4 text-center text-[13px] text-ink-3"
          >
            Try to recall the definition before you flip. The attempt is what builds the memory.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
