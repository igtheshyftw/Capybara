"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { LineChart, BarChart, SkillChart } from "@/components/ui/Charts";
import { MasteryBar } from "@/components/ui/Progress";
import { student, weeklyActivity, masteryMap, skillBreakdown, dailyMinutes } from "@/lib/data/people";

export default function ParentProgressPage() {
  return (
    <PageBody>
      <PageHeader
        eyebrow="Progress"
        title={`${student.name.split(" ")[0]}'s progress in detail`}
        serif
        description="The same figures as the weekly overview, broken out by skill and by week. Useful before a parents' evening."
        action={<ButtonLink href="/parent/report" variant="secondary" icon="print">Printable report</ButtonLink>}
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Accuracy" title="Eight-week trend" />
          <div className="mt-6">
            <LineChart data={weeklyActivity.map((w) => ({ label: w.week, value: w.accuracy }))} accent="var(--color-sage)" valueSuffix="%" height={170} ariaLabel="Accuracy by week" />
          </div>
        </Card>
        <Card>
          <CardHeader eyebrow="Study time" title="Minutes per week" />
          <div className="mt-6">
            <LineChart data={weeklyActivity.map((w) => ({ label: w.week, value: w.minutes }))} accent="var(--color-blue)" valueSuffix=" min" height={170} ariaLabel="Study minutes by week" />
          </div>
        </Card>
      </div>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader eyebrow="Subject areas" title="Mastery by domain" description="Mastery reflects accuracy on questions not seen before, not questions attempted." />
          <ul className="mt-5 space-y-4">
            {masteryMap.map((m) => (
              <li key={m.skill}><MasteryBar label={m.skill} value={m.value} delta={m.delta} /></li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardHeader eyebrow="Skills" title="Detailed breakdown" />
          <div className="mt-5">
            <SkillChart data={[...skillBreakdown].sort((a, b) => b.value - a.value)} />
          </div>
        </Card>
      </div>

      <Card className="mt-3.5">
        <CardHeader eyebrow="This week" title="Daily study pattern" description="The dashed line is the 40-minute daily target." />
        <div className="mt-6">
          <BarChart data={dailyMinutes.map((d) => ({ label: d.day, value: d.minutes }))} target={40} accent="var(--color-blue)" height={150} ariaLabel="Study minutes each day" />
        </div>
      </Card>
    </PageBody>
  );
}
