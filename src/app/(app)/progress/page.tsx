"use client";

import { useState } from "react";
import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LineChart, BarChart, SkillChart } from "@/components/ui/Charts";
import { MasteryBar, ProgressRing, CountUp } from "@/components/ui/Progress";
import { StatCard } from "@/components/learning/StatCard";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useApp, useStats } from "@/lib/store";
import { weeklyActivity, dailyMinutes, masteryMap, skillBreakdown } from "@/lib/data/people";
import { questionById } from "@/lib/data/questions";
import { skillById } from "@/lib/data/skills";

type Metric = "accuracy" | "minutes" | "questions" | "lessons";

const metrics: { id: Metric; label: string; suffix: string; accent: string }[] = [
  { id: "accuracy", label: "Accuracy", suffix: "%", accent: "var(--color-sage)" },
  { id: "minutes", label: "Study time", suffix: " min", accent: "var(--color-blue)" },
  { id: "questions", label: "Questions", suffix: "", accent: "var(--color-ochre)" },
  { id: "lessons", label: "Lessons", suffix: "", accent: "var(--color-clay)" },
];

const domainAccent: Record<string, string> = {
  Reading: "var(--color-blue)", Vocabulary: "var(--color-ochre)",
  Writing: "var(--color-clay)", Grammar: "var(--color-sage)",
};

