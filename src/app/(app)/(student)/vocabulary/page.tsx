"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { MasteryBar, ProgressRing } from "@/components/ui/Progress";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useApp, useStats } from "@/lib/store";
import { vocabularySets, vocabularyWords, wordById } from "@/lib/data/vocabulary";
import { dueLabel } from "@/lib/srs";
import type { VocabStatus } from "@/lib/types";

const accentSoft: Record<string, string> = {
  sage: "var(--color-sage-soft)", blue: "var(--color-blue-soft)", clay: "var(--color-clay-soft)",
  ochre: "var(--color-ochre-soft)", plum: "var(--color-plum-soft)",
};
const accentVar: Record<string, string> = {
  sage: "var(--color-sage)", blue: "var(--color-blue)", clay: "var(--color-clay)",
  ochre: "var(--color-ochre)", plum: "var(--color-plum)",
};

export default function VocabularyPage() {
  const app = useApp();
  const stats = useStats();

  const counts: Record<VocabStatus, number> = { new: 0, learning: 0, familiar: 0, mastered: 0 };
  for (const w of vocabularyWords) counts[app.reviews[w.id]?.status ?? "new"] += 1;

  const due = vocabularyWords.filter((w) => {
    const r = app.reviews[w.id];
    return !r || r.due <= Date.now();
  });

  const difficult = Object.values(app.reviews)
    .filter((r) => r.lapses > 0)
    .sort((a, b) => b.lapses - a.lapses)
    .slice(0, 6);

  const upcoming = Object.values(app.reviews)
    .filter((r) => r.due > Date.now())
    .sort((a, b) => a.due - b.due)
    .slice(0, 5);

  return (
    <PageBody>
      <PageHeader
        eyebrow="Vocabulary lab"
        title="Words, kept."
        serif
        description="Six hundred academic words on a spaced schedule. A word is only mastered once you have recalled it correctly after forgetting it once."
        action={
          <ButtonLink href="/vocabulary/flashcards" icon="cards">
            Review {Math.min(15, due.length)} due
          </ButtonLink>
        }
      />

      {/* ---------- status overview ---------- */}
      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader
            eyebrow="Library" title={`${stats.wordsMastered} words mastered`}
            description="Status is derived from your review interval, not from how many times you have seen a card."
          />
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {([
              { k: "new" as const, label: "New", tone: "var(--color-line-2)" },
              { k: "learning" as const, label: "Learning", tone: "var(--color-clay)" },
              { k: "familiar" as const, label: "Familiar", tone: "var(--color-ochre)" },
              { k: "mastered" as const, label: "Mastered", tone: "var(--color-sage)" },
            ]).map((s) => (
              <div key={s.k}>
                <p className="tabular text-[24px] font-semibold leading-none text-ink">{counts[s.k]}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-ink-3">
                  <span className="size-2 rounded-full" style={{ background: s.tone }} />
                  {s.label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex h-2.5 overflow-hidden rounded-full bg-surface-3" role="img" aria-label="Distribution of word statuses">
            {([["mastered", "var(--color-sage)"], ["familiar", "var(--color-ochre)"], ["learning", "var(--color-clay)"], ["new", "var(--color-surface-3)"]] as const).map(([k, c]) => (
              <span key={k} style={{ width: `${(counts[k as VocabStatus] / vocabularyWords.length) * 100}%`, background: c }} />
            ))}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader eyebrow="Review queue" title={`${due.length} due now`} />
          <div className="mt-4 flex items-center gap-5">
            <ProgressRing
              value={vocabularyWords.length ? ((vocabularyWords.length - due.length) / vocabularyWords.length) * 100 : 0}
              size={72} accent="var(--color-ochre)" sublabel="scheduled"
            />
            <p className="text-[13px] leading-relaxed text-ink-2">
              {due.length === 0
                ? "Nothing is due. The schedule will bring words back before you forget them."
                : "Reviewing due words is worth more than learning new ones. Fifteen cards is about six minutes."}
            </p>
          </div>
          <ButtonLink href="/vocabulary/flashcards" full className="mt-5" iconRight="arrow-right">
            {due.length === 0 ? "Study ahead" : "Start review"}
          </ButtonLink>
          {upcoming.length > 0 && (
            <ul className="mt-4 space-y-1.5 border-t border-line pt-3.5">
              {upcoming.map((r) => (
                <li key={r.wordId} className="flex items-center justify-between gap-3 text-[12.5px]">
                  <span className="font-serif text-[14px] text-ink">{wordById[r.wordId]?.word}</span>
                  <span className="text-ink-3">{dueLabel(r)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* ---------- sets ---------- */}
      <h2 className="mb-4 mt-9 text-[19px] font-semibold tracking-[-0.02em]">Word sets</h2>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {vocabularySets.map((set) => {
          const words = set.wordIds.map((id) => wordById[id]).filter(Boolean);
          const mastered = words.filter((w) => app.reviews[w.id]?.status === "mastered").length;
          const setDue = words.filter((w) => { const r = app.reviews[w.id]; return !r || r.due <= Date.now(); }).length;
          return (
            <Link
              key={set.id}
              href={`/vocabulary/${set.id}`}
              className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-line-2 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex h-[92px] items-center justify-center px-5" style={{ background: accentSoft[set.accent] }}>
                <p className="font-serif text-[22px] text-ink">{words[0]?.word}</p>
              </div>
              <div className="flex flex-1 flex-col border-t border-line p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{set.title}</h3>
                  <Tag className="shrink-0">{set.tier}</Tag>
                </div>
                <p className="mt-1.5 text-[13px] leading-snug text-ink-2">{set.description}</p>
                <div className="mt-auto pt-4">
                  <MasteryBar
                    value={Math.round((mastered / words.length) * 100)}
                    accent={accentVar[set.accent]} height={6} showValue={false}
                    sublabel={`${mastered}/${words.length} mastered${setDue ? ` · ${setDue} due` : ""}`}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ---------- difficult words ---------- */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-2">
        <Card>
          <CardHeader
            eyebrow="Difficult words" title="Words that keep slipping"
            description="Anything you have graded Again at least once."
          />
          {difficult.length === 0 ? (
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-2">
              Nothing has lapsed yet. Once a word comes back and you cannot recall it, it will
              appear here so you can give it a stronger memory cue.
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {difficult.map((r) => {
                const w = wordById[r.wordId];
                return (
                  <li key={r.wordId} className="flex items-center justify-between gap-3 rounded-[10px] border border-line bg-surface-2/50 px-3.5 py-2.5">
                    <span className="min-w-0">
                      <span className="block font-serif text-[15px] text-ink">{w?.word}</span>
                      <span className="block truncate text-[12.5px] text-ink-3">{w?.definition}</span>
                    </span>
                    <Tag tone="clay" className="shrink-0">{r.lapses} lapse{r.lapses === 1 ? "" : "s"}</Tag>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <CapybaraGuide variant="vocab" name="Vocab Bara" tone="ochre" size={60}
          action={<ButtonLink href="/vocabulary/flashcards" size="sm" variant="secondary">Open flashcards</ButtonLink>}>
          <p>
            Grade honestly. Marking a word <em>Good</em> when you actually hesitated pushes it
            three weeks out, and it will be gone when it comes back.
          </p>
          <p className="mt-2">
            The schedule is doing arithmetic on your behalf — it can only be as accurate as the
            grades you give it.
          </p>
        </CapybaraGuide>
      </div>
    </PageBody>
  );
}
