"use client";

import { useState } from "react";
import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { courses, allLessons } from "@/lib/data/courses";
import { questions } from "@/lib/data/questions";
import { passages } from "@/lib/data/passages";
import { vocabularySets } from "@/lib/data/vocabulary";
import { skillById } from "@/lib/data/skills";

const tabs = ["Courses", "Lessons", "Questions", "Passages", "Word sets"] as const;

export default function TeacherLibraryPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Courses");

  const counts = {
    Courses: courses.length, Lessons: allLessons.length, Questions: questions.length,
    Passages: passages.length, "Word sets": vocabularySets.length,
  };

  return (
    <PageBody>
      <PageHeader
        eyebrow="Content library"
        title="Everything you can assign"
        serif
        description="The same material students see, listed so you can find and assign it quickly."
        action={<ButtonLink href="/teacher/assignments/new" icon="plus">New assignment</ButtonLink>}
      />

      <div className="no-scrollbar mt-7 -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
              tab === t ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
            }`}
          >
            {t} <span className="tabular opacity-60">{counts[t]}</span>
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "Courses" && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <li key={c.id}>
                <Link href={`/learn/${c.id}`} className="group block h-full rounded-[13px] border border-line bg-surface p-4 transition-colors hover:border-line-2 hover:bg-surface-2/50">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[14.5px] font-semibold text-ink">{c.title}</p>
                    <Tag className="shrink-0">{c.category}</Tag>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2">{c.subtitle}</p>
                  <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11.5px] text-ink-3">
                    <span>{c.lessonCount} lessons</span><span>{c.hours} h</span><span>{c.difficulty}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {tab === "Lessons" && (
          <Card padded={false} className="overflow-hidden">
            <ul className="divide-y divide-line">
              {allLessons.map((l) => (
                <li key={l.id}>
                  <Link href={`/learn/${l.courseId}/${l.id}`} className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-surface-2/50">
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[13.5px] font-medium text-ink">{l.title}</span>
                        <Tag>{l.kind}</Tag>
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] text-ink-3">{l.summary}</span>
                    </span>
                    <span className="tabular shrink-0 text-[12px] text-ink-3">{l.minutes} min</span>
                    <Icon name="chevron-right" size={15} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {tab === "Questions" && (
          <Card padded={false} className="overflow-hidden">
            <ul className="divide-y divide-line">
              {questions.map((q) => (
                <li key={q.id} className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <span className="min-w-0 flex-1">
                      <span className="block line-clamp-2 text-[13.5px] leading-snug text-ink">{q.prompt.split("\n")[0]}</span>
                      <span className="mt-1 block text-[11.5px] text-ink-3">{q.source}</span>
                    </span>
                    <span className="flex shrink-0 gap-1.5">
                      <Tag tone="blue">{skillById[q.skill].name}</Tag>
                      <Tag>{q.difficulty}</Tag>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {tab === "Passages" && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {passages.map((p) => (
              <li key={p.id} className="rounded-[13px] border border-line bg-surface p-4">
                <Tag tone="plum">{p.genre}</Tag>
                <h3 className="mt-2.5 font-serif text-[17px] text-ink">{p.title}</h3>
                <p className="mt-1 text-[11.5px] italic text-ink-3">{p.attribution}</p>
                <p className="mt-2.5 line-clamp-3 text-[12.5px] leading-snug text-ink-2">{p.paragraphs[0]}</p>
                <p className="mt-3 text-[11.5px] text-ink-3">
                  {p.paragraphs.length} paragraphs · {questions.filter((q) => q.passageId === p.id).length} questions
                </p>
              </li>
            ))}
          </ul>
        )}

        {tab === "Word sets" && (
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vocabularySets.map((s) => (
              <li key={s.id}>
                <Link href={`/vocabulary/${s.id}`} className="block h-full rounded-[13px] border border-line bg-surface p-4 transition-colors hover:border-line-2 hover:bg-surface-2/50">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[14.5px] font-semibold text-ink">{s.title}</h3>
                    <Tag className="shrink-0">{s.tier}</Tag>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-ink-2">{s.description}</p>
                  <p className="mt-3 text-[11.5px] text-ink-3">{s.wordIds.length} words</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageBody>
  );
}
