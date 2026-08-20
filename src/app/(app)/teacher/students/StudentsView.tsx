"use client";

import { useMemo, useState } from "react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StudentTable } from "@/components/teacher/StudentTable";
import type { TeacherStudentRow } from "@/lib/types";
import { EmptyState } from "@/components/learning/EmptyState";


export function StudentsView({ rows, classes }: { rows: TeacherStudentRow[]; classes: { id: string; name: string }[] }) {
  const [query, setQuery] = useState("");
  const [classId, setClassId] = useState("all");
  const [onlyFlagged, setOnlyFlagged] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((s) => {
      if (classId !== "all" && s.classId !== classId) return false;
      if (onlyFlagged && !s.flag) return false;
      if (q && !`${s.name} ${s.course} ${s.strengths.join(" ")} ${s.weaknesses.join(" ")}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, classId, onlyFlagged, rows]);

  return (
    <PageBody wide>
      <PageHeader
        eyebrow="Students"
        title="Your roster"
        serif
        description="Sorted with flagged students first. Click any row for the full academic profile."
        action={<ButtonLink href="/teacher/assignments/new" icon="plus">New assignment</ButtonLink>}
      />

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search students</span>
          <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, course or skill"
            className="h-10 w-full rounded-[10px] border border-line-strong bg-surface pl-9 pr-3 text-[13.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
          />
        </label>
        <label className="relative">
          <span className="sr-only">Class</span>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="h-10 appearance-none rounded-[10px] border border-line-strong bg-surface pl-3 pr-8 text-[13px] outline-none transition-colors hover:border-line-2 focus:border-ink-3"
          >
            <option value="all">All classes</option>
            {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <Icon name="chevron-down" size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-3" />
        </label>
        <Button
          variant={onlyFlagged ? "primary" : "secondary"}
          size="md"
          icon="alert"
          onClick={() => setOnlyFlagged(!onlyFlagged)}
        >
          Needs attention
        </Button>
      </div>

      <p className="mt-5 text-[12.5px] text-ink-3" role="status">
        {filtered.length} student{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            variant="professor"
            title="No students match those filters."
            body="Try clearing the search or switching back to all classes."
            action={<Button size="sm" variant="secondary" onClick={() => { setQuery(""); setClassId("all"); setOnlyFlagged(false); }}>Reset filters</Button>}
          />
        </div>
      ) : (
        <Card padded={false} className="mt-3 overflow-hidden">
          <StudentTable students={filtered} />
        </Card>
      )}
    </PageBody>
  );
}
