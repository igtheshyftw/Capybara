"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { assignments, teacherStudents } from "@/lib/data/people";

export default function TeacherAssignmentsPage() {
  const total = teacherStudents.length;

  return (
    <PageBody>
      <PageHeader
        eyebrow="Assignments"
        title="What you have set"
        serif
        description="Completion is shown per assignment. Click through to see who has not submitted."
        action={<ButtonLink href="/teacher/assignments/new" icon="plus">New assignment</ButtonLink>}
      />

      <div className="mt-7 space-y-2.5">
        {assignments.map((a) => {
          const submitted = a.status === "graded" ? total : Math.round(total * (a.progress / 100)) + 2;
          const pct = Math.round((submitted / total) * 100);
          return (
            <Card key={a.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">{a.title}</h2>
                    <Tag>{a.type}</Tag>
                    {a.dueInDays < 0 && a.status !== "graded" && <Tag tone="wrong">Past due</Tag>}
                  </div>
                  <p className="mt-1 text-[12.5px] text-ink-3">
                    {a.courseTitle} · due {a.due} · {a.minutes} min
                  </p>
                  <div className="mt-3 max-w-sm">
                    <MasteryBar
                      value={pct} height={6} showValue={false}
                      accent={pct === 100 ? "var(--color-sage)" : pct >= 50 ? "var(--color-ochre)" : "var(--color-clay)"}
                      sublabel={`${submitted} of ${total} students submitted`}
                    />
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  <div className="text-right">
                    <p className="tabular text-[20px] font-semibold leading-none text-ink">{pct}%</p>
                    <p className="mt-1 text-[11.5px] text-ink-3">complete</p>
                  </div>
                  <Link
                    href="/teacher/students"
                    className="flex items-center gap-1.5 rounded-[9px] border border-line bg-surface px-3 py-2 text-[12.5px] font-medium text-ink transition-colors hover:border-line-2"
                  >
                    Who is missing
                    <Icon name="chevron-right" size={14} className="text-ink-3" />
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </PageBody>
  );
}
