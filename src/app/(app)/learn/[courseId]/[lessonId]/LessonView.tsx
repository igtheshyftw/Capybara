"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button, ButtonLink, IconButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Card";
import { QuestionCard } from "@/components/learning/QuestionCard";
import { ReadingPassage } from "@/components/learning/ReadingPassage";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp, useDispatch } from "@/lib/store";
import { questionById } from "@/lib/data/questions";
import { passageById } from "@/lib/data/passages";
import { vocabularyWords } from "@/lib/data/vocabulary";
import type { Course, Lesson } from "@/lib/types";

type Panel = "notes" | "tutor" | "glossary";

export function LessonView({
  course, lesson, prev, next,
}: { course: Course; lesson: Lesson; prev: Lesson | null; next: Lesson | null }) {
  const app = useApp();
  const dispatch = useDispatch();
  const [panel, setPanel] = useState<Panel | null>("notes");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  const done = app.completedLessons.includes(lesson.id);
  const flat = course.modules.flatMap((m) => m.lessons);

  // Reading progress drives the lesson's stored progress value.
  useEffect(() => {
    function onScroll() {
      const el = mainRef.current;
      if (!el) return;
      const total = el.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY - el.offsetTop + 120) / total * 100))) : 100;
      setScrolled(pct);
      if (pct > 8) dispatch({ type: "lesson-progress", lessonId: lesson.id, value: Math.min(95, pct) });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lesson.id, dispatch]);

  const questions = lesson.questionIds.map((id) => questionById[id]).filter(Boolean);
  const answered = questions.filter((q) => app.attempts.some((a) => a.questionId === q.id)).length;

  return (
    <div>
      {/* ---------- reading progress ---------- */}
      <div className="sticky top-14 z-20 h-[2px] w-full bg-transparent lg:top-[60px]" aria-hidden="true">
        <div className="h-full bg-ink transition-[width] duration-150" style={{ width: `${scrolled}%` }} />
      </div>

      <div className="mx-auto grid w-full max-w-[1500px] gap-0 px-0 lg:grid-cols-[236px_minmax(0,1fr)] xl:grid-cols-[236px_minmax(0,1fr)_312px]">
        {/* ================= LESSON NAVIGATION ================= */}
        <aside className="hidden border-r border-line lg:block">
          <div className="sticky top-[76px] max-h-[calc(100dvh-92px)] overflow-y-auto px-4 py-6">
            <Link href={`/learn/${course.id}`} className="flex items-center gap-1.5 text-[12.5px] text-ink-3 transition-colors hover:text-ink">
              <Icon name="chevron-left" size={14} />
              {course.title}
            </Link>
            <nav className="mt-5 space-y-5" aria-label="Lessons in this course">
              {course.modules.map((m, mi) => (
                <div key={m.id}>
                  <p className="eyebrow mb-2">{String(mi + 1).padStart(2, "0")} · {m.title}</p>
                  <ul className="space-y-[2px]">
                    {m.lessons.map((l) => {
                      const active = l.id === lesson.id;
                      const complete = app.completedLessons.includes(l.id);
                      return (
                        <li key={l.id}>
                          <Link
                            href={`/learn/${course.id}/${l.id}`}
                            aria-current={active ? "page" : undefined}
                            className={`flex items-start gap-2.5 rounded-[8px] px-2.5 py-2 text-[13px] leading-snug transition-colors ${
                              active ? "bg-surface font-medium text-ink shadow-[var(--shadow-paper)] ring-1 ring-line" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                            }`}
                          >
                            <span className={`mt-[3px] flex size-[14px] shrink-0 items-center justify-center rounded-full border ${
                              complete ? "border-sage bg-sage text-ink-inv" : active ? "border-ink" : "border-line-2"
                            }`}>
                              {complete && <Icon name="check" size={9} strokeWidth={3} />}
                            </span>
                            <span className="min-w-0">{l.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* ================= LEARNING AREA ================= */}
        <div ref={mainRef} className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">
          {/* mobile lesson nav */}
          <div className="mb-4 lg:hidden">
            <button
              onClick={() => setNavOpen(!navOpen)}
              aria-expanded={navOpen}
              className="flex w-full items-center gap-2.5 rounded-[10px] border border-line bg-surface px-3.5 py-2.5 text-left text-[13px]"
            >
              <Icon name="list" size={16} className="text-ink-3" />
              <span className="min-w-0 flex-1 truncate text-ink-2">{course.title}</span>
              <span className="tabular shrink-0 text-[12px] text-ink-3">
                {flat.findIndex((l) => l.id === lesson.id) + 1}/{flat.length}
              </span>
              <Icon name="chevron-down" size={15} className={`shrink-0 text-ink-3 transition-transform ${navOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {navOpen && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24 }}
                  className="mt-1.5 overflow-hidden rounded-[10px] border border-line bg-surface"
                >
                  {flat.map((l) => (
                    <li key={l.id} className="border-b border-line last:border-b-0">
                      <Link
                        href={`/learn/${course.id}/${l.id}`}
                        onClick={() => setNavOpen(false)}
                        className={`block px-3.5 py-2.5 text-[13px] ${l.id === lesson.id ? "bg-surface-2 font-medium text-ink" : "text-ink-2"}`}
                      >
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* ---------- lesson header ---------- */}
          <header className="animate-rise max-w-[68ch]">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="blue">{lesson.kind}</Tag>
              <Tag>{lesson.minutes} min</Tag>
              {done && <Tag tone="correct">Completed</Tag>}
            </div>
            <h1 className="serif-display mt-4 text-[32px] sm:text-[40px]">{lesson.title}</h1>
            <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{lesson.summary}</p>

            {lesson.objectives.length > 0 && (
              <div className="mt-6 rounded-[13px] border border-line bg-surface-2/60 p-4">
                <p className="eyebrow mb-2.5">By the end of this lesson</p>
                <ul className="space-y-1.5">
                  {lesson.objectives.map((o) => (
                    <li key={o} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink-2">
                      <Icon name="check" size={14} className="mt-[3px] shrink-0 text-sage" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          {/* ---------- blocks ---------- */}
          <div className="mt-8 space-y-7">
            {lesson.blocks.map((block, i) => {
              switch (block.kind) {
                case "prose":
                  return (
                    <section key={i} className="max-w-[68ch]">
                      {block.heading && <h2 className="mb-3 text-[19px] font-semibold tracking-[-0.015em]">{block.heading}</h2>}
                      {block.body.map((p, j) => (
                        <p key={j} className="mt-3 text-[15.5px] leading-[1.75] text-ink-2 first:mt-0">{p}</p>
                      ))}
                    </section>
                  );

                case "callout": {
                  const tones = {
                    note: { cls: "border-blue/25 bg-blue-soft/50", icon: "info" as const },
                    warn: { cls: "border-clay/25 bg-clay-soft/50", icon: "alert" as const },
                    tip: { cls: "border-sage/25 bg-sage-soft/50", icon: "sparkle" as const },
                  }[block.tone];
                  return (
                    <aside key={i} className={`max-w-[68ch] rounded-[13px] border p-4 ${tones.cls}`}>
                      <p className="flex items-center gap-2 text-[13.5px] font-semibold text-ink">
                        <Icon name={tones.icon} size={16} />
                        {block.title}
                      </p>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{block.body}</p>
                    </aside>
                  );
                }

                case "list":
                  return (
                    <section key={i} className="max-w-[68ch] rounded-[13px] border border-line bg-surface p-5">
                      <h3 className="text-[15px] font-semibold">{block.title}</h3>
                      <ul className="mt-3 space-y-2">
                        {block.items.map((it) => (
                          <li key={it} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink-2">
                            <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-line-2" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </section>
                  );

                case "steps":
                  return (
                    <section key={i} className="max-w-[68ch]">
                      <h3 className="mb-3 text-[17px] font-semibold tracking-[-0.01em]">{block.title}</h3>
                      <ol className="space-y-px overflow-hidden rounded-[13px] border border-line bg-line">
                        {block.items.map((it, j) => (
                          <li key={it.label} className="flex gap-4 bg-surface p-4">
                            <span className="tabular serif-display shrink-0 text-[20px] text-ink-3">{j + 1}</span>
                            <span className="min-w-0">
                              <span className="block text-[14.5px] font-semibold text-ink">{it.label}</span>
                              <span className="mt-1 block text-[14px] leading-relaxed text-ink-2">{it.body}</span>
                            </span>
                          </li>
                        ))}
                      </ol>
                    </section>
                  );

                case "example":
                  return (
                    <section key={i} className="max-w-[68ch] overflow-hidden rounded-[13px] border border-line">
                      <h3 className="border-b border-line bg-surface-2/60 px-4 py-2.5 text-[13.5px] font-semibold">{block.title}</h3>
                      <div className="divide-y divide-line">
                        <div className="flex gap-3 bg-wrong-soft/25 p-4">
                          <Icon name="close" size={15} className="mt-[3px] shrink-0 text-wrong" />
                          <p className="font-serif text-[14.5px] leading-relaxed text-ink">{block.before}</p>
                        </div>
                        <div className="flex gap-3 bg-correct-soft/25 p-4">
                          <Icon name="check" size={15} className="mt-[3px] shrink-0 text-correct" />
                          <p className="font-serif text-[14.5px] leading-relaxed text-ink">{block.after}</p>
                        </div>
                      </div>
                      <p className="border-t border-line bg-surface px-4 py-3 text-[13px] leading-relaxed text-ink-2">{block.note}</p>
                    </section>
                  );

                case "passage": {
                  const p = passageById[Object.keys(passageById).find((k) => passageById[k].title === block.title) ?? ""] ?? {
                    id: `inline-${i}`, title: block.title, attribution: block.source, genre: "Passage", paragraphs: block.paragraphs,
                  };
                  return (
                    <div key={i}>
                      <ReadingPassage passage={{ ...p, paragraphs: block.paragraphs }} />
                    </div>
                  );
                }

                case "question": {
                  const q = questionById[block.questionId];
                  if (!q) return null;
                  return <div key={i}><QuestionCard question={q} /></div>;
                }

                case "reflection":
                  return (
                    <div key={i} className="max-w-[68ch]">
                      <CapybaraGuide variant="professor" name="Think about it" tone="ochre">
                        {block.prompt}
                      </CapybaraGuide>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>

          {/* ---------- check understanding ---------- */}
          <div className="mt-10 max-w-[68ch] rounded-[16px] border border-line bg-surface-2/50 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <Capybara variant="plain" mood={done ? "pleased" : "calm"} size={52} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <h2 className="text-[17px] font-semibold tracking-[-0.01em]">
                  {done ? "Lesson complete." : "Check understanding"}
                </h2>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
                  {questions.length > 0
                    ? `${answered} of ${questions.length} question${questions.length === 1 ? "" : "s"} in this lesson answered.`
                    : "No questions in this lesson — mark it complete when you have worked through the material."}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {!done ? (
                    <Button onClick={() => dispatch({ type: "complete-lesson", lessonId: lesson.id })} icon="check">
                      Mark lesson complete
                    </Button>
                  ) : (
                    <span className="flex items-center gap-2 text-[13.5px] font-medium text-correct">
                      <Icon name="check" size={16} />
                      Marked complete
                    </span>
                  )}
                  {next && (
                    <ButtonLink href={`/learn/${course.id}/${next.id}`} variant={done ? "primary" : "secondary"} iconRight="arrow-right">
                      Next lesson
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- prev / next ---------- */}
          <nav className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6 sm:flex-row sm:justify-between" aria-label="Lesson navigation">
            {prev ? (
              <Link href={`/learn/${course.id}/${prev.id}`} className="group flex items-center gap-3 rounded-[11px] border border-line bg-surface p-3.5 transition-colors hover:border-line-2 sm:max-w-[46%]">
                <Icon name="chevron-left" size={17} className="shrink-0 text-ink-3 transition-transform group-hover:-translate-x-0.5" />
                <span className="min-w-0">
                  <span className="eyebrow block">Previous</span>
                  <span className="mt-0.5 block truncate text-[13.5px] font-medium text-ink">{prev.title}</span>
                </span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/learn/${course.id}/${next.id}`} className="group flex items-center gap-3 rounded-[11px] border border-line bg-surface p-3.5 text-right transition-colors hover:border-line-2 sm:max-w-[46%]">
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block">Next</span>
                  <span className="mt-0.5 block truncate text-[13.5px] font-medium text-ink">{next.title}</span>
                </span>
                <Icon name="chevron-right" size={17} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </nav>
        </div>

        {/* ================= SIDE PANEL ================= */}
        <aside className="hidden border-l border-line xl:block">
          <div className="sticky top-[76px] max-h-[calc(100dvh-92px)] overflow-y-auto">
            <div className="flex items-center gap-1 border-b border-line px-3 py-2.5">
              {(["notes", "tutor", "glossary"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPanel(panel === p ? null : p)}
                  aria-pressed={panel === p}
                  className={`relative flex-1 rounded-[8px] px-2 py-1.5 text-[12.5px] font-medium capitalize transition-colors ${
                    panel === p ? "text-ink" : "text-ink-3 hover:text-ink-2"
                  }`}
                >
                  {panel === p && (
                    <motion.span layoutId="panel-tab" className="absolute inset-0 rounded-[8px] bg-surface-2" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{p}</span>
                </button>
              ))}
              <IconButton
                name={panel ? "chevron-right" : "chevron-left"}
                label={panel ? "Collapse panel" : "Expand panel"}
                size={30}
                onClick={() => setPanel(panel ? null : "notes")}
              />
            </div>

            <AnimatePresence mode="wait">
              {panel === "notes" && (
                <PanelWrap key="notes">
                  <NotesPanel lessonId={lesson.id} />
                </PanelWrap>
              )}
              {panel === "tutor" && (
                <PanelWrap key="tutor">
                  <div className="space-y-3">
                    <CapybaraGuide variant="professor" name="Professor Bara" tone="blue" mood="thinking">
                      Ask me about this lesson. I will start with a hint and only give the full
                      answer if you still want it after trying.
                    </CapybaraGuide>
                    <div className="space-y-1.5">
                      {["Explain this differently", "Give me a hint", "Quiz me on this lesson", "Why was my answer wrong?"].map((s) => (
                        <Link
                          key={s}
                          href={`/tutor?q=${encodeURIComponent(s)}`}
                          className="flex items-center justify-between gap-2 rounded-[9px] border border-line bg-surface px-3 py-2.5 text-[13px] text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
                        >
                          {s}
                          <Icon name="arrow-right" size={14} className="shrink-0 text-ink-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </PanelWrap>
              )}
              {panel === "glossary" && (
                <PanelWrap key="glossary">
                  <p className="eyebrow mb-3">Words in this lesson</p>
                  <ul className="space-y-2.5">
                    {vocabularyWords.slice(0, 6).map((w) => (
                      <li key={w.id} className="rounded-[10px] border border-line bg-surface p-3">
                        <p className="font-serif text-[15px] text-ink">{w.word}</p>
                        <p className="tabular mt-0.5 text-[11.5px] text-ink-3">{w.ipa} · {w.pos}</p>
                        <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2">{w.definition}</p>
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href="/vocabulary" variant="secondary" size="sm" full className="mt-4">
                    Open Vocabulary Lab
                  </ButtonLink>
                </PanelWrap>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PanelWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="p-4"
    >
      {children}
    </motion.div>
  );
}

function NotesPanel({ lessonId }: { lessonId: string }) {
  const app = useApp();
  const dispatch = useDispatch();
  const value = app.notes[lessonId] ?? "";
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <p className="eyebrow">Your notes</p>
        <AnimatePresence>
          {saved && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[11.5px] text-ink-3">
              Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <textarea
        aria-label="Your notes for this lesson"
        value={value}
        onChange={(e) => {
          dispatch({ type: "set-note", id: lessonId, text: e.target.value });
          setSaved(true);
          setTimeout(() => setSaved(false), 1600);
        }}
        rows={14}
        placeholder="Write what you want to remember. Notes are kept per lesson."
        className="ruled w-full resize-none rounded-[11px] border border-line-strong bg-surface p-3 text-[13.5px] leading-[28px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
      />
      <p className="mt-2 text-[11.5px] leading-snug text-ink-3">
        Kept on this device. Notes appear in search results alongside lessons.
      </p>
    </div>
  );
}
