import type {
  Achievement, Assignment, ClassGroup, Mastery, ParentProfile, RoomItem,
  StudentProfile, StudySession, TeacherProfile, TeacherStudentRow, WritingPrompt,
} from "@/lib/types";

export const student: StudentProfile = {
  id: "st-alex",
  userId: "u-alex",
  name: "Alex Chen",
  initials: "AC",
  grade: "Grade 11",
  goal: "SAT 1450+ by March",
  targetExam: "SAT",
  joined: "September 2025",
  level: 14,
  xp: 8420,
  xpToNext: 9000,
  streak: 12,
  longestStreak: 21,
  accuracy: 73,
  wordsMastered: 426,
  minutesThisMonth: 1104,
  questionsAnswered: 1873,
};

export const parent: ParentProfile = { id: "pa-chen", name: "Wei Chen", initials: "WC", childIds: ["st-alex"] };

export const teacher: TeacherProfile = {
  id: "tc-marsh", name: "Dr. Elena Marsh", salutation: "Dr. Marsh", initials: "EM", subject: "English & Test Preparation", classIds: ["cl-sat-a", "cl-lit-11"],
};

/* ---------- Weekly activity: 8 weeks of study minutes and accuracy ---------- */

export const weeklyActivity = [
  { week: "Jun 23", minutes: 186, accuracy: 61, questions: 142, lessons: 4 },
  { week: "Jun 30", minutes: 210, accuracy: 64, questions: 168, lessons: 5 },
  { week: "Jul 7", minutes: 174, accuracy: 62, questions: 131, lessons: 3 },
  { week: "Jul 14", minutes: 248, accuracy: 68, questions: 196, lessons: 6 },
  { week: "Jul 21", minutes: 232, accuracy: 70, questions: 184, lessons: 5 },
  { week: "Jul 28", minutes: 265, accuracy: 69, questions: 205, lessons: 7 },
  { week: "Aug 4", minutes: 294, accuracy: 74, questions: 228, lessons: 7 },
  { week: "Aug 11", minutes: 278, accuracy: 76, questions: 216, lessons: 6 },
];

/** Study minutes for the last 7 days, Monday first. */
export const dailyMinutes = [
  { day: "Mon", minutes: 42, target: 40 },
  { day: "Tue", minutes: 55, target: 40 },
  { day: "Wed", minutes: 31, target: 40 },
  { day: "Thu", minutes: 48, target: 40 },
  { day: "Fri", minutes: 26, target: 40 },
  { day: "Sat", minutes: 62, target: 40 },
  { day: "Sun", minutes: 38, target: 40 },
];

export const masteryMap: Mastery[] = [
  { skill: "Reading", value: 78, delta: 4, domain: "Reading" },
  { skill: "Vocabulary", value: 61, delta: 7, domain: "Vocabulary" },
  { skill: "Writing", value: 53, delta: 2, domain: "Writing" },
  { skill: "Grammar", value: 72, delta: -1, domain: "Grammar" },
];

export const skillBreakdown = [
  { skill: "Command of Evidence", value: 81, attempts: 148, domain: "Reading" },
  { skill: "Central Ideas", value: 79, attempts: 112, domain: "Reading" },
  { skill: "Words in Context", value: 74, attempts: 203, domain: "Vocabulary" },
  { skill: "Form & Agreement", value: 76, attempts: 96, domain: "Grammar" },
  { skill: "Sentence Boundaries", value: 69, attempts: 118, domain: "Grammar" },
  { skill: "Transitions", value: 58, attempts: 87, domain: "Writing" },
  { skill: "Inference", value: 54, attempts: 164, domain: "Reading" },
  { skill: "Rhetorical Synthesis", value: 49, attempts: 71, domain: "Writing" },
];

