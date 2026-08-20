"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button, ButtonLink, IconButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CapybaraDesk } from "@/components/mascot/CapybaraDesk";
import { useDispatch, useStats } from "@/lib/store";
import { recentSessions } from "@/lib/data/people";

const lengths = [15, 25, 30, 45, 50];

const tasks = [
  "SAT Vocabulary — Unit 8",
  "Reading Lab — Inference Set B",
  "IELTS Writing — Opinion Essay",
  "Grammar — Sentence boundaries",
  "Review my Mistake Notebook",
];

export default function FocusPage() {
  const dispatch = useDispatch();
  const stats = useStats();

  const [minutes, setMinutes] = useState(25);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [task, setTask] = useState(tasks[0]);
  const [ambient, setAmbient] = useState(false);
  const [immersive, setImmersive] = useState(false);
  const [completedNow, setCompletedNow] = useState<number | null>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          dispatch({ type: "focus-complete", minutes });
          setCompletedNow(minutes);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, minutes, dispatch]);

  function choose(m: number) {
    setMinutes(m);
    setRemaining(m * 60);
    setRunning(false);
    setCompletedNow(null);
  }

  function toggle() {
    if (!running && startedAt.current === null) startedAt.current = Date.now();
    setRunning(!running);
    setCompletedNow(null);
  }

  function stopEarly() {
    const done = Math.round((minutes * 60 - remaining) / 60);
    setRunning(false);
    if (done >= 1) {
      dispatch({ type: "focus-complete", minutes: done });
      setCompletedNow(done);
    }
    setRemaining(minutes * 60);
    startedAt.current = null;
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const progress = 1 - remaining / (minutes * 60);
  const R = 132;
  const C = 2 * Math.PI * R;

  /* ---------------- immersive ---------------- */
  if (immersive) {
    return (
      <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-paper px-6">
        <IconButton
          name="close" label="Leave distraction-free view"
          className="absolute right-5 top-5"
          onClick={() => setImmersive(false)}
        />
        <h1 className="eyebrow mb-6">{task}</h1>
        <p className="tabular serif-display text-[96px] leading-none sm:text-[140px]">{mm}:{ss}</p>
        <div className="mt-10 flex items-center gap-2.5">
          <Button size="lg" onClick={toggle} icon={running ? "pause" : "play"}>
            {running ? "Pause" : "Resume"}
          </Button>
          <Button size="lg" variant="secondary" onClick={stopEarly} icon="reset">End session</Button>
        </div>
        <div className="mt-14 w-full max-w-md opacity-70">
          <CapybaraDesk level={stats.level} night idle={running} title="A capybara studying quietly" />
        </div>
      </div>
    );
  }

  return (
    <PageBody>
      <div className="grid gap-3.5 lg:grid-cols-[1fr_340px]">
        {/* ================= timer ================= */}
        <Card className="flex flex-col items-center py-10">
          <h1 className="eyebrow mb-1.5">Focus session</h1>
          <p className="text-[14px] text-ink-2">{task}</p>

          <div className="relative mt-8">
            <svg width="300" height="300" viewBox="0 0 300 300" className="-rotate-90" aria-hidden="true">
              <circle cx="150" cy="150" r={R} fill="none" stroke="var(--color-surface-3)" strokeWidth="10" />
              <motion.circle
                cx="150" cy="150" r={R} fill="none" stroke="var(--color-sage)" strokeWidth="10" strokeLinecap="round"
                strokeDasharray={C}
                initial={false}
                animate={{ strokeDashoffset: C - progress * C }}
                transition={{ duration: 0.9, ease: "linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="tabular serif-display text-[58px] leading-none">{mm}:{ss}</p>
              <p className="mt-2 text-[12.5px] text-ink-3">
                {running ? "in progress" : remaining === minutes * 60 ? `${minutes}-minute session` : "paused"}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <Button size="lg" onClick={toggle} icon={running ? "pause" : "play"}>
              {running ? "Pause" : remaining === minutes * 60 ? "Start session" : "Resume"}
            </Button>
            <Button size="lg" variant="secondary" onClick={stopEarly} disabled={remaining === minutes * 60}>
              End early
            </Button>
            <IconButton name="eye" label="Distraction-free view" onClick={() => setImmersive(true)} size={44} />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-1.5">
            {lengths.map((m) => (
              <button
                key={m}
                onClick={() => choose(m)}
                aria-pressed={minutes === m}
                disabled={running}
                className={`tabular rounded-[8px] border px-3 py-1.5 text-[12.5px] font-medium transition-colors disabled:opacity-40 ${
                  minutes === m ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                }`}
              >
                {m} min
              </button>
            ))}
          </div>

          <AnimatePresence>
            {completedNow !== null && (
              <motion.p
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-6 rounded-[10px] border border-sage/25 bg-sage-soft/60 px-4 py-2.5 text-[13px] text-ink"
              >
                {completedNow} minutes logged. Good progress.
              </motion.p>
            )}
          </AnimatePresence>

          {/* the study scene, quiet unless the timer is running */}
          <div className="mt-10 w-full max-w-md">
            <CapybaraDesk level={stats.level} idle={running} night={ambient} title="A capybara studying quietly at a desk" />
          </div>
          <p className="mt-3 max-w-sm text-center text-[12px] leading-relaxed text-ink-3">
            The capybara does not react to your progress. It is just working alongside you.
          </p>
        </Card>

        {/* ================= side ================= */}
        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Current task" title="What are you working on?" />
            <ul className="mt-4 space-y-1.5">
              {tasks.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => setTask(t)}
                    aria-pressed={task === t}
                    className={`w-full rounded-[9px] border px-3 py-2.5 text-left text-[13px] transition-colors ${
                      task === t ? "border-ink bg-surface-2 font-medium text-ink" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                    }`}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="Environment" title="Session settings" />
            <div className="mt-4 space-y-2.5">
              <label className="flex items-center justify-between gap-3 rounded-[9px] border border-line bg-surface px-3 py-2.5">
                <span className="flex items-center gap-2.5 text-[13px] text-ink">
                  <Icon name="sound" size={16} className="text-ink-3" />
                  Ambient evening light
                </span>
                <button
                  role="switch"
                  aria-checked={ambient}
                  onClick={() => setAmbient(!ambient)}
                  className={`relative h-[22px] w-[38px] shrink-0 rounded-full border transition-colors ${ambient ? "border-ink bg-ink" : "border-line-2 bg-surface-2"}`}
                >
                  <motion.span
                    className="absolute top-[2px] size-[16px] rounded-full bg-surface shadow-sm"
                    animate={{ left: ambient ? 19 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 34 }}
                  />
                </button>
              </label>
              <p className="text-[12px] leading-relaxed text-ink-3">
                Dims the study scene and turns the desk lamp on. No sound is played — this is a
                visual setting only.
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader
              eyebrow="This month" title={`${Math.round(stats.minutesThisMonth / 6) / 10} hours focused`}
              description={`${stats.focusSessions + 24} sessions logged.`}
            />
            <ul className="mt-4 divide-y divide-line">
              {recentSessions.map((s) => (
                <li key={s.id} className="flex items-center gap-3 py-2.5">
                  <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${
                    s.completed ? "border-sage/30 bg-sage-soft text-sage-ink" : "border-line bg-surface-2 text-ink-3"
                  }`}>
                    <Icon name={s.completed ? "check" : "minus"} size={12} strokeWidth={2.4} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] text-ink">{s.task}</span>
                    <span className="block text-[11.5px] text-ink-3">{s.at}</span>
                  </span>
                  <Tag className="shrink-0">{s.minutes}m</Tag>
                </li>
              ))}
            </ul>
            <ButtonLink href="/progress" variant="secondary" size="sm" full className="mt-4">
              Full study history
            </ButtonLink>
          </Card>

          <p className="px-1 text-[12px] leading-relaxed text-ink-3">
            Completed sessions add to your study time and count toward the{" "}
            <Link href="/achievements" className="underline decoration-line-2 underline-offset-4 hover:text-ink">Deep Focus</Link>{" "}
            achievement.
          </p>
        </div>
      </div>
    </PageBody>
  );
}
