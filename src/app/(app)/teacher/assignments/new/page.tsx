"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Capybara } from "@/components/mascot/Capybara";
import { courses } from "@/lib/data/courses";
import { vocabularySets } from "@/lib/data/vocabulary";
import { teacherStudents, classes } from "@/lib/data/people";
import { skills } from "@/lib/data/skills";

const types: { id: string; label: string; icon: IconName; description: string }[] = [
  { id: "reading", label: "Reading assignment", icon: "book", description: "A passage with comprehension and evidence questions" },
  { id: "vocabulary", label: "Vocabulary set", icon: "cards", description: "A word set added to the student's review queue" },
  { id: "quiz", label: "Quiz", icon: "target", description: "Questions drawn from one or more skills" },
  { id: "writing", label: "Writing assignment", icon: "pen", description: "A prompt with band-descriptor feedback" },
  { id: "timed", label: "Timed practice", icon: "clock", description: "A question set under a fixed clock" },
  { id: "mock", label: "Mock exam", icon: "clipboard", description: "A full section in exam conditions" },
];

export default function AssignmentBuilderPage() {
  const [type, setType] = useState("quiz");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState<"class" | "group" | "student">("class");
  const [classId, setClassId] = useState(classes[0].id);
  const [chosenStudents, setChosenStudents] = useState<string[]>([]);
  const [chosenSkills, setChosenSkills] = useState<string[]>(["inference"]);
  const [courseId, setCourseId] = useState(courses[0].id);
  const [due, setDue] = useState("");
  const [limit, setLimit] = useState(30);
  const [attempts, setAttempts] = useState(2);
  const [difficulty, setDifficulty] = useState("Core");
  const [required, setRequired] = useState(70);
  const [created, setCreated] = useState(false);

  const recipients =
    target === "class" ? classes.find((c) => c.id === classId)?.studentIds.length ?? 0
    : target === "group" ? chosenStudents.length
    : chosenStudents.length ? 1 : 0;

  const activeType = types.find((t) => t.id === type)!;
  const defaultTitle = `${activeType.label} — ${new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" })}`;

  if (created) {
    return (
      <PageBody>
        <div className="mx-auto max-w-lg">
          <Card className="text-center">
            <Capybara variant="professor" mood="pleased" size={68} className="mx-auto" />
            <h1 className="serif-display mt-4 text-[26px]">Assignment created.</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              <span className="font-medium text-ink">{title || defaultTitle}</span> has been sent to{" "}
              {recipients} student{recipients === 1 ? "" : "s"}
              {due && <> and is due {due}</>}. It appears on their dashboard immediately.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button onClick={() => { setCreated(false); setTitle(""); }} icon="plus">Create another</Button>
              <ButtonLink href="/teacher/assignments" variant="secondary">All assignments</ButtonLink>
              <ButtonLink href="/teacher" variant="tertiary">Dashboard</ButtonLink>
            </div>
          </Card>
        </div>
      </PageBody>
    );
  }

  return (
    <PageBody>
      <PageHeader
        eyebrow="Assignment builder"
        title="Set some work"
        serif
        description="Choose what kind of work it is, who gets it, and the conditions. Everything below has a sensible default."
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3.5">
          {/* ---------- type ---------- */}
          <Card>
            <CardHeader eyebrow="Step 1" title="What kind of assignment?" />
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {types.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => setType(t.id)}
                    aria-pressed={type === t.id}
                    className={`flex w-full items-start gap-3 rounded-[11px] border p-3.5 text-left transition-[border-color,background-color] duration-150 ${
                      type === t.id ? "border-ink bg-surface-2" : "border-line bg-surface hover:border-line-2"
                    }`}
                  >
                    <span className={`flex size-9 shrink-0 items-center justify-center rounded-[10px] border ${
                      type === t.id ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface-2 text-ink-2"
                    }`}>
                      <Icon name={t.icon} size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[13.5px] font-medium text-ink">{t.label}</span>
                      <span className="block text-[12px] leading-snug text-ink-3">{t.description}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {/* ---------- content ---------- */}
          <Card>
            <CardHeader eyebrow="Step 2" title="Content" />
            <div className="mt-4 space-y-4">
              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={defaultTitle}
                  className="h-10 w-full rounded-[10px] border border-line-strong bg-surface px-3 text-[13.5px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
                />
              </Field>

              <Field label="Course">
                <Select value={courseId} onChange={setCourseId} options={courses.map((c) => ({ value: c.id, label: c.title }))} />
              </Field>

              {type === "vocabulary" ? (
                <Field label="Word set">
                  <Select value={vocabularySets[0].id} onChange={() => {}} options={vocabularySets.map((s) => ({ value: s.id, label: `${s.title} (${s.wordIds.length} words)` }))} />
                </Field>
              ) : (
                <Field label="Skills covered" hint="Questions are drawn from the skills you select.">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => {
                      const on = chosenSkills.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => setChosenSkills((c) => (on ? c.filter((x) => x !== s.id) : [...c, s.id]))}
                          aria-pressed={on}
                          className={`rounded-full border px-3 py-1.5 text-[12.5px] transition-colors ${
                            on ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                          }`}
                        >
                          {s.name}
                        </button>
                      );
                    })}
                  </div>
                </Field>
              )}

              <Field label="Difficulty">
                <div className="flex gap-1.5">
                  {["Foundation", "Core", "Advanced", "Mixed"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      aria-pressed={difficulty === d}
                      className={`flex-1 rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition-colors ${
                        difficulty === d ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </Card>

          {/* ---------- recipients ---------- */}
          <Card>
            <CardHeader eyebrow="Step 3" title="Who gets it?" />
            <div className="mt-4 flex rounded-[9px] border border-line bg-surface p-[3px] sm:w-fit">
              {(["class", "group", "student"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTarget(t); setChosenStudents([]); }}
                  aria-pressed={target === t}
                  className={`relative flex-1 rounded-[6px] px-4 py-1.5 text-[13px] font-medium capitalize transition-colors duration-200 sm:flex-none ${
                    target === t ? "text-ink-inv" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {target === t && <motion.span layoutId="target-tab" className="absolute inset-0 rounded-[6px] bg-ink" transition={{ type: "spring", stiffness: 460, damping: 38 }} />}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>

            <div className="mt-4">
              {target === "class" ? (
                <ul className="space-y-2">
                  {classes.map((c) => (
                    <li key={c.id}>
                      <button
                        onClick={() => setClassId(c.id)}
                        aria-pressed={classId === c.id}
                        className={`flex w-full items-center gap-3 rounded-[10px] border px-3.5 py-3 text-left transition-colors ${
                          classId === c.id ? "border-ink bg-surface-2" : "border-line bg-surface hover:border-line-2"
                        }`}
                      >
                        <Icon name="users" size={17} className="shrink-0 text-ink-3" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13.5px] font-medium text-ink">{c.name}</span>
                          <span className="block text-[12px] text-ink-3">{c.period} · {c.studentIds.length} students</span>
                        </span>
                        {classId === c.id && <Icon name="check" size={16} className="shrink-0 text-sage" />}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {teacherStudents.map((s) => {
                    const on = chosenStudents.includes(s.id);
                    return (
                      <li key={s.id}>
                        <button
                          onClick={() =>
                            setChosenStudents((c) =>
                              target === "student" ? (on ? [] : [s.id]) : on ? c.filter((x) => x !== s.id) : [...c, s.id],
                            )
                          }
                          aria-pressed={on}
                          className={`flex w-full items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left transition-colors ${
                            on ? "border-ink bg-surface-2" : "border-line bg-surface hover:border-line-2"
                          }`}
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[11px] font-semibold text-ink-2">
                            {s.initials}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-medium text-ink">{s.name}</span>
                            <span className="block text-[11.5px] text-ink-3">{s.accuracy}% accuracy</span>
                          </span>
                          {on && <Icon name="check" size={15} className="shrink-0 text-sage" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Card>

          {/* ---------- conditions ---------- */}
          <Card>
            <CardHeader eyebrow="Step 4" title="Conditions" />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Due date">
                <input
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                  className="h-10 w-full rounded-[10px] border border-line-strong bg-surface px-3 text-[13.5px] outline-none transition-colors focus:border-ink-3"
                />
              </Field>
              <Field label={`Time limit — ${limit} minutes`}>
                <input
                  type="range" min={5} max={90} step={5} value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="h-10 w-full accent-[var(--color-ink)]"
                />
              </Field>
              <Field label="Attempts allowed">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 0].map((a) => (
                    <button
                      key={a}
                      onClick={() => setAttempts(a)}
                      aria-pressed={attempts === a}
                      className={`flex-1 rounded-[8px] border px-3 py-2 text-[12.5px] font-medium transition-colors ${
                        attempts === a ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2"
                      }`}
                    >
                      {a === 0 ? "Unlimited" : a}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={`Required score — ${required}%`}>
                <input
                  type="range" min={0} max={100} step={5} value={required}
                  onChange={(e) => setRequired(Number(e.target.value))}
                  className="h-10 w-full accent-[var(--color-ink)]"
                />
              </Field>
            </div>
          </Card>
        </div>

        {/* ---------- summary ---------- */}
        <div className="lg:sticky lg:top-[76px] lg:self-start">
          <Card>
            <CardHeader eyebrow="Summary" title={title || defaultTitle} />
            <dl className="mt-4 space-y-3 border-t border-line pt-4 text-[13px]">
              {[
                ["Type", activeType.label],
                ["Course", courses.find((c) => c.id === courseId)?.title ?? "—"],
                ["Difficulty", difficulty],
                ["Recipients", recipients ? `${recipients} student${recipients === 1 ? "" : "s"}` : "None selected"],
                ["Due", due || "No due date"],
                ["Time limit", `${limit} minutes`],
                ["Attempts", attempts === 0 ? "Unlimited" : String(attempts)],
                ["Required score", `${required}%`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-start justify-between gap-3">
                  <dt className="text-ink-3">{k}</dt>
                  <dd className="text-right font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            {type !== "vocabulary" && chosenSkills.length > 0 && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="eyebrow mb-2">Skills</p>
                <ul className="flex flex-wrap gap-1.5">
                  {chosenSkills.map((s) => (
                    <li key={s}><Tag tone="blue">{skills.find((x) => x.id === s)?.name}</Tag></li>
                  ))}
                </ul>
              </div>
            )}

            <AnimatePresence>
              {recipients === 0 && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-4 flex items-start gap-2 rounded-[10px] border border-ochre/25 bg-ochre-soft/50 p-3 text-[12.5px] leading-snug text-ink-2"
                >
                  <Icon name="alert" size={14} className="mt-[2px] shrink-0 text-ochre" />
                  Select at least one recipient before creating the assignment.
                </motion.p>
              )}
            </AnimatePresence>

            <Button full className="mt-5" disabled={recipients === 0} onClick={() => setCreated(true)} icon="send">
              Create assignment
            </Button>
            <ButtonLink href="/teacher" variant="tertiary" full size="sm" className="mt-2">Cancel</ButtonLink>
          </Card>
        </div>
      </div>
    </PageBody>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-[11.5px] text-ink-3">{hint}</span>}
    </label>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-[10px] border border-line-strong bg-surface px-3 pr-8 text-[13.5px] outline-none transition-colors hover:border-line-2 focus:border-ink-3"
      >
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <Icon name="chevron-down" size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-3" />
    </span>
  );
}