export const assignments: Assignment[] = [
  { id: "as-1", title: "SAT Reading — Evidence Practice", courseTitle: "SAT Reading & Writing", type: "Reading", assignedBy: "Dr. Elena Marsh", due: "Today, 8:00 pm", dueInDays: 0, status: "in-progress", minutes: 25, progress: 40, targetHref: "/practice/evidence" },
  { id: "as-2", title: "Academic Vocabulary — Unit 12", courseTitle: "Academic Vocabulary", type: "Vocabulary", assignedBy: "Dr. Elena Marsh", due: "Tomorrow", dueInDays: 1, status: "not-started", minutes: 15, progress: 0, targetHref: "/vocabulary/flashcards" },
  { id: "as-3", title: "IELTS Writing — Opinion Essay", courseTitle: "IELTS Academic Writing", type: "Writing", assignedBy: "Priya Raghunathan", due: "Thursday", dueInDays: 3, status: "in-progress", minutes: 40, progress: 55, targetHref: "/writing/wp-ielts-opinion" },
  { id: "as-4", title: "Literature — Characterisation Response", courseTitle: "Literature Analysis", type: "Writing", assignedBy: "Marguerite Doyle", due: "Friday", dueInDays: 4, status: "not-started", minutes: 35, progress: 0, targetHref: "/writing/wp-lit-character" },
  { id: "as-5", title: "Grammar — Boundaries Quiz", courseTitle: "Grammar Foundations", type: "Quiz", assignedBy: "Tomas Feld", due: "Last Friday", dueInDays: -4, status: "overdue", minutes: 12, progress: 0, targetHref: "/practice/grammar" },
  { id: "as-6", title: "SAT Practice Test 3", courseTitle: "SAT Reading & Writing", type: "Mock Exam", assignedBy: "Dr. Elena Marsh", due: "Aug 24", dueInDays: 5, status: "not-started", minutes: 64, progress: 0, targetHref: "/exam" },
  { id: "as-7", title: "Reading Lab — Inference Set B", courseTitle: "Reading Lab", type: "Reading", assignedBy: "Tomas Feld", due: "Aug 12", dueInDays: -7, status: "graded", minutes: 20, progress: 100, score: 78, targetHref: "/practice/inference" },
];

export const writingPrompts: WritingPrompt[] = [
  {
    id: "wp-ielts-opinion",
    title: "Opinion Essay — Remote Work",
    exam: "IELTS Academic",
    taskType: "Task 2 — Agree / Disagree",
    brief:
      "Some people believe that allowing employees to work from home benefits both companies and society. Others argue that it weakens organisations over time. Discuss both views and give your own opinion.",
    requirements: [
      "Discuss both views, not only the one you agree with",
      "State and maintain a clear position",
      "At least 250 words",
      "Support each body paragraph with explanation and a concrete example",
    ],
    minWords: 250,
    minutes: 40,
    status: "draft",
    starter:
      "The shift toward remote work has changed how organisations think about where work happens. Supporters argue that it lowers costs and improves quality of life, while critics warn that distributed teams lose something that cannot be scheduled. In my view, the balance depends less on the policy itself than on what an organisation does to replace what proximity used to provide.\n\nThose in favour point first to time. A worker who no longer commutes recovers, on average, close to an hour each day, and that hour is returned to rest, family or focused work rather than to a train platform. There are environmental consequences as well: an office of five hundred staff moving to three remote days a week removes roughly fifteen hundred car journeys from the road each week, most of them single-occupancy.\n\nCritics respond that the losses are real but slower to appear.",
  },
  {
    id: "wp-lit-character",
    title: "Characterisation Response",
    exam: "Literature",
    taskType: "Analytical paragraph",
    brief:
      "Using 'The Reading Room', write one analytical paragraph explaining how the narration positions the reader in relation to Nadia. Refer closely to diction.",
    requirements: [
      "One paragraph, 180–250 words",
      "Quote at least two phrases and integrate them grammatically",
      "Make a claim about effect, not a summary of events",
    ],
    minWords: 180,
    minutes: 35,
    status: "not-started",
  },
  {
    id: "wp-sat-argument",
    title: "Timed Argument Paragraph",
    exam: "School English",
    taskType: "Timed practice",
    brief:
      "In 20 minutes, write a single paragraph arguing whether schools should require a full year of hand-written note-taking before permitting laptops.",
    requirements: ["One paragraph", "A claim that could be disagreed with", "One counterargument acknowledged and answered"],
    minWords: 150,
    minutes: 20,
    status: "not-started",
  },
];

