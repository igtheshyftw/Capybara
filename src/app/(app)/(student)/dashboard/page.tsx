"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar, MasteryBlocks, ProgressRing, CountUp } from "@/components/ui/Progress";
import { BarChart } from "@/components/ui/Charts";
import { StatCard } from "@/components/learning/StatCard";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { EmptyState } from "@/components/learning/EmptyState";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp, useStats } from "@/lib/store";
import { student, masteryMap, dailyMinutes, assignments, weeklyActivity } from "@/lib/data/people";
import { courseById } from "@/lib/data/courses";
import { questionById } from "@/lib/data/questions";
import { skillById } from "@/lib/data/skills";
import { vocabularyWords } from "@/lib/data/vocabulary";
import { dueLabel } from "@/lib/srs";

const accentFor: Record<string, string> = {
  Reading: "var(--color-blue)",
  Vocabulary: "var(--color-ochre)",
  Writing: "var(--color-clay)",
  Grammar: "var(--color-sage)",
};

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

const todaysPlan = [
  { id: "p1", label: "15 vocabulary reviews", detail: "Stance & Hedging, Evidence & Proof", href: "/vocabulary/flashcards", minutes: 12, icon: "cards" as const },
  { id: "p2", label: "One reading passage", detail: "Command of evidence · Module 1", href: "/learn/sat-rw/l-sat-1-2", minutes: 18, icon: "book" as const },
  { id: "p3", label: "Writing correction", detail: "IELTS opinion essay — body paragraph 2", href: "/writing/wp-ielts-opinion", minutes: 20, icon: "pen" as const },
  { id: "p4", label: "20-minute focus session", detail: "Whatever is still open at the end of the day", href: "/focus", minutes: 20, icon: "clock" as const },
];

