import Link from "next/link";
import type { Metadata } from "next";
import { LandingNav } from "@/components/marketing/LandingNav";
import { WorldArt, type WorldKind } from "@/components/marketing/WorldArt";
import { Capybara } from "@/components/mascot/Capybara";
import { CapybaraDesk } from "@/components/mascot/CapybaraDesk";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Tag } from "@/components/ui/Card";
import { LogoMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Capybara Motion — A calmer way to learn",
  description:
    "Lessons, practice, feedback, vocabulary, writing, exam preparation and progress tracking together in one thoughtful learning space.",
};

/* ---------------- learning worlds ---------------- */

const worlds: {
  kind: WorldKind; title: string; blurb: string; tag: string; href: string;
  span: string; accent: string; tall?: boolean;
}[] = [
  { kind: "sat", title: "SAT", blurb: "Master reading, vocabulary, grammar and the reasoning the test actually rewards.", tag: "9 modules", href: "/learn/sat-rw", span: "sm:col-span-2 lg:col-span-4", accent: "var(--color-blue-soft)", tall: true },
  { kind: "vocab", title: "Vocabulary Lab", blurb: "Build long-term mastery on a spaced schedule.", tag: "600 words", href: "/vocabulary", span: "sm:col-span-2 lg:col-span-2", accent: "var(--color-ochre-soft)", tall: true },
  { kind: "ielts", title: "IELTS", blurb: "Reading, writing, listening and speaking preparation.", tag: "Academic", href: "/learn/ielts-writing", span: "lg:col-span-2", accent: "var(--color-sage-soft)" },
  { kind: "writing", title: "Writing Studio", blurb: "Paragraphs, essays and structure you can see.", tag: "Feedback", href: "/writing", span: "lg:col-span-2", accent: "var(--color-clay-soft)" },
  { kind: "toefl", title: "TOEFL", blurb: "Integrated language and academic communication.", tag: "Speaking", href: "/learn/toefl-speaking", span: "lg:col-span-2", accent: "var(--color-blue-soft)" },
  { kind: "literature", title: "Literature", blurb: "Analyse language, character, structure and theme.", tag: "Close reading", href: "/learn/lit-analysis", span: "lg:col-span-2", accent: "var(--color-plum-soft)" },
  { kind: "reading", title: "Reading Lab", blurb: "Comprehension, inference and evidence.", tag: "Passages", href: "/learn/reading-lab", span: "lg:col-span-2", accent: "var(--color-sage-soft)" },
  { kind: "grammar", title: "Grammar Workshop", blurb: "Sentence structure and usage, taught as decisions.", tag: "Foundation", href: "/learn/grammar", span: "lg:col-span-2", accent: "var(--color-clay-soft)" },
  { kind: "school", title: "School English", blurb: "Structured support for middle and high school coursework, with shorter lessons and more frequent review.", tag: "Grades 7–12", href: "/learn/school-english", span: "sm:col-span-2 lg:col-span-6", accent: "var(--color-ochre-soft)" },
];

/* ---------------- product showcase ---------------- */

const showcase: { kind: WorldKind; title: string; blurb: string; href: string; span: string }[] = [
  { kind: "progress", title: "Progress Intelligence", blurb: "Accuracy, mastery and study time, tracked skill by skill rather than as one meaningless average.", href: "/progress", span: "md:col-span-3" },
  { kind: "mistakes", title: "Mistake Notebook", blurb: "Every wrong answer is collected, classified by cause, and turned into a pattern you can act on.", href: "/mistakes", span: "md:col-span-3" },
  { kind: "focus", title: "Focus Room", blurb: "A timer, one task, and nothing else on screen.", href: "/focus", span: "md:col-span-2" },
  { kind: "tutor", title: "AI Tutor", blurb: "Hints before answers. It asks what you tried first.", href: "/tutor", span: "md:col-span-4" },
];

const steps = [
  { n: "01", title: "Learn", body: "Short, written lessons that explain the reasoning behind a question type — not just the rule." },
  { n: "02", title: "Practice", body: "Questions with a full rationale for every option, so you learn why the distractor tempted you." },
  { n: "03", title: "Review", body: "Missed questions and due vocabulary return on a schedule built around forgetting." },
  { n: "04", title: "Improve", body: "Weakest-skill analysis turns a vague sense of struggle into a specific thing to practise." },
  { n: "05", title: "Master", body: "Mastery rises only when accuracy holds up on questions you have not seen before." },
];

