/* ============================================================
   Capybara Motion — domain model
   ============================================================ */

export type Role = "student" | "parent" | "teacher" | "admin";

export type SkillId =
  | "inference"
  | "evidence"
  | "vocab-in-context"
  | "main-idea"
  | "transitions"
  | "rhetorical-synthesis"
  | "boundaries"
  | "form-structure-sense"
  | "essay-development"
  | "task-response"
  | "coherence"
  | "lexical-range";

export interface Skill {
  id: SkillId;
  name: string;
  domain: "Reading" | "Writing" | "Grammar" | "Vocabulary";
  description: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  initials: string;
  email: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  initials: string;
  grade: string;
  goal: string;
  targetExam: string;
  joined: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  longestStreak: number;
  accuracy: number;
  wordsMastered: number;
  minutesThisMonth: number;
  questionsAnswered: number;
}

export interface ParentProfile {
  id: string;
  name: string;
  initials: string;
  childIds: string[];
}

export interface TeacherProfile {
  id: string;
  name: string;
  /** How the teacher is addressed in greetings. */
  salutation: string;
  initials: string;
  subject: string;
  classIds: string[];
}

export type Difficulty = "Foundation" | "Core" | "Advanced";

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "SAT" | "IELTS" | "TOEFL" | "Vocabulary" | "Writing" | "Literature" | "Reading" | "Grammar" | "School";
  skillTags: string[];
  instructor: string;
  instructorTitle: string;
  hours: number;
  difficulty: Difficulty;
  lessonCount: number;
  mastery: number;
  progress: number;
  accent: AccentName;
  goals: string[];
  modules: Module[];
  recommended?: boolean;
}

export type AccentName = "sage" | "blue" | "clay" | "ochre" | "plum";

export interface Module {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
}

export type LessonBlock =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "callout"; tone: "note" | "warn" | "tip"; title: string; body: string }
  | { kind: "passage"; title: string; source: string; paragraphs: string[] }
  | { kind: "example"; title: string; before: string; after: string; note: string }
  | { kind: "list"; title: string; items: string[] }
  | { kind: "steps"; title: string; items: { label: string; body: string }[] }
  | { kind: "question"; questionId: string }
  | { kind: "reflection"; prompt: string };

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  kind: "Concept" | "Practice" | "Passage" | "Workshop" | "Review";
  minutes: number;
  summary: string;
  objectives: string[];
  blocks: LessonBlock[];
  questionIds: string[];
  locked?: boolean;
}

export interface Choice {
  id: "A" | "B" | "C" | "D";
  text: string;
  /** Why this distractor is tempting and why it fails. */
  rationale: string;
}

export interface Question {
  id: string;
  courseId?: string;
  skill: SkillId;
  difficulty: Difficulty;
  prompt: string;
  passageId?: string;
  choices: Choice[];
  correct: "A" | "B" | "C" | "D";
  why: string;
  evidence?: string;
  source: string;
}

export interface Passage {
  id: string;
  title: string;
  attribution: string;
  genre: string;
  paragraphs: string[];
}

export type Confidence = "low" | "medium" | "high";

export interface QuestionAttempt {
  questionId: string;
  chosen: "A" | "B" | "C" | "D";
  correct: boolean;
  confidence: Confidence | null;
  at: number;
  seconds?: number;
}

export type MistakeReason =
  | "vocabulary"
  | "misread"
  | "missed-evidence"
  | "grammar-rule"
  | "careless"
  | "time"
  | "guessed"
  | "overthought"
  | "concept";

export interface Mistake {
  id: string;
  questionId: string;
  chosen: "A" | "B" | "C" | "D";
  correctAnswer: "A" | "B" | "C" | "D";
  skill: SkillId;
  difficulty: Difficulty;
  confidence: Confidence | null;
  reason: MistakeReason | null;
  at: number;
  status: "new" | "reviewing" | "resolved";
  note?: string;
}

export type VocabStatus = "new" | "learning" | "familiar" | "mastered";

export interface VocabularyWord {
  id: string;
  word: string;
  ipa: string;
  pos: string;
  definition: string;
  example: string;
  synonyms: string[];
  confusion?: string;
  cue: string;
  setId: string;
  tier: "Academic" | "SAT" | "IELTS" | "Literary";
}

export interface VocabularySet {
  id: string;
  title: string;
  description: string;
  tier: string;
  wordIds: string[];
  accent: AccentName;
}

export type ReviewGrade = "again" | "hard" | "good" | "easy";

export interface VocabularyReview {
  wordId: string;
  /** SM-2 style spaced repetition state. */
  ease: number;
  intervalDays: number;
  reps: number;
  lapses: number;
  due: number;
  status: VocabStatus;
  lastGrade?: ReviewGrade;
}

export type AssignmentStatus = "not-started" | "in-progress" | "submitted" | "graded" | "overdue";

export interface Assignment {
  id: string;
  title: string;
  courseTitle: string;
  type: "Reading" | "Vocabulary" | "Writing" | "Quiz" | "Mock Exam";
  assignedBy: string;
  due: string;
  dueInDays: number;
  status: AssignmentStatus;
  minutes: number;
  progress: number;
  score?: number;
  targetHref: string;
}

export interface WritingPrompt {
  id: string;
  title: string;
  exam: string;
  taskType: string;
  brief: string;
  requirements: string[];
  minWords: number;
  minutes: number;
  status: "not-started" | "draft" | "feedback";
  starter?: string;
}

export interface FeedbackItem {
  category: "Task Achievement" | "Organization" | "Evidence" | "Language" | "Grammar" | "Vocabulary" | "Style";
  score: number;
  comment: string;
}

export interface WritingSubmission {
  promptId: string;
  text: string;
  updatedAt: number;
  submitted: boolean;
  feedback?: FeedbackItem[];
  teacherComment?: string;
}

export interface Mastery {
  skill: string;
  value: number;
  delta: number;
  domain: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  icon: AchievementIcon;
  earned: boolean;
  earnedOn?: string;
  progress?: number;
  target?: number;
}

export type AchievementIcon = "magnifier" | "book" | "clock" | "return" | "calendar" | "pen" | "leaf" | "compass";

export interface StudySession {
  id: string;
  task: string;
  minutes: number;
  at: string;
  completed: boolean;
}

export interface RoomItem {
  id: string;
  name: string;
  level: number;
  description: string;
}

export interface ClassGroup {
  id: string;
  name: string;
  period: string;
  studentIds: string[];
}

export interface TeacherStudentRow {
  id: string;
  name: string;
  initials: string;
  grade: string;
  course: string;
  progress: number;
  accuracy: number;
  minutesWeek: number;
  streak: number;
  flag: null | "accuracy" | "inactive" | "overdue";
  lastActive: string;
  strengths: string[];
  weaknesses: string[];
  classId: string;
}
