"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { schedule } from "@/lib/srs";
import { questionById } from "@/lib/data/questions";
import { student as baseStudent } from "@/lib/data/people";
import { vocabularyWords } from "@/lib/data/vocabulary";
import type { Confidence, Mistake, MistakeReason, QuestionAttempt, ReviewGrade, Role } from "@/lib/types";
import type { AppState } from "@/lib/store-types";
import { loadProgress, saveProgress, type ProgressDelta } from "@/lib/actions/progress";

export type { AppState };

const STORAGE_KEY = "capybara-motion/v1";


type Action =
  | { type: "hydrate"; payload: Partial<AppState> }
  | { type: "set-role"; role: Role }
  | { type: "answer"; questionId: string; chosen: "A" | "B" | "C" | "D"; confidence: Confidence | null; seconds?: number }
  | { type: "classify-mistake"; mistakeId: string; reason: MistakeReason }
  | { type: "set-mistake-status"; mistakeId: string; status: Mistake["status"] }
  | { type: "review-word"; wordId: string; grade: ReviewGrade }
  | { type: "lesson-progress"; lessonId: string; value: number }
  | { type: "complete-lesson"; lessonId: string }
  | { type: "save-writing"; promptId: string; text: string }
  | { type: "submit-writing"; promptId: string }
  | { type: "toggle-bookmark"; id: string }
  | { type: "set-note"; id: string; text: string }
  | { type: "focus-complete"; minutes: number }
  | { type: "award"; xp: number; title: string; body?: string }
  | { type: "dismiss-toast"; id: string }
  | { type: "reset" };

export const initialState: AppState = {
  role: "student",
  hydrated: false,
  attempts: [],
  mistakes: [],
  reviews: {},
  lessonProgress: {},
  completedLessons: [],
  writing: {},
  bookmarks: [],
  notes: {},
  focusMinutes: 0,
  focusSessions: 0,
  xp: 0,
  toasts: [],
};

let toastSeq = 0;
const nextToastId = () => `t${++toastSeq}`;

