"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useApp } from "@/lib/store";
import { writingPrompts, masteryMap } from "@/lib/data/people";
import { countWords } from "@/lib/writing";

export default function WritingPage() {
  const app = useApp();
  const writingMastery = masteryMap.find((m) => m.skill === "Writing")!;

  return (
    <PageBody>
      <PageHeader
        eyebrow="Writing studio"
        title="Draft, see the structure, revise."
        serif
        description="A writing environment that shows you what a reader will notice: which paragraphs make a claim, which support it, and which quietly skip the explanation."
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3.5">
          {writingPrompts.map((p) => {
            const sub = app.writing[p.id];
            const words = sub ? countWords(sub.text) : p.starter ? countWords(p.starter) : 0;
            const pct = Math.min(100, Math.round((words / p.minWords) * 100));
            return (
              <Link
                key={p.id}
                href={`/writing/${p.id}`}
                className="group block rounded-[14px] border border-line bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[2px] hover:border-line-2 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Tag tone="clay">{p.exam}</Tag>
                      <Tag>{p.taskType}</Tag>
                      {sub?.submitted ? <Tag tone="correct">Feedback ready</Tag>
                        : words > 0 ? <Tag tone="ochre">Draft in progress</Tag>
                        : <Tag>Not started</Tag>}
                    </div>
                    <h2 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">{p.title}</h2>
                  </div>
                  <span className="flex shrink-0 items-center gap-4 text-[12.5px] text-ink-3">
                    <span className="flex items-center gap-1.5"><Icon name="clock" size={14} />{p.minutes} min</span>
                    <span className="flex items-center gap-1.5"><Icon name="note" size={14} />{p.minWords}+ words</span>
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-2">{p.brief}</p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="min-w-[200px] flex-1">
                    <MasteryBar
                      value={pct} height={6} showValue={false}
                      accent={pct >= 100 ? "var(--color-sage)" : "var(--color-ochre)"}
                      sublabel={words > 0 ? `${words} of ${p.minWords} words` : "No draft yet"}
                    />
                  </div>
                  <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
                    {words > 0 ? "Continue writing" : "Start writing"}
                    <Icon name="arrow-right" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Your writing" title="Where you stand" />
            <div className="mt-4 space-y-4">
              <MasteryBar label="Writing mastery" value={writingMastery.value} delta={writingMastery.delta} accent="var(--color-clay)" />
              <MasteryBar label="Essay development" value={49} accent="var(--color-clay)" sublabel="Weakest sub-skill" />
              <MasteryBar label="Coherence & cohesion" value={66} accent="var(--color-ochre)" />
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="The four moves" title="P · E · E · L" />
            <ol className="mt-4 space-y-3">
              {[
                ["Point", "One sentence naming the claim — not the topic."],
                ["Explanation", "Two or three sentences on the mechanism. Most often skipped."],
                ["Evidence", "A concrete instance, figure or scenario."],
                ["Link", "Tie the paragraph back to your position."],
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-3">
                  <span className="tabular serif-display shrink-0 text-[17px] text-ink-3">{i + 1}</span>
                  <span>
                    <span className="block text-[13.5px] font-semibold text-ink">{k}</span>
                    <span className="block text-[12.5px] leading-snug text-ink-2">{v}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Card>

          <CapybaraGuide variant="writing" name="Writing Bara" tone="clay" size={58}>
            The structure visualiser flags any paragraph missing explanation or evidence. It is a
            reading of your discourse markers, not a grade — but it catches the gap an examiner
            would notice first.
          </CapybaraGuide>
        </div>
      </div>
    </PageBody>
  );
}
