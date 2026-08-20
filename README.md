# Capybara Motion

A serious education platform whose capybara identity makes studying feel calmer.

Capybara Motion brings lessons, practice, feedback, vocabulary, writing, exam
preparation and progress tracking together in one space, for middle and high
school students, exam candidates, their parents and their teachers.

This is a functional prototype: every screen is backed by realistic data, and
the core learning loops actually work and persist.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

Node 20+ required. No backend, no environment variables, no accounts.

---

## What works

Progress is real and persists to `localStorage` under `capybara-motion/v1`.

| Flow | Where |
| --- | --- |
| Browse and filter courses | `/learn` |
| Open a course, expand modules, track lesson completion | `/learn/[courseId]` |
| Read a lesson, take notes, use the tutor and glossary panels | `/learn/[courseId]/[lessonId]` |
| Answer questions, read per-distractor rationales, record confidence | `/practice/[setId]` |
| Automatic mistake capture, cause classification, pattern analysis | `/mistakes` |
| Annotate a passage: highlight, underline, evidence, comment, look up a word | any passage |
| Flashcards with SM-2 scheduling and keyboard grading | `/vocabulary/flashcards` |
| Write, autosave, and see paragraph structure analysed | `/writing/[promptId]` |
| Focus timer with a distraction-free view; logged sessions | `/focus` |
| Analytics across eight weeks and twelve skills | `/progress` |
| Mock exam with flagging, navigator and post-exam analytics | `/exam` |
| Parent overview, teacher notes, printable A4 report | `/parent` |
| Teacher triage, roster, student profiles, assignment builder | `/teacher` |
| Global search | `⌘K` / `Ctrl+K` anywhere |
| Switch between student, parent and teacher | sidebar, bottom left |

Answering a question wrong files it in the Mistake Notebook with its rationale.
Grading a flashcard reschedules it. Completing a lesson or focus session moves
XP, level and the study room. Clearing everything is on `/profile`.

### The demo role switcher

The switcher in the sidebar is for demonstration. Each role gets its own
navigation, its own home route and genuinely different screens. The active role
is derived from the URL (`roleForPath` in `src/lib/nav.ts`), so links and
deep-links stay consistent. To ship a single role, delete
`components/navigation/RoleSwitcher.tsx` and the `role` field in the store.

---

## Architecture

```
src/
  app/
    page.tsx              landing page
    (app)/                the product, inside the app shell
    (exam)/               exam mode — deliberately outside the shell
  components/
    navigation/           sidebar, top bar, bottom bar, command palette
    learning/             question card, passage, flashcards, guides, states
    mascot/               capybara SVGs
    marketing/            landing-page pieces
    teacher/              roster table
    ui/                   buttons, cards, charts, icons, progress
  lib/
    data/                 courses, questions, passages, vocabulary, people
    store.tsx             reducer + localStorage persistence
    srs.ts                spaced repetition
    writing.ts            paragraph structure analysis
    tutor.ts              scripted tutor with escalating depth
    nav.ts                role-aware navigation
    types.ts              domain model
```

Next.js App Router, TypeScript, Tailwind CSS v4, Framer Motion. State is a
single reducer in `lib/store.tsx`; there is no server.

### Design tokens

All colour, type, radius, shadow and easing tokens live in one `@theme` block
in `src/app/globals.css`. Accents carry three roles: a mid tone for fills and
icons, a soft tone for backgrounds, and an `-ink` tone for small text that
clears 4.5:1 against the soft tone. Body and caption colours clear 4.5:1 on
every surface they sit on.

### Motion

150–350 ms, soft easing, always tied to a state change. Everything respects
`prefers-reduced-motion` through a global override in `globals.css`. Exam mode
removes mascots and decorative motion entirely.

### Accessibility

Semantic landmarks, one `h1` per page with no level jumps, labelled controls,
a skip link, visible focus rings, keyboard-operable flashcards, command palette
and question interface, and `aria-live` on answer feedback.

---

## The data

Nothing is Lorem Ipsum. The demo student is Alex Chen, Grade 11, twelve-day
streak, 73% accuracy, 426 words mastered, 64% through SAT Reading & Writing.

The question bank carries a written rationale for **every** option, not just the
correct one, plus the evidence line and the skill tested. Passages, lessons,
teacher comments and the progress report were written for this project.

All students, scores and teacher comments are fictional.