function pushToast(state: AppState, title: string, body: string | undefined, tone: "neutral" | "good"): AppState["toasts"] {
  return [...state.toasts, { id: nextToastId(), title, body, tone }].slice(-3);
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "hydrate":
      return { ...state, ...action.payload, hydrated: true, toasts: [] };

    case "set-role":
      return { ...state, role: action.role };

    case "answer": {
      const q = questionById[action.questionId];
      if (!q) return state;
      const correct = q.correct === action.chosen;
      const attempt: QuestionAttempt = {
        questionId: q.id, chosen: action.chosen, correct,
        confidence: action.confidence, at: Date.now(), seconds: action.seconds,
      };
      const attempts = [...state.attempts.filter((a) => a.questionId !== q.id), attempt];

      let mistakes = state.mistakes;
      if (correct) {
        // Answering correctly resolves an open mistake rather than deleting the record.
        mistakes = mistakes.map((m) => (m.questionId === q.id && m.status !== "resolved" ? { ...m, status: "resolved" } : m));
      } else if (!mistakes.some((m) => m.questionId === q.id && m.status !== "resolved")) {
        mistakes = [
          {
            id: `mk-${q.id}-${Date.now()}`, questionId: q.id, chosen: action.chosen, correctAnswer: q.correct,
            skill: q.skill, difficulty: q.difficulty, confidence: action.confidence,
            reason: null, at: Date.now(), status: "new",
          },
          ...mistakes,
        ];
      }

      const gain = correct ? 20 : 5;
      return {
        ...state, attempts, mistakes, xp: state.xp + gain,
        toasts: correct
          ? pushToast(state, "Correct. Nicely reasoned.", `+${gain} XP`, "good")
          : pushToast(state, "Saved to your Mistake Notebook.", "This one needs another look.", "neutral"),
      };
    }

    case "classify-mistake":
      return { ...state, mistakes: state.mistakes.map((m) => (m.id === action.mistakeId ? { ...m, reason: action.reason, status: m.status === "new" ? "reviewing" : m.status } : m)) };

    case "set-mistake-status":
      return { ...state, mistakes: state.mistakes.map((m) => (m.id === action.mistakeId ? { ...m, status: action.status } : m)) };

    case "review-word": {
      const next = schedule(state.reviews[action.wordId], action.wordId, action.grade);
      const wasMastered = state.reviews[action.wordId]?.status === "mastered";
      const gain = action.grade === "again" ? 3 : 8;
      return {
        ...state,
        reviews: { ...state.reviews, [action.wordId]: next },
        xp: state.xp + gain,
        toasts: !wasMastered && next.status === "mastered"
          ? pushToast(state, "One more concept mastered.", `${vocabularyWords.find((w) => w.id === action.wordId)?.word ?? "Word"} moved to long-term review.`, "good")
          : state.toasts,
      };
    }

    case "lesson-progress":
      return { ...state, lessonProgress: { ...state.lessonProgress, [action.lessonId]: Math.max(state.lessonProgress[action.lessonId] ?? 0, action.value) } };

    case "complete-lesson": {
      if (state.completedLessons.includes(action.lessonId)) return state;
      return {
        ...state,
        completedLessons: [...state.completedLessons, action.lessonId],
        lessonProgress: { ...state.lessonProgress, [action.lessonId]: 100 },
        xp: state.xp + 60,
        toasts: pushToast(state, "Lesson complete.", "Good progress. +60 XP", "good"),
      };
    }

    case "save-writing": {
      const prev = state.writing[action.promptId];
      return { ...state, writing: { ...state.writing, [action.promptId]: { promptId: action.promptId, text: action.text, updatedAt: Date.now(), submitted: prev?.submitted ?? false, feedback: prev?.feedback, teacherComment: prev?.teacherComment } } };
    }

    case "submit-writing": {
      const prev = state.writing[action.promptId];
      if (!prev) return state;
      return {
        ...state,
        writing: { ...state.writing, [action.promptId]: { ...prev, submitted: true } },
        xp: state.xp + 80,
        toasts: pushToast(state, "Submitted for review.", "Feedback is ready in the right panel.", "good"),
      };
    }

    case "toggle-bookmark":
      return { ...state, bookmarks: state.bookmarks.includes(action.id) ? state.bookmarks.filter((b) => b !== action.id) : [...state.bookmarks, action.id] };

    case "set-note":
      return { ...state, notes: { ...state.notes, [action.id]: action.text } };

    case "focus-complete":
      return {
        ...state,
        focusMinutes: state.focusMinutes + action.minutes,
        focusSessions: state.focusSessions + 1,
        xp: state.xp + action.minutes * 2,
        toasts: pushToast(state, `${action.minutes} minutes of focused work.`, "Session saved to your history.", "good"),
      };

    case "award":
      return { ...state, xp: state.xp + action.xp, toasts: pushToast(state, action.title, action.body, "good") };

    case "dismiss-toast":
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };

    case "reset":
      return { ...initialState, hydrated: true, role: state.role };

    default:
      return state;
  }
}

const StateCtx = createContext<AppState>(initialState);
const DispatchCtx = createContext<React.Dispatch<Action>>(() => {});

export function AppStoreProvider({
  children,
  persistence = "local",
}: {
  children: ReactNode;
  /** "local" keeps everything in this browser; "server" syncs to the signed-in student's rows. */
  persistence?: "local" | "server";
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const loaded = useRef(false);
  /** Last state successfully written, used to work out what actually changed. */
  const saved = useRef<AppState | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate after mount so server and client markup match.
  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (persistence === "server") {
        try {
          const remote = await loadProgress();
          if (!cancelled) dispatch({ type: "hydrate", payload: remote ?? {} });
        } catch {
          if (!cancelled) dispatch({ type: "hydrate", payload: {} });
        }
      } else {
        try {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          dispatch({ type: "hydrate", payload: raw ? (JSON.parse(raw) as Partial<AppState>) : {} });
        } catch {
          dispatch({ type: "hydrate", payload: {} });
        }
      }
      loaded.current = true;
    }

    hydrate();
    return () => { cancelled = true; };
  }, [persistence]);

  useEffect(() => {
    if (!loaded.current || !state.hydrated) return;

    if (persistence === "local") {
      const { toasts: _t, hydrated: _h, ...persisted } = state;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
      } catch {
        /* storage full or unavailable — the session still works, it just will not persist */
      }
      return;
    }

    // Server mode: debounce, then send only the rows that differ.
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      const delta = diff(saved.current, state);
      if (!delta) { saved.current = state; return; }
      const snapshot = state;
      saveProgress(delta)
        .then(() => { saved.current = snapshot; })
        .catch(() => { /* keep the old snapshot so the next tick retries */ });
    }, 900);

    return () => { if (saveTimer.current) clearTimeout(saveTimer.current); };
  }, [state, persistence]);

  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={dispatch}>{children}</DispatchCtx.Provider>
    </StateCtx.Provider>
  );
}