export default function DashboardPage() {
  const stats = useStats();
  const app = useApp();

  const course = courseById["sat-rw"];
  const openMistakes = app.mistakes.filter((m) => m.status !== "resolved").slice(0, 5);
  const dueWords = vocabularyWords.filter((w) => {
    const r = app.reviews[w.id];
    return !r || r.due <= Date.now();
  });

  const doneCount = app.completedLessons.length;
  const planDone = Math.min(todaysPlan.length, doneCount + (app.attempts.length > 0 ? 1 : 0));

  const dueAssignments = assignments
    .filter((a) => a.status !== "graded")
    .sort((a, b) => a.dueInDays - b.dueInDays)
    .slice(0, 3);

  return (
    <PageBody wide>
      {/* ---------- greeting ---------- */}
      <header className="animate-rise flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="serif-display text-[30px] sm:text-[36px]">
            {greeting()}, {student.name.split(" ")[0]}.
          </h1>
          <p className="mt-1.5 text-[14.5px] text-ink-2">Here&rsquo;s what matters today.</p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <ButtonLink href={`/learn/${course.id}/l-sat-1-1`} icon="play">Continue</ButtonLink>
          <ButtonLink href="/focus" variant="secondary" icon="clock">Focus session</ButtonLink>
        </div>
      </header>

      {/* ---------- stat strip ---------- */}
      <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="This week at a glance">
        <StatCard
          label="Overall accuracy" value={stats.accuracy} suffix="%" delta={7} deltaLabel="" icon="target"
          trend={weeklyActivity.map((w) => w.accuracy)} accent="var(--color-sage)"
          footnote="Up from 69% four weeks ago"
        />
        <StatCard
          label="Study time this month" value={Math.round(stats.minutesThisMonth / 6) / 10} suffix="h" decimals={1} icon="clock"
          trend={weeklyActivity.map((w) => w.minutes)} footnote={`${stats.focusSessions} focus sessions logged`}
        />
        <StatCard
          label="Words mastered" value={stats.wordsMastered} icon="cards" delta={18} deltaLabel=""
          trend={[352, 368, 381, 394, 402, 411, 419, stats.wordsMastered]} accent="var(--color-ochre)"
          footnote={`${stats.dueWords} due for review`}
        />
        <StatCard
          label="Questions answered" value={stats.questionsAnswered} icon="list"
          trend={weeklyActivity.map((w) => w.questions)} footnote={`${stats.openMistakes} open in your notebook`}
        />
      </section>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
        {/* ================= LEFT COLUMN ================= */}
        <div className="space-y-3.5 lg:col-span-2">
          {/* ---------- continue learning ---------- */}
          <Card>
            <div>
              <CardHeader
                eyebrow="Continue learning"
                title={course.title}
                description="Module 1 — Information & Ideas · Unit 7, Context & Precision"
                action={<ProgressRing value={course.progress} size={62} accent="var(--color-blue)" sublabel="done" />}
              />
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-ink-2">
                <span className="flex items-center gap-1.5"><Icon name="user" size={14} className="text-ink-3" />{course.instructor}</span>
                <span className="flex items-center gap-1.5"><Icon name="layers" size={14} className="text-ink-3" />{course.lessonCount} lessons</span>
                <span className="flex items-center gap-1.5"><Icon name="clock" size={14} className="text-ink-3" />~14 min left in this lesson</span>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <ButtonLink href={`/learn/${course.id}/l-sat-1-1`} iconRight="arrow-right">Continue</ButtonLink>
                <ButtonLink href={`/learn/${course.id}`} variant="secondary">Course overview</ButtonLink>
              </div>
            </div>
          </Card>

          {/* ---------- today's plan ---------- */}
          <Card>
            <CardHeader
              eyebrow="Today's plan"
              title="Four things, about an hour"
              action={<span className="tabular text-[12.5px] text-ink-3">{planDone}/{todaysPlan.length} done</span>}
            />
            <ul className="mt-4 divide-y divide-line">
              {todaysPlan.map((item, i) => {
                const done = i < planDone;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-3.5 py-3 transition-colors hover:bg-surface-2/60 sm:-mx-2 sm:rounded-[9px] sm:px-2"
                    >
                      <span
                        className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          done ? "border-sage bg-sage text-ink-inv" : "border-line-2 text-transparent group-hover:border-ink-3"
                        }`}
                        aria-hidden="true"
                      >
                        {done && (
                          <motion.svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <motion.path
                              d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="3"
                              strokeLinecap="round" strokeLinejoin="round"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                            />
                          </motion.svg>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[14px] font-medium ${done ? "text-ink-3 line-through decoration-line-2" : "text-ink"}`}>
                          {item.label}
                        </span>
                        <span className="block truncate text-[12.5px] text-ink-3">{item.detail}</span>
                      </span>
                      <span className="tabular hidden shrink-0 text-[12px] text-ink-3 sm:block">{item.minutes} min</span>
                      <Icon name="chevron-right" size={16} className="shrink-0 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* ---------- weekly progress ---------- */}
          <div className="grid gap-3.5 sm:grid-cols-2">
            <Card>
              <CardHeader eyebrow="This week" title="Study minutes" description="Target is 40 minutes a day." />
              <div className="mt-5">
                <BarChart
                  data={dailyMinutes.map((d) => ({ label: d.day, value: d.minutes }))}
                  target={40} accent="var(--color-sage)" suffix=" min"
                  ariaLabel="Study minutes for each day this week"
                />
              </div>
              <p className="mt-4 border-t border-line pt-3 text-[12.5px] text-ink-2">
                <span className="tabular font-semibold text-ink">302 minutes</span> this week — 37 more than last week.
              </p>
            </Card>

            <Card>
              <CardHeader
                eyebrow="Mastery map" title="Where you stand"
                action={<Link href="/progress" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">Details</Link>}
              />
              <ul className="mt-5 space-y-4">
                {masteryMap.map((m) => (
                  <li key={m.skill}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-[13px] font-medium text-ink">{m.skill}</span>
                      <span className="flex items-baseline gap-2">
                        {m.delta !== 0 && (
                          <span className={`tabular text-[11px] ${m.delta > 0 ? "text-correct" : "text-wrong"}`}>
                            {m.delta > 0 ? "+" : ""}{m.delta}
                          </span>
                        )}
                        <span className="tabular text-[13px] font-semibold text-ink-2">{m.value}%</span>
                      </span>
                    </div>
                    <MasteryBlocks value={m.value} accent={accentFor[m.domain]} />
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* ---------- review queue ---------- */}
          <Card>
            <CardHeader
              eyebrow="Review queue"
              title={stats.openMistakes + dueWords.length > 0
                ? `${stats.openMistakes + dueWords.length} things need attention`
                : "Nothing needs attention"}
              description="Concepts you missed and words the schedule says are ready to slip."
              action={<ButtonLink href="/mistakes" variant="secondary" size="sm">Open notebook</ButtonLink>}
            />
            {openMistakes.length === 0 && dueWords.length === 0 ? (
              <div className="mt-5">
                <EmptyState
                  compact variant="detective"
                  title="Nothing to review yet."
                  body="Answer some practice questions and anything you miss will collect here automatically."
                  action={<ButtonLink href="/practice" size="sm">Go to practice</ButtonLink>}
                />
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {openMistakes.length > 0 && (
                  <div>
                    <p className="eyebrow mb-2.5">Concepts</p>
                    <ul className="flex flex-wrap gap-2">
                      {openMistakes.map((m) => {
                        const q = questionById[m.questionId];
                        return (
                          <li key={m.id}>
                            <Link
                              href="/mistakes"
                              className="flex items-center gap-2 rounded-full border border-wrong/25 bg-wrong-soft/60 px-3 py-1.5 text-[12.5px] text-ink transition-colors hover:border-wrong/45"
                            >
                              <span className="size-1.5 rounded-full bg-wrong" aria-hidden="true" />
                              {skillById[m.skill]?.name ?? q?.skill}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {dueWords.length > 0 && (
                  <div>
                    <p className="eyebrow mb-2.5">Words due</p>
                    <ul className="flex flex-wrap gap-2">
                      {dueWords.slice(0, 8).map((w) => (
                        <li key={w.id}>
                          <Link
                            href={`/vocabulary/${w.setId}?word=${w.id}`}
                            className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-[12.5px] text-ink transition-colors hover:border-line-2"
                            title={dueLabel(app.reviews[w.id])}
                          >
                            {w.word}
                          </Link>
                        </li>
                      ))}
                      {dueWords.length > 8 && (
                        <li className="flex items-center px-1 text-[12.5px] text-ink-3">+{dueWords.length - 8} more</li>
                      )}
                    </ul>
                    <ButtonLink href="/vocabulary/flashcards" size="sm" className="mt-3.5" iconRight="arrow-right">
                      Review {Math.min(15, dueWords.length)} words
                    </ButtonLink>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="space-y-3.5">
          {/* ---------- streak ---------- */}
          <Card>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow mb-1.5">Current streak</p>
                <p className="serif-display text-[30px] leading-none">
                  <CountUp to={stats.streak} />-day
                </p>
                <p className="mt-1.5 text-[13px] text-ink-2">study streak</p>
              </div>
              <Capybara variant="plain" mood="pleased" size={54} idle />
            </div>
            <div className="mt-5">
              <div className="flex gap-[5px]" role="img" aria-label={`${stats.streak} of the last 14 days studied`}>
                {Array.from({ length: 14 }, (_, i) => {
                  const studied = i >= 2;
                  return (
                    <span
                      key={i}
                      className={`h-7 flex-1 rounded-[3px] border ${
                        studied ? "border-sage/35 bg-sage-soft" : "border-line bg-surface-2"
                      }`}
                      title={studied ? "Studied" : "No activity"}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-[11px] text-ink-3">
                <span>2 weeks ago</span>
                <span>Today</span>
              </div>
            </div>
            <p className="mt-4 border-t border-line pt-3 text-[12.5px] text-ink-2">
              Longest streak: <span className="tabular font-medium text-ink">{student.longestStreak} days</span>
            </p>
          </Card>

          {/* ---------- weakest skill ---------- */}
          <Card>
            <CardHeader eyebrow="Worth your attention" title="Inference questions" />
            <div className="mt-4">
              <MasteryBar value={54} accent="var(--color-clay)" label="Accuracy on inference" delta={-3} />
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
              The pattern is consistent: you are choosing answers that are <em>possible</em> rather
              than answers the passage <em>requires</em>.
            </p>
            <ButtonLink href="/practice/inference" size="sm" className="mt-4" full iconRight="arrow-right">
              Practise this skill
            </ButtonLink>
          </Card>

          {/* ---------- assignments ---------- */}
          <Card>
            <CardHeader
              eyebrow="Assignments" title="Coming up"
              action={<Link href="/assignments" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">All</Link>}
            />
            <ul className="mt-4 space-y-2.5">
              {dueAssignments.map((a) => (
                <li key={a.id}>
                  <Link
                    href={a.targetHref}
                    className="group block rounded-[10px] border border-line bg-surface-2/50 p-3 transition-colors hover:border-line-2 hover:bg-surface-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[13px] font-medium leading-snug text-ink">{a.title}</p>
                      <Tag tone={a.dueInDays < 0 ? "wrong" : a.dueInDays === 0 ? "ochre" : "neutral"} className="shrink-0">
                        {a.dueInDays < 0 ? "Overdue" : a.due}
                      </Tag>
                    </div>
                    <p className="mt-1.5 text-[12px] text-ink-3">{a.type} · {a.minutes} min · {a.assignedBy}</p>
                    {a.progress > 0 && (
                      <div className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-surface-3">
                        <div className="h-full rounded-full bg-ink-3" style={{ width: `${a.progress}%` }} />
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {/* ---------- tutor prompt ---------- */}
          <CapybaraGuide variant="professor" name="Professor Bara" tone="blue" mood="thinking"
            action={<ButtonLink href="/tutor" size="sm" variant="secondary">Ask a question</ButtonLink>}>
            Stuck on something from yesterday&rsquo;s passage? Tell me what you tried first — I
            will give you a hint before I give you the answer.
          </CapybaraGuide>

          {/* ---------- level ---------- */}
          <Card>
            <CardHeader eyebrow="Level" title={`Level ${stats.level}`} action={<Tag tone="ochre">{stats.xp.toLocaleString()} XP</Tag>} />
            <div className="mt-4">
              <MasteryBar
                value={Math.round((stats.xpIntoLevel / stats.xpToNext) * 100)}
                accent="var(--color-ochre)" showValue={false}
                sublabel={`${stats.xpToNext - stats.xpIntoLevel} XP to level ${stats.level + 1}`}
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3.5">
              <p className="text-[12.5px] text-ink-2">Next unlock at level 15: reading lamp</p>
              <Link href="/room" className="shrink-0 text-[12.5px] font-medium text-ink underline decoration-line-2 underline-offset-4">Room</Link>
            </div>
          </Card>
        </div>
      </div>
    </PageBody>
  );
}
