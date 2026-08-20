"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Tag } from "@/components/ui/Card";
import { Button, IconButton } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { Capybara } from "@/components/mascot/Capybara";
import { useApp, useDispatch } from "@/lib/store";
import { analyseParagraphs, countWords, generateFeedback } from "@/lib/writing";
import { teacherComment } from "@/lib/data/people";
import type { WritingPrompt } from "@/lib/types";

type Panel = "feedback" | "structure" | "requirements";

export function WritingEditor({ prompt }: { prompt: WritingPrompt }) {
  const app = useApp();
  const dispatch = useDispatch();
  const stored = app.writing[prompt.id];

  const [text, setText] = useState(stored?.text ?? prompt.starter ?? "");
  const [panel, setPanel] = useState<Panel>("structure");
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(prompt.minutes * 60);
  const [saved, setSaved] = useState<"idle" | "saving" | "saved">("idle");
  const [analysing, setAnalysing] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Adopt whatever was persisted once the store hydrates.
  useEffect(() => {
    if (app.hydrated && stored?.text && stored.text !== text) setText(stored.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.hydrated]);

  // Debounced autosave.
  useEffect(() => {
    if (!app.hydrated) return;
    setSaved("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      dispatch({ type: "save-writing", promptId: prompt.id, text });
      setSaved("saved");
    }, 700);
    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, app.hydrated]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [running, seconds]);

  const words = countWords(text);
  const paragraphs = useMemo(() => analyseParagraphs(text), [text]);
  const feedback = useMemo(() => (stored?.submitted ? generateFeedback(text, prompt.minWords) : null), [stored?.submitted, text, prompt.minWords]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  function submit() {
    setAnalysing(true);
    dispatch({ type: "save-writing", promptId: prompt.id, text });
    // A brief pause so the analysis reads as work rather than a lookup.
    setTimeout(() => {
      dispatch({ type: "submit-writing", promptId: prompt.id });
      setAnalysing(false);
      setPanel("feedback");
    }, 1100);
  }

  return (
    <div className="mx-auto w-full max-w-[1500px]">
      {/* ================= toolbar ================= */}
      <div className="sticky top-14 z-20 border-b border-line bg-paper/90 px-4 py-2.5 backdrop-blur-md sm:px-6 lg:top-[60px] lg:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/writing" className="flex items-center gap-1.5 text-[13px] text-ink-2 transition-colors hover:text-ink">
            <Icon name="chevron-left" size={15} />
            <span className="hidden sm:inline">Writing Studio</span>
          </Link>

          <span className="hidden h-4 w-px bg-line sm:block" />

          <h1 className="min-w-0 flex-1 truncate text-[13.5px] font-medium text-ink">{prompt.title}</h1>

          <div className="flex items-center gap-2.5">
            <span className={`tabular text-[12.5px] ${words >= prompt.minWords ? "text-correct" : "text-ink-3"}`}>
              {words} / {prompt.minWords} words
            </span>
            <span className="hidden h-4 w-px bg-line sm:block" />
            <span className={`tabular flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1 text-[13px] font-medium ${
              seconds === 0 ? "border-wrong/35 bg-wrong-soft text-wrong-ink" : "border-line bg-surface text-ink"
            }`}>
              <Icon name="clock" size={14} className="text-ink-3" />
              {mm}:{ss}
            </span>
            <IconButton
              name={running ? "pause" : "play"}
              label={running ? "Pause timer" : "Start timer"}
              size={32}
              onClick={() => setRunning(!running)}
            />
            <span className="hidden text-[12px] text-ink-3 sm:inline">
              {saved === "saving" ? "Saving…" : saved === "saved" ? "Saved" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_340px]">
        {/* ================= assignment ================= */}
        <aside className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="p-4 sm:p-6 lg:sticky lg:top-[116px] lg:max-h-[calc(100dvh-132px)] lg:overflow-y-auto">
            <button
              onClick={() => setBriefOpen(!briefOpen)}
              className="flex w-full items-center justify-between gap-2 text-left lg:pointer-events-none"
              aria-expanded={briefOpen}
            >
              <p className="eyebrow">The assignment</p>
              <Icon name="chevron-down" size={15} className={`text-ink-3 transition-transform lg:hidden ${briefOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`${briefOpen ? "block" : "hidden"} lg:block`}>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Tag tone="clay">{prompt.exam}</Tag>
                <Tag>{prompt.taskType}</Tag>
              </div>
              <p className="mt-3.5 font-serif text-[15px] leading-relaxed text-ink">{prompt.brief}</p>

              <div className="mt-5">
                <p className="eyebrow mb-2.5">Requirements</p>
                <ul className="space-y-2">
                  {prompt.requirements.map((r) => {
                    const met = r.includes("250 words") ? words >= 250 : r.includes("180") ? words >= 180 : undefined;
                    return (
                      <li key={r} className="flex items-start gap-2.5 text-[13px] leading-snug text-ink-2">
                        <Icon
                          name={met === true ? "check" : "minus"} size={14}
                          className={`mt-[3px] shrink-0 ${met === true ? "text-sage" : "text-ink-3"}`}
                        />
                        {r}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-5 rounded-[11px] border border-line bg-surface-2/60 p-3.5">
                <p className="eyebrow mb-1.5">Suggested time</p>
                <p className="text-[13px] leading-relaxed text-ink-2">
                  {prompt.minutes} minutes. Spend the first five planning — essays that are planned
                  finish faster than essays that are not.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* ================= editor ================= */}
        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
          <label htmlFor="essay" className="sr-only">Your response</label>
          <div className="relative">
            <textarea
              id="essay"
              value={text}
              onChange={(e) => setText(e.target.value)}
              spellCheck
              placeholder={"Plan first, then write.\n\nLeave a blank line between paragraphs — the structure visualiser reads them as separate paragraphs."}
              className="min-h-[62vh] w-full resize-y rounded-[16px] border border-line-strong bg-surface p-6 font-serif text-[16.5px] leading-[1.85] text-ink outline-none transition-colors placeholder:font-sans placeholder:text-[15px] placeholder:leading-relaxed placeholder:text-ink-3 focus:border-ink-3 sm:p-8"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={submit} disabled={words < 40 || analysing} icon={analysing ? undefined : "send"}>
              {analysing ? "Analysing…" : stored?.submitted ? "Re-run analysis" : "Submit for feedback"}
            </Button>
            <Button variant="secondary" onClick={() => setPanel("structure")} icon="layers">
              See structure
            </Button>
            {words < 40 && <p className="text-[12.5px] text-ink-3">Write at least 40 words to run the analysis.</p>}
          </div>

          <AnimatePresence>
            {analysing && (
              <motion.div
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mt-4"
              >
                <CapybaraGuide variant="writing" name="Writing Bara" tone="clay" mood="thinking">
                  Thinking through your work…
                </CapybaraGuide>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-[12px] leading-relaxed text-ink-3">
            Drafts are kept on this device and restored when you come back. The analysis is a
            reading of your structure and discourse markers, not a substitute for a teacher.
          </p>
        </div>

        {/* ================= feedback panel ================= */}
        <aside className="border-t border-line xl:border-l xl:border-t-0">
          <div className="xl:sticky xl:top-[116px] xl:max-h-[calc(100dvh-132px)] xl:overflow-y-auto">
            <div className="flex items-center gap-1 border-b border-line px-3 py-2.5">
              {(["structure", "feedback", "requirements"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPanel(p)}
                  aria-pressed={panel === p}
                  className={`relative flex-1 rounded-[8px] px-2 py-1.5 text-[12.5px] font-medium capitalize transition-colors ${
                    panel === p ? "text-ink" : "text-ink-3 hover:text-ink-2"
                  }`}
                >
                  {panel === p && (
                    <motion.span layoutId="writing-tab" className="absolute inset-0 rounded-[8px] bg-surface-2" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative">{p}</span>
                </button>
              ))}
            </div>

            <div className="p-4">
              {panel === "structure" && (
                <div>
                  <p className="eyebrow mb-3">Structure visualiser</p>
                  {paragraphs.length === 0 ? (
                    <p className="text-[13px] leading-relaxed text-ink-2">
                      Start writing and each paragraph will appear here with the four moves it
                      does and does not make.
                    </p>
                  ) : (
                    <ol className="space-y-2.5">
                      {paragraphs.map((p) => {
                        const moves = [
                          { k: "Point", ok: p.hasPoint },
                          { k: "Explanation", ok: p.hasExplanation },
                          { k: "Evidence", ok: p.hasEvidence },
                          { k: "Link", ok: p.hasLink },
                        ];
                        const missing = moves.filter((m) => !m.ok);
                        const isBody = p.role === "Body";
                        return (
                          <li
                            key={p.index}
                            className={`rounded-[11px] border p-3.5 ${
                              isBody && missing.length > 1 ? "border-clay/30 bg-clay-soft/35" : "border-line bg-surface"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-ink">
                                {p.role}{isBody ? ` ${p.index}` : ""}
                              </p>
                              <span className="tabular text-[11.5px] text-ink-3">{p.words} words</span>
                            </div>
                            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-snug text-ink-2">{p.text}</p>
                            {isBody && (
                              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                                {moves.map((m) => (
                                  <li key={m.k}>
                                    <span
                                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-[3px] text-[11px] ${
                                        m.ok ? "border-sage/30 bg-sage-soft text-sage-ink" : "border-line bg-surface-2 text-ink-3"
                                      }`}
                                    >
                                      <Icon name={m.ok ? "check" : "minus"} size={10} strokeWidth={2.5} />
                                      {m.k}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {isBody && missing.length > 0 && (
                              <p className="mt-2.5 text-[12px] leading-snug text-ink-2">
                                Missing: {missing.map((m) => m.k.toLowerCase()).join(", ")}.
                                {missing.some((m) => m.k === "Evidence") && " A reader will accept the claim but will not be persuaded by it."}
                              </p>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  )}
                </div>
              )}

              {panel === "feedback" && (
                feedback ? (
                  <div>
                    <div className="mb-4 flex items-start gap-3">
                      <Capybara variant="writing" size={44} className="shrink-0" />
                      <div>
                        <p className="eyebrow mb-1">Writing Bara</p>
                        <p className="text-[13px] leading-relaxed text-ink-2">
                          Seven categories, scored out of nine. The comments say what the score is
                          based on so you can check the reading against your own.
                        </p>
                      </div>
                    </div>
                    <ul className="space-y-3.5">
                      {feedback.map((f) => (
                        <li key={f.category} className="rounded-[11px] border border-line bg-surface p-3.5">
                          <div className="mb-2 flex items-baseline justify-between gap-3">
                            <p className="text-[13px] font-semibold text-ink">{f.category}</p>
                            <p className="tabular text-[13px] font-semibold text-ink-2">{f.score}<span className="text-ink-3">/9</span></p>
                          </div>
                          <MasteryBar
                            value={(f.score / 9) * 100} height={4} showValue={false}
                            accent={f.score >= 8 ? "var(--color-sage)" : f.score >= 6 ? "var(--color-ochre)" : "var(--color-clay)"}
                          />
                          <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-2">{f.comment}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 rounded-[11px] border border-blue/25 bg-blue-soft/40 p-3.5">
                      <p className="eyebrow mb-1.5">Teacher comment</p>
                      <p className="text-[12.5px] leading-relaxed text-ink-2">{teacherComment.slice(0, 220)}…</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[11px] border border-dashed border-line-2 bg-surface-2/40 p-5 text-center">
                    <Capybara variant="writing" size={52} className="mx-auto" />
                    <p className="mt-3 text-[13.5px] font-semibold text-ink">No feedback yet.</p>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-2">
                      Submit a draft of at least 40 words and the analysis will appear here,
                      broken down by category.
                    </p>
                  </div>
                )
              )}

              {panel === "requirements" && (
                <div>
                  <p className="eyebrow mb-3">Checklist</p>
                  <ul className="space-y-2.5">
                    {prompt.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-2.5 rounded-[10px] border border-line bg-surface p-3 text-[13px] leading-snug text-ink-2">
                        <Icon name="minus" size={14} className="mt-[3px] shrink-0 text-ink-3" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <MasteryBar
                      label="Word count" value={Math.min(100, (words / prompt.minWords) * 100)}
                      accent={words >= prompt.minWords ? "var(--color-sage)" : "var(--color-ochre)"}
                      showValue={false} sublabel={`${words} of ${prompt.minWords} minimum`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
