import "server-only";
import { db } from "@/lib/db";
import { visibleStudentIds, assertCanViewStudent } from "@/lib/auth/rbac";
import type { SessionUser } from "@/lib/auth/session";
import type { TeacherStudentRow } from "@/lib/types";

const WEEK = 7 * 24 * 60 * 60 * 1000;

export interface StudentSummary {
  id: string;
  userId: string;
  name: string;
  initials: string;
  email: string;
  grade: string;
  /** Percentage of attempts answered correctly, or null before any attempts. */
  accuracy: number | null;
  attempts: number;
  minutesWeek: number;
  streak: number;
  lessonsCompleted: number;
  openMistakes: number;
  wordsMastered: number;
  lastActive: string;
  courses: string[];
}

const TITLES = new Set(["dr", "dr.", "mr", "mr.", "mrs", "mrs.", "ms", "ms.", "mx", "mx.", "prof", "prof.", "miss"]);

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter((p) => !TITLES.has(p.toLowerCase()));
  const use = parts.length ? parts : name.trim().split(/\s+/);
  if (use.length === 1) return use[0].slice(0, 2).toUpperCase();
  return [use[0], use[use.length - 1]].map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

function relativeDay(date: Date | null): string {
  if (!date) return "Never";
  const days = Math.floor((Date.now() - date.getTime()) / 86_400_000);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

/**
 * Real aggregates for the students the viewer is allowed to see.
 *
 * Scoping happens in visibleStudentIds, so a parent gets their children and
 * nobody else's, whatever the caller asks for.
 */
export async function getVisibleStudentSummaries(user: SessionUser): Promise<StudentSummary[]> {
  const ids = await visibleStudentIds(user);
  if (ids.length === 0) return [];

  const since = new Date(Date.now() - WEEK);

  const [profiles, attemptStats, correctStats, sessionStats, lessonStats, mistakeStats, masteredStats] =
    await Promise.all([
      db.studentProfile.findMany({
        where: { id: { in: ids } },
        include: {
          user: { select: { name: true, email: true, lastLoginAt: true, id: true } },
          enrollments: { include: { class: { select: { name: true } } } },
        },
      }),
      db.questionAttempt.groupBy({ by: ["studentId"], where: { studentId: { in: ids } }, _count: true }),
      db.questionAttempt.groupBy({
        by: ["studentId"], where: { studentId: { in: ids }, correct: true }, _count: true,
      }),
      db.studySession.groupBy({
        by: ["studentId"],
        where: { studentId: { in: ids }, completed: true, startedAt: { gte: since } },
        _sum: { minutes: true },
      }),
      db.lessonProgress.groupBy({
        by: ["studentId"], where: { studentId: { in: ids }, completedAt: { not: null } }, _count: true,
      }),
      db.mistake.groupBy({
        by: ["studentId"], where: { studentId: { in: ids }, status: { not: "RESOLVED" } }, _count: true,
      }),
      db.vocabularyReview.groupBy({
        by: ["studentId"], where: { studentId: { in: ids }, status: "MASTERED" }, _count: true,
      }),
    ]);

  const num = (rows: { studentId: string; _count: number }[], id: string) =>
    rows.find((r) => r.studentId === id)?._count ?? 0;

  return profiles.map((p) => {
    const total = num(attemptStats, p.id);
    const right = num(correctStats, p.id);
    return {
      id: p.id,
      userId: p.user.id,
      name: p.user.name,
      initials: initials(p.user.name),
      email: p.user.email,
      grade: p.grade ?? "—",
      accuracy: total ? Math.round((right / total) * 100) : null,
      attempts: total,
      minutesWeek: sessionStats.find((s) => s.studentId === p.id)?._sum.minutes ?? 0,
      streak: p.streakDays,
      lessonsCompleted: num(lessonStats, p.id),
      openMistakes: num(mistakeStats, p.id),
      wordsMastered: num(masteredStats, p.id),
      lastActive: relativeDay(p.user.lastLoginAt),
      courses: p.enrollments.map((e) => e.class.name),
    };
  });
}

/** Shapes a summary for the existing roster table, which predates the database. */
export function toRosterRow(s: StudentSummary): TeacherStudentRow {
  const flag: TeacherStudentRow["flag"] =
    s.accuracy !== null && s.accuracy < 60 ? "accuracy"
    : s.lastActive.includes("days ago") && parseInt(s.lastActive) >= 7 ? "inactive"
    : null;

  return {
    id: s.id,
    name: s.name,
    initials: s.initials,
    grade: s.grade,
    course: s.courses[0] ?? "No class",
    progress: s.lessonsCompleted ? Math.min(100, s.lessonsCompleted * 4) : 0,
    accuracy: s.accuracy ?? 0,
    minutesWeek: s.minutesWeek,
    streak: s.streak,
    flag,
    lastActive: s.lastActive,
    strengths: [],
    weaknesses: [],
    classId: "",
  };
}

/** A single student, gated by the same rule the roster uses. */
export async function getStudentSummary(user: SessionUser, studentId: string): Promise<StudentSummary | null> {
  await assertCanViewStudent(user, studentId);
  const all = await getVisibleStudentSummaries(user);
  return all.find((s) => s.id === studentId) ?? null;
}
