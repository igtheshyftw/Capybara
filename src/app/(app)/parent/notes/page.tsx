"use client";

import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { teacherComment, student } from "@/lib/data/people";

const notes = [
  {
    id: "n1", teacher: "Dr. Elena Marsh", subject: "SAT Reading & Writing", date: "16 August 2026",
    tone: "sage" as const, body: teacherComment,
  },
  {
    id: "n2", teacher: "Priya Raghunathan", subject: "IELTS Academic Writing", date: "9 August 2026",
    tone: "blue" as const,
    body: "The opinion essay draft shows a clear position stated early and maintained, which is the hardest part to teach. What is missing is the explanation step: paragraphs move from claim to example without the two or three sentences that say why the claim follows. We worked on this directly in Thursday's session and the revised body paragraph was noticeably stronger. I have asked for a second draft by the end of next week.",
  },
  {
    id: "n3", teacher: "Tomas Feld", subject: "Grammar Foundations", date: "2 August 2026",
    tone: "ochre" as const,
    body: "Agreement and modifier placement are secure. Sentence boundaries are the remaining gap — specifically conjunctive adverbs, where a comma is being used in place of a semicolon. This is a rule rather than a reasoning problem, so it should resolve quickly with the practice set I have assigned. No concerns otherwise.",
  },
];

export default function ParentNotesPage() {
  return (
    <PageBody>
      <PageHeader
        eyebrow="Teacher notes"
        title="What your child's teachers have written"
        serif
        description={`Written feedback about ${student.name.split(" ")[0]}, newest first. Teachers write these for you rather than for the record.`}
        action={<ButtonLink href="/parent/report" variant="secondary" icon="print">Progress report</ButtonLink>}
      />

      <div className="mt-7 space-y-3.5">
        {notes.map((n) => (
          <Card key={n.id}>
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[12px] font-semibold text-ink-2">
                  {n.teacher.split(" ").map((p) => p[0]).slice(-2).join("")}
                </span>
                <div>
                  <p className="text-[14.5px] font-semibold text-ink">{n.teacher}</p>
                  <p className="text-[12.5px] text-ink-3">{n.subject}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Tag tone={n.tone}>{n.subject.split(" ")[0]}</Tag>
                <span className="text-[12.5px] text-ink-3">{n.date}</span>
              </div>
            </div>
            <p className="mt-4 font-serif text-[15.5px] leading-[1.78] text-ink">{n.body}</p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-[12.5px] leading-relaxed text-ink-3">
        Teacher notes are written manually and are not generated from platform activity.
      </p>
    </PageBody>
  );
}