export default function LandingPage() {
  return (
    <div className="min-h-dvh">
      <LandingNav />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-surface-2/70 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-10 px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:px-8">
          <div className="animate-rise">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] text-ink-2">
              <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
              Built for middle school, high school and exam preparation
            </div>

            <h1 className="serif-display text-[42px] leading-[1.03] sm:text-[56px] lg:text-[62px]">
              Study better.
              <br />
              Grow <span className="marker">steadily</span>.
            </h1>

            <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-2 sm:text-[16.5px]">
              Capybara Motion brings lessons, practice, feedback, vocabulary, writing, exam
              preparation and progress tracking together in one thoughtful learning space.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href="/dashboard" size="lg" iconRight="arrow-right">Start learning</ButtonLink>
              <ButtonLink href="#worlds" size="lg" variant="secondary">Explore subjects</ButtonLink>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-6">
              {[
                { k: "Courses", v: "9" },
                { k: "Skills tracked", v: "12" },
                { k: "Words in library", v: "600" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="eyebrow mb-1">{s.k}</dt>
                  <dd className="tabular serif-display text-[26px] text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* illustrated study environment — present, not dominant */}
          <div className="relative animate-rise" style={{ animationDelay: "90ms" }}>
            <div className="overflow-hidden rounded-[20px] border border-line bg-surface p-4 shadow-[var(--shadow-lift)] sm:p-6">
              <CapybaraDesk level={20} idle />
              <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-4">
                <div className="col-span-2 min-w-0">
                  <dt className="eyebrow mb-1">Now studying</dt>
                  <dd className="truncate text-[13.5px] font-medium text-ink">SAT Vocabulary — Unit 8</dd>
                </div>
                <div className="min-w-0 text-right">
                  <dt className="eyebrow mb-1">Accuracy</dt>
                  <dd className="tabular text-[13.5px] font-medium text-ink">
                    76% <span className="font-normal text-correct">+7</span>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="pointer-events-none absolute -bottom-5 -right-4 hidden items-center gap-2.5 rounded-[13px] border border-line bg-surface px-3.5 py-2.5 shadow-[var(--shadow-lift)] xl:flex">
              <Icon name="clock" size={15} className="text-ink-3" />
              <span className="tabular text-[14px] font-medium text-ink">24:36</span>
              <span className="text-[12.5px] text-ink-3">focus session</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY / POSITIONING ============ */}
      <section className="border-y border-line bg-surface-2/45">
        <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { icon: "target" as const, title: "Every wrong answer is explained", body: "Not just the correct option — each distractor comes with the reason it was tempting and the reason it fails." },
              { icon: "chart" as const, title: "Progress you can act on", body: "Mastery is tracked per skill. “Inference, 54%” is something to work on; “73% overall” is not." },
              { icon: "leaf" as const, title: "Designed to be opened daily", body: "Calm typography, quiet motion, and a study companion that stays out of the way while you read." },
            ].map((f) => (
              <div key={f.title}>
                <span className="mb-3.5 flex size-9 items-center justify-center rounded-[10px] border border-line bg-surface text-ink-2">
                  <Icon name={f.icon} size={17} />
                </span>
                <h2 className="text-[15.5px] font-semibold tracking-[-0.01em]">{f.title}</h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LEARNING WORLDS ============ */}
      <section id="worlds" className="scroll-mt-20">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-2.5">Learning worlds</p>
              <h2 className="serif-display text-[32px] sm:text-[40px]">Nine places to work.</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                Each world has its own library, its own practice bank and its own mastery
                tracking. Start anywhere; progress follows you across all of them.
              </p>
            </div>
            <ButtonLink href="/learn" variant="secondary" iconRight="arrow-right">Browse all courses</ButtonLink>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
            {worlds.map((w) => (
              <Link
                key={w.title}
                href={w.href}
                className={`group relative flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-line-2 hover:shadow-[var(--shadow-lift)] ${w.span}`}
              >
                <div
                  className={`relative flex items-center justify-center overflow-hidden px-4 py-4 ${w.tall ? "h-[168px] sm:h-[204px]" : "h-[152px] sm:h-[172px]"}`}
                  style={{ background: w.accent }}
                >
                  <WorldArt
                    kind={w.kind}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="flex items-start gap-3 border-t border-line p-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{w.title}</h3>
                    <p className="mt-1 text-[13px] leading-snug text-ink-2">{w.blurb}</p>
                  </div>
                  <Tag className="mt-0.5 shrink-0">{w.tag}</Tag>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section id="how" className="scroll-mt-20 border-y border-line bg-surface-2/45">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="eyebrow mb-2.5">The loop</p>
          <h2 className="serif-display max-w-xl text-[32px] sm:text-[40px]">
            Learn, practise, review, improve, master.
          </h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[16px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="bg-surface p-5">
                <span className="tabular serif-display text-[26px] text-ink-3">{s.n}</span>
                <h3 className="mt-2.5 text-[15px] font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ SHOWCASE ============ */}
      <section id="showcase" className="scroll-mt-20">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-9 max-w-xl">
            <p className="eyebrow mb-2.5">Inside the product</p>
            <h2 className="serif-display text-[32px] sm:text-[40px]">The parts students actually use.</h2>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-6">
            {showcase.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className={`group flex flex-col overflow-hidden rounded-[16px] border border-line bg-surface transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-line-2 hover:shadow-[var(--shadow-lift)] ${s.span}`}
              >
                <div className="flex h-[168px] items-center justify-center bg-surface-2/70 px-5 py-5 sm:h-[190px]">
                  <WorldArt kind={s.kind} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.035]" />
                </div>
                <div className="border-t border-line p-5">
                  <h3 className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em]">
                    {s.title}
                    <Icon name="arrow-right" size={15} className="text-ink-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">{s.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ROLES ============ */}
      <section id="roles" className="scroll-mt-20 border-t border-line bg-surface-2/45">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-9 max-w-xl">
            <p className="eyebrow mb-2.5">Three accounts</p>
            <h2 className="serif-display text-[32px] sm:text-[40px]">Students, parents, teachers.</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              Each role sees a different product, not the same dashboard with different labels.
            </p>
          </div>
          <div className="grid gap-3.5 md:grid-cols-3">
            {[
              { role: "Student", href: "/dashboard", variant: "vocab" as const, body: "A daily plan, a review queue that knows what is due, and a mistake notebook that turns errors into practice.", points: ["Today's plan", "Mastery map", "Focus sessions", "Study room"] },
              { role: "Parent", href: "/parent", variant: "plain" as const, body: "A weekly overview with study time, accuracy trend and the teacher's written summary. Clarity, not surveillance.", points: ["Weekly overview", "Strengths & gaps", "Teacher summary", "Printable report"] },
              { role: "Teacher", href: "/teacher", variant: "professor" as const, body: "Class rosters with the students who need attention surfaced first, plus an assignment builder and shared error analysis.", points: ["Student table", "Flagged students", "Assignment builder", "Class analytics"] },
            ].map((r) => (
              <Link
                key={r.role}
                href={r.href}
                className="group flex flex-col rounded-[16px] border border-line bg-surface p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[3px] hover:border-line-2 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{r.role}</h3>
                  <Capybara variant={r.variant} size={44} />
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">{r.body}</p>
                <ul className="mt-4 space-y-1.5 border-t border-line pt-4">
                  {r.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-[13px] text-ink-2">
                      <Icon name="check" size={14} className="shrink-0 text-sage" />
                      {p}
                    </li>
                  ))}
                </ul>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink">
                  Open the {r.role.toLowerCase()} view
                  <Icon name="arrow-right" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="relative overflow-hidden rounded-[20px] border border-line bg-surface px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="grid-paper pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <Capybara variant="plain" mood="pleased" size={64} className="mx-auto" idle />
              <h2 className="serif-display mt-5 text-[32px] sm:text-[42px]">
                Move forward, one lesson at a time.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-ink-2">
                No streak guilt, no confetti, no leaderboards. Just a place that keeps track of
                what you know so you can spend your time on what you do not.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/dashboard" size="lg" iconRight="arrow-right">Start learning</ButtonLink>
                <ButtonLink href="/learn" size="lg" variant="secondary">Explore subjects</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line bg-surface-2/45">
        <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 text-ink">
                <LogoMark size={26} />
                <span className="serif-display text-[16px]">Capybara Motion</span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-3">
                A calmer way to learn. Built as a demonstration platform with realistic
                course, practice and analytics data.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-3">
              {[
                { h: "Learn", links: [["Courses", "/learn"], ["Practice", "/practice"], ["Vocabulary", "/vocabulary"], ["Writing", "/writing"]] },
                { h: "Track", links: [["Progress", "/progress"], ["Mistakes", "/mistakes"], ["Achievements", "/achievements"], ["Study room", "/room"]] },
                { h: "Roles", links: [["Student", "/dashboard"], ["Parent", "/parent"], ["Teacher", "/teacher"], ["Mock exam", "/exam"]] },
              ].map((col) => (
                <div key={col.h}>
                  <p className="eyebrow mb-2.5">{col.h}</p>
                  <ul className="space-y-1.5">
                    {col.links.map(([label, href]) => (
                      <li key={href}>
                        <Link href={href} className="text-[13px] text-ink-2 transition-colors hover:text-ink">{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-10 border-t border-line pt-6 text-[12px] text-ink-3">
            Demo build. All student names, scores and teacher comments are fictional.
          </p>
        </div>
      </footer>
    </div>
  );
}
