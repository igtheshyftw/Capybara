"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageBody } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Flashcard } from "@/components/learning/Flashcard";
import { EmptyState } from "@/components/learning/EmptyState";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp, useDispatch } from "@/lib/store";
import { vocabularyWords } from "@/lib/data/vocabulary";
import type { ReviewGrade } from "@/lib/types";

const SESSION_SIZE = 15;

export default function FlashcardsPage() {
  const app = useApp();
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [log, setLog] = useState<ReviewGrade[]>([]);
  const [sessionKey, setSessionKey] = useState(0);

  // Fixed for the session so grading a card does not reshuffle the deck underneath you.
  const deck = useMemo(() => {
    const due = vocabularyWords.filter((w) => {
      const r = app.reviews[w.id];
      return !r || r.due <= Date.now();
    });
    const pool = due.length > 0 ? due : vocabularyWords;
    return pool.slice(0, SESSION_SIZE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  const finished = index >= deck.length;

  function grade(g: ReviewGrade) {
    dispatch({ type: "review-word", wordId: deck[index].id, grade: g });
    setLog((l) => [...l, g]);
    setIndex((i) => i + 1);
  }

  if (deck.length === 0) {
    return (
      <PageBody>
        <EmptyState
          variant="vocab"
          title="Nothing is due right now."
          body="The schedule brings words back just before you would forget them. Come back tomorrow, or study ahead from a word set."
          action={<ButtonLink href="/vocabulary" size="sm">Back to the lab</ButtonLink>}
        />
      </PageBody>
    );
  }

  /* ---------------- session summary ---------------- */
  if (finished) {
    const counts = log.reduce<Record<string, number>>((acc, g) => ({ ...acc, [g]: (acc[g] ?? 0) + 1 }), {});
    const solid = (counts.good ?? 0) + (counts.easy ?? 0);
    return (
      <PageBody>
        <div className="mx-auto max-w-lg">
          <Card className="text-center">
            <Capybara variant="vocab" mood="pleased" size={72} className="mx-auto" />
            <h1 className="serif-display mt-4 text-[28px]">
              {deck.length} card{deck.length === 1 ? "" : "s"} reviewed.
            </h1>
            <p className="mt-2 text-[14px] text-ink-2">
              {solid === deck.length ? "Clean run. Those intervals just got considerably longer."
                : `${solid} recalled solidly. The rest come back sooner — which is the point.`}
            </p>
            <ul className="mt-6 grid grid-cols-4 gap-3 border-y border-line py-5 text-center">
              {(["again", "hard", "good", "easy"] as const).map((g) => (
                <li key={g}>
                  <p className="tabular text-[22px] font-semibold leading-none text-ink">{counts[g] ?? 0}</p>
                  <p className="mt-1.5 text-[11.5px] capitalize text-ink-3">{g}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button onClick={() => { setIndex(0); setLog([]); setSessionKey((k) => k + 1); }} icon="reset">
                Another round
              </Button>
              <ButtonLink href="/vocabulary" variant="secondary">Vocabulary Lab</ButtonLink>
              <ButtonLink href="/dashboard" variant="tertiary">Dashboard</ButtonLink>
            </div>
          </Card>
        </div>
      </PageBody>
    );
  }

  /* ---------------- session ---------------- */
  return (
    <PageBody>
      <div className="mx-auto max-w-xl">
        <h1 className="sr-only">Vocabulary review session</h1>
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link href="/vocabulary" className="flex items-center gap-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink">
            <Icon name="chevron-left" size={15} />
            Vocabulary Lab
          </Link>
          <span className="tabular text-[12.5px] text-ink-3">{log.length} graded</span>
        </div>

        <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-surface-3">
          <motion.div
            className="h-full rounded-full bg-ink"
            initial={false}
            animate={{ width: `${(index / deck.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <Flashcard word={deck[index]} onGrade={grade} index={index} total={deck.length} />

        <p className="mt-6 text-center text-[12px] text-ink-3">
          Keyboard: <kbd className="rounded-[4px] border border-line bg-surface px-1">space</kbd> flip ·{" "}
          <kbd className="rounded-[4px] border border-line bg-surface px-1">1</kbd>–
          <kbd className="rounded-[4px] border border-line bg-surface px-1">4</kbd> grade
        </p>
      </div>
    </PageBody>
  );
}
