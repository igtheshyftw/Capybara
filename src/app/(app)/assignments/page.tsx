"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { EmptyState } from "@/components/learning/EmptyState";
import { assignments } from "@/lib/data/people";
import type { Assignment, AssignmentStatus } from "@/lib/types";

const typeIcon: Record<Assignment["type"], IconName> = {
  Reading: "book", Vocabulary: "cards", Writing: "pen", Quiz: "target", "Mock Exam": "clipboard",
};

const statusTone: Record<AssignmentStatus, "neutral" | "ochre" | "sage" | "wrong" | "correct"> = {
  "not-started": "neutral", "in-progress": "ochre", submitted: "sage", graded: "correct", overdue: "wrong",
};

const statusLabel: Record<AssignmentStatus, string> = {
  "not-started": "Not started", "in-progress": "In progress", submitted: "Submitted", graded: "Graded", overdue: "Overdue",
};

const tabs = ["Due", "Completed", "All"] as const;

export default function AssignmentsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Due");

  const visible = assignments.filter((a) => {
    if (tab === "All") return true;
    if (tab === "Completed") return a.status === "graded" || a.status === "submitted";
    return a.status !== "graded" && a.status !== "submitted";
  }).sort((a, b) => a.dueInDays - b.dueInDays);

  const overdue = assignments.filter((a) => a.status === "overdue").length;
  const dueToday = assignments.filter((a) => a.dueInDays === 0).length;

  return (
    <PageBody>
      <PageHeader
        eyebrow="Assignments"
        title="What has been set for you"
        serif
        description="Everything assigned by your teachers, with the work itself one click away."
      />

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Card className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-wrong/25 bg-wrong-soft text-wrong-ink">
            <Icon name="alert" size={19} />
          </span>
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">{overdue}</p>
            <p className="mt-1 text-[12.5px] text-ink-3">overdue</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-ochre/25 bg-ochre-soft text-ochre-ink">
            <Icon name="clock" size={19} />
          </span>
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">{dueToday}</p>
            <p className="mt-1 text-[12.5px] text-ink-3">due today</p>
          </div>
        </Card>
        <Card className="flex items-center gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-sage/25 bg-sage-soft text-sage-ink">
            <Icon name="check" size={19} />
          </span>
          <div>
            <p className="tabular text-[22px] font-semibold leading-none text-ink">
              {assignments.filter((a) => a.status === "graded").length}
            </p>
            <p className="mt-1 text-[12.5px] text-ink-3">graded</p>
          </div>
        </Card>
      </div>

      <div className="mt-7 flex rounded-[9px] border border-line bg-surface p-[3px] sm:w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`relative flex-1 rounded-[6px] px-4 py-1.5 text-[13px] font-medium transition-colors duration-200 sm:flex-none ${
              tab === t ? "text-ink-inv" : "text-ink-3 hover:text-ink"
            }`}
          >
            {tab === t && <motion.span layoutId="assign-tab" className="absolute inset-0 rounded-[6px] bg-ink" transition={{ type: "spring", stiffness: 460, damping: 38 }} />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            variant="professor"
            title="Nothing here."
            body="When a teacher sets work it will appear here with its due date and time estimate."
            action={<ButtonLink href="/learn" size="sm">Browse courses</ButtonLink>}
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {visible.map((a) => (
            <li key={a.id}>
              <Link
                href={a.targetHref}
                className="group flex flex-col gap-4 rounded-[13px] border border-line bg-surface p-4 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[2px] hover:border-line-2 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:p-5"
              >
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-[12px] border ${
                  a.status === "overdue" ? "border-wrong/25 bg-wrong-soft text-wrong-ink" : "border-line bg-surface-2 text-ink-2"
                }`}>
                  <Icon name={typeIcon[a.type]} size={19} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{a.title}</span>
                    <Tag tone={statusTone[a.status]}>{statusLabel[a.status]}</Tag>
                  </span>
                  <span className="mt-1 block text-[12.5px] text-ink-3">
                    {a.courseTitle} · {a.type} · {a.minutes} min · set by {a.assignedBy}
                  </span>
                  {a.progress > 0 && a.progress < 100 && (
                    <span className="mt-2.5 block max-w-[260px]">
                      <MasteryBar value={a.progress} height={5} showValue={false} accent="var(--color-ochre)" />
                    </span>
                  )}
                </span>

                <span className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-end sm:gap-1">
                  <span className={`text-[13px] font-medium ${a.dueInDays < 0 ? "text-wrong" : a.dueInDays === 0 ? "text-ochre-ink" : "text-ink-2"}`}>
                    {a.due}
                  </span>
                  {a.score != null && <span className="tabular text-[12.5px] text-ink-3">Scored {a.score}%</span>}
                </span>

                <Icon name="chevron-right" size={18} className="hidden shrink-0 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageBody>
  );
}
