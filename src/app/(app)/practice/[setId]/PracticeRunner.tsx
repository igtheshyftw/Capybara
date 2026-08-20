"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressRing } from "@/components/ui/Progress";
import { QuestionCard } from "@/components/learning/QuestionCard";
import { ReadingPassage } from "@/components/learning/ReadingPassage";
import { EmptyState } from "@/components/learning/EmptyState";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp } from "@/lib/store";
import { passageById } from "@/lib/data/passages";
import type { Question } from "@/lib/types";

export function PracticeRunner({
  setId, title, description, questions,
}: { setId: string; title: string; description: string; questions: Question[] }) {
  const app = useApp();
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showPassage, setShowPassage] = useState(true);

  if (questions.length === 0) {
    return (
      <PageBody>
        <EmptyState
          variant="professor"
          title="No questions in this set yet."
          body="This skill is taught in the lessons but does not have standalone practice items in the demo bank."
          action={<ButtonLink href="/practice" size="sm">Back to practice</ButtonLink>}
        />
      </PageBody>
    );
  }

  const question = questions[index];
  const passage = question.passageId ? passageById[question.passageId] : undefined;

  const attempted = questions.filter((q) => app.attempts.some((a) => a.questionId === q.id));
  const right = attempted.filter((q) => app.attempts.find((a) => a.questionId === q.id)?.correct).length;
  const accuracy = attempted.length ? Math.round((right / attempted.length) * 100) : 0;

  function next() {
    if (index < questions.length - 1) setIndex(index + 1);
    else setFinished(true);
  }

  /* ---------------- results ---------------- */
  if (finished) {
    return (
      <PageBody>
        <div className="mx-auto max-w-2xl">
          <Card className="text-center">
            <Capybara variant="plain" mood={accuracy >= 70 ? "pleased" : "calm"} size={72} className="mx-auto" />
            <h1 className="serif-display mt-4 text-[30px]">Set complete.</h1>
            <p className="mt-2 text-[14.5px] text-ink-2">
              {accuracy >= 80 ? "Strong work — that accuracy holds up at test pace."
                : accuracy >= 60 ? "Solid. The misses are concentrated, which makes them fixable."
                : "Worth reviewing before moving on. The rationales are the useful part."}
            </p>

            <div className="mt-7 grid grid-cols-3 gap-4 border-y border-line py-6">
              <div>
                <p className="tabular text-[26px] font-semibold leading-none text-ink">{attempted.length}</p>
                <p className="mt-1.5 text-[12px] text-ink-3">answered</p>
              </div>
              <div>
                <p className="tabular text-[26px] font-semibold leading-none text-correct">{right}</p>
                <p className="mt-1.5 text-[12px] text-ink-3">correct</p>
              </div>
              <div>
                <p className="tabular text-[26px] font-semibold leading-none text-ink">{accuracy}%</p>
                <p className="mt-1.5 text-[12px] text-ink-3">accuracy</p>
              </div>
            </div>

            {attempted.length - right > 0 && (
              <p className="mt-5 text-[13.5px] text-ink-2">
                {attempted.length - right} question{attempted.length - right === 1 ? "" : "s"} went to your{" "}
                <Link href="/mistakes" className="font-medium text-ink underline decoration-line-2 underline-offset-4">Mistake Notebook</Link>.
                Classifying why you missed them takes a minute and makes the pattern analysis work.
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button onClick={() => { setIndex(0); setFinished(false); }} icon="reset">Run the set again</Button>
              <ButtonLink href="/mistakes" variant="secondary">Open notebook</ButtonLink>
              <ButtonLink href="/practice" variant="tertiary">All sets</ButtonLink>
            </div>
          </Card>
        </div>
      </PageBody>
    );
  }

  /* ---------------- runner ---------------- */
  return (
    <PageBody wide>
      {/* ---------- header ---------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <nav aria-label="Breadcrumb" className="mb-2 flex items-center gap-1.5 text-[12.5px] text-ink-3">
            <Link href="/practice" className="transition-colors hover:text-ink">Practice</Link>
            <Icon name="chevron-right" size={13} />
            <span className="text-ink-2">{setId === "all" ? "Mixed" : "By skill"}</span>
          </nav>
          <h1 className="text-[24px] font-semibold tracking-[-0.02em]">{title}</h1>
          <p className="mt-1 max-w-xl text-[14px] text-ink-2">{description}</p>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="eyebrow mb-1">Session accuracy</p>
            <p className="tabular text-[20px] font-semibold text-ink">
              {attempted.length ? `${accuracy}%` : "—"}
            </p>
          </div>
          <ProgressRing value={((index + 1) / questions.length) * 100} size={54} label={`${index + 1}/${questions.length}`} />
        </div>
      </div>

      {/* ---------- question navigator ---------- */}
      <div className="mt-5 flex flex-wrap items-center gap-1.5" role="group" aria-label="Jump to question">
        {questions.map((q, i) => {
          const a = app.attempts.find((x) => x.questionId === q.id);
          return (
            <button
              key={q.id}
              onClick={() => setIndex(i)}
              aria-label={`Question ${i + 1}${a ? (a.correct ? ", answered correctly" : ", answered incorrectly") : ""}`}
              aria-current={i === index ? "true" : undefined}
              className={`tabular size-8 rounded-[7px] border text-[12px] font-medium transition-colors duration-150 ${
                i === index ? "border-ink bg-ink text-ink-inv"
                : a?.correct ? "border-correct/35 bg-correct-soft text-correct-ink"
                : a ? "border-wrong/35 bg-wrong-soft text-wrong-ink"
                : "border-line bg-surface text-ink-3 hover:border-line-2 hover:text-ink"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* ---------- passage + question ---------- */}
      <div className={`mt-5 grid gap-3.5 ${passage && showPassage ? "xl:grid-cols-2" : ""}`}>
        {passage && (
          <div className={showPassage ? "" : "hidden"}>
            <ReadingPassage passage={passage} />
          </div>
        )}
        <div className="min-w-0">
          {passage && (
            <button
              onClick={() => setShowPassage(!showPassage)}
              className="mb-2.5 flex items-center gap-1.5 text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink xl:hidden"
            >
              <Icon name={showPassage ? "eye" : "book"} size={14} />
              {showPassage ? "Hide passage" : "Show passage"}
            </button>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuestionCard
                question={question}
                index={index}
                total={questions.length}
                onNext={next}
                showPassageLink={false}
              />
            </motion.div>
          </AnimatePresence>

          <div className="mt-3.5 flex items-center justify-between gap-3">
            <Button variant="tertiary" size="sm" icon="chevron-left" disabled={index === 0} onClick={() => setIndex(index - 1)}>
              Previous
            </Button>
            <Tag>{question.source}</Tag>
            <Button variant="tertiary" size="sm" iconRight="chevron-right" onClick={next}>
              {index === questions.length - 1 ? "Finish" : "Skip"}
            </Button>
          </div>
        </div>
      </div>
    </PageBody>
  );
}
