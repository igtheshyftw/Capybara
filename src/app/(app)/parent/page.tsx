"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LineChart, BarChart } from "@/components/ui/Charts";
import { MasteryBar, CountUp } from "@/components/ui/Progress";
import { student, parentWeekly, weeklyActivity, dailyMinutes, teacherComment, assignments, skillBreakdown } from "@/lib/data/people";

function Delta({ now, prev, suffix = "" }: { now: number; prev: number; suffix?: string }) {
  const d = now - prev;
  if (d === 0) return <span className="text-[12.5px] text-ink-3">no change</span>;
  return (
    <span className={`tabular flex items-center gap-1 text-[12.5px] font-medium ${d > 0 ? "text-correct" : "text-wrong"}`}>
      <Icon name={d > 0 ? "trend-up" : "trend-down"} size={13} />
      {d > 0 ? "+" : ""}{d}{suffix} on last week
    </span>
  );
}

export default function ParentPage() {
  const sorted = [...skillBreakdown].sort((a, b) => b.value - a.value);
  const strengths = sorted.slice(0, 2);
  const attention = [...sorted].reverse().slice(0, 2);
  const done = assignments.filter((a) => a.status === "graded" || a.status === "submitted").length;

  return (
    <PageBody>
      <PageHeader
        eyebrow="Parent account"
        title={`${student.name.split(" ")[0]}'s week`}
        serif
        description="A summary of what your child has been working on, how it is going, and what their teacher has said. Deliberately not a record of every click."
        action={<ButtonLink href="/parent/report" variant="secondary" icon="print">Progress report</ButtonLink>}
      />

      {/* ---------- weekly overview ---------- */}
      <section className="mt-7" aria-labelledby="overview">
        <h2 id="overview" className="sr-only">Weekly overview</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Study time", value: parentWeekly.minutes, prev: parentWeekly.minutesPrev, format: (v: number) => `${Math.floor(v / 60)}h ${v % 60}m`, icon: "clock" as const },
            { label: "Lessons completed", value: parentWeekly.lessons, prev: parentWeekly.lessonsPrev, format: (v: number) => `${v}`, icon: "book" as const },
            { label: "Assignments done", value: parentWeekly.assignmentsDone, prev: 3, format: (v: number) => `${v} of ${parentWeekly.assignmentsTotal}`, icon: "clipboard" as const },
            { label: "Accuracy", value: parentWeekly.accuracy, prev: parentWeekly.accuracyPrev, format: (v: number) => `${v}%`, icon: "target" as const },
          ].map((s) => (
            <Card key={s.label}>
              <div className="flex items-start justify-between gap-3">
                <p className="text-[12.5px] font-medium text-ink-2">{s.label}</p>
                <Icon name={s.icon} size={16} className="shrink-0 text-ink-3" />
              </div>
              <p className="tabular mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">
                {s.format(s.value)}
              </p>
              <div className="mt-3">
                <Delta now={s.value} prev={s.prev} />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        {/* ---------- trend ---------- */}
        <div className="space-y-3.5">
          <Card>
            <CardHeader
              eyebrow="Progress trend" title="Accuracy over eight weeks"
              description="The clearest single measure of whether the work is paying off."
            />
            <div className="mt-6">
              <LineChart
                data={weeklyActivity.map((w) => ({ label: w.week, value: w.accuracy }))}
                accent="var(--color-sage)" valueSuffix="%" height={180}
                ariaLabel="Accuracy by week over eight weeks"
              />
            </div>
            <p className="mt-4 border-t border-line pt-4 text-[14px] leading-relaxed text-ink-2">
              Accuracy has risen from <span className="tabular font-semibold text-ink">61%</span> to{" "}
              <span className="tabular font-semibold text-ink">76%</span> since late June — a steady
              improvement rather than a spike, which usually means the gains will hold.
            </p>
          </Card>

          <Card>
            <CardHeader eyebrow="This week" title="Study pattern" description="Consistency matters more than any single long session." />
            <div className="mt-6">
              <BarChart
                data={dailyMinutes.map((d) => ({ label: d.day, value: d.minutes }))}
                target={40} accent="var(--color-blue)" ariaLabel="Study minutes each day this week"
              />
            </div>
            <p className="mt-4 border-t border-line pt-4 text-[13.5px] text-ink-2">
              Studied on <span className="font-semibold text-ink">7 of 7 days</span>, hitting the
              40-minute daily target on four of them.
            </p>
          </Card>

          {/* ---------- teacher summary ---------- */}
          <Card>
            <CardHeader eyebrow="Teacher summary" title="Dr. Elena Marsh" description="English & Test Preparation · written 16 August" />
            <blockquote className="mt-4 border-l-2 border-line-2 pl-4 font-serif text-[15.5px] leading-[1.75] text-ink">
              {teacherComment}
            </blockquote>
            <ButtonLink href="/parent/notes" variant="secondary" size="sm" className="mt-5">
              All teacher notes
            </ButtonLink>
          </Card>
        </div>

        {/* ---------- strengths / attention ---------- */}
        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Academic strengths" title="What is going well" />
            <ul className="mt-4 space-y-4">
              {strengths.map((s) => (
                <li key={s.skill}>
                  <MasteryBar label={s.skill} value={s.value} accent="var(--color-sage)" sublabel={`Based on ${s.attempts} questions`} />
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-3.5 text-[13px] leading-relaxed text-ink-2">
              These are stable across several weeks rather than a single good session.
            </p>
          </Card>

          <Card>
            <CardHeader eyebrow="Needs attention" title="Where the work is" />
            <ul className="mt-4 space-y-4">
              {attention.map((s) => (
                <li key={s.skill}>
                  <MasteryBar label={s.skill} value={s.value} accent="var(--color-clay)" sublabel={`Based on ${s.attempts} questions`} />
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-3.5 text-[13px] leading-relaxed text-ink-2">
              Both are being worked on in class. Neither indicates a problem with effort — the
              pattern is a specific reasoning habit rather than a gap in knowledge.
            </p>
          </Card>

          <Card>
            <CardHeader
              eyebrow="Assignments" title={`${done} graded`}
              description={`${assignments.length - done} still open across all courses.`}
              action={<Link href="/parent/assignments" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">All</Link>}
            />
            <ul className="mt-4 space-y-2">
              {assignments.slice(0, 4).map((a) => (
                <li key={a.id} className="flex items-center gap-3 rounded-[10px] border border-line bg-surface-2/50 px-3.5 py-2.5">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-medium text-ink">{a.title}</span>
                    <span className="block text-[11.5px] text-ink-3">{a.due}</span>
                  </span>
                  <Tag tone={a.status === "overdue" ? "wrong" : a.status === "graded" ? "correct" : "neutral"} className="shrink-0">
                    {a.status === "overdue" ? "Overdue" : a.status === "graded" ? `${a.score}%` : "Open"}
                  </Tag>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="Consistency" title={`${student.streak}-day streak`} />
            <p className="tabular mt-3 serif-display text-[34px] leading-none">
              <CountUp to={student.streak} /> days
            </p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">
              Longest run so far is {student.longestStreak} days. A missed day is not a setback —
              the review schedule adjusts automatically.
            </p>
          </Card>

          <div className="rounded-[13px] border border-line bg-surface-2/60 p-4">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
              <Icon name="info" size={15} className="text-ink-3" />
              What you can see
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
              This account shows summaries, trends and teacher feedback. It does not show
              individual answers, chat history, or minute-by-minute activity. Parents need clarity,
              not surveillance.
            </p>
          </div>
        </div>
      </div>
    </PageBody>
  );
}