export const achievements: Achievement[] = [
  { id: "ach-evidence", name: "Evidence Hunter", description: "You reliably find the line that proves the claim.", requirement: "Answer 25 evidence questions correctly", icon: "magnifier", earned: true, earnedOn: "12 August" },
  { id: "ach-words", name: "Word Collector", description: "One hundred words moved into long-term memory.", requirement: "Master 100 vocabulary words", icon: "book", earned: true, earnedOn: "28 July" },
  { id: "ach-focus", name: "Deep Focus", description: "Five uninterrupted half-hours.", requirement: "Complete five 30-minute focus sessions", icon: "clock", earned: true, earnedOn: "5 August" },
  { id: "ach-consistency", name: "Consistency", description: "Seven days without a gap.", requirement: "Study seven days in a row", icon: "calendar", earned: true, earnedOn: "9 August" },
  { id: "ach-comeback", name: "Comeback", description: "Returning to what you got wrong is the hardest habit to build.", requirement: "Review 20 previously incorrect questions", icon: "return", earned: false, progress: 13, target: 20 },
  { id: "ach-draft", name: "Second Draft", description: "Revision, not just production.", requirement: "Revise three writing submissions after feedback", icon: "pen", earned: false, progress: 1, target: 3 },
  { id: "ach-steady", name: "Steady Growth", description: "Accuracy improved for four consecutive weeks.", requirement: "Improve weekly accuracy four weeks running", icon: "leaf", earned: false, progress: 3, target: 4 },
  { id: "ach-range", name: "Full Range", description: "Practice across every skill family.", requirement: "Answer questions in all twelve skills", icon: "compass", earned: false, progress: 9, target: 12 },
];

export const recentSessions: StudySession[] = [
  { id: "ss-1", task: "SAT Vocabulary — Unit 8", minutes: 25, at: "Today, 4:12 pm", completed: true },
  { id: "ss-2", task: "Reading Lab — Inference Set B", minutes: 30, at: "Yesterday, 7:40 pm", completed: true },
  { id: "ss-3", task: "IELTS Writing — Opinion Essay", minutes: 40, at: "Yesterday, 5:05 pm", completed: true },
  { id: "ss-4", task: "Grammar — Boundaries", minutes: 15, at: "Sunday, 9:20 am", completed: false },
  { id: "ss-5", task: "Academic Vocabulary review", minutes: 25, at: "Saturday, 3:30 pm", completed: true },
];

export const roomItems: RoomItem[] = [
  { id: "desk", name: "Writing desk", level: 1, description: "Where it all starts." },
  { id: "lamp", name: "Desk lamp", level: 1, description: "Warm light for late review." },
  { id: "shelf", name: "Small bookshelf", level: 1, description: "Three shelves, slowly filling." },
  { id: "plant", name: "Small plant", level: 5, description: "Unlocked at level 5. It survives neglect, mostly." },
  { id: "mug", name: "Tea mug", level: 8, description: "Unlocked at level 8." },
  { id: "notebook", name: "New notebook", level: 10, description: "Unlocked at level 10. Grid ruled." },
  { id: "reading-lamp", name: "Reading lamp", level: 15, description: "Unlocked at level 15. Softer, for long passages." },
  { id: "books", name: "Bookshelf upgrade", level: 20, description: "Unlocked at level 20. Two more shelves." },
  { id: "cat", name: "Window sill visitor", level: 25, description: "Unlocked at level 25. Arrives most afternoons." },
  { id: "window", name: "Window scenery", level: 30, description: "Unlocked at level 30. A view worth looking up for." },
];

export const classes: ClassGroup[] = [
  { id: "cl-sat-a", name: "SAT Intensive — Section A", period: "Mon/Wed 4:00 pm", studentIds: ["st-alex", "st-rivera", "st-okafor", "st-lindqvist", "st-haddad", "st-yamamoto"] },
  { id: "cl-lit-11", name: "Literature 11", period: "Tue/Thu 10:30 am", studentIds: ["st-alex", "st-okafor", "st-park", "st-baptiste"] },
];

