"use client";

import { useMemo, useState } from "react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { CourseCard } from "@/components/learning/CourseCard";
import { EmptyState } from "@/components/learning/EmptyState";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { courses } from "@/lib/data/courses";
import type { Difficulty } from "@/lib/types";

const categories = ["All", "SAT", "IELTS", "TOEFL", "Vocabulary", "Writing", "Literature", "Reading", "Grammar", "School"] as const;
const difficulties = ["All", "Foundation", "Core", "Advanced"] as const;
const progressFilters = ["All", "In progress", "Not started", "Recommended"] as const;

export default function LearnPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");
  const [progress, setProgress] = useState<(typeof progressFilters)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      if (category !== "All" && c.category !== category) return false;
      if (difficulty !== "All" && c.difficulty !== (difficulty as Difficulty)) return false;
      if (progress === "In progress" && c.progress === 0) return false;
      if (progress === "Not started" && c.progress > 0) return false;
      if (progress === "Recommended" && !c.recommended) return false;
      if (q && !(`${c.title} ${c.subtitle} ${c.description} ${c.skillTags.join(" ")}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [category, difficulty, progress, query]);

  const active = category !== "All" || difficulty !== "All" || progress !== "All" || query !== "";

  return (
    <PageBody>
      <PageHeader
        eyebrow="Course library"
        title="Everything you can study"
        serif
        description="Nine courses across exams, skills and school coursework. Filters narrow the list; progress and mastery travel with you between them."
      />

      {/* ---------- filters ---------- */}
      <div className="mt-7 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search courses</span>
            <Icon name="search" size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by subject, skill or exam"
              className="h-10 w-full rounded-[10px] border border-line-strong bg-surface pl-9 pr-3 text-[13.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
            />
          </label>
          <div className="flex items-center gap-2">
            <FilterSelect label="Difficulty" value={difficulty} options={difficulties} onChange={setDifficulty} />
            <FilterSelect label="Status" value={progress} options={progressFilters} onChange={setProgress} />
            {active && (
              <Button
                variant="tertiary" size="sm" icon="close"
                onClick={() => { setCategory("All"); setDifficulty("All"); setProgress("All"); setQuery(""); }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors duration-150 ${
                category === c
                  ? "border-ink bg-ink text-ink-inv"
                  : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* ---------- results ---------- */}
      <h2 className="sr-only">Courses</h2>
      <p className="mt-6 text-[12.5px] text-ink-3" role="status">
        {filtered.length} course{filtered.length === 1 ? "" : "s"}
        {active && " matching your filters"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            variant="professor"
            title="No courses match that combination."
            body="Try removing a filter — the library is small enough that broad searches work better than narrow ones."
            action={
              <Button variant="secondary" size="sm" onClick={() => { setCategory("All"); setDifficulty("All"); setProgress("All"); setQuery(""); }}>
                Reset filters
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <CourseCard key={c.id} course={c} featured={i === 0 && filtered.length > 2 && !active} />
          ))}
        </div>
      )}
    </PageBody>
  );
}

function FilterSelect<T extends string>({
  label, value, options, onChange,
}: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-10 appearance-none rounded-[10px] border border-line-strong bg-surface pl-3 pr-8 text-[13px] text-ink outline-none transition-colors hover:border-line-2 focus:border-ink-3"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o === "All" ? label : o}</option>
        ))}
      </select>
      <Icon name="chevron-down" size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-3" />
    </label>
  );
}
