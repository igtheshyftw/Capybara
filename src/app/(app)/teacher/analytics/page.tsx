"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { LineChart, BarChart, SkillChart } from "@/components/ui/Charts";
import { MasteryBar } from "@/components/ui/Progress";
import { teacherStudents, weeklyActivity, skillBreakdown, classes } from "@/lib/data/people";

export default function TeacherAnalyticsPage() {
  const avg = Math.round(teacherStudents.reduce((n, s) => n + s.accuracy, 0) / teacherStudents.length);
  const sorted = [...skillBreakdown].sort((a, b) => a.value - b.value);

  const distribution = [
    { band: "90–100%", n: teacherStudents.filter((s) => s.accuracy >= 90).length },
    { band: "80–89%", n: teacherStudents.filter((s) => s.accuracy >= 80 && s.accuracy < 90).length },
    { band: "70–79%", n: teacherStudents.filter((s) => s.accuracy >= 70 && s.accuracy < 80).length },
    { band: "60–69%", n: teacherStudents.filter((s) => s.accuracy >= 60 && s.accuracy < 70).length },
    { band: "Below 60%", n: teacherStudents.filter((s) => s.accuracy < 60).length },
  ];

  return (
    <PageBody wide>
      <PageHeader
        eyebrow="Class analytics"
        title="Where the whole group stands"
        serif
        description="Use this to decide what to teach next. A weakness shared by six students is a lesson; a weakness held by one is a conversation."
        action={<ButtonLink href="/teacher/assignments/new" variant="secondary" icon="plus">Assign practice</ButtonLink>}
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader eyebrow="Trend" title="Class accuracy over eight weeks" description={`Current class mean: ${avg}%.`} />
          <div className="mt-6">
            <LineChart
              data={weeklyActivity.map((w) => ({ label: w.week, value: w.accuracy }))}
              accent="var(--color-sage)" valueSuffix="%" height={190} ariaLabel="Class accuracy by week"
            />
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Distribution" title="Students by accuracy band" />
          <ul className="mt-5 space-y-3.5">
            {distribution.map((d) => (
              <li key={d.band}>
                <MasteryBar
                  label={d.band} value={(d.n / teacherStudents.length) * 100} height={7}
                  showValue={false}
                  accent={d.band === "Below 60%" ? "var(--color-clay)" : d.band === "60–69%" ? "var(--color-ochre)" : "var(--color-sage)"}
                  sublabel={`${d.n} student${d.n === 1 ? "" : "s"}`}
                />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Teaching priorities" title="Weakest skills across the class" description="Lowest first. These are the lessons worth planning." />
          <div className="mt-5">
            <SkillChart data={sorted.slice(0, 6)} />
          </div>
          <p className="mt-4 border-t border-line pt-3.5 text-[13px] leading-relaxed text-ink-2">
            Rhetorical synthesis and inference are the two lowest and are also the two with the
            fewest attempts. That combination usually means the skill is being avoided rather than
            failed.
          </p>
        </Card>

        <Card>
          <CardHeader eyebrow="Engagement" title="Study time by student" description={`Class mean is ${Math.round(teacherStudents.reduce((n, s) => n + s.minutesWeek, 0) / teacherStudents.length)} minutes this week.`} />
          <div className="mt-6">
            <BarChart
              data={teacherStudents.map((s) => ({ label: s.initials, value: s.minutesWeek }))}
              target={Math.round(teacherStudents.reduce((n, s) => n + s.minutesWeek, 0) / teacherStudents.length)}
              accent="var(--color-blue)" suffix=" min" ariaLabel="Study minutes by student"
            />
          </div>
        </Card>
      </div>

      <Card className="mt-3.5">
        <CardHeader eyebrow="Classes" title="Comparison" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {classes.map((c) => {
            const members = teacherStudents.filter((s) => c.studentIds.includes(s.id));
            const acc = Math.round(members.reduce((n, s) => n + s.accuracy, 0) / members.length);
            const mins = Math.round(members.reduce((n, s) => n + s.minutesWeek, 0) / members.length);
            return (
              <div key={c.id} className="rounded-[12px] border border-line bg-surface-2/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[14.5px] font-semibold text-ink">{c.name}</p>
                    <p className="mt-0.5 text-[12px] text-ink-3">{c.period}</p>
                  </div>
                  <Tag>{members.length} students</Tag>
                </div>
                <div className="mt-4 space-y-3">
                  <MasteryBar label="Mean accuracy" value={acc} height={6} accent="var(--color-sage)" />
                  <MasteryBar
                    label="Mean study time" value={Math.min(100, (mins / 300) * 100)} height={6}
                    accent="var(--color-blue)" showValue={false}
                    sublabel={`${Math.floor(mins / 60)}h ${mins % 60}m per student this week`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </PageBody>
  );
}
