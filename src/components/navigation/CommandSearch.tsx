"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Icon, type IconName } from "@/components/ui/Icon";
import { courses, allLessons } from "@/lib/data/courses";
import { vocabularyWords, vocabularySets } from "@/lib/data/vocabulary";
import { questions } from "@/lib/data/questions";
import { skills } from "@/lib/data/skills";
import { assignments, writingPrompts } from "@/lib/data/people";
import { flatNav, roleForPath } from "@/lib/nav";

interface Result {
  id: string;
  title: string;
  subtitle: string;
  group: string;
  href: string;
  icon: IconName;
  /** Extra terms folded into matching but never displayed. */
  keywords?: string;
}

export function CommandSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const role = roleForPath(usePathname());

  const index = useMemo<Result[]>(() => {
    const nav: Result[] = flatNav(role).map((n) => ({
      id: `nav-${n.href}`, title: n.label, subtitle: "Go to page", group: "Navigate",
      href: n.href, icon: n.icon, keywords: n.keywords,
    }));
    const courseResults: Result[] = courses.map((c) => ({
      id: `c-${c.id}`, title: c.title, subtitle: `${c.category} · ${c.lessonCount} lessons · ${c.instructor}`, group: "Courses", href: `/learn/${c.id}`, icon: "book",
    }));
    const lessonResults: Result[] = allLessons.map((l) => ({
      id: `l-${l.id}`, title: l.title, subtitle: `${l.kind} · ${l.minutes} min · ${l.summary}`, group: "Lessons", href: `/learn/${l.courseId}/${l.id}`, icon: "layers",
    }));
    const wordResults: Result[] = vocabularyWords.map((w) => ({
      id: `w-${w.id}`, title: w.word, subtitle: `${w.pos} · ${w.definition}`, group: "Vocabulary", href: `/vocabulary/${w.setId}?word=${w.id}`, icon: "cards",
    }));
    const setResults: Result[] = vocabularySets.map((s) => ({
      id: `vs-${s.id}`, title: s.title, subtitle: `${s.wordIds.length} words · ${s.tier}`, group: "Vocabulary", href: `/vocabulary/${s.id}`, icon: "cards",
    }));
    const practiceResults: Result[] = [
      { id: "ps-all", title: "Mixed practice", subtitle: `All ${questions.length} questions, across every skill`, group: "Practice", href: "/practice/all", icon: "layers" as const, keywords: "practise drill questions" },
      ...skills.map((sk) => ({
        id: `ps-${sk.id}`, title: `Practise ${sk.name}`, subtitle: sk.description,
        group: "Practice", href: `/practice/${sk.id}`, icon: "target" as const,
        keywords: `${sk.name} ${sk.domain} practice drill`,
      })),
    ];
    const questionResults: Result[] = questions.map((q) => ({
      id: `q-${q.id}`, title: q.prompt.split("\n")[0].slice(0, 78), subtitle: q.source, group: "Questions", href: `/practice/all?q=${q.id}`, icon: "target",
    }));
    const assignmentResults: Result[] = assignments.map((a) => ({
      id: `a-${a.id}`, title: a.title, subtitle: `${a.type} · due ${a.due}`, group: "Assignments", href: "/assignments", icon: "clipboard",
    }));
    const writingResults: Result[] = writingPrompts.map((w) => ({
      id: `wp-${w.id}`, title: w.title, subtitle: `${w.exam} · ${w.taskType}`, group: "Writing", href: `/writing/${w.id}`, icon: "pen",
    }));
    return [...nav, ...practiceResults, ...courseResults, ...lessonResults, ...setResults, ...wordResults, ...writingResults, ...assignmentResults, ...questionResults];
  }, [role]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.filter((r) => r.group === "Navigate" || r.group === "Courses").slice(0, 8);
    // Tokenised: every word must appear somewhere, so "writing studio" and
    // "studio writing" both find the Writing Studio.
    const tokens = q.split(/\s+/).filter(Boolean);
    const scored = index
      .map((r) => {
        const t = r.title.toLowerCase();
        const hay = `${t} ${r.subtitle.toLowerCase()} ${(r.keywords ?? "").toLowerCase()}`;
        if (!tokens.every((tok) => hay.includes(tok))) return { r, score: 0 };
        let score = 10;
        if (t === q) score = 100;
        else if (t.startsWith(q)) score = 80;
        else if (t.includes(q)) score = 60;
        else if (tokens.every((tok) => t.includes(tok))) score = 45;
        else if (r.subtitle.toLowerCase().includes(q)) score = 30;
        // Navigation should win over content when someone types a page name.
        if (r.group === "Navigate") score += 12;
        else if (r.group === "Practice") score += 8;
        return { r, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 14);
    return scored.map((x) => x.r);
  }, [query, index]);

  useEffect(() => { setCursor(0); }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      // focus after the entrance transition begins so the caret does not jump
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(results.length - 1, c + 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      const hit = results[cursor];
      if (hit) { router.push(hit.href); onClose(); }
    } else if (e.key === "Escape") { onClose(); }
  }

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Search">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 bg-ink/25 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[12vh] w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[16px] border border-line bg-surface shadow-[var(--shadow-float)]"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Icon name="search" size={18} className="shrink-0 text-ink-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lessons, words, questions, assignments…"
                className="h-14 w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
                aria-label="Search"
                aria-controls="cmd-results"
                autoComplete="off"
              />
              <kbd className="hidden shrink-0 rounded-[5px] border border-line bg-surface-2 px-1.5 py-0.5 text-[10.5px] text-ink-3 sm:block">esc</kbd>
            </div>

            <ul ref={listRef} id="cmd-results" className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && (
                <li className="px-3 py-8 text-center">
                  <p className="text-[14px] font-medium text-ink">Nothing matched “{query}”.</p>
                  <p className="mt-1 text-[13px] text-ink-3">Try a course name, a word, or a skill like “inference”.</p>
                </li>
              )}
              {results.map((r, i) => {
                const showGroup = r.group !== lastGroup;
                lastGroup = r.group;
                return (
                  <li key={r.id}>
                    {showGroup && <p className="eyebrow px-3 pb-1 pt-3">{r.group}</p>}
                    <button
                      data-idx={i}
                      role="option"
                      aria-selected={i === cursor}
                      onMouseMove={() => setCursor(i)}
                      onClick={() => { router.push(r.href); onClose(); }}
                      className={`flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left transition-colors ${
                        i === cursor ? "bg-surface-2" : ""
                      }`}
                    >
                      <Icon name={r.icon} size={16} className="shrink-0 text-ink-3" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-medium text-ink">{r.title}</span>
                        <span className="block truncate text-[12px] text-ink-3">{r.subtitle}</span>
                      </span>
                      {i === cursor && <Icon name="return" size={14} className="shrink-0 text-ink-3" />}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between border-t border-line bg-surface-2/50 px-4 py-2.5 text-[11.5px] text-ink-3">
              <span className="flex items-center gap-3">
                <span><kbd className="rounded-[4px] border border-line bg-surface px-1">↑</kbd> <kbd className="rounded-[4px] border border-line bg-surface px-1">↓</kbd> navigate</span>
                <span><kbd className="rounded-[4px] border border-line bg-surface px-1">↵</kbd> open</span>
              </span>
              <span>{results.length} result{results.length === 1 ? "" : "s"}</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
