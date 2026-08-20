"use client";

import Link from "next/link";
import { Tag } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { WorldArt, type WorldKind } from "@/components/marketing/WorldArt";
import type { Course } from "@/lib/types";

const artFor: Record<Course["category"], WorldKind> = {
  SAT: "sat", IELTS: "ielts", TOEFL: "toefl", Vocabulary: "vocab", Writing: "writing",
  Literature: "literature", Reading: "reading", Grammar: "grammar", School: "school",
};

const accentVar: Record<Course["accent"], string> = {
  sage: "var(--color-sage)", blue: "var(--color-blue)", clay: "var(--color-clay)",
  ochre: "var(--color-ochre)", plum: "var(--color-plum)",
};

const accentSoft: Record<Course["accent"], string> = {
  sage: "var(--color-sage-soft)", blue: "var(--color-blue-soft)", clay: "var(--color-clay-soft)",
  ochre: "var(--color-ochre-soft)", plum: "var(--color-plum-soft)",
};

export function CourseCard({ course, featured = false }: { course: Course; featured?: boolean }) {
  const started = course.progress > 0;
  return (
    <Link
      href={`/learn/${course.id}`}
      className={`group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-line-2 hover:shadow-[var(--shadow-lift)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className={`flex items-center justify-center px-4 py-4 ${featured ? "h-[160px]" : "h-[132px]"}`}
        style={{ background: accentSoft[course.accent] }}
      >
        <WorldArt kind={artFor[course.category]} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow mb-1.5">{course.category}</p>
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{course.title}</h3>
          </div>
          {course.recommended && <Tag tone="sage" className="shrink-0">Recommended</Tag>}
        </div>

        <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-ink-2">{course.subtitle}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[12px] text-ink-3">
          <span className="flex items-center gap-1.5"><Icon name="layers" size={13} />{course.lessonCount} lessons</span>
          <span className="flex items-center gap-1.5"><Icon name="clock" size={13} />{course.hours} h</span>
          <span className="flex items-center gap-1.5"><Icon name="target" size={13} />{course.difficulty}</span>
        </div>

        <div className="mt-auto pt-4">
          {started ? (
            <MasteryBar
              value={course.progress} accent={accentVar[course.accent]} height={6}
              label="Progress" showValue
            />
          ) : (
            <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-ink">
              Start course
              <Icon name="arrow-right" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
