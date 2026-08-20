"use client";

import { Tag } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { dueLabel } from "@/lib/srs";
import type { VocabularyReview, VocabularyWord } from "@/lib/types";

const statusTone = {
  new: "neutral", learning: "clay", familiar: "ochre", mastered: "sage",
} as const;

export function VocabularyCard({
  word, review, onKnow, onReview, expanded = true,
}: {
  word: VocabularyWord;
  review?: VocabularyReview;
  onKnow?: () => void;
  onReview?: () => void;
  expanded?: boolean;
}) {
  const status = review?.status ?? "new";
  return (
    <article className="paper-card flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-serif text-[24px] leading-tight tracking-[-0.01em] text-ink">{word.word}</h3>
          <p className="tabular mt-1 text-[12.5px] text-ink-3">
            {word.ipa} · <span className="italic">{word.pos}</span>
          </p>
        </div>
        <Tag tone={statusTone[status]} className="shrink-0 capitalize">{status}</Tag>
      </div>

      <p className="mt-3.5 text-[14.5px] leading-relaxed text-ink">{word.definition}</p>

      {expanded && (
        <>
          <blockquote className="mt-3.5 border-l-2 border-line-2 pl-3.5 font-serif text-[14px] italic leading-relaxed text-ink-2">
            {word.example}
          </blockquote>

          <dl className="mt-4 space-y-2.5 border-t border-line pt-4 text-[13px]">
            <div className="flex gap-3">
              <dt className="w-[86px] shrink-0 text-ink-3">Synonyms</dt>
              <dd className="text-ink-2">{word.synonyms.join(", ")}</dd>
            </div>
            {word.confusion && (
              <div className="flex gap-3">
                <dt className="w-[86px] shrink-0 text-ink-3">Careful</dt>
                <dd className="text-ink-2">{word.confusion}</dd>
              </div>
            )}
            <div className="flex gap-3">
              <dt className="w-[86px] shrink-0 text-ink-3">Memory cue</dt>
              <dd className="text-ink-2">{word.cue}</dd>
            </div>
          </dl>
        </>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {onKnow && <Button size="sm" onClick={onKnow} icon="check">I know this</Button>}
        {onReview && <Button size="sm" variant="secondary" onClick={onReview} icon="reset">Review again</Button>}
        <span className="ml-auto flex items-center gap-1.5 text-[12px] text-ink-3">
          <Icon name="clock" size={13} />
          {dueLabel(review)}
        </span>
      </div>
    </article>
  );
}
