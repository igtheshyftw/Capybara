"use server";

import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import type { AppState } from "@/lib/store-types";
import type {
  Confidence as AppConfidence, Mistake as AppMistake, MistakeReason as AppReason,
  QuestionAttempt as AppAttempt, VocabStatus as AppVocabStatus, VocabularyReview as AppReview,
  WritingSubmission as AppWriting,
} from "@/lib/types";
import type { Confidence, MistakeReason, MistakeStatus, VocabStatus } from "@prisma/client";

/* ---------------- enum mapping between the UI's lowercase strings and Prisma ---------------- */

const toConfidence = (c: AppConfidence | null): Confidence | null =>
  c ? (c.toUpperCase() as Confidence) : null;
const fromConfidence = (c: Confidence | null): AppConfidence | null =>
  c ? (c.toLowerCase() as AppConfidence) : null;

const reasonToDb: Record<AppReason, MistakeReason> = {
  vocabulary: "VOCABULARY", misread: "MISREAD", "missed-evidence": "MISSED_EVIDENCE",
  "grammar-rule": "GRAMMAR_RULE", careless: "CARELESS", time: "TIME",
  guessed: "GUESSED", overthought: "OVERTHOUGHT", concept: "CONCEPT",
};
const reasonFromDb = Object.fromEntries(
  Object.entries(reasonToDb).map(([k, v]) => [v, k]),
) as Record<MistakeReason, AppReason>;

const statusToDb: Record<AppMistake["status"], MistakeStatus> = {
  new: "NEW", reviewing: "REVIEWING", resolved: "RESOLVED",
};
const statusFromDb = Object.fromEntries(
  Object.entries(statusToDb).map(([k, v]) => [v, k]),
) as Record<MistakeStatus, AppMistake["status"]>;

const vocabToDb = (s: AppVocabStatus): VocabStatus => s.toUpperCase() as VocabStatus;
const vocabFromDb = (s: VocabStatus): AppVocabStatus => s.toLowerCase() as AppVocabStatus;

/* ---------------- load ---------------- */

export type PersistedState = Pick<
  AppState,
  | "attempts" | "mistakes" | "reviews" | "lessonProgress" | "completedLessons"
  | "writing" | "notes" | "focusMinutes" | "focusSessions" | "xp"
>;

/** Everything the signed-in student's session needs, in the shape the reducer holds. */
export async function loadProgress(): Promise<PersistedState | null> {
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT" || !user.profileId) return null;
  const studentId = user.profileId;

  const [attempts, mistakes, reviews, lessons, notes, writing, sessions, profile] =
    await Promise.all([
      db.questionAttempt.findMany({ where: { studentId }, orderBy: { createdAt: "asc" } }),
      db.mistake.findMany({ where: { studentId }, orderBy: { createdAt: "desc" } }),
      db.vocabularyReview.findMany({ where: { studentId } }),
      db.lessonProgress.findMany({ where: { studentId } }),
      db.lessonNote.findMany({ where: { studentId } }),
      db.writingSubmission.findMany({ where: { studentId } }),
      db.studySession.findMany({ where: { studentId, completed: true } }),
      db.studentProfile.findUnique({ where: { id: studentId }, select: { xp: true } }),
    ]);

  return {
    attempts: attempts.map<AppAttempt>((a) => ({
      questionId: a.questionId,
      chosen: a.chosen as AppAttempt["chosen"],
      correct: a.correct,
      confidence: fromConfidence(a.confidence),
      at: a.createdAt.getTime(),
      seconds: a.seconds ?? undefined,
    })),
    mistakes: mistakes.map<AppMistake>((m) => ({
      id: m.id,
      questionId: m.questionId,
      chosen: m.chosen as AppMistake["chosen"],
      correctAnswer: m.correctAnswer as AppMistake["correctAnswer"],
      skill: m.skill as AppMistake["skill"],
      difficulty: m.difficulty as AppMistake["difficulty"],
      confidence: fromConfidence(m.confidence),
      reason: m.reason ? reasonFromDb[m.reason] : null,
      at: m.createdAt.getTime(),
      status: statusFromDb[m.status],
      note: m.note ?? undefined,
    })),
    reviews: Object.fromEntries(
      reviews.map((r) => [
        r.wordId,
        {
          wordId: r.wordId, ease: r.ease, intervalDays: r.intervalDays, reps: r.reps,
          lapses: r.lapses, due: r.dueAt.getTime(), status: vocabFromDb(r.status),
          lastGrade: (r.lastGrade ?? undefined) as AppReview["lastGrade"],
        } satisfies AppReview,
      ]),
    ),
    lessonProgress: Object.fromEntries(lessons.map((l) => [l.lessonId, l.percent])),
    completedLessons: lessons.filter((l) => l.completedAt).map((l) => l.lessonId),
    notes: Object.fromEntries(notes.map((n) => [n.lessonId, n.body])),
    writing: Object.fromEntries(
      writing.map((w) => [
        w.promptId,
        {
          promptId: w.promptId, text: w.body, updatedAt: w.updatedAt.getTime(),
          submitted: Boolean(w.submittedAt),
          teacherComment: w.teacherComment ?? undefined,
        } satisfies AppWriting,
      ]),
    ),
    focusMinutes: sessions.reduce((n, s) => n + s.minutes, 0),
    focusSessions: sessions.length,
    xp: profile?.xp ?? 0,
  };
}

