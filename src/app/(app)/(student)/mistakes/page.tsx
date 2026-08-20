"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { EmptyState } from "@/components/learning/EmptyState";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useApp, useDispatch } from "@/lib/store";
import { questionById } from "@/lib/data/questions";
import { skillById } from "@/lib/data/skills";
import { skillBreakdown } from "@/lib/data/people";
import type { Mistake, MistakeReason } from "@/lib/types";

const reasons: { id: MistakeReason; label: string; hint: string }[] = [
  { id: "vocabulary", label: "Didn't know vocabulary", hint: "A word in the passage or option blocked you" },
  { id: "misread", label: "Misread the question", hint: "You answered a question that wasn't asked" },
  { id: "missed-evidence", label: "Missed the evidence", hint: "The proof was there and you did not use it" },
  { id: "grammar-rule", label: "Grammar rule", hint: "A convention you have not fully learned" },
  { id: "careless", label: "Careless mistake", hint: "You knew it and clicked the wrong thing" },
  { id: "time", label: "Ran out of time", hint: "Rushed the last step of the reasoning" },
  { id: "guessed", label: "Guessed", hint: "No real basis for the choice" },
  { id: "overthought", label: "Overthought it", hint: "You talked yourself out of the right answer" },
  { id: "concept", label: "Didn't understand the concept", hint: "The underlying idea is not solid yet" },
];

const reasonLabel = Object.fromEntries(reasons.map((r) => [r.id, r.label])) as Record<MistakeReason, string>;

type Filter = "open" | "all" | "resolved";

