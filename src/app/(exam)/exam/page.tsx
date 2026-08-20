"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar, ProgressRing } from "@/components/ui/Progress";
import { useDispatch } from "@/lib/store";
import { questions } from "@/lib/data/questions";
import { passageById } from "@/lib/data/passages";
import { skillById } from "@/lib/data/skills";

type Phase = "brief" | "running" | "review" | "results";

const DURATION = 32 * 60;

export default function ExamPage() {
  const dispatch = useDispatch();
  const [phase, setPhase] = useState<Phase>("brief");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, "A" | "B" | "C" | "D">>({});
  const [flags, setFlags] = useState<string[]>([]);
  const [seconds, setSeconds] = useState(DURATION);
  const [confirming, setConfirming] = useState(false);

  const paper = useMemo(() => questions.slice(0, 12), []);

  useEffect(() => {
    if (phase !== "running") return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) { setPhase("results"); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // Warn before an accidental reload takes the paper with it.
  useEffect(() => {
    if (phase !== "running") return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase]);

  const answeredCount = Object.keys(answers).length;
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const low = seconds < 300;

  function submit() {
    for (const q of paper) {
      const chosen = answers[q.id];
      if (chosen) dispatch({ type: "answer", questionId: q.id, chosen, confidence: null });
    }
    setPhase("results");
  }

  /* ================= brief ================= */
  if (phase === "brief") {
    return (
      <PageBody>
        <div className="mx-auto max-w-2xl">
          <Link href="/practice" className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink">
            <Icon name="chevron-left" size={15} />
            Back to practice
          </Link>
          <Card>
            <p className="eyebrow mb-2">Mock exam</p>
            <h1 className="serif-display text-[32px]">SAT Reading &amp; Writing — Practice Test 3</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              Twelve questions, thirty-two minutes. Once you begin, the interface changes: no
              navigation, no mascots, no feedback until you submit. That is deliberate — the value
              of a mock is that it feels like the real thing.
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-line py-5 sm:grid-cols-4">
              {[
                ["Questions", "12"], ["Time", "32 min"], ["Section", "Reading & Writing"], ["Calculator", "Not permitted"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow mb-1">{k}</dt>
                  <dd className="text-[15px] font-medium text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-5 space-y-2 text-[13.5px] text-ink-2">
              {[
                "You may flag a question and return to it before submitting.",
                "Answers save automatically as you go.",
                "The timer does not pause. Submitting early is allowed.",
                "Full analytics — accuracy, skill breakdown and every rationale — appear after you submit.",
              ].map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <Icon name="check" size={14} className="mt-[3px] shrink-0 text-ink-3" />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-2">
              <Button size="lg" onClick={() => setPhase("running")}>Begin exam</Button>
              <ButtonLink href="/practice" size="lg" variant="secondary">Not now</ButtonLink>
            </div>
          </Card>
        </div>
      </PageBody>
    );
  }

  /* ================= results ================= */
  if (phase === "results") {
    const correct = paper.filter((q) => answers[q.id] === q.correct);
    const pct = Math.round((correct.length / paper.length) * 100);
    const bySkill = new Map<string, { right: number; total: number }>();
    for (const q of paper) {
      const e = bySkill.get(q.skill) ?? { right: 0, total: 0 };
      e.total += 1;
      if (answers[q.id] === q.correct) e.right += 1;
      bySkill.set(q.skill, e);
    }

    return (
      <PageBody>
        <div className="mx-auto max-w-3xl">
          <Card>
            <p className="eyebrow mb-2">Results</p>
            <h1 className="serif-display text-[32px]">Practice Test 3 — complete</h1>

            <div className="mt-7 flex flex-col items-center gap-7 border-y border-line py-7 sm:flex-row sm:justify-around">
              <ProgressRing value={pct} size={110} accent={pct >= 70 ? "var(--color-sage)" : "var(--color-clay)"} sublabel="accuracy" />
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="tabular text-[26px] font-semibold leading-none text-ink">{correct.length}</p>
                  <p className="mt-1.5 text-[12px] text-ink-3">correct</p>
                </div>
                <div>
                  <p className="tabular text-[26px] font-semibold leading-none text-ink">{paper.length - answeredCount}</p>
                  <p className="mt-1.5 text-[12px] text-ink-3">unanswered</p>
                </div>
                <div>
                  <p className="tabular text-[26px] font-semibold leading-none text-ink">{Math.round((DURATION - seconds) / 60)}</p>
                  <p className="mt-1.5 text-[12px] text-ink-3">minutes used</p>
                </div>
              </div>
            </div>

            <h2 className="mb-4 mt-7 text-[16px] font-semibold">Accuracy by skill</h2>
            <ul className="space-y-3.5">
              {[...bySkill.entries()].map(([skill, e]) => (
                <li key={skill}>
                  <MasteryBar
                    label={skillById[skill as keyof typeof skillById]?.name ?? skill}
                    value={(e.right / e.total) * 100} height={6}
                    accent={e.right / e.total >= 0.7 ? "var(--color-sage)" : "var(--color-clay)"}
                    sublabel={`${e.right} of ${e.total} correct`}
                  />
                </li>
              ))}
            </ul>

            <h2 className="mb-3 mt-7 text-[16px] font-semibold">Question by question</h2>
            <ol className="divide-y divide-line rounded-[12px] border border-line">
              {paper.map((q, i) => {
                const chosen = answers[q.id];
                const ok = chosen === q.correct;
                return (
                  <li key={q.id} className="flex items-start gap-3.5 p-3.5">
                    <span className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${
                      ok ? "border-correct/35 bg-correct-soft text-correct-ink"
                      : chosen ? "border-wrong/35 bg-wrong-soft text-wrong-ink"
                      : "border-line bg-surface-2 text-ink-3"
                    }`}>
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block line-clamp-1 text-[13.5px] text-ink">{q.prompt.split("\n")[0]}</span>
                      <span className="block text-[12px] text-ink-3">
                        {chosen ? `You chose ${chosen} · correct ${q.correct}` : "Not answered"} · {skillById[q.skill].name}
                      </span>
                    </span>
                    <Tag tone={ok ? "correct" : chosen ? "wrong" : "neutral"} className="shrink-0">
                      {ok ? "Correct" : chosen ? "Incorrect" : "Skipped"}
                    </Tag>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 text-[13.5px] leading-relaxed text-ink-2">
              Every question you missed has been added to your{" "}
              <Link href="/mistakes" className="font-medium text-ink underline decoration-line-2 underline-offset-4">Mistake Notebook</Link>{" "}
              with its full rationale. Classifying why you missed them is the part that changes the next test.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <ButtonLink href="/mistakes">Review my mistakes</ButtonLink>
              <ButtonLink href="/progress" variant="secondary">See analytics</ButtonLink>
              <ButtonLink href="/dashboard" variant="tertiary">Back to dashboard</ButtonLink>
            </div>
          </Card>
        </div>
      </PageBody>
    );
  }

  /* ================= running ================= */
  const q = paper[index];
  const passage = q.passageId ? passageById[q.passageId] : undefined;
  const flagged = flags.includes(q.id);

  return (
    <div className="min-h-dvh">
      {/* --- exam bar: timer, counter, submit. Nothing else. --- */}
      <header className="sticky top-0 z-30 border-b border-line-2 bg-surface">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
          <p className="text-[13px] font-semibold text-ink">Practice Test 3</p>
          <p className="hidden text-[13px] text-ink-2 sm:block">Reading &amp; Writing</p>
          <p className={`tabular ml-auto rounded-[8px] border px-3 py-1.5 text-[15px] font-semibold ${
            low ? "border-wrong/40 bg-wrong-soft text-wrong-ink" : "border-line bg-surface-2 text-ink"
          }`}>
            {mm}:{ss}
          </p>
          <p className="tabular hidden text-[13px] text-ink-2 sm:block">{answeredCount}/{paper.length} answered</p>
          <Button size="sm" onClick={() => setConfirming(true)}>Submit</Button>
        </div>
        <div className="h-[3px] w-full bg-surface-3">
          <div className="h-full bg-ink transition-[width] duration-1000" style={{ width: `${((DURATION - seconds) / DURATION) * 100}%` }} />
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {/* --- navigator --- */}
        <div className="mb-5 flex flex-wrap items-center gap-1.5">
          {paper.map((item, i) => {
            const ans = Boolean(answers[item.id]);
            const flg = flags.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`Question ${i + 1}${ans ? ", answered" : ", not answered"}${flg ? ", flagged" : ""}`}
                aria-current={i === index ? "true" : undefined}
                className={`tabular relative size-9 rounded-[7px] border text-[12.5px] font-medium transition-colors ${
                  i === index ? "border-ink bg-ink text-ink-inv"
                  : ans ? "border-line-2 bg-surface-2 text-ink"
                  : "border-line bg-surface text-ink-3 hover:border-line-2"
                }`}
              >
                {i + 1}
                {flg && <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-clay" aria-hidden="true" />}
              </button>
            );
          })}
          <span className="ml-2 text-[12px] text-ink-3">
            <span className="inline-block size-2 rounded-full bg-clay align-middle" /> flagged
          </span>
        </div>

        <div className={`grid gap-5 ${passage ? "lg:grid-cols-2" : "mx-auto max-w-3xl"}`}>
          {passage && (
            <div className="rounded-[13px] border border-line bg-surface p-5 sm:p-7">
              <h2 className="serif-display text-[21px]">{passage.title}</h2>
              <p className="mt-1 text-[12px] italic text-ink-3">{passage.attribution}</p>
              <div className="mt-4 space-y-3.5">
                {passage.paragraphs.map((p, i) => (
                  <p key={i} className="font-serif text-[16px] leading-[1.72] text-ink">{p}</p>
                ))}
              </div>
            </div>
          )}

          <div className="min-w-0">
            <div className="rounded-[13px] border border-line bg-surface p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-line pb-3.5">
                <p className="text-[13px] font-semibold text-ink">
                  Question <span className="tabular">{index + 1}</span> of <span className="tabular">{paper.length}</span>
                </p>
                <button
                  onClick={() => setFlags((f) => (flagged ? f.filter((x) => x !== q.id) : [...f, q.id]))}
                  aria-pressed={flagged}
                  className={`flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                    flagged ? "border-clay/40 bg-clay-soft text-clay-ink" : "border-line text-ink-2 hover:border-line-2 hover:text-ink"
                  }`}
                >
                  <Icon name="flag" size={14} />
                  {flagged ? "Flagged" : "Flag"}
                </button>
              </div>

              <div className="mt-4">
                {q.prompt.split("\n\n").map((para, i) => (
                  <p key={i} className={i === 0 ? "text-[15.5px] font-medium leading-relaxed text-ink" : "mt-3 whitespace-pre-line rounded-[10px] border border-line bg-surface-2/60 p-3.5 font-serif text-[15px] leading-relaxed text-ink"}>
                    {para}
                  </p>
                ))}
              </div>

              <ul className="mt-5 space-y-2.5" role="radiogroup" aria-label="Answer choices">
                {q.choices.map((c) => {
                  const selected = answers[q.id] === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: c.id }))}
                        className={`flex w-full items-start gap-3.5 rounded-[11px] border p-3.5 text-left transition-colors duration-150 ${
                          selected ? "border-ink bg-surface-2" : "border-line bg-surface hover:border-ink-3"
                        }`}
                      >
                        <span className={`flex size-[26px] shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold ${
                          selected ? "border-ink bg-ink text-ink-inv" : "border-line-2 text-ink-2"
                        }`}>
                          {c.id}
                        </span>
                        <span className="pt-[3px] text-[14.5px] leading-relaxed text-ink">{c.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <Button variant="secondary" size="sm" icon="chevron-left" disabled={index === 0} onClick={() => setIndex(index - 1)}>
                  Previous
                </Button>
                {answers[q.id] && (
                  <button
                    onClick={() => setAnswers((a) => { const n = { ...a }; delete n[q.id]; return n; })}
                    className="text-[12.5px] text-ink-3 underline decoration-line-2 underline-offset-4 transition-colors hover:text-ink"
                  >
                    Clear answer
                  </button>
                )}
                <Button
                  variant="secondary" size="sm" iconRight="chevron-right"
                  disabled={index === paper.length - 1}
                  onClick={() => setIndex(index + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- submit confirmation --- */}
      {confirming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 p-4" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="w-full max-w-md rounded-[16px] border border-line bg-surface p-6 shadow-[var(--shadow-float)]">
            <h2 id="confirm-title" className="text-[18px] font-semibold tracking-[-0.01em]">Submit this test?</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              You have answered <span className="tabular font-medium text-ink">{answeredCount}</span> of{" "}
              <span className="tabular font-medium text-ink">{paper.length}</span> questions
              {flags.length > 0 && <> and flagged <span className="tabular font-medium text-ink">{flags.length}</span> for review</>}.
              {answeredCount < paper.length && " Unanswered questions are marked incorrect."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={submit}>Submit test</Button>
              <Button variant="secondary" onClick={() => setConfirming(false)}>Keep working</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
