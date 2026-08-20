"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PageBody } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Capybara } from "@/components/mascot/Capybara";
import { modes, tutorReply, nextStage, type TutorTurn } from "@/lib/tutor";

export default function TutorPage() {
  return (
    <Suspense fallback={<PageBody><div className="skeleton h-64 rounded-[14px]" /></PageBody>}>
      <TutorView />
    </Suspense>
  );
}

function TutorView() {
  const params = useSearchParams();
  const seed = params.get("q");

  const [turns, setTurns] = useState<TutorTurn[]>([
    {
      id: "intro", role: "tutor", stage: "hint",
      text: "I am here to help you think, not to hand you answers. Tell me what you are working on and what you have already tried. If you are practising, I will start with a hint.",
      followUps: ["Help with inference questions", "Improve my paragraph", "Quiz me on vocabulary"],
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [stage, setStage] = useState<NonNullable<TutorTurn["stage"]>>("hint");
  const [lastTopic, setLastTopic] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const seeded = useRef(false);

  useEffect(() => {
    if (seed && !seeded.current) { seeded.current = true; send(seed); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [turns, thinking]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Asking again about the same topic escalates the depth of the answer.
    const sameTopic = trimmed.toLowerCase().slice(0, 12) === lastTopic.slice(0, 12);
    const useStage = sameTopic || /explain|why|full|answer|show me/i.test(trimmed) ? nextStage[stage] : "hint";

    setTurns((t) => [...t, { id: `s${Date.now()}`, role: "student", text: trimmed }]);
    setInput("");
    setThinking(true);
    setLastTopic(trimmed.toLowerCase());

    setTimeout(() => {
      const topic = sameTopic || /explain|why|full|answer|show me/i.test(trimmed) ? lastTopic || trimmed : trimmed;
      setTurns((t) => [...t, tutorReply(topic, useStage)]);
      setStage(useStage);
      setThinking(false);
    }, 850);
  }

  const stageIndex = ["hint", "guided", "explanation", "answer"].indexOf(stage);

  return (
    <PageBody>
      <div className="grid items-start gap-3.5 lg:grid-cols-[1fr_300px]">
        {/* ================= conversation ================= */}
        <div className="flex h-[72vh] min-h-[520px] flex-col overflow-hidden rounded-[16px] border border-line bg-surface lg:sticky lg:top-[76px] lg:h-[calc(100dvh-116px)] lg:self-start">
          <header className="flex items-center gap-3.5 border-b border-line px-5 py-3.5">
            <Capybara variant="professor" size={42} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-[14.5px] font-semibold text-ink">Professor Bara</h1>
              <p className="text-[12.5px] text-ink-3">Academic tutor · hints before answers</p>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex" title="How much this conversation has escalated">
              {["Hint", "Guided", "Explain", "Answer"].map((s, i) => (
                <span
                  key={s}
                  className={`rounded-full px-2 py-[3px] text-[10.5px] font-medium transition-colors ${
                    i <= stageIndex ? "bg-ink text-ink-inv" : "bg-surface-2 text-ink-3"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {turns.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className={t.role === "student" ? "flex justify-end" : "flex gap-3"}
              >
                {t.role === "tutor" && <Capybara variant="professor" size={34} className="mt-0.5 shrink-0" />}
                <div className={t.role === "student" ? "max-w-[80%]" : "max-w-[85%] min-w-0"}>
                  {t.role === "tutor" && t.stage && (
                    <Tag className="mb-1.5 capitalize" tone={t.stage === "answer" ? "ochre" : "neutral"}>{t.stage}</Tag>
                  )}
                  <div className={`rounded-[13px] px-4 py-3 text-[14px] leading-relaxed ${
                    t.role === "student" ? "bg-ink text-ink-inv" : "border border-line bg-surface-2/60 text-ink"
                  }`}>
                    {t.text}
                  </div>
                  {t.followUps && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {t.followUps.map((f) => (
                        <button
                          key={f}
                          onClick={() => send(f)}
                          className="rounded-full border border-line bg-surface px-3 py-1.5 text-[12.5px] text-ink-2 transition-colors hover:border-line-2 hover:text-ink"
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-3"
                >
                  <Capybara variant="professor" mood="thinking" size={34} className="shrink-0" />
                  <p className="text-[13px] italic text-ink-3">Thinking through your work…</p>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-end gap-2.5 border-t border-line p-4"
          >
            <label className="flex-1">
              <span className="sr-only">Ask the tutor</span>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
                }}
                rows={1}
                placeholder="What are you working on, and what have you tried?"
                className="max-h-32 w-full resize-none rounded-[11px] border border-line-strong bg-surface px-3.5 py-2.5 text-[14px] outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
              />
            </label>
            <Button type="submit" disabled={!input.trim() || thinking} icon="send">Send</Button>
          </form>
        </div>

        {/* ================= modes ================= */}
        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Modes" title="Ask in a specific way" description="Each mode changes how the tutor answers, not just what it says." />
            <ul className="mt-4 space-y-1.5">
              {modes.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => send(m.label)}
                    className="group flex w-full items-center gap-2.5 rounded-[9px] border border-line bg-surface px-3 py-2.5 text-left transition-colors hover:border-line-2 hover:bg-surface-2/60"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-ink">{m.label}</span>
                      <span className="block text-[11.5px] text-ink-3">{m.description}</span>
                    </span>
                    <Icon name="arrow-right" size={14} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="How this works" title="Hint first, answer last" />
            <ol className="mt-4 space-y-2.5">
              {[
                ["Hint", "A nudge toward the move you are missing."],
                ["Guided reasoning", "A question that makes you do the step."],
                ["Explanation", "The principle, stated fully."],
                ["Answer", "The worked case, once the reasoning is clear."],
              ].map(([k, v], i) => (
                <li key={k} className="flex gap-3">
                  <span className={`flex size-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    i <= stageIndex ? "bg-ink text-ink-inv" : "bg-surface-2 text-ink-3"
                  }`}>{i + 1}</span>
                  <span>
                    <span className="block text-[13px] font-medium text-ink">{k}</span>
                    <span className="block text-[12px] leading-snug text-ink-3">{v}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-line pt-3.5 text-[12px] leading-relaxed text-ink-3">
              Asking the same question again moves you one stage further. You can always jump
              straight to the explanation by saying so.
            </p>
          </Card>

          <ButtonLink href="/mistakes" variant="secondary" size="sm" full icon="magnifier">
            Ask about a specific mistake
          </ButtonLink>
        </div>
      </div>
    </PageBody>
  );
}
