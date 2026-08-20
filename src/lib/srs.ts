import type { ReviewGrade, VocabStatus, VocabularyReview } from "@/lib/types";

const DAY = 24 * 60 * 60 * 1000;

/**
 * SM-2 with a slightly gentler lapse penalty: a lapsed card returns in a day
 * rather than in ten minutes, because this app is used once or twice daily
 * rather than in continuous sessions.
 */
export function schedule(prev: VocabularyReview | undefined, wordId: string, grade: ReviewGrade): VocabularyReview {
  const base: VocabularyReview =
    prev ?? { wordId, ease: 2.5, intervalDays: 0, reps: 0, lapses: 0, due: Date.now(), status: "new" };

  const quality = { again: 0, hard: 3, good: 4, easy: 5 }[grade];
  let { ease, intervalDays, reps, lapses } = base;

  if (quality < 3) {
    reps = 0;
    lapses += 1;
    intervalDays = 1;
    ease = Math.max(1.3, ease - 0.2);
  } else {
    reps += 1;
    if (reps === 1) intervalDays = 1;
    else if (reps === 2) intervalDays = 6;
    else intervalDays = Math.round(intervalDays * ease);

    if (grade === "hard") { intervalDays = Math.max(1, Math.round(intervalDays * 0.7)); ease = Math.max(1.3, ease - 0.15); }
    if (grade === "easy") { intervalDays = Math.round(intervalDays * 1.3); ease = Math.min(3.2, ease + 0.1); }
  }

  return { wordId, ease, intervalDays, reps, lapses, due: Date.now() + intervalDays * DAY, status: statusFor(reps, intervalDays), lastGrade: grade };
}

function statusFor(reps: number, intervalDays: number): VocabStatus {
  if (reps === 0) return "new";
  if (intervalDays >= 21) return "mastered";
  if (intervalDays >= 6) return "familiar";
  return "learning";
}

export function isDue(review: VocabularyReview | undefined) {
  if (!review) return true;
  return review.due <= Date.now();
}

export function dueLabel(review: VocabularyReview | undefined) {
  if (!review || review.due <= Date.now()) return "Due now";
  const days = Math.ceil((review.due - Date.now()) / DAY);
  if (days === 1) return "Due tomorrow";
  if (days < 30) return `Due in ${days} days`;
  return `Due in ${Math.round(days / 30)} months`;
}
