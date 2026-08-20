import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { EmptyState } from "@/components/learning/EmptyState";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { getSessionUser } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/db";
import { getVisibleStudentSummaries } from "@/lib/queries/students";
import { DemoOverview } from "./DemoOverview";

export const metadata: Metadata = { title: "Parent overview" };
export const dynamic = "force-dynamic";

export default async function ParentPage() {
  if (!isDatabaseConfigured()) return <DemoOverview />;

  const user = await getSessionUser();
  if (!user) return null;

  // Scoped by ParentLink — a parent can only ever reach their own children.
  const children = await getVisibleStudentSummaries(user);

  if (children.length === 0) {
    return (
      <PageBody>
        <PageHeader
          eyebrow="Parent account" title={`Welcome, ${user.name.split(" ")[0]}.`} serif
          description="Your account is set up, but it is not linked to a child yet."
        />
        <div className="mt-7">
          <EmptyState
            level={2}
            variant="professor"
            title="No child linked to this account."
            body="A link is created by the school when they invite you. Ask your child's teacher to send a parent invite that names them, and their progress will appear here."
          />
        </div>
      </PageBody>
    );
  }

  return (
    <PageBody>
      <PageHeader
        eyebrow="Parent account"
        title={children.length === 1 ? `${children[0].name.split(" ")[0]}'s progress` : "Your children"}
        serif
        description="A summary of what your child has been working on. Deliberately not a record of every click."
        action={<ButtonLink href="/parent/report" variant="secondary" icon="print">Progress report</ButtonLink>}
      />

      <div className="mt-7 space-y-3.5">
        {children.map((child) => (
          <Card key={child.id}>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[14px] font-semibold text-ink-2">
                  {child.initials}
                </span>
                <div>
                  <h2 className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{child.name}</h2>
                  <p className="mt-0.5 text-[12.5px] text-ink-3">
                    {child.courses.length ? child.courses.join(" · ") : "Not in a class yet"} · last active {child.lastActive.toLowerCase()}
                  </p>
                </div>
              </div>
              <Tag tone={child.streak > 0 ? "sage" : "neutral"}>{child.streak}-day streak</Tag>
            </div>

            {child.attempts === 0 ? (
              <p className="mt-5 rounded-[11px] border border-line bg-surface-2/60 p-4 text-[13.5px] leading-relaxed text-ink-2">
                {child.name.split(" ")[0]} has not answered any questions yet. Figures appear here
                as soon as they start — nothing is estimated or filled in on their behalf.
              </p>
            ) : (
              <>
                <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-line py-5 sm:grid-cols-4">
                  {[
                    ["Accuracy", child.accuracy === null ? "—" : `${child.accuracy}%`],
                    ["Questions answered", child.attempts.toString()],
                    ["Study time this week", `${Math.floor(child.minutesWeek / 60)}h ${child.minutesWeek % 60}m`],
                    ["Lessons completed", child.lessonsCompleted.toString()],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="eyebrow mb-1.5">{k}</dt>
                      <dd className="tabular text-[22px] font-semibold leading-none text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <MasteryBar
                    label="Accuracy" value={child.accuracy ?? 0}
                    accent={(child.accuracy ?? 0) >= 70 ? "var(--color-sage)" : "var(--color-clay)"}
                    sublabel={`Across ${child.attempts} question${child.attempts === 1 ? "" : "s"}`}
                  />
                  <MasteryBar
                    label="Vocabulary mastered" value={Math.min(100, child.wordsMastered)}
                    accent="var(--color-ochre)" showValue={false}
                    sublabel={`${child.wordsMastered} word${child.wordsMastered === 1 ? "" : "s"} in long-term review`}
                  />
                </div>

                {child.openMistakes > 0 && (
                  <p className="mt-5 flex items-start gap-2.5 rounded-[10px] border border-ochre/25 bg-ochre-soft/45 p-3 text-[13px] leading-snug text-ink-2">
                    <Icon name="info" size={15} className="mt-[2px] shrink-0 text-ochre" />
                    <span>
                      {child.openMistakes} question{child.openMistakes === 1 ? "" : "s"} in their
                      mistake notebook are waiting to be reviewed. This is normal and is how the
                      platform is meant to be used.
                    </span>
                  </p>
                )}
              </>
            )}

            <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
              <ButtonLink href="/parent/progress" variant="secondary" size="sm">Detailed progress</ButtonLink>
              <ButtonLink href="/parent/notes" variant="tertiary" size="sm">Teacher notes</ButtonLink>
            </div>
          </Card>
        ))}

        <CapybaraGuide variant="plain" name="What you can see" tone="paper">
          This account shows summaries, trends and teacher feedback for the children linked to it.
          It does not show individual answers, tutor conversations, or minute-by-minute activity.
          Parents need clarity, not surveillance.
        </CapybaraGuide>

        <p className="px-1 text-[12.5px] text-ink-3">
          Something look wrong?{" "}
          <Link href="/account" className="underline decoration-line-2 underline-offset-4 hover:text-ink">
            Check which children are linked to your account
          </Link>
          .
        </p>
      </div>
    </PageBody>
  );
}
