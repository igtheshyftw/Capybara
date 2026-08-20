"use client";

import { useState } from "react";
import Link from "next/link";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { VocabularyCard } from "@/components/learning/VocabularyCard";
import { useApp, useDispatch } from "@/lib/store";
import { wordById } from "@/lib/data/vocabulary";
import type { VocabularySet } from "@/lib/types";

export function WordSetView({ set }: { set: VocabularySet }) {
  const app = useApp();
  const dispatch = useDispatch();
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const words = set.wordIds.map((id) => wordById[id]).filter(Boolean);
  const mastered = words.filter((w) => app.reviews[w.id]?.status === "mastered").length;

  return (
    <PageBody>
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-[12.5px] text-ink-3">
        <Link href="/vocabulary" className="transition-colors hover:text-ink">Vocabulary Lab</Link>
        <Icon name="chevron-right" size={13} />
        <span className="text-ink-2">{set.tier}</span>
      </nav>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h1 className="serif-display text-[32px] sm:text-[38px]">{set.title}</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{set.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-[9px] border border-line bg-surface p-[3px]">
            {(["grid", "list"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLayout(l)}
                aria-pressed={layout === l}
                aria-label={`${l} view`}
                className={`rounded-[6px] p-1.5 transition-colors ${layout === l ? "bg-ink text-ink-inv" : "text-ink-3 hover:text-ink"}`}
              >
                <Icon name={l} size={15} />
              </button>
            ))}
          </div>
          <ButtonLink href="/vocabulary/flashcards" icon="cards">Review this set</ButtonLink>
        </div>
      </div>

      <Card className="mt-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="min-w-[180px] flex-1">
            <MasteryBar
              label="Set mastery" value={Math.round((mastered / words.length) * 100)}
              accent="var(--color-sage)" sublabel={`${mastered} of ${words.length} words mastered`}
            />
          </div>
          <div className="flex gap-6">
            <div>
              <p className="tabular text-[20px] font-semibold leading-none text-ink">{words.length}</p>
              <p className="mt-1 text-[12px] text-ink-3">words</p>
            </div>
            <div>
              <p className="tabular text-[20px] font-semibold leading-none text-ink">
                {words.filter((w) => { const r = app.reviews[w.id]; return !r || r.due <= Date.now(); }).length}
              </p>
              <p className="mt-1 text-[12px] text-ink-3">due now</p>
            </div>
            <div>
              <Tag tone="plum">{set.tier}</Tag>
            </div>
          </div>
        </div>
      </Card>

      <h2 className="sr-only">Words in this set</h2>
      <div className={`mt-3.5 grid gap-3.5 ${layout === "grid" ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
        {words.map((w) => (
          <VocabularyCard
            key={w.id}
            word={w}
            review={app.reviews[w.id]}
            expanded={layout === "grid"}
            onKnow={() => dispatch({ type: "review-word", wordId: w.id, grade: "good" })}
            onReview={() => dispatch({ type: "review-word", wordId: w.id, grade: "again" })}
          />
        ))}
      </div>
    </PageBody>
  );
}
