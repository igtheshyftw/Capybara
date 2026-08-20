"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Card";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp, useDispatch } from "@/lib/store";
import { skillById } from "@/lib/data/skills";
import { passageById } from "@/lib/data/passages";
import type { Confidence, Question } from "@/lib/types";

const letters = ["A", "B", "C", "D"] as const;

export function QuestionCard({
  question, index, total, onNext, showPassageLink = true, compact = false,
}: {
  question: Question;
  index?: number;
  total?: number;
  onNext?: () => void;
  showPassageLink?: boolean;
  compact?: boolean;
}) {
  const app = useApp();
  const dispatch = useDispatch();
  const prior = app.attempts.find((a) => a.questionId === question.id);

  const [selected, setSelected] = useState<typeof letters[number] | null>(prior?.chosen ?? null);
  const [confidence, setConfidence] = useState<Confidence | null>(prior?.confidence ?? null);
  const [submitted, setSubmitted] = useState(Boolean(prior));
  const [hint, setHint] = useState(false);

  const correct = submitted && selected === question.correct;
  const passage = question.passageId ? passageById[question.passageId] : undefined;

  function submit() {
    if (!selected) return;
    setSubmitted(true);
    dispatch({ type: "answer", questionId: question.id, chosen: selected, confidence });
  }

  function retry() {
    setSubmitted(false);
    setSelected(null);
    setConfidence(null);
    setHint(false);
  }

  return (
    <article className="paper-card overflow-hidden" aria-live="polite">
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-3">
          {typeof index === "number" && typeof total === "number" ? (
            <p className="text-[13px] font-semibold text-ink">
              Question <span className="tabular">{index + 1}</span> of <span className="tabular">{total}</span>
            </p>
          ) : (
            <p className="text-[13px] font-semibold text-ink">Check understanding</p>
          )}
          <Tag>{question.difficulty}</Tag>
        </div>
        <div className="flex items-center gap-2">
          {passage && showPassageLink && (
            <span className="text-[12px] text-ink-3">from &ldquo;{passage.title}&rdquo;</span>
          )}
          <Tag tone="blue">{skillById[question.skill].name}</Tag>
        </div>
      </div>

      {/* ---------- progress within a set ---------- */}
      {typeof index === "number" && typeof total === "number" && (
        <div className="h-[3px] w-full bg-surface-3">
          <motion.div
            className="h-full bg-ink"
            initial={false}
            animate={{ width: `${((index + (submitted ? 1 : 0)) / total) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      <div className={compact ? "p-5" : "p-5 sm:p-6"}>
        {/* ---------- prompt ---------- */}
        <div className="max-w-[64ch]">
          {question.prompt.split("\n\n").map((para, i) => (
            <p key={i} className={i === 0 ? "text-[15.5px] font-medium leading-relaxed text-ink" : "mt-3 whitespace-pre-line rounded-[10px] border border-line bg-surface-2/60 p-3.5 font-serif text-[15px] leading-relaxed text-ink"}>
              {para}
            </p>
          ))}
        </div>

        {/* ---------- options ---------- */}
        <ul className="mt-5 space-y-2.5" role="radiogroup" aria-label="Answer choices">
          {question.choices.map((choice) => {
            const isSelected = selected === choice.id;
            const isCorrect = choice.id === question.correct;
            const reveal = submitted;

            let stateClass = "border-line bg-surface hover:border-ink-3 hover:bg-surface-2/50";
            if (!reveal && isSelected) stateClass = "border-ink bg-surface-2 shadow-[var(--shadow-paper)]";
            if (reveal && isCorrect) stateClass = "border-correct/50 bg-correct-soft/70";
            else if (reveal && isSelected) stateClass = "border-wrong/50 bg-wrong-soft/70";
            else if (reveal) stateClass = "border-line bg-surface opacity-65";

            return (
              <li key={choice.id}>
                <motion.button
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  disabled={submitted}
                  onClick={() => setSelected(choice.id)}
                  whileTap={submitted ? undefined : { scale: 0.988 }}
                  transition={{ duration: 0.12 }}
                  className={`flex w-full items-start gap-3.5 rounded-[11px] border p-3.5 text-left transition-[background-color,border-color,opacity] duration-200 disabled:cursor-default ${stateClass}`}
                >
                  <span
                    className={`flex size-[26px] shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold transition-colors duration-200 ${
                      reveal && isCorrect ? "border-correct bg-correct text-ink-inv"
                      : reveal && isSelected ? "border-wrong bg-wrong text-ink-inv"
                      : isSelected ? "border-ink bg-ink text-ink-inv"
                      : "border-line-2 text-ink-2"
                    }`}
                  >
                    {reveal && isCorrect ? <Icon name="check" size={13} strokeWidth={2.5} />
                      : reveal && isSelected ? <Icon name="close" size={12} strokeWidth={2.5} />
                      : choice.id}
                  </span>
                  <span className="min-w-0 flex-1 pt-[3px]">
                    <span className="block text-[14.5px] leading-relaxed text-ink">{choice.text}</span>
                    <AnimatePresence>
                      {reveal && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-2 block text-[13px] leading-relaxed text-ink-2">{choice.rationale}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              </li>
            );
          })}
        </ul>

        {/* ---------- confidence + submit ---------- */}
        {!submitted && (
          <div className="mt-5 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-end sm:justify-between">
            <fieldset>
              <legend className="eyebrow mb-2">How confident were you?</legend>
              <div className="flex gap-1.5">
                {(["low", "medium", "high"] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={confidence === c}
                    onClick={() => setConfidence(confidence === c ? null : c)}
                    className={`rounded-[8px] border px-3 py-1.5 text-[12.5px] font-medium capitalize transition-colors duration-150 ${
                      confidence === c ? "border-ink bg-ink text-ink-inv" : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11.5px] text-ink-3">Optional — it makes your error analysis far more useful.</p>
            </fieldset>

            <div className="flex items-center gap-2">
              <Button variant="tertiary" size="sm" icon="sparkle" onClick={() => setHint(true)} disabled={hint}>
                Hint
              </Button>
              <Button onClick={submit} disabled={!selected}>Check answer</Button>
            </div>
          </div>
        )}

        {/* ---------- hint ---------- */}
        <AnimatePresence>
          {hint && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="mt-4 flex items-start gap-3 rounded-[11px] border border-blue/25 bg-blue-soft/50 p-3.5"
            >
              <Capybara variant="professor" size={40} className="-mt-1 shrink-0" />
              <div>
                <p className="eyebrow mb-1">Professor Bara</p>
                <p className="text-[13px] leading-relaxed text-ink-2">
                  Before comparing options, say in your own words what the question is asking you to
                  prove. Then check which option you could point at a sentence for.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------- feedback ---------- */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 border-t border-line pt-5"
            >
              <div className="flex items-start gap-3.5">
                <Capybara
                  variant={correct ? "plain" : "detective"}
                  mood={correct ? "pleased" : "calm"}
                  size={46}
                  className="-mt-1 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className={`text-[15px] font-semibold ${correct ? "text-correct" : "text-wrong"}`}>
                    {correct ? "Correct. Nicely reasoned." : "Not this one. It is worth seeing why."}
                  </p>
                  {!correct && (
                    <p className="mt-1 text-[13px] text-ink-2">
                      Saved to your{" "}
                      <Link href="/mistakes" className="font-medium text-ink underline decoration-line-2 underline-offset-4">
                        Mistake Notebook
                      </Link>{" "}
                      so you can classify why it happened.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <FeedbackSection title="Why" icon="info">
                  <p className="text-[13.5px] leading-relaxed text-ink-2">{question.why}</p>
                </FeedbackSection>

                {question.evidence && (
                  <FeedbackSection title="Evidence" icon="highlight">
                    <blockquote className="border-l-2 border-ochre pl-3.5 font-serif text-[14.5px] italic leading-relaxed text-ink">
                      {question.evidence}
                    </blockquote>
                  </FeedbackSection>
                )}

                <FeedbackSection title="Skill tested" icon="target">
                  <p className="text-[13.5px] text-ink-2">
                    <span className="font-medium text-ink">{skillById[question.skill].name}</span>
                    {" — "}{skillById[question.skill].description}
                  </p>
                </FeedbackSection>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                {onNext ? (
                  <Button onClick={onNext} iconRight="arrow-right">Next question</Button>
                ) : (
                  <Button variant="secondary" onClick={retry} icon="reset">Try it again</Button>
                )}
                {onNext && <Button variant="tertiary" onClick={retry} icon="reset">Reset</Button>}
                <Link
                  href={`/practice/${question.skill}`}
                  className="ml-auto text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
                >
                  Practise {skillById[question.skill].name.toLowerCase()}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

function FeedbackSection({ title, icon, children }: { title: string; icon: "info" | "highlight" | "target"; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-ink">
        <Icon name={icon} size={15} className="text-ink-3" />
        {title}
      </h4>
      {children}
    </section>
  );
}
