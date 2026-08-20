"use client";

import { PageBody } from "@/components/ui/PageHeader";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { LineChart } from "@/components/ui/Charts";
import { LogoMark } from "@/components/ui/Logo";
import {
  student, teacherComment, weeklyActivity, skillBreakdown, parentWeekly, assignments, skillNotes,
} from "@/lib/data/people";

export default function ReportPage() {
  const sorted = [...skillBreakdown].sort((a, b) => b.value - a.value);
  const first = weeklyActivity[0], last = weeklyActivity[weeklyActivity.length - 1];

  return (
    <PageBody>
      {/* ---------- controls (never printed) ---------- */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow mb-1.5">Academic progress report</p>
          <h1 className="text-[22px] font-semibold tracking-[-0.02em]">Ready to print or save as PDF</h1>
          <p className="mt-1 text-[13.5px] text-ink-2">Laid out for A4. Navigation and controls are removed from the printed version.</p>
        </div>
        <div className="flex gap-2">
          <Button icon="print" onClick={() => window.print()}>Print report</Button>
          <ButtonLink href="/parent" variant="secondary">Back</ButtonLink>
        </div>
      </div>

      {/* ---------- the sheet ---------- */}
      <article className="print-page mx-auto w-full max-w-[820px] rounded-[6px] border border-line bg-surface p-8 shadow-[var(--shadow-lift)] sm:p-12">
        <header className="flex items-start justify-between gap-6 border-b-2 border-ink pb-5">
          <div className="flex items-center gap-3">
            <LogoMark size={34} />
            <div>
              <p className="serif-display text-[19px] leading-none">Capybara Motion</p>
              <p className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-ink-3">Academic progress report</p>
            </div>
          </div>
          <div className="text-right text-[12px] text-ink-2">
            <p>Reporting period</p>
            <p className="font-medium text-ink">23 June – 17 August 2026</p>
          </div>
        </header>

        <section className="mt-7">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
            {[
              ["Student", student.name], ["Year group", student.grade],
              ["Programme", "SAT Reading & Writing"], ["Instructor", "Dr. Elena Marsh"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow mb-1">{k}</dt>
                <dd className="text-[14px] font-medium text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Section title="Academic summary">
          <p className="text-[14px] leading-[1.75] text-ink-2">
            {student.name} has completed 46 lessons and answered {student.questionsAnswered.toLocaleString()} practice
            questions across the reporting period, studying an average of {Math.round(parentWeekly.minutes / 7)} minutes
            per day. Overall accuracy has risen from {first.accuracy}% to {last.accuracy}%, a gain of{" "}
            {last.accuracy - first.accuracy} percentage points sustained over eight consecutive weeks. Attendance to the
            daily study routine has been consistent, with a current streak of {student.streak} days and a longest run of{" "}
            {student.longestStreak}.
          </p>
        </Section>

        <Section title="Current performance">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {[
              ["Overall accuracy", `${last.accuracy}%`], ["Study time this month", "18.4 hours"],
              ["Vocabulary mastered", `${student.wordsMastered} words`], ["Course completion", "64%"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-[8px] border border-line bg-surface-2/50 p-3.5">
                <p className="eyebrow mb-1.5">{k}</p>
                <p className="tabular text-[19px] font-semibold leading-none text-ink">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="eyebrow mb-3">Accuracy trend</p>
            <LineChart
              data={weeklyActivity.map((w) => ({ label: w.week, value: w.accuracy }))}
              accent="var(--color-ink)" valueSuffix="%" height={140}
              ariaLabel="Accuracy trend across the reporting period"
            />
          </div>
        </Section>

        <Section title="Strengths">
          <ul className="space-y-3">
            {sorted.slice(0, 3).map((s) => (
              <li key={s.skill} className="flex items-start gap-3">
                <Icon name="check" size={15} className="mt-[3px] shrink-0 text-correct" />
                <p className="text-[14px] leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">{s.skill} — {s.value}%.</span>{" "}
                  {skillNotes[s.skill]?.strength}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Areas requiring attention">
          <ul className="space-y-3">
            {[...sorted].reverse().slice(0, 2).map((s) => (
              <li key={s.skill} className="flex items-start gap-3">
                <Icon name="alert" size={15} className="mt-[3px] shrink-0 text-clay" />
                <p className="text-[14px] leading-relaxed text-ink-2">
                  <span className="font-semibold text-ink">{s.skill} — {s.value}%.</span>{" "}
                  {skillNotes[s.skill]?.attention}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Recent progress">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="pb-2 font-semibold text-ink">Week</th>
                <th className="pb-2 text-right font-semibold text-ink">Study time</th>
                <th className="pb-2 text-right font-semibold text-ink">Questions</th>
                <th className="pb-2 text-right font-semibold text-ink">Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {weeklyActivity.slice(-4).map((w) => (
                <tr key={w.week} className="border-b border-line">
                  <td className="py-2 text-ink-2">{w.week}</td>
                  <td className="tabular py-2 text-right text-ink-2">{Math.floor(w.minutes / 60)}h {w.minutes % 60}m</td>
                  <td className="tabular py-2 text-right text-ink-2">{w.questions}</td>
                  <td className="tabular py-2 text-right font-medium text-ink">{w.accuracy}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Recommendations">
          <ol className="space-y-2.5">
            {[
              "Continue the current daily routine. Consistency is doing more work here than session length.",
              "Prioritise rhetorical synthesis in practice — it is both the weakest skill and the least attempted.",
              "Classify each mistake in the notebook. The distinction between a careless error and a conceptual gap changes what should happen next.",
              "Sit one full timed section every fortnight to keep pacing calibrated as accuracy improves.",
            ].map((r, i) => (
              <li key={r} className="flex gap-3 text-[14px] leading-relaxed text-ink-2">
                <span className="tabular shrink-0 font-semibold text-ink">{i + 1}.</span>
                {r}
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Teacher comments">
          <p className="font-serif text-[14.5px] leading-[1.8] text-ink">{teacherComment}</p>
          <div className="mt-8 flex items-end justify-between gap-6 border-t border-line pt-5">
            <div>
              <p className="font-serif text-[17px] italic text-ink-2">E. Marsh</p>
              <p className="mt-1.5 text-[12px] text-ink-3">Dr. Elena Marsh · English &amp; Test Preparation</p>
            </div>
            <p className="text-[12px] text-ink-3">
              {assignments.filter((a) => a.status === "graded").length} assignment graded this period
            </p>
          </div>
        </Section>

        <footer className="mt-8 border-t border-line pt-4 text-[10.5px] leading-relaxed text-ink-3">
          Generated by Capybara Motion on 19 August 2026. This report summarises platform activity
          and does not replace school reporting. All figures are drawn from completed work only.
        </footer>
      </article>
    </PageBody>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 break-inside-avoid">
      <h2 className="mb-3.5 border-b border-line pb-2 text-[12px] font-semibold uppercase tracking-[0.11em] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
