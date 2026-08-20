"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MasteryBar, ProgressRing } from "@/components/ui/Progress";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useStats } from "@/lib/store";
import { achievements } from "@/lib/data/people";
import type { AchievementIcon } from "@/lib/types";

const iconMap: Record<AchievementIcon, IconName> = {
  magnifier: "magnifier", book: "book", clock: "clock", return: "return",
  calendar: "calendar", pen: "pen", leaf: "leaf", compass: "compass",
};

export default function AchievementsPage() {
  const stats = useStats();
  const earned = achievements.filter((a) => a.earned);
  const pending = achievements.filter((a) => !a.earned);

  return (
    <PageBody>
      <PageHeader
        eyebrow="Achievements"
        title="Rewards for the habits that work"
        serif
        description="Every badge here is tied to a behaviour that actually improves results — reviewing errors, sustaining focus, retaining vocabulary. None of them reward time spent alone."
      />

      {/* ---------- summary ---------- */}
      <Card className="mt-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <ProgressRing value={(earned.length / achievements.length) * 100} size={78} accent="var(--color-ochre)" sublabel="earned" />
            <div>
              <p className="text-[18px] font-semibold tracking-[-0.01em] text-ink">
                {earned.length} of {achievements.length} earned
              </p>
              <p className="mt-1 text-[13px] text-ink-2">Level {stats.level} · {stats.xp.toLocaleString()} XP</p>
            </div>
          </div>
          <div className="min-w-[240px] flex-1 sm:max-w-xs">
            <MasteryBar
              value={(stats.xpIntoLevel / stats.xpToNext) * 100} accent="var(--color-ochre)"
              label={`Level ${stats.level}`} showValue={false}
              sublabel={`${stats.xpToNext - stats.xpIntoLevel} XP to level ${stats.level + 1}`}
            />
          </div>
        </div>
      </Card>

      {/* ---------- earned ---------- */}
      <h2 className="mb-4 mt-9 text-[19px] font-semibold tracking-[-0.02em]">Earned</h2>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {earned.map((a) => (
          <article key={a.id} className="paper-card flex flex-col p-5">
            <span className="flex size-11 items-center justify-center rounded-[12px] border border-ochre/30 bg-ochre-soft text-ochre-ink">
              <Icon name={iconMap[a.icon]} size={20} />
            </span>
            <h3 className="mt-3.5 text-[15px] font-semibold tracking-[-0.01em] text-ink">{a.name}</h3>
            <p className="mt-1.5 text-[13px] leading-snug text-ink-2">{a.description}</p>
            <p className="mt-3 text-[12px] text-ink-3">{a.requirement}</p>
            <div className="mt-auto flex items-center gap-2 pt-4">
              <Icon name="check" size={14} className="text-sage" />
              <span className="text-[12.5px] text-ink-2">Earned {a.earnedOn}</span>
            </div>
          </article>
        ))}
      </div>

      {/* ---------- in progress ---------- */}
      <h2 className="mb-4 mt-9 text-[19px] font-semibold tracking-[-0.02em]">In progress</h2>
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {pending.map((a) => (
          <article key={a.id} className="paper-card flex flex-col p-5">
            <span className="flex size-11 items-center justify-center rounded-[12px] border border-line bg-surface-2 text-ink-3">
              <Icon name={iconMap[a.icon]} size={20} />
            </span>
            <h3 className="mt-3.5 text-[15px] font-semibold tracking-[-0.01em] text-ink">{a.name}</h3>
            <p className="mt-1.5 text-[13px] leading-snug text-ink-2">{a.description}</p>
            <p className="mt-3 text-[12px] text-ink-3">{a.requirement}</p>
            <div className="mt-auto pt-4">
              <MasteryBar
                value={((a.progress ?? 0) / (a.target ?? 1)) * 100} height={5} showValue={false}
                accent="var(--color-ink-3)" sublabel={`${a.progress} of ${a.target}`}
              />
            </div>
          </article>
        ))}
      </div>

      {/* ---------- collections ---------- */}
      <Card className="mt-3.5">
        <CardHeader
          eyebrow="Collections" title="Things you are building"
          description="Collections are cumulative and never reset. Missing a day costs you a streak, not a collection."
        />
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Vocabulary mastered", value: stats.wordsMastered, total: 600, accent: "var(--color-ochre)" },
            { label: "Questions answered", value: stats.questionsAnswered, total: 2500, accent: "var(--color-blue)" },
            { label: "Mistakes resolved", value: stats.resolvedMistakes + 61, total: 100, accent: "var(--color-sage)" },
          ].map((c) => (
            <li key={c.label}>
              <MasteryBar
                label={c.label} value={(c.value / c.total) * 100} accent={c.accent}
                showValue={false} sublabel={`${c.value.toLocaleString()} of ${c.total.toLocaleString()}`}
              />
            </li>
          ))}
        </ul>
      </Card>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <CapybaraGuide variant="plain" name="On gamification" tone="paper" size={58}>
          <p>
            XP is a side effect here, not the point. You earn it for answering questions, finishing
            lessons, reviewing vocabulary and completing focus sessions — the things that move
            mastery anyway.
          </p>
          <p className="mt-2">
            There are no loot boxes, no currencies, no purchases, and nothing that expires if you
            take a week off.
          </p>
        </CapybaraGuide>

        <Card className="flex flex-col justify-between">
          <CardHeader eyebrow="Next unlock" title="Level 15 — reading lamp" description="Study-room items unlock at levels 5, 8, 10, 15, 20, 25 and 30." />
          <div className="mt-4">
            <Tag tone="ochre">{stats.xpToNext - stats.xpIntoLevel} XP away</Tag>
            <ButtonLink href="/room" variant="secondary" size="sm" full className="mt-4">
              Open your study room
            </ButtonLink>
          </div>
        </Card>
      </div>
    </PageBody>
  );
}