export const teacherStudents: TeacherStudentRow[] = [
  { id: "st-alex", name: "Alex Chen", initials: "AC", grade: "11", course: "SAT Reading & Writing", progress: 64, accuracy: 73, minutesWeek: 278, streak: 12, flag: null, lastActive: "Today", strengths: ["Command of evidence", "Vocabulary retention"], weaknesses: ["Inference", "Rhetorical synthesis"], classId: "cl-sat-a" },
  { id: "st-rivera", name: "Sofia Rivera", initials: "SR", grade: "11", course: "SAT Reading & Writing", progress: 81, accuracy: 84, minutesWeek: 312, streak: 26, flag: null, lastActive: "Today", strengths: ["Inference", "Transitions"], weaknesses: ["Timing on long passages"], classId: "cl-sat-a" },
  { id: "st-okafor", name: "Daniel Okafor", initials: "DO", grade: "11", course: "SAT Reading & Writing", progress: 47, accuracy: 58, minutesWeek: 94, streak: 2, flag: "accuracy", lastActive: "2 days ago", strengths: ["Central ideas"], weaknesses: ["Sentence boundaries", "Words in context"], classId: "cl-sat-a" },
  { id: "st-lindqvist", name: "Mia Lindqvist", initials: "ML", grade: "10", course: "Academic Vocabulary", progress: 72, accuracy: 79, minutesWeek: 205, streak: 9, flag: null, lastActive: "Yesterday", strengths: ["Words in context"], weaknesses: ["Essay development"], classId: "cl-sat-a" },
  { id: "st-haddad", name: "Omar Haddad", initials: "OH", grade: "11", course: "SAT Reading & Writing", progress: 33, accuracy: 66, minutesWeek: 41, streak: 0, flag: "inactive", lastActive: "9 days ago", strengths: ["Grammar"], weaknesses: ["Reading stamina", "Inference"], classId: "cl-sat-a" },
  { id: "st-yamamoto", name: "Rin Yamamoto", initials: "RY", grade: "12", course: "IELTS Academic Writing", progress: 88, accuracy: 81, minutesWeek: 268, streak: 18, flag: null, lastActive: "Today", strengths: ["Task response", "Coherence"], weaknesses: ["Lexical range"], classId: "cl-sat-a" },
  { id: "st-park", name: "Jisoo Park", initials: "JP", grade: "11", course: "Literature Analysis", progress: 59, accuracy: 77, minutesWeek: 176, streak: 6, flag: "overdue", lastActive: "Yesterday", strengths: ["Close reading"], weaknesses: ["Quotation integration"], classId: "cl-lit-11" },
  { id: "st-baptiste", name: "Noah Baptiste", initials: "NB", grade: "11", course: "Literature Analysis", progress: 68, accuracy: 71, minutesWeek: 198, streak: 11, flag: null, lastActive: "Today", strengths: ["Structure"], weaknesses: ["Diction analysis"], classId: "cl-lit-11" },
];

/** One sentence of report-ready commentary per tracked skill. */
export const skillNotes: Record<string, { strength: string; attention: string }> = {
  "Command of Evidence": {
    strength: "Reliably locates the specific line that supports a claim rather than selecting a broadly relevant one.",
    attention: "Quotations are chosen for topical relevance rather than for proving the specific claim in question.",
  },
  "Central Ideas": {
    strength: "Distinguishes a passage's argument from its supporting details, including where a true statement is offered as a distractor.",
    attention: "A true detail from a single paragraph is being selected in place of the claim that covers the whole text.",
  },
  "Words in Context": {
    strength: "Selects the precise sense of a word from sentence structure rather than from its most common definition.",
    attention: "The most familiar sense of a word is being applied where the sentence calls for a secondary one.",
  },
  "Form & Agreement": {
    strength: "Matches verbs and pronouns to the true subject even across long interrupting phrases.",
    attention: "Verb number is being matched to the nearest noun rather than to the head of the subject.",
  },
  "Sentence Boundaries": {
    strength: "Punctuates independent and dependent clauses correctly, including with conjunctive adverbs.",
    attention: "Conjunctive adverbs such as 'however' are being joined with a comma where a semicolon is required.",
  },
  Transitions: {
    strength: "Names the logical relationship between sentences before comparing the options.",
    attention: "Contrast transitions are being chosen by feel rather than after identifying an actual opposition.",
  },
  Inference: {
    strength: "Separates what a passage permits from what it requires, and can point to the sentence that forces the answer.",
    attention: "Answers that the passage permits are being selected over answers the passage requires. A two-question test is being introduced in class to address this directly.",
  },
  "Rhetorical Synthesis": {
    strength: "Grades candidate sentences against the stated rhetorical goal rather than against general interest.",
    attention: "Answers are chosen for interest rather than against the stated rhetorical goal. This is the least-practised skill on the programme as well as the weakest.",
  },
};

export const teacherComment =
  "Alex has had a genuinely strong month. Accuracy on evidence questions moved from 68% to 81%, and the vocabulary work is clearly holding — words from Unit 9 are still being retrieved correctly four weeks on. The remaining weakness is inference, where the pattern is consistent: Alex selects answers that are reasonable rather than answers the passage requires. We are working on a two-question test for this, and I would expect movement within three weeks. No concerns about effort or consistency.";

export const parentWeekly = {
  minutes: 278,
  minutesPrev: 265,
  lessons: 6,
  lessonsPrev: 7,
  assignmentsDone: 4,
  assignmentsTotal: 5,
  accuracy: 76,
  accuracyPrev: 69,
};
