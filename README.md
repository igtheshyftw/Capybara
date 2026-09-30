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

## Accounts and deployment

Out of the box the app runs in **demo mode**: sample data, the role switcher,
progress in `localStorage`, no sign-in. Setting `DATABASE_URL` switches it to
**live mode**, where people sign in with their own accounts and each student's
work is stored against them.

Nothing about the demo is removed — it is what runs when no database is
configured, which keeps `npm run dev` working with zero setup.

### How accounts are created

Invite-only. There is no public sign-up form anywhere in the app.

```
admin  ──invites──>  teacher  ──invites──>  student
                              ──invites──>  parent ──linked to──> one student
```

* An **admin** can invite anyone, and suspend or reactivate accounts.
* A **teacher** can invite students and parents. The administrator role is not
  offered to them.
* A **parent** sees only the children they are explicitly linked to. That link
  is created when they are invited, and it is the only thing that grants access.
* A **student** sees only their own work.

Invite links work once and expire after 14 days. The invited person chooses
their own password — nobody else ever sets or sees it.

### Security

| Concern | How it is handled |
| --- | --- |
| Password storage | scrypt (Node core), N=2^16, per-password 32-byte salt, 64-byte key. ~200 ms per hash. |
| Sessions | 256-bit opaque tokens; only a SHA-256 digest is stored, so a database dump cannot be replayed. httpOnly, `SameSite=Lax`, `Secure` in production. 30 days, renewed while in use. |
| Brute force | Locked for 15 minutes after 8 consecutive failures. |
| User enumeration | Sign-in returns one message for every failure, and spends comparable time when the address does not exist. Password reset always reports the same thing. |
| Password reset | Single-use, one-hour links. Resetting signs out every other device. |
| Authorisation | Every role area is gated by a server-side layout, and student records go through one function (`assertCanViewStudent`). Middleware only redirects — it never grants access. |
| Audit | Sign-ins, invites, suspensions and password changes are appended to `AuditLog`, visible at `/admin/activity`. |

### Deploying to Vercel and Neon

1. **Database.** Create a project at neon.tech. From the dashboard copy two
   connection strings into your environment:
   `DATABASE_URL` (the **pooled** one, with `-pooler` in the host) and
   `DIRECT_URL` (the direct one, used only for migrations).
2. **Push the code** to GitHub.
3. **Vercel.** Import the repository. Add `DATABASE_URL`, `DIRECT_URL` and
   `APP_URL` (your deployment URL) as environment variables. Deploy.
4. **Create the tables.** From your machine, with the same variables set:
   ```bash
   npm run db:deploy
   ```
5. **Create the first administrator:**
   ```bash
   ORG_NAME="Your School" ADMIN_EMAIL="you@example.com" npm run db:seed
   ```
   It prints a generated password unless you set `ADMIN_PASSWORD`. Save it.
6. Sign in at `/login`, then invite your teachers from **Admin → People**.

`npm run build` runs `prisma generate` first, so Vercel needs no extra build
configuration.

### Sending invite and reset emails

No mail transport is wired up. Invite links are shown in the admin UI to copy
and send yourself; password-reset links are written to the server log. To send
them automatically, replace the `console.info` in `requestResetAction`
(`src/lib/actions/auth.ts`) and the returned link in `createInviteAction`
(`src/lib/actions/admin.ts`) with a call to your provider. Everything else
about the flow already works.

### Useful commands

```bash
npm run db:migrate   # create a migration during development
npm run db:deploy    # apply migrations in production
npm run db:seed      # create the organisation and first admin
npm run db:studio    # browse the data in a local GUI
```

### What is live and what is still sample content

Adding a database does not retro-fit history that does not exist. In live mode:

* **Real:** every account, session, role and permission; student progress
  (attempts, mistakes, vocabulary scheduling, lesson completion, notes, writing
  drafts, focus sessions); the teacher roster; the parent's children and their
  headline figures; the activity log.
* **Still sample content:** the eight-week trend charts, class-wide analytics
  and the printable report's historical series. A newly created student has no
  history, so these screens illustrate the shape rather than invent data. They
  read from `src/lib/data/people.ts` and are the natural next thing to move onto
  real queries once a deployment has a few weeks of use behind it.
* **Course content** — lessons, questions, passages, vocabulary — is versioned
  in code rather than in rows, so editing a lesson never orphans a student's
  history.

---

## The data

Nothing is Lorem Ipsum. The demo student is Alex Chen, Grade 11, twelve-day
streak, 73% accuracy, 426 words mastered, 64% through SAT Reading & Writing.

The question bank carries a written rationale for **every** option, not just the
correct one, plus the evidence line and the skill tested. Passages, lessons,
teacher comments and the progress report were written for this project.

All students, scores and teacher comments are fictional.

---

## TOEFL practice portal

A second, self-contained thing lives in `public/`: standalone HTML pages that
simulate the 2026 TOEFL iBT reading and writing sections. They share no code
with the Next.js app, need no build step and no server, and open straight from
the file system or from GitHub Pages.

`public/index.html` is the portal students land on.

| Page | What it is | Clock |
| --- | --- | --- |
| `index.html` | the portal: links, instructions, the student's name | — |
| `reading-module.html` | Complete the Words (10), Read in Daily Life (5), Academic Passage (5) | 13:00 |
| `writing-section.html` | Build a Sentence (10), Write an Email, Academic Discussion | 6:50 / 7:00 / 10:00 |
| `build-a-sentence.html` | Build a Sentence on its own, with a level control | 6:50 |
| `writing-tasks.html` | the two written tasks on their own | 7:00 / 10:00 |

Questions are drawn at random each sitting from banks of 1,000 sentence items
(500 standard, 500 hard, across 50 grammar targets), 60 email prompts, 60
discussion prompts, 32 word-completion paragraphs, 14 everyday texts and 7
academic passages. Every item was written for this project.

### The printable report

Each score report has a **Print / Save as PDF** button. It opens a clean
document — the questions, the student's answers, the answer key, and for the
written tasks the mechanical checks and a band-5 model — and sends it to the
printer; choosing "Save as PDF" as the destination keeps a copy. The student's
name comes from the portal (`localStorage`, this browser only). Printing before
a section is submitted prints the work **without** the key.

### Publishing it

`.github/workflows/pages.yml` publishes `public/` to GitHub Pages on every push
to `main`. Turn it on once under **Settings → Pages → Build and deployment →
Source: GitHub Actions**; the portal is then at
`https://<user>.github.io/<repo>/`. Nothing is uploaded from the student's
browser and there is nothing to sign in to.

The Next.js app has its own `/` route, so `public/index.html` is shadowed when
you run `npm run dev`; open `/index.html` for the portal there.

### Rebuilding the content

Content is authored in Python under `scripts/` and injected between the
`CONTENT:START` / `CONTENT:END` markers in the HTML. Each builder validates
before it writes and exits non-zero on any problem, so a page can never ship an
item that breaks its own rules.

```bash
python3 scripts/build_bank.py             # sentence bank -> build-a-sentence.html
python3 scripts/build_reading.py          # reading content -> reading-module.html
python3 scripts/build_writing.py          # email + discussion -> writing-tasks.html
python3 scripts/build_writing_section.py  # both of the above -> writing-section.html
```

`scripts/calibration.py` holds real items transcribed for measurement only.
They are never emitted into a bank; the builder prints our distribution against
theirs on every run.

TOEFL and TOEFL iBT are registered trademarks of Educational Testing Service.
This material is unofficial, was written for this project, and ETS has no
involvement in it.