export default function ProgressPage() {
  const app = useApp();
  const stats = useStats();
  const [metric, setMetric] = useState<Metric>("accuracy");

  const active = metrics.find((m) => m.id === metric)!;
  const sorted = [...skillBreakdown].sort((a, b) => b.value - a.value);
  const strongest = sorted.slice(0, 3);
  const weakest = [...sorted].reverse().slice(0, 3);

  const recentMistakes = app.mistakes.slice(0, 4);
  const first = weeklyActivity[0], last = weeklyActivity[weeklyActivity.length - 1];

  return (
    <PageBody wide>
      <PageHeader
        eyebrow="Progress"
        title="What the numbers actually say"
        serif
        description="Accuracy on its own is not diagnostic. These views break it down by skill, by week and by the kind of mistake you are making."
        action={<ButtonLink href="/mistakes" variant="secondary" icon="magnifier">Mistake notebook</ButtonLink>}
      />

      {/* ---------- headline stats ---------- */}
      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Overall accuracy" value={stats.accuracy} suffix="%" delta={last.accuracy - first.accuracy} icon="target" trend={weeklyActivity.map((w) => w.accuracy)} accent="var(--color-sage)" footnote="Eight-week change" />
        <StatCard label="Questions answered" value={stats.questionsAnswered} icon="list" trend={weeklyActivity.map((w) => w.questions)} footnote="All time" />
        <StatCard label="Study time this month" value={Math.round(stats.minutesThisMonth / 6) / 10} suffix="h" decimals={1} icon="clock" trend={weeklyActivity.map((w) => w.minutes)} footnote="18.4 hours across 31 sessions" />
        <StatCard label="Vocabulary mastered" value={stats.wordsMastered} icon="cards" delta={18} trend={[352, 368, 381, 394, 402, 411, 419, stats.wordsMastered]} accent="var(--color-ochre)" footnote="Of 600 in the library" />
      </div>

      {/* ---------- improvement over time ---------- */}
      <Card className="mt-3.5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <CardHeader
            eyebrow="Improvement over time"
            title={`${active.label} across eight weeks`}
            description="Each point is one week. Hover or tab through the chart to read individual values."
          />
          <div className="flex flex-wrap gap-1.5">
            {metrics.map((m) => (
              <button
                key={m.id}
                onClick={() => setMetric(m.id)}
                aria-pressed={metric === m.id}
                className={`rounded-[8px] border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                  metric === m.id ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <LineChart
            data={weeklyActivity.map((w) => ({ label: w.week, value: w[metric] }))}
            accent={active.accent}
            valueSuffix={active.suffix}
            height={190}
            ariaLabel={`${active.label} by week`}
          />
        </div>
        <p className="mt-4 border-t border-line pt-4 text-[13.5px] text-ink-2">
          You improved from{" "}
          <span className="tabular font-semibold text-ink">{first[metric]}{active.suffix}</span> to{" "}
          <span className="tabular font-semibold text-ink">{last[metric]}{active.suffix}</span> over eight weeks.
        </p>
      </Card>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
        {/* ---------- mastery ---------- */}
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Skill mastery" title="All twelve skills" description="Sorted by accuracy. The number after each bar is how many questions the figure is based on." />
          <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            <SkillChart data={sorted.slice(0, 4)} />
            <SkillChart data={sorted.slice(4)} />
          </div>
        </Card>

        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Domains" title="By subject area" />
            <ul className="mt-5 space-y-4">
              {masteryMap.map((m) => (
                <li key={m.skill}>
                  <MasteryBar label={m.skill} value={m.value} delta={m.delta} accent={domainAccent[m.domain]} />
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="This week" title="Study minutes" />
            <div className="mt-5">
              <BarChart
                data={dailyMinutes.map((d) => ({ label: d.day, value: d.minutes }))}
                target={40} accent="var(--color-blue)" ariaLabel="Study minutes by day"
              />
            </div>
          </Card>
        </div>
      </div>

      {/* ---------- strengths / weaknesses / mistakes ---------- */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
        <Card>
          <CardHeader eyebrow="Strongest skills" title="What is working" />
          <ul className="mt-4 space-y-3">
            {strongest.map((s) => (
              <li key={s.skill} className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-sage/25 bg-sage-soft text-sage-ink">
                  <Icon name="trend-up" size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-medium text-ink">{s.skill}</span>
                  <span className="block text-[12px] text-ink-3">{s.attempts} questions</span>
                </span>
                <span className="tabular shrink-0 text-[15px] font-semibold text-ink">{s.value}%</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader eyebrow="Weakest skills" title="Where the points are" />
          <ul className="mt-4 space-y-3">
            {weakest.map((s) => (
              <li key={s.skill} className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-clay/25 bg-clay-soft text-clay-ink">
                  <Icon name="trend-down" size={15} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-medium text-ink">{s.skill}</span>
                  <span className="block text-[12px] text-ink-3">{s.attempts} questions</span>
                </span>
                <span className="tabular shrink-0 text-[15px] font-semibold text-ink">{s.value}%</span>
              </li>
            ))}
          </ul>
          <ButtonLink href="/practice/inference" size="sm" variant="secondary" full className="mt-4">
            Practise the weakest
          </ButtonLink>
        </Card>

        <Card>
          <CardHeader
            eyebrow="Recent mistakes" title={`${stats.openMistakes} open`}
            action={<Link href="/mistakes" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">All</Link>}
          />
          {recentMistakes.length === 0 ? (
            <p className="mt-4 text-[13.5px] leading-relaxed text-ink-2">
              Nothing recorded in this session. Answer practice questions and anything you miss
              lands here with its full rationale.
            </p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {recentMistakes.map((m) => (
                <li key={m.id} className="rounded-[10px] border border-line bg-surface-2/50 p-3">
                  <div className="flex items-center gap-2">
                    <Tag tone="blue">{skillById[m.skill].name}</Tag>
                    {m.reason && <Tag tone="ochre">classified</Tag>}
                  </div>
                  <p className="mt-2 line-clamp-2 text-[12.5px] leading-snug text-ink-2">
                    {questionById[m.questionId]?.prompt.split("\n")[0]}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {/* ---------- level + reading ---------- */}
      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1fr_1.6fr]">
        <Card className="flex items-center gap-6">
          <ProgressRing value={(stats.xpIntoLevel / stats.xpToNext) * 100} size={92} accent="var(--color-ochre)" label={`Lv ${stats.level}`} />
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">
              <CountUp to={stats.xp} /> XP
            </p>
            <p className="mt-1.5 text-[13px] text-ink-2">{stats.xpToNext - stats.xpIntoLevel} to level {stats.level + 1}</p>
            <Link href="/achievements" className="mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink underline decoration-line-2 underline-offset-4">
              Achievements
              <Icon name="arrow-right" size={13} />
            </Link>
          </div>
        </Card>

        <CapybaraGuide variant="detective" name="What this says" tone="paper" size={58}>
          <p>
            Your accuracy rose seven points in eight weeks while study time rose about fifty
            percent, so the gain is coming from volume as much as from technique.
          </p>
          <p className="mt-2">
            Rhetorical synthesis at 49% across only 71 attempts is the thinnest evidence base on
            the board — it is both your weakest skill and the one you have practised least.
          </p>
        </CapybaraGuide>
      </div>
    </PageBody>
  );
}
