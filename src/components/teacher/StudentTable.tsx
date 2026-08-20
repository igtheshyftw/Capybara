"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { TeacherStudentRow } from "@/lib/types";

type SortKey = "name" | "progress" | "accuracy" | "minutesWeek" | "streak";

const flagLabel = { accuracy: "Accuracy", inactive: "Inactive", overdue: "Overdue" } as const;

export function StudentTable({ students, compact = false }: { students: TeacherStudentRow[]; compact?: boolean }) {
  const [sort, setSort] = useState<SortKey>("accuracy");
  const [dir, setDir] = useState<1 | -1>(1);

  const rows = [...students].sort((a, b) => {
    // Flagged students always surface first — that is the point of the table.
    if (a.flag && !b.flag) return -1;
    if (!a.flag && b.flag) return 1;
    const av = a[sort], bv = b[sort];
    if (typeof av === "string" && typeof bv === "string") return av.localeCompare(bv) * dir;
    return ((av as number) - (bv as number)) * dir;
  });

  function toggle(key: SortKey) {
    if (sort === key) setDir((d) => (d === 1 ? -1 : 1));
    else { setSort(key); setDir(1); }
  }

  const columns: { key: SortKey; label: string; align?: string; hide?: string }[] = [
    { key: "name", label: "Student" },
    { key: "progress", label: "Progress", align: "text-right", hide: compact ? "hidden sm:table-cell" : "" },
    { key: "accuracy", label: "Accuracy", align: "text-right" },
    { key: "minutesWeek", label: "This week", align: "text-right", hide: "hidden md:table-cell" },
    { key: "streak", label: "Streak", align: "text-right", hide: "hidden lg:table-cell" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr className="border-y border-line bg-surface-2/50">
            {columns.map((c) => (
              <th key={c.key} className={`px-4 py-2.5 text-left font-semibold ${c.align ?? ""} ${c.hide ?? ""}`}>
                <button
                  onClick={() => toggle(c.key)}
                  className={`inline-flex items-center gap-1 text-ink transition-colors hover:text-ink-2 ${c.align === "text-right" ? "flex-row-reverse" : ""}`}
                  aria-sort={sort === c.key ? (dir === 1 ? "ascending" : "descending") : "none"}
                >
                  {c.label}
                  <Icon
                    name="chevron-down" size={12}
                    className={`transition-[transform,opacity] ${sort === c.key ? "opacity-100" : "opacity-0"} ${sort === c.key && dir === -1 ? "rotate-180" : ""}`}
                  />
                </button>
              </th>
            ))}
            <th className="px-4 py-2.5 text-right font-semibold text-ink">Attention</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.id} className="border-b border-line transition-colors last:border-b-0 hover:bg-surface-2/40">
              <td className="px-4 py-3">
                <Link href={`/teacher/students/${s.id}`} className="group flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[11px] font-semibold text-ink-2">
                    {s.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-ink group-hover:underline group-hover:decoration-line-2 group-hover:underline-offset-4">
                      {s.name}
                    </span>
                    <span className="block truncate text-[12px] text-ink-3">{s.course}</span>
                  </span>
                </Link>
              </td>
              <td className={`px-4 py-3 text-right ${compact ? "hidden sm:table-cell" : ""}`}>
                <span className="inline-flex items-center gap-2.5">
                  <span className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-surface-3 lg:block">
                    <span className="block h-full rounded-full bg-ink-3" style={{ width: `${s.progress}%` }} />
                  </span>
                  <span className="tabular text-ink-2">{s.progress}%</span>
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <span className={`tabular font-medium ${s.accuracy < 60 ? "text-wrong" : s.accuracy >= 80 ? "text-correct" : "text-ink"}`}>
                  {s.accuracy}%
                </span>
              </td>
              <td className="tabular hidden px-4 py-3 text-right text-ink-2 md:table-cell">
                {Math.floor(s.minutesWeek / 60)}h {s.minutesWeek % 60}m
              </td>
              <td className="tabular hidden px-4 py-3 text-right text-ink-2 lg:table-cell">{s.streak}d</td>
              <td className="px-4 py-3 text-right">
                {s.flag ? <Tag tone="wrong">{flagLabel[s.flag]}</Tag> : <span className="text-[12px] text-ink-3">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