/** What changed between the last saved snapshot and now. Returns null if nothing did. */
function diff(prev: AppState | null, next: AppState): ProgressDelta | null {
  const seen = new Set((prev?.attempts ?? []).map((a) => `${a.questionId}:${a.at}`));
  const attempts = next.attempts.filter((a) => !seen.has(`${a.questionId}:${a.at}`));

  const prevMistakes = new Map((prev?.mistakes ?? []).map((m) => [m.id, m]));
  const mistakes = next.mistakes.filter((m) => {
    const before = prevMistakes.get(m.id);
    return !before || before.status !== m.status || before.reason !== m.reason || before.note !== m.note;
  });

  const reviews = Object.values(next.reviews).filter((r) => {
    const before = prev?.reviews?.[r.wordId];
    return !before || before.due !== r.due || before.reps !== r.reps || before.status !== r.status;
  });

  const lessonProgress = Object.entries(next.lessonProgress)
    .filter(([id, pct]) => {
      const wasDone = prev?.completedLessons?.includes(id) ?? false;
      const isDone = next.completedLessons.includes(id);
      return prev?.lessonProgress?.[id] !== pct || wasDone !== isDone;
    })
    .map(([lessonId, percent]) => ({
      lessonId, percent, completed: next.completedLessons.includes(lessonId),
    }));

  const notes = Object.entries(next.notes)
    .filter(([id, body]) => prev?.notes?.[id] !== body)
    .map(([lessonId, body]) => ({ lessonId, body }));

  const writing = Object.values(next.writing).filter((w) => {
    const before = prev?.writing?.[w.promptId];
    return !before || before.text !== w.text || before.submitted !== w.submitted;
  });

  const xpChanged = prev?.xp !== next.xp;
  const focusChanged = (prev?.focusSessions ?? 0) !== next.focusSessions;

  const empty =
    !attempts.length && !mistakes.length && !reviews.length && !lessonProgress.length &&
    !notes.length && !writing.length && !xpChanged && !focusChanged;
  if (empty) return null;

  return {
    ...(attempts.length && { attempts }),
    ...(mistakes.length && { mistakes }),
    ...(reviews.length && { reviews }),
    ...(lessonProgress.length && { lessonProgress }),
    ...(notes.length && { notes }),
    ...(writing.length && { writing }),
    ...(focusChanged && {
      focusSession: {
        task: "Focus session",
        minutes: next.focusMinutes - (prev?.focusMinutes ?? 0),
      },
    }),
    ...(xpChanged && { xp: next.xp }),
  };
}

export const useApp = () => useContext(StateCtx);
export const useDispatch = () => useContext(DispatchCtx);

/* ============================================================
   Derived selectors — demo baseline plus this session's activity
   ============================================================ */

export function useStats() {
  const s = useApp();
  return useMemo(() => {
    const answered = s.attempts.length;
    const right = s.attempts.filter((a) => a.correct).length;
    const sessionAccuracy = answered ? Math.round((right / answered) * 100) : null;

    const reviewed = Object.values(s.reviews);
    const masteredNow = reviewed.filter((r) => r.status === "mastered").length;

    const xp = baseStudent.xp + s.xp;
    const level = baseStudent.level + Math.floor(s.xp / 600);
    const xpIntoLevel = xp % 600;

    return {
      answered,
      right,
      sessionAccuracy,
      /** Blends the demo baseline with live answers so the number moves as you work. */
      accuracy: answered
        ? Math.round(((baseStudent.accuracy * baseStudent.questionsAnswered) / 100 + right) /
            (baseStudent.questionsAnswered + answered) * 100)
        : baseStudent.accuracy,
      questionsAnswered: baseStudent.questionsAnswered + answered,
      wordsMastered: baseStudent.wordsMastered + masteredNow,
      minutesThisMonth: baseStudent.minutesThisMonth + s.focusMinutes,
      openMistakes: s.mistakes.filter((m) => m.status !== "resolved").length,
      resolvedMistakes: s.mistakes.filter((m) => m.status === "resolved").length,
      dueWords: vocabularyWords.filter((w) => {
        const r = s.reviews[w.id];
        return !r || r.due <= Date.now();
      }).length,
      xp,
      level,
      xpIntoLevel,
      xpToNext: 600,
      streak: baseStudent.streak,
      completedLessons: s.completedLessons.length,
      focusSessions: s.focusSessions,
    };
  }, [s]);
}

export function useAttempt(questionId: string) {
  const s = useApp();
  return s.attempts.find((a) => a.questionId === questionId);
}
