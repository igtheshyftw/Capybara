"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { BarChart, SkillChart } from "@/components/ui/Charts";
import { MasteryBar } from "@/components/ui/Progress";
import { StudentTable } from "@/components/teacher/StudentTable";
import { teacher, teacherStudents, classes, assignments, skillBreakdown } from "@/lib/data/people";

export default function TeacherPage() {
  const flagged = teacherStudents.filter((s) => s.flag);
  const avgAccuracy = Math.round(teacherStudents.reduce((n, s) => n + s.accuracy, 0) / teacherStudents.length);
  const active = teacherStudents.filter((s) => s.lastActive === "Today" || s.lastActive === "Yesterday").length;

  const classAccuracy = teacherStudents.map((s) => ({ label: s.initials, value: s.accuracy }));

  return (
    <PageBody wide>
      <PageHeader
        eyebrow="Teacher account"
        title={`Good afternoon, ${teacher.salutation}.`}
        serif
        description="Two classes, eight students. The ones who need you are at the top."
        action={
          <>
            <ButtonLink href="/teacher/assignments/new" icon="plus">New assignment</ButtonLink>
            <ButtonLink href="/teacher/analytics" variant="secondary" icon="chart">Class analytics</ButtonLink>
          </>
        }
      />

      {/* ---------- class stats ---------- */}
      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Students", value: teacherStudents.length.toString(), foot: `${classes.length} classes`, icon: "users" as const },
          { label: "Active this week", value: `${active}/${teacherStudents.length}`, foot: "Studied in the last two days", icon: "check" as const },
          { label: "Class accuracy", value: `${avgAccuracy}%`, foot: "Mean across all students", icon: "target" as const },
          { label: "Needs attention", value: flagged.length.toString(), foot: "Flagged automatically", icon: "alert" as const },
        ].map((s) => (
          <Card key={s.label}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-[12.5px] font-medium text-ink-2">{s.label}</p>
              <Icon name={s.icon} size={16} className={`shrink-0 ${s.label === "Needs attention" && flagged.length ? "text-wrong" : "text-ink-3"}`} />
            </div>
            <p className="tabular mt-2.5 text-[26px] font-semibold leading-none tracking-[-0.02em] text-ink">{s.value}</p>
            <p className="mt-2.5 text-[11.5px] text-ink-3">{s.foot}</p>
          </Card>
        ))}
      </div>

      {/* ---------- needs attention ---------- */}
      {flagged.length > 0 && (
        <Card className="mt-3.5">
          <CardHeader
            eyebrow="Needs attention" title={`${flagged.length} students`}
            description="Flagged for accuracy below 60%, inactivity over a week, or overdue work."
            action={<ButtonLink href="/teacher/students" variant="secondary" size="sm">All students</ButtonLink>}
          />
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {flagged.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/teacher/students/${s.id}`}
                  className="group flex h-full flex-col rounded-[12px] border border-line bg-surface-2/50 p-4 transition-colors hover:border-line-2 hover:bg-surface-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-[12px] font-semibold text-ink-2">
                      {s.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-ink">{s.name}</p>
                      <p className="text-[12px] text-ink-3">Grade {s.grade} · {s.lastActive}</p>
                    </div>
                    <Tag tone="wrong" className="shrink-0">
                      {s.flag === "accuracy" ? "Accuracy" : s.flag === "inactive" ? "Inactive" : "Overdue"}
                    </Tag>
                  </div>
                  <p className="mt-3 text-[12.5px] leading-snug text-ink-2">
                    {s.flag === "accuracy"
                      ? `Accuracy at ${s.accuracy}% across the last two weeks. Weakest: ${s.weaknesses[0]}.`
                      : s.flag === "inactive"
                        ? `No activity for nine days and only ${s.minutesWeek} minutes this week.`
                        : `Assignment overdue. Accuracy is fine at ${s.accuracy}% — this looks like a scheduling problem, not a comprehension one.`}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-3 text-[12.5px] font-medium text-ink">
                    Open profile
                    <Icon name="arrow-right" size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1.6fr_1fr]">
        {/* ---------- roster ---------- */}
        <Card padded={false} className="overflow-hidden">
          <div className="p-5 pb-0">
            <CardHeader
              eyebrow="Roster" title="All students"
              action={<ButtonLink href="/teacher/students" variant="secondary" size="sm">Manage</ButtonLink>}
            />
          </div>
          <div className="mt-4">
            <StudentTable students={teacherStudents} compact />
          </div>
        </Card>

        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Class analytics" title="Accuracy by student" description="Bars below the class mean are shown in grey." />
            <div className="mt-6">
              <BarChart data={classAccuracy} target={avgAccuracy} accent="var(--color-sage)" suffix="%" ariaLabel="Accuracy by student" />
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Shared weaknesses" title="Where the class struggles" description="Aggregated across all eight students." />
            <div className="mt-5">
              <SkillChart data={[...skillBreakdown].sort((a, b) => a.value - b.value).slice(0, 5)} />
            </div>
            <p className="mt-4 border-t border-line pt-3.5 text-[12.5px] leading-relaxed text-ink-2">
              Rhetorical synthesis is weak across the whole group rather than for individuals —
              worth a lesson rather than eight interventions.
            </p>
            <ButtonLink href="/teacher/assignments/new" size="sm" variant="secondary" full className="mt-3.5">
              Assign practice on this
            </ButtonLink>
          </Card>

          <Card>
            <CardHeader
              eyebrow="Assignments" title="Recently set"
              action={<Link href="/teacher/assignments" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">All</Link>}
            />
            <ul className="mt-4 space-y-2.5">
              {assignments.slice(0, 4).map((a) => (
                <li key={a.id} className="rounded-[10px] border border-line bg-surface-2/50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[13px] font-medium leading-snug text-ink">{a.title}</p>
                    <Tag className="shrink-0">{a.type}</Tag>
                  </div>
                  <p className="mt-1.5 text-[11.5px] text-ink-3">Due {a.due} · {a.minutes} min</p>
                  <div className="mt-2.5">
                    <MasteryBar
                      value={a.status === "graded" ? 100 : a.progress} height={4} showValue={false}
                      accent="var(--color-ink-3)"
                      sublabel={`${a.status === "graded" ? teacherStudents.length : Math.round(teacherStudents.length * (a.progress / 100))} of ${teacherStudents.length} students`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </PageBody>
  );
}