export default function MistakesPage() {
  const app = useApp();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<Filter>("open");
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = useMemo(() => {
    if (filter === "all") return app.mistakes;
    if (filter === "resolved") return app.mistakes.filter((m) => m.status === "resolved");
    return app.mistakes.filter((m) => m.status !== "resolved");
  }, [app.mistakes, filter]);

  const openCount = app.mistakes.filter((m) => m.status !== "resolved").length;
  const unclassified = app.mistakes.filter((m) => !m.reason && m.status !== "resolved").length;

  // Which skill is costing the most, counting only what has actually gone wrong.
  const bySkill = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of app.mistakes) map.set(m.skill, (map.get(m.skill) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [app.mistakes]);

  const byReason = useMemo(() => {
    const map = new Map<MistakeReason, number>();
    for (const m of app.mistakes) if (m.reason) map.set(m.reason, (map.get(m.reason) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [app.mistakes]);

  const weakest = [...skillBreakdown].sort((a, b) => a.value - b.value)[0];

  return (
    <PageBody>
      <PageHeader
        eyebrow="Mistake notebook"
        title="What went wrong, and why"
        serif
        description="Every question you miss is collected here automatically. Classifying the cause is what turns a list of errors into a pattern you can act on."
        action={<ButtonLink href="/practice" variant="secondary" icon="target">Practice more</ButtonLink>}
      />

      {/* ---------- pattern analysis ---------- */}
      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1.4fr_1fr]">
        <Card className="relative overflow-hidden">
          <CardHeader eyebrow="Your biggest issue this week" title={weakest.skill} />
          <div className="mt-4 max-w-lg">
            <MasteryBar value={weakest.value} accent="var(--color-clay)" label="Accuracy" sublabel={`${weakest.attempts} questions attempted`} />
          </div>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-ink-2">
            Most common failure: choosing answers that are <em>possible</em> rather than answers
            supported by textual evidence. Nine of your last twelve misses in this skill were
            options that the passage neither states nor rules out.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="/practice/inference" iconRight="arrow-right">Practise this skill</ButtonLink>
            <ButtonLink href="/learn/sat-rw/l-sat-1-1" variant="secondary">Re-read the lesson</ButtonLink>
          </div>
        </Card>

        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Notebook" title={`${openCount} open`} description={`${app.mistakes.length - openCount} resolved by answering correctly later.`} />
            {unclassified > 0 && (
              <p className="mt-3.5 flex items-start gap-2.5 rounded-[10px] border border-ochre/25 bg-ochre-soft/50 p-3 text-[13px] leading-snug text-ink-2">
                <Icon name="alert" size={15} className="mt-[2px] shrink-0 text-ochre" />
                <span>{unclassified} entr{unclassified === 1 ? "y" : "ies"} still need a reason. Pattern analysis only works once they are classified.</span>
              </p>
            )}
          </Card>

          {byReason.length > 0 && (
            <Card>
              <CardHeader eyebrow="Why you miss questions" title="By cause" />
              <ul className="mt-4 space-y-3">
                {byReason.slice(0, 4).map(([r, n]) => (
                  <li key={r}>
                    <MasteryBar
                      label={reasonLabel[r]} value={Math.round((n / app.mistakes.length) * 100)}
                      height={6} accent="var(--color-ink-3)" showValue={false}
                      sublabel={`${n} of ${app.mistakes.length} mistakes`}
                    />
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {bySkill.length > 0 && (
            <Card>
              <CardHeader eyebrow="Concentration" title="By skill" />
              <ul className="mt-3.5 flex flex-wrap gap-1.5">
                {bySkill.map(([s, n]) => (
                  <li key={s}>
                    <Tag tone={n > 2 ? "wrong" : "neutral"}>{skillById[s as keyof typeof skillById]?.name ?? s} · {n}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>

      {/* ---------- filters ---------- */}
      <div className="mt-9 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[19px] font-semibold tracking-[-0.02em]">Entries</h2>
        <div className="flex rounded-[9px] border border-line bg-surface p-[3px]">
          {(["open", "resolved", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`relative rounded-[6px] px-3 py-1.5 text-[12.5px] font-medium capitalize transition-colors duration-200 ${
                filter === f ? "text-ink-inv" : "text-ink-3 hover:text-ink"
              }`}
            >
              {filter === f && <motion.span layoutId="mistake-filter" className="absolute inset-0 rounded-[6px] bg-ink" transition={{ type: "spring", stiffness: 460, damping: 38 }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------- entries ---------- */}
      {visible.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            variant="detective"
            title={filter === "resolved" ? "Nothing resolved yet." : "Nothing to review yet."}
            body={
              filter === "resolved"
                ? "When you answer a previously missed question correctly, it moves here."
                : "Answer some practice questions and anything you miss will collect here automatically, with the full rationale attached."
            }
            action={<ButtonLink href="/practice" size="sm">Go to practice</ButtonLink>}
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {visible.map((m) => (
            <MistakeCard
              key={m.id}
              mistake={m}
              expanded={expanded === m.id}
              onToggle={() => setExpanded(expanded === m.id ? null : m.id)}
              onClassify={(reason) => dispatch({ type: "classify-mistake", mistakeId: m.id, reason })}
              onStatus={(status) => dispatch({ type: "set-mistake-status", mistakeId: m.id, status })}
            />
          ))}
        </ul>
      )}

      <div className="mt-8">
        <CapybaraGuide variant="detective" name="Detective Bara" tone="paper">
          Classifying a mistake takes about ten seconds and is the single highest-value habit on
          this platform. &ldquo;Careless&rdquo; and &ldquo;didn&rsquo;t understand the concept&rdquo; need completely
          different responses, and only you know which one it was.
        </CapybaraGuide>
      </div>
    </PageBody>
  );
}

function MistakeCard({
  mistake, expanded, onToggle, onClassify, onStatus,
}: {
  mistake: Mistake;
  expanded: boolean;
  onToggle: () => void;
  onClassify: (r: MistakeReason) => void;
  onStatus: (s: Mistake["status"]) => void;
}) {
  const q = questionById[mistake.questionId];
  if (!q) return null;

  const chosen = q.choices.find((c) => c.id === mistake.chosen);
  const right = q.choices.find((c) => c.id === q.correct);
  const resolved = mistake.status === "resolved";

  return (
    <li className={`paper-card overflow-hidden ${resolved ? "opacity-75" : ""}`}>
      <button onClick={onToggle} aria-expanded={expanded} className="flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-surface-2/50 sm:p-5">
        <span className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border ${
          resolved ? "border-correct/35 bg-correct-soft text-correct-ink" : "border-wrong/35 bg-wrong-soft text-wrong-ink"
        }`}>
          <Icon name={resolved ? "check" : "close"} size={15} strokeWidth={2.2} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <Tag tone="blue">{skillById[mistake.skill].name}</Tag>
            <Tag>{mistake.difficulty}</Tag>
            {mistake.confidence && <Tag tone={mistake.confidence === "high" ? "wrong" : "neutral"}>{mistake.confidence} confidence</Tag>}
            {mistake.reason ? <Tag tone="ochre">{reasonLabel[mistake.reason]}</Tag> : <Tag tone="clay">Needs a reason</Tag>}
            {resolved && <Tag tone="correct">Resolved</Tag>}
          </span>
          <span className="mt-2 block text-[14px] font-medium leading-snug text-ink">{q.prompt.split("\n")[0]}</span>
          <span className="mt-1.5 block text-[12.5px] text-ink-3">
            You chose <span className="font-medium text-wrong">{mistake.chosen}</span> · correct answer{" "}
            <span className="font-medium text-correct">{q.correct}</span> · {q.source}
          </span>
        </span>
        <Icon name="chevron-down" size={17} className={`mt-1 shrink-0 text-ink-3 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line"
          >
            <div className="space-y-5 p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[11px] border border-wrong/25 bg-wrong-soft/40 p-3.5">
                  <p className="eyebrow mb-1.5">Your answer — {mistake.chosen}</p>
                  <p className="text-[13.5px] leading-relaxed text-ink">{chosen?.text}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{chosen?.rationale}</p>
                </div>
                <div className="rounded-[11px] border border-correct/25 bg-correct-soft/40 p-3.5">
                  <p className="eyebrow mb-1.5">Correct — {q.correct}</p>
                  <p className="text-[13.5px] leading-relaxed text-ink">{right?.text}</p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-2">{right?.rationale}</p>
                </div>
              </div>

              <div>
                <h4 className="mb-1.5 text-[13px] font-semibold">Why</h4>
                <p className="text-[13.5px] leading-relaxed text-ink-2">{q.why}</p>
              </div>

              {q.evidence && (
                <div>
                  <h4 className="mb-1.5 text-[13px] font-semibold">Evidence</h4>
                  <blockquote className="border-l-2 border-ochre pl-3.5 font-serif text-[14px] italic leading-relaxed text-ink">{q.evidence}</blockquote>
                </div>
              )}

              <fieldset>
                <legend className="mb-2.5 text-[13px] font-semibold">Why did you miss it?</legend>
                <div className="flex flex-wrap gap-1.5">
                  {reasons.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => onClassify(r.id)}
                      title={r.hint}
                      aria-pressed={mistake.reason === r.id}
                      className={`rounded-full border px-3 py-1.5 text-[12.5px] transition-colors duration-150 ${
                        mistake.reason === r.id
                          ? "border-ink bg-ink text-ink-inv"
                          : "border-line bg-surface text-ink-2 hover:border-line-2 hover:text-ink"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
                <Link href={`/practice/${mistake.skill}`} className="inline-flex">
                  <Button size="sm" iconRight="arrow-right">Practise this skill</Button>
                </Link>
                {resolved ? (
                  <Button size="sm" variant="secondary" onClick={() => onStatus("reviewing")} icon="reset">Reopen</Button>
                ) : (
                  <Button size="sm" variant="secondary" onClick={() => onStatus("resolved")} icon="check">Mark resolved</Button>
                )}
                <span className="ml-auto text-[12px] text-ink-3">
                  Added {new Date(mistake.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
