"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useApp, useStats } from "@/lib/store";
import { questions } from "@/lib/data/questions";
import { skills } from "@/lib/data/skills";
import { skillBreakdown } from "@/lib/data/people";

const sets = [
  { id: "all", title: "Mixed practice", description: "Every question in the bank, shuffled across skills and difficulties.", icon: "layers" as const, tone: "neutral" as const },
  { id: "inference", title: "Inference", description: "Answers the passage requires, not answers it permits.", icon: "target" as const, tone: "clay" as const },
  { id: "evidence", title: "Command of evidence", description: "Finding the one line that proves the claim.", icon: "highlight" as const, tone: "sage" as const },
  { id: "vocab-in-context", title: "Words in context", description: "Precise sense over dictionary sense.", icon: "cards" as const, tone: "ochre" as const },
  { id: "transitions", title: "Transitions", description: "Name the relationship before reading the options.", icon: "arrow-right" as const, tone: "blue" as const },
  { id: "boundaries", title: "Sentence boundaries", description: "Where two sentences may legally be joined.", icon: "note" as const, tone: "plum" as const },
];

export default function PracticePage() {
  const app = useApp();
  const stats = useStats();

  const countFor = (id: string) => (id === "all" ? questions.length : questions.filter((q) => q.skill === id).length);
  const doneFor = (id: string) => {
    const pool = id === "all" ? questions : questions.filter((q) => q.skill === id);
    return pool.filter((q) => app.attempts.some((a) => a.questionId === q.id)).length;
  };

  const weakest = [...skillBreakdown].sort((a, b) => a.value - b.value)[0];

  return (
    <PageBody>
      <PageHeader
        eyebrow="Practice"
        title="Work the question types"
        serif
        description="Every question carries a full rationale for each option — including the ones you did not choose. That is where most of the learning is."
        action={<ButtonLink href="/exam" variant="secondary" icon="clipboard">Mock exam mode</ButtonLink>}
      />

      {/* ---------- session stats ---------- */}
      <div className="mt-7 grid gap-3.5 sm:grid-cols-3">
        <Card className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-ink-2">
            <Icon name="list" size={19} />
          </span>
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">{stats.answered}</p>
            <p className="mt-1 text-[12.5px] text-ink-3">answered this session</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-sage/25 bg-sage-soft text-sage-ink">
            <Icon name="check" size={19} />
          </span>
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">
              {stats.sessionAccuracy === null ? "—" : `${stats.sessionAccuracy}%`}
            </p>
            <p className="mt-1 text-[12.5px] text-ink-3">session accuracy</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-wrong/25 bg-wrong-soft text-wrong-ink">
            <Icon name="magnifier" size={19} />
          </span>
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">{stats.openMistakes}</p>
            <p className="mt-1 text-[12.5px] text-ink-3">open in your notebook</p>
          </div>
        </Card>
      </div>

      {/* ---------- recommendation ---------- */}
      <div className="mt-3.5">
        <CapybaraGuide
          variant="detective" name="Detective Bara" tone="ochre"
          action={<ButtonLink href={`/practice/${weakest.skill.toLowerCase().includes("synthesis") ? "rhetorical-synthesis" : "inference"}`} size="sm">Start there</ButtonLink>}
        >
          Your weakest skill this month is <strong className="font-semibold text-ink">{weakest.skill}</strong> at{" "}
          <span className="tabular font-semibold text-ink">{weakest.value}%</span> across {weakest.attempts} attempts.
          Fifteen minutes there will move your overall accuracy more than an hour anywhere else.
        </CapybaraGuide>
      </div>

      {/* ---------- sets ---------- */}
      <h2 className="mt-9 mb-4 text-[19px] font-semibold tracking-[-0.02em]">Question sets</h2>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {sets.map((s) => {
          const total = countFor(s.id);
          const done = doneFor(s.id);
          return (
            <Link
              key={s.id}
              href={`/practice/${s.id}`}
              className="group flex flex-col rounded-[14px] border border-line bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-line-2 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-[11px] border border-line bg-surface-2 text-ink-2">
                  <Icon name={s.icon} size={18} />
                </span>
                <Tag tone={s.tone}>{total} question{total === 1 ? "" : "s"}</Tag>
              </div>
              <h3 className="mt-3.5 text-[15px] font-semibold tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-1.5 text-[13px] leading-snug text-ink-2">{s.description}</p>
              <div className="mt-auto pt-4">
                {done > 0 ? (
                  <MasteryBar value={Math.round((done / total) * 100)} height={5} showValue={false} sublabel={`${done} of ${total} attempted`} />
                ) : (
                  <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
                    Begin
                    <Icon name="arrow-right" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* ---------- skill accuracy ---------- */}
      <Card className="mt-3.5">
        <CardHeader
          eyebrow="Where you stand" title="Accuracy by skill"
          description="Twelve skills tracked. The bar is accuracy; the number after it is how many questions it is based on."
          action={<ButtonLink href="/progress" variant="secondary" size="sm">Full analytics</ButtonLink>}
        />
        <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {skills.slice(0, 8).map((sk, i) => {
            const row = skillBreakdown[i];
            return (
              <li key={sk.id}>
                <MasteryBar
                  label={sk.name} value={row.value} height={6}
                  accent={row.value >= 75 ? "var(--color-sage)" : row.value >= 60 ? "var(--color-ochre)" : "var(--color-clay)"}
                  sublabel={`${row.attempts} questions · ${sk.domain}`}
                />
              </li>
            );
          })}
        </ul>
      </Card>
    </PageBody>
  );
}
