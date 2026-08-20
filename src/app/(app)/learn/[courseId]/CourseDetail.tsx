"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing, MasteryBar } from "@/components/ui/Progress";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useApp } from "@/lib/store";
import type { Course, Lesson } from "@/lib/types";

const accentVar: Record<Course["accent"], string> = {
  sage: "var(--color-sage)", blue: "var(--color-blue)", clay: "var(--color-clay)",
  ochre: "var(--color-ochre)", plum: "var(--color-plum)",
};

const kindTone: Record<Lesson["kind"], "neutral" | "blue" | "sage" | "clay" | "plum"> = {
  Concept: "blue", Practice: "sage", Passage: "plum", Workshop: "clay", Review: "neutral",
};

export function CourseDetail({ course }: { course: Course }) {
  const app = useApp();
  const flat = course.modules.flatMap((m) => m.lessons);
  const firstUnfinished = flat.find((l) => !app.completedLessons.includes(l.id)) ?? flat[0];

  const [open, setOpen] = useState<string[]>([course.modules[0]?.id]);
  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const doneCount = flat.filter((l) => app.completedLessons.includes(l.id)).length;
  const livePct = Math.max(course.progress, Math.round((doneCount / flat.length) * 100));

  return (
    <PageBody>
      {/* ---------- breadcrumb ---------- */}
      <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-1.5 text-[12.5px] text-ink-3">
        <Link href="/learn" className="transition-colors hover:text-ink">Course library</Link>
        <Icon name="chevron-right" size={13} />
        <span className="text-ink-2">{course.category}</span>
      </nav>

      {/* ---------- header ---------- */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="solid">{course.category}</Tag>
            <Tag>{course.difficulty}</Tag>
            {course.recommended && <Tag tone="sage">Recommended for you</Tag>}
          </div>
          <h1 className="serif-display mt-4 text-[34px] sm:text-[42px]">{course.title}</h1>
          <p className="mt-2 text-[16px] text-ink-2">{course.subtitle}</p>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-ink-2">{course.description}</p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-4">
            {[
              { k: "Instructor", v: course.instructor, sub: course.instructorTitle },
              { k: "Study time", v: `${course.hours} hours`, sub: `${flat.length} lessons` },
              { k: "Difficulty", v: course.difficulty, sub: course.modules.length + " modules" },
            ].map((s) => (
              <div key={s.k}>
                <dt className="eyebrow mb-1">{s.k}</dt>
                <dd className="text-[14px] font-medium text-ink">{s.v}</dd>
                <dd className="text-[12px] text-ink-3">{s.sub}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <h2 className="text-[14px] font-semibold">What you will be able to do</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {course.goals.map((g) => (
                <li key={g} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
                  <Icon name="check" size={15} className="mt-[3px] shrink-0 text-sage" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------- sticky progress panel ---------- */}
        <div className="space-y-3.5 lg:sticky lg:top-[76px] lg:self-start">
          <Card>
            <div className="flex items-center gap-4">
              <ProgressRing value={livePct} size={68} accent={accentVar[course.accent]} sublabel="done" />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-ink">
                  {livePct === 0 ? "Not started" : livePct === 100 ? "Complete" : "In progress"}
                </p>
                <p className="mt-0.5 text-[12.5px] text-ink-3">{doneCount} of {flat.length} lessons finished</p>
              </div>
            </div>
            <div className="mt-5">
              <MasteryBar label="Mastery" value={course.mastery} accent={accentVar[course.accent]} sublabel="Based on accuracy on unseen questions" />
            </div>
            <ButtonLink href={`/learn/${course.id}/${firstUnfinished.id}`} full className="mt-5" iconRight="arrow-right">
              {livePct === 0 ? "Start course" : "Continue"}
            </ButtonLink>
            <p className="mt-2.5 text-center text-[12px] text-ink-3">{firstUnfinished.title}</p>
          </Card>

          <Card padded={false} className="p-4">
            <p className="eyebrow mb-2.5">Skills covered</p>
            <ul className="flex flex-wrap gap-1.5">
              {course.skillTags.map((t) => <li key={t}><Tag>{t}</Tag></li>)}
            </ul>
          </Card>
        </div>
      </div>

      {/* ---------- modules ---------- */}
      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-1.5">Syllabus</p>
            <h2 className="text-[20px] font-semibold tracking-[-0.02em]">{course.modules.length} modules</h2>
          </div>
          <button
            onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))}
            className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
          >
            {open.length === course.modules.length ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <ol className="space-y-2.5">
          {course.modules.map((m, mi) => {
            const isOpen = open.includes(m.id);
            const moduleDone = m.lessons.filter((l) => app.completedLessons.includes(l.id)).length;
            return (
              <li key={m.id} className="paper-card overflow-hidden" >
                <h3>
                  <button
                    onClick={() => toggle(m.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-surface-2/50 sm:p-5"
                  >
                    <span className="tabular serif-display shrink-0 text-[22px] text-ink-3">
                      {String(mi + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold tracking-[-0.01em] text-ink">{m.title}</span>
                      <span className="mt-0.5 block text-[13px] text-ink-2">{m.summary}</span>
                    </span>
                    <span className="tabular hidden shrink-0 text-[12.5px] text-ink-3 sm:block">
                      {moduleDone}/{m.lessons.length}
                    </span>
                    <Icon
                      name="chevron-down" size={18}
                      className={`shrink-0 text-ink-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="border-t border-line">
                        {m.lessons.map((l) => {
                          const done = app.completedLessons.includes(l.id);
                          const progress = app.lessonProgress[l.id] ?? 0;
                          return (
                            <li key={l.id} className="border-b border-line last:border-b-0">
                              <Link
                                href={`/learn/${course.id}/${l.id}`}
                                className="group flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-surface-2/60 sm:px-5"
                              >
                                <span className={`flex size-[26px] shrink-0 items-center justify-center rounded-full border ${
                                  done ? "border-sage bg-sage text-ink-inv" : "border-line-2 text-ink-3"
                                }`}>
                                  <Icon name={done ? "check" : l.kind === "Passage" ? "book" : "play"} size={13} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex flex-wrap items-center gap-2">
                                    <span className="text-[14px] font-medium text-ink">{l.title}</span>
                                    <Tag tone={kindTone[l.kind]}>{l.kind}</Tag>
                                  </span>
                                  <span className="mt-0.5 block truncate text-[12.5px] text-ink-3">{l.summary}</span>
                                  {progress > 0 && !done && (
                                    <span className="mt-2 block h-1 w-full max-w-[180px] overflow-hidden rounded-full bg-surface-3">
                                      <span className="block h-full rounded-full bg-ink-3" style={{ width: `${progress}%` }} />
                                    </span>
                                  )}
                                </span>
                                <span className="tabular hidden shrink-0 text-[12px] text-ink-3 sm:block">{l.minutes} min</span>
                                <Icon name="chevron-right" size={16} className="shrink-0 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </section>

      <div className="mt-8">
        <CapybaraGuide variant="professor" name="Professor Bara" tone="paper">
          Work the modules in order the first time through. Each one assumes the reasoning taught
          in the last, and the practice questions get harder on that assumption.
        </CapybaraGuide>
      </div>
    </PageBody>
  );
}
