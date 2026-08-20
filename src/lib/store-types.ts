import type {
  Mistake, QuestionAttempt, Role, VocabularyReview, WritingSubmission,
} from "@/lib/types";

/**
 * The reducer's shape, extracted so server actions can reference it without
 * importing the client-only store module.
 */
export interface AppState {
  role: Role;
  hydrated: boolean;
  attempts: QuestionAttempt[];
  mistakes: Mistake[];
  reviews: Record<string, VocabularyReview>;
  lessonProgress: Record<string, number>;
  completedLessons: string[];
  writing: Record<string, WritingSubmission>;
  bookmarks: string[];
  notes: Record<string, string>;
  focusMinutes: number;
  focusSessions: number;
  xp: number;
  toasts: { id: string; title: string; body?: string; tone: "neutral" | "good" }[];
}