/* ---------------- save ---------------- */

export interface ProgressDelta {
  attempts?: AppAttempt[];
  mistakes?: AppMistake[];
  reviews?: AppReview[];
  lessonProgress?: { lessonId: string; percent: number; completed: boolean }[];
  notes?: { lessonId: string; body: string }[];
  writing?: AppWriting[];
  focusSession?: { task: string; minutes: number };
  xp?: number;
}

/**
 * Apply only what changed since the last save. The client diffs against its own
 * last-saved snapshot, so a study session costs a handful of upserts rather than
 * rewriting the student's whole history on every keystroke.
 */
export async function saveProgress(delta: ProgressDelta): Promise<{ ok: boolean }> {
  const user = await getSessionUser();
  if (!user || user.role !== "STUDENT" || !user.profileId) return { ok: false };
  const studentId = user.profileId;

  const ops: Promise<unknown>[] = [];

  for (const a of delta.attempts ?? []) {
    ops.push(
      db.questionAttempt.create({
        data: {
          studentId, questionId: a.questionId, chosen: a.chosen, correct: a.correct,
          confidence: toConfidence(a.confidence), seconds: a.seconds ?? null,
          createdAt: new Date(a.at),
        },
      }),
    );
  }

  for (const m of delta.mistakes ?? []) {
    const shared = {
      chosen: m.chosen, correctAnswer: m.correctAnswer, skill: m.skill,
      difficulty: m.difficulty, confidence: toConfidence(m.confidence),
      reason: m.reason ? reasonToDb[m.reason] : null,
      status: statusToDb[m.status], note: m.note ?? null,
      resolvedAt: m.status === "resolved" ? new Date() : null,
    };
    ops.push(
      db.mistake.upsert({
        where: { id: m.id },
        update: shared,
        create: { id: m.id, studentId, questionId: m.questionId, createdAt: new Date(m.at), ...shared },
      }),
    );
  }

  for (const r of delta.reviews ?? []) {
    const shared = {
      ease: r.ease, intervalDays: r.intervalDays, reps: r.reps, lapses: r.lapses,
      dueAt: new Date(r.due), status: vocabToDb(r.status), lastGrade: r.lastGrade ?? null,
    };
    ops.push(
      db.vocabularyReview.upsert({
        where: { studentId_wordId: { studentId, wordId: r.wordId } },
        update: shared,
        create: { studentId, wordId: r.wordId, ...shared },
      }),
    );
  }

  for (const l of delta.lessonProgress ?? []) {
    ops.push(
      db.lessonProgress.upsert({
        where: { studentId_lessonId: { studentId, lessonId: l.lessonId } },
        update: { percent: l.percent, completedAt: l.completed ? new Date() : null },
        create: {
          studentId, lessonId: l.lessonId, percent: l.percent,
          completedAt: l.completed ? new Date() : null,
        },
      }),
    );
  }

  for (const n of delta.notes ?? []) {
    ops.push(
      db.lessonNote.upsert({
        where: { studentId_lessonId: { studentId, lessonId: n.lessonId } },
        update: { body: n.body },
        create: { studentId, lessonId: n.lessonId, body: n.body },
      }),
    );
  }

  for (const w of delta.writing ?? []) {
    const words = w.text.trim() ? w.text.trim().split(/\s+/).length : 0;
    ops.push(
      db.writingSubmission.upsert({
        where: { studentId_promptId: { studentId, promptId: w.promptId } },
        update: { body: w.text, wordCount: words, submittedAt: w.submitted ? new Date() : null },
        create: {
          studentId, promptId: w.promptId, body: w.text, wordCount: words,
          submittedAt: w.submitted ? new Date() : null,
        },
      }),
    );
  }

  if (delta.focusSession) {
    ops.push(
      db.studySession.create({
        data: { studentId, task: delta.focusSession.task, minutes: delta.focusSession.minutes },
      }),
    );
  }

  if (typeof delta.xp === "number") {
    ops.push(db.studentProfile.update({ where: { id: studentId }, data: { xp: delta.xp } }));
  }

  await Promise.all(ops);
  return { ok: true };
}
