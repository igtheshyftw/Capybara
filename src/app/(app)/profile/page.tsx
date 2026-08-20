"use client";

import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar, ProgressRing } from "@/components/ui/Progress";
import { RoleSwitcher } from "@/components/navigation/RoleSwitcher";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp, useDispatch, useStats } from "@/lib/store";
import { student, achievements, masteryMap } from "@/lib/data/people";
import { courses } from "@/lib/data/courses";

export default function ProfilePage() {
  const app = useApp();
  const dispatch = useDispatch();
  const stats = useStats();
  const earned = achievements.filter((a) => a.earned);

  return (
    <PageBody>
      <PageHeader eyebrow="Profile" title={student.name} serif description={`${student.grade} · joined ${student.joined}`} />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3.5">
          {/* ---------- identity ---------- */}
          <Card>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-5">
                <span className="flex size-16 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[19px] font-semibold text-ink-2">
                  {student.initials}
                </span>
                <div>
                  <p className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{student.name}</p>
                  <p className="mt-0.5 text-[13px] text-ink-2">{student.goal}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Tag tone="solid">Level {stats.level}</Tag>
                    <Tag tone="ochre">{stats.xp.toLocaleString()} XP</Tag>
                    <Tag tone="clay">{stats.streak}-day streak</Tag>
                  </div>
                </div>
              </div>
              <div className="sm:ml-auto">
                <ProgressRing value={(stats.xpIntoLevel / stats.xpToNext) * 100} size={84} accent="var(--color-ochre)" label={`Lv ${stats.level}`} />
              </div>
            </div>
          </Card>

          {/* ---------- lifetime stats ---------- */}
          <Card>
            <CardHeader eyebrow="All time" title="What you have done here" />
            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                { k: "Questions answered", v: stats.questionsAnswered.toLocaleString() },
                { k: "Words mastered", v: stats.wordsMastered.toLocaleString() },
                { k: "Lessons completed", v: (stats.completedLessons + 46).toString() },
                { k: "Longest streak", v: `${student.longestStreak} days` },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="eyebrow mb-1.5">{s.k}</dt>
                  <dd className="tabular text-[22px] font-semibold leading-none text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          {/* ---------- enrolled ---------- */}
          <Card>
            <CardHeader
              eyebrow="Enrolled" title="Your courses"
              action={<ButtonLink href="/learn" variant="secondary" size="sm">Browse all</ButtonLink>}
            />
            <ul className="mt-4 divide-y divide-line">
              {courses.filter((c) => c.progress > 0).map((c) => (
                <li key={c.id}>
                  <Link href={`/learn/${c.id}`} className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-surface-2/50 sm:-mx-2 sm:rounded-[9px] sm:px-2">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-medium text-ink">{c.title}</span>
                      <span className="block text-[12.5px] text-ink-3">{c.category} · {c.lessonCount} lessons</span>
                    </span>
                    <span className="hidden w-[140px] shrink-0 sm:block">
                      <MasteryBar value={c.progress} height={5} showValue={false} accent="var(--color-ink-3)" />
                    </span>
                    <span className="tabular w-10 shrink-0 text-right text-[13px] font-medium text-ink-2">{c.progress}%</span>
                    <Icon name="chevron-right" size={16} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          {/* ---------- mastery ---------- */}
          <Card>
            <CardHeader eyebrow="Mastery" title="By subject area" action={<Link href="/progress" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">Analytics</Link>} />
            <ul className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {masteryMap.map((m) => (
                <li key={m.skill}><MasteryBar label={m.skill} value={m.value} delta={m.delta} /></li>
              ))}
            </ul>
          </Card>
        </div>

        {/* ================= side ================= */}
        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Study room" title={`Level ${stats.level}`} description="Items unlock as you level up." />
            <div className="mt-4 flex items-center gap-4">
              <Capybara variant="plain" mood="pleased" size={56} idle />
              <ButtonLink href="/room" variant="secondary" size="sm">Open room</ButtonLink>
            </div>
          </Card>

          <Card>
            <CardHeader
              eyebrow="Achievements" title={`${earned.length} earned`}
              action={<Link href="/achievements" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">All</Link>}
            />
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {earned.map((a) => <li key={a.id}><Tag tone="ochre">{a.name}</Tag></li>)}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="Account" title="Preferences" />
            <ul className="mt-4 divide-y divide-line text-[13.5px]">
              {[
                ["Email", student.name.toLowerCase().replace(" ", ".") + "@school.example"],
                ["Target exam", student.targetExam],
                ["Daily goal", "40 minutes"],
                ["Reduced motion", "Follows your system setting"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between gap-4 py-2.5">
                  <span className="text-ink-2">{k}</span>
                  <span className="text-right text-ink">{v}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="Demo controls" title="Switch role" description="For demonstration. Each role gets its own navigation and screens." />
            <div className="mt-4">
              <RoleSwitcher compact />
            </div>
            <div className="mt-5 border-t border-line pt-4">
              <p className="text-[12.5px] leading-relaxed text-ink-2">
                Your answers, reviews, notes and drafts are stored in this browser only. Clearing
                them resets the demo to its starting state.
              </p>
              <Button
                variant="danger" size="sm" className="mt-3" icon="reset"
                onClick={() => {
                  if (window.confirm("Clear all demo progress stored in this browser? This cannot be undone.")) {
                    dispatch({ type: "reset" });
                  }
                }}
              >
                Clear my demo progress
              </Button>
              <p className="mt-2.5 text-[11.5px] text-ink-3">
                {app.attempts.length} answers · {Object.keys(app.reviews).length} reviews ·{" "}
                {Object.keys(app.writing).length} drafts stored
              </p>
            </div>
          </Card>
        </div>
      </div>
    </PageBody>
  );
}
