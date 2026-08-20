"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { assignments, student } from "@/lib/data/people";

const statusTone = {
  "not-started": "neutral", "in-progress": "ochre", submitted: "sage", graded: "correct", overdue: "wrong",
} as const;

export default function ParentAssignmentsPage() {
  const overdue = assignments.filter((a) => a.status === "overdue");
  const graded = assignments.filter((a) => a.status === "graded");

  return (
    <PageBody>
      <PageHeader
        eyebrow="Assignments"
        title="What has been set, and what is done"
        serif
        description={`Everything ${student.name.split(" ")[0]}'s teachers have assigned, with due dates and completion. Scores appear once work has been graded.`}
      />

      {overdue.length > 0 && (
        <Card className="mt-7 border-wrong/30 bg-wrong-soft/30">
          <div className="flex items-start gap-3.5">
            <Icon name="alert" size={19} className="mt-[2px] shrink-0 text-wrong" />
            <div>
              <p className="text-[14.5px] font-semibold text-ink">
                {overdue.length} assignment{overdue.length === 1 ? " is" : "s are"} overdue
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                {overdue.map((a) => a.title).join(", ")}. Worth a conversation rather than a
                reminder — the quiz is twelve minutes long, so the delay is unlikely to be about time.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Card className="mt-3.5">
        <CardHeader
          eyebrow="All assignments" title={`${graded.length} graded · ${assignments.length - graded.length} outstanding`}
        />
        <div className="mt-5 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[640px] border-collapse text-[13.5px]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pb-2.5 pr-4 font-semibold text-ink">Assignment</th>
                <th className="pb-2.5 pr-4 font-semibold text-ink">Set by</th>
                <th className="pb-2.5 pr-4 font-semibold text-ink">Due</th>
                <th className="pb-2.5 pr-4 font-semibold text-ink">Status</th>
                <th className="pb-2.5 text-right font-semibold text-ink">Score</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id} className="border-b border-line last:border-b-0">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-ink">{a.title}</p>
                    <p className="mt-0.5 text-[12px] text-ink-3">{a.courseTitle} · {a.minutes} min</p>
                    {a.progress > 0 && a.progress < 100 && (
                      <div className="mt-2 max-w-[160px]">
                        <MasteryBar value={a.progress} height={4} showValue={false} accent="var(--color-ochre)" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-ink-2">{a.assignedBy}</td>
                  <td className={`py-3 pr-4 ${a.dueInDays < 0 ? "text-wrong" : "text-ink-2"}`}>{a.due}</td>
                  <td className="py-3 pr-4"><Tag tone={statusTone[a.status]}>{a.status.replace("-", " ")}</Tag></td>
                  <td className="tabular py-3 text-right font-medium text-ink">{a.score != null ? `${a.score}%` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageBody>
  );
}
