"use client";

import { useState } from "react";
import Link from "next/link";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LineChart, SkillChart } from "@/components/ui/Charts";
import { MasteryBar, ProgressRing } from "@/components/ui/Progress";
import { weeklyActivity, skillBreakdown, assignments, classes, teacherComment } from "@/lib/data/people";
import type { TeacherStudentRow } from "@/lib/types";

export function StudentProfileView({ student }: { student: TeacherStudentRow }) {
  const [comment, setComment] = useState("");
  const [posted, setPosted] = useState<string[]>([]);
  const klass = classes.find((c) => c.id === student.classId);

  // Scale the reference series to this student so each profile reads differently.
  const scale = student.accuracy / 73;
  const trend = weeklyActivity.map((w) => ({ label: w.week, value: Math.round(Math.min(99, w.accuracy * scale)) }));
  const skills = skillBreakdown.map((s) => ({ ...s, value: Math.round(Math.min(99, s.value * scale)) }));

  return (
    <PageBody>
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-[12.5px] text-ink-3">
        <Link href="/teacher/students" className="transition-colors hover:text-ink">Students</Link>
        <Icon name="chevron-right" size={13} />
        <span className="text-ink-2">{klass?.name}</span>
      </nav>

      {/* ---------- header ---------- */}
      <Card>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[19px] font-semibold text-ink-2">
              {student.initials}
            </span>
            <div>
              <h1 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">{student.name}</h1>
              <p className="mt-1 text-[13.5px] text-ink-2">Grade {student.grade} · {student.course}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <Tag>{klass?.name}</Tag>
                <Tag tone={student.streak > 7 ? "sage" : "neutral"}>{student.streak}-day streak</Tag>
                {student.flag && <Tag tone="wrong">Needs attention</Tag>}
                <Tag>Last active {student.lastActive.toLowerCase()}</Tag>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <ProgressRing value={student.accuracy} size={78} accent={student.accuracy >= 75 ? "var(--color-sage)" : "var(--color-clay)"} sublabel="accuracy" />
            <ProgressRing value={student.progress} size={78} accent="var(--color-blue)" sublabel="course" />
          </div>
        </div>
      </Card>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Trend" title="Accuracy over eight weeks" />
            <div className="mt-6">
              <LineChart data={trend} accent="var(--color-sage)" valueSuffix="%" height={170} ariaLabel={`${student.name} accuracy by week`} />
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Skills" title="Detailed breakdown" description="Sorted by accuracy across all attempts." />
            <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              <SkillChart data={[...skills].sort((a, b) => b.value - a.value).slice(0, 4)} />
              <SkillChart data={[...skills].sort((a, b) => b.value - a.value).slice(4)} />
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Assignments" title="Submission record" />
            <div className="mt-4 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[520px] border-collapse text-[13.5px]">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="pb-2.5 pr-4 font-semibold text-ink">Assignment</th>
                    <th className="pb-2.5 pr-4 font-semibold text-ink">Due</th>
                    <th className="pb-2.5 pr-4 font-semibold text-ink">Status</th>
                    <th className="pb-2.5 text-right font-semibold text-ink">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.slice(0, 5).map((a) => (
                    <tr key={a.id} className="border-b border-line last:border-b-0">
                      <td className="py-2.5 pr-4 text-ink">{a.title}</td>
                      <td className="py-2.5 pr-4 text-ink-2">{a.due}</td>
                      <td className="py-2.5 pr-4">
                        <Tag tone={a.status === "overdue" ? "wrong" : a.status === "graded" ? "correct" : "neutral"}>
                          {a.status.replace("-", " ")}
                        </Tag>
                      </td>
                      <td className="tabular py-2.5 text-right font-medium text-ink">{a.score != null ? `${a.score}%` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Assessment" title="Strengths and gaps" />
            <div className="mt-4">
              <p className="eyebrow mb-2">Strengths</p>
              <ul className="space-y-1.5">
                {student.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
                    <Icon name="check" size={14} className="mt-[3px] shrink-0 text-sage" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <p className="eyebrow mb-2">Requires attention</p>
              <ul className="space-y-1.5">
                {student.weaknesses.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
                    <Icon name="alert" size={14} className="mt-[3px] shrink-0 text-clay" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="This week" title="Activity" />
            <div className="mt-4 space-y-4">
              <MasteryBar label="Course progress" value={student.progress} accent="var(--color-blue)" />
              <MasteryBar
                label="Study time" value={Math.min(100, (student.minutesWeek / 300) * 100)}
                accent={student.minutesWeek < 120 ? "var(--color-clay)" : "var(--color-sage)"}
                showValue={false}
                sublabel={`${Math.floor(student.minutesWeek / 60)}h ${student.minutesWeek % 60}m of a 5-hour weekly target`}
              />
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Comment" title="Add a note" description="Visible to the student and their parent account." />
            {posted.length > 0 && (
              <ul className="mt-4 space-y-2">
                {posted.map((p, i) => (
                  <li key={i} className="rounded-[10px] border border-line bg-surface-2/60 p-3 text-[13px] leading-relaxed text-ink-2">
                    {p}
                    <span className="mt-1.5 block text-[11.5px] text-ink-3">Just now · you</span>
                  </li>
                ))}
              </ul>
            )}
            <textarea
              aria-label={`Comment on ${student.name}`}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder={`What should ${student.name.split(" ")[0]} focus on this week?`}
              className="mt-4 w-full resize-none rounded-[11px] border border-line-strong bg-surface p-3 text-[13.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button
                size="sm" disabled={!comment.trim()}
                onClick={() => { setPosted((p) => [...p, comment.trim()]); setComment(""); }}
                icon="send"
              >
                Post comment
              </Button>
              <Button
                size="sm" variant="secondary"
                onClick={() => setComment(teacherComment.slice(0, 180) + "…")}
              >
                Use last summary
              </Button>
            </div>
          </Card>

          <ButtonLink href="/teacher/assignments/new" variant="secondary" size="sm" full icon="plus">
            Assign work to {student.name.split(" ")[0]}
          </ButtonLink>
        </div>
      </div>
    </PageBody>
  );
}
