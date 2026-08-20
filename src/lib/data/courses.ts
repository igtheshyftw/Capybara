import type { Course } from "@/lib/types";

export const courses: Course[] = [
  {
    id: "sat-rw",
    title: "SAT Reading & Writing",
    subtitle: "Evidence, inference and precision under time",
    description:
      "A full pass through the digital SAT Reading & Writing section. Each module isolates one question family, teaches the reasoning it rewards, and then drills it against passages written at test difficulty.",
    category: "SAT",
    skillTags: ["Inference", "Evidence", "Transitions", "Synthesis"],
    instructor: "Dr. Elena Marsh",
    instructorTitle: "Former test developer, 14 years teaching",
    hours: 26,
    difficulty: "Core",
    lessonCount: 9,
    mastery: 64,
    progress: 64,
    accent: "blue",
    recommended: true,
    goals: [
      "Distinguish answers that are possible from answers the text supports",
      "Locate the single line of evidence that proves a claim",
      "Name the logical relationship between sentences before reading transition options",
      "Work a module at test pace without losing accuracy",
    ],
    modules: [
      {
        id: "m-sat-1",
        title: "Information & Ideas",
        summary: "Central ideas, inference and command of evidence.",
        lessons: [
          {
            id: "l-sat-1-1",
            courseId: "sat-rw",
            title: "What counts as support",
            kind: "Concept",
            minutes: 14,
            summary: "The difference between an answer that could be true and one the passage proves.",
            objectives: [
              "Define textual support in operational terms",
              "Reject plausible answers that lack a line to point at",
              "Apply the two-question test to any inference item",
            ],
            blocks: [
              {
                kind: "prose",
                heading: "The most expensive habit on this section",
                body: [
                  "Most students who miss inference questions are not reading badly. They are reading well and then choosing an answer that the passage merely permits, rather than one it requires. On the SAT, those are different categories, and only one of them earns points.",
                  "An inference is a conclusion that follows necessarily from what is written. If you can imagine a version of the passage where the answer is false and nothing in the text contradicts it, that answer is not supported — however reasonable it sounds.",
                ],
              },
              {
                kind: "steps",
                title: "The two-question test",
                items: [
                  { label: "Can I point at it?", body: "Name the specific sentence that forces this answer. Not the paragraph — the sentence. If you cannot locate one, the answer is a guess wearing a suit." },
                  { label: "Does it go further than the text?", body: "Check every word of the option for scope. Words like always, most, primarily, and only are claims about magnitude, and the text has to support those too." },
                ],
              },
              {
                kind: "example",
                title: "Same sentence, two readings",
                before: "She lost interest in the subject.",
                after: "She produced no finished work after 1974.",
                note: "The passage says only that the researcher stopped publishing after 1974 and that her later notebooks contain no completed drafts. The second reading restates that; the first invents a cause for it. Plausible cause, absent evidence — the single most common wrong answer on this section.",
              },
              {
                kind: "callout",
                tone: "tip",
                title: "Read the options as claims, not as summaries",
                body: "Each option is asserting something. Ask what would have to be true in the passage for that assertion to hold, then check whether it is.",
              },
              { kind: "question", questionId: "q-tide-1" },
              {
                kind: "reflection",
                prompt:
                  "Think of a recent question you missed. Was the answer you chose contradicted by the text, or simply not proven by it? Those two failures need different fixes.",
              },
            ],
            questionIds: ["q-tide-1"],
          },
          {
            id: "l-sat-1-2",
            courseId: "sat-rw",
            title: "Command of evidence",
            kind: "Passage",
            minutes: 18,
            summary: "Matching a claim to the one quotation that actually proves it.",
            objectives: [
              "Break a claim into its component parts before reading the quotations",
              "Reject quotations that support only part of a claim",
              "Handle quantitative evidence with the same method",
            ],
            blocks: [
              {
                kind: "prose",
                heading: "Decompose the claim first",
                body: [
                  "Evidence questions look like reading comprehension and behave like logic. The efficient move is to state, in your own words, exactly what would have to be shown — and to notice when a claim has two parts.",
                  "A claim such as 'Vega values the census for reasons unrelated to sentiment' contains a positive part (there is a reason) and a negative part (it is not sentimental). A quotation that satisfies only one half is a wrong answer, no matter how relevant it feels.",
                ],
              },
              {
                kind: "passage",
                title: "The Tide Pool Census",
                source: "Adapted from a 2019 field study on intertidal biodiversity",
                paragraphs: [
                  "For eleven summers, Marisol Vega counted animals in the same forty tide pools along the northern coast. Colleagues occasionally suggested that automated cameras could do the same job in a fraction of the time.",
                  "The census continues. Vega has since trained four graduate students, each of whom she requires to spend a full season recording data by hand before touching the automated systems the lab now also operates. The requirement is not nostalgia. It is, she argues, the only reliable way to learn what the instruments are not asking.",
                ],
              },
              { kind: "question", questionId: "q-tide-2" },
              {
                kind: "callout",
                tone: "note",
                title: "Quantitative evidence uses the same method",
                body: "When the evidence is a table or graph, the claim still decomposes. Find which variable the claim is about, then check direction before magnitude.",
              },
              { kind: "question", questionId: "q-tr-1" },
            ],
            questionIds: ["q-tide-2", "q-tr-1"],
          },
          {
            id: "l-sat-1-3",
            courseId: "sat-rw",
            title: "Central ideas without the summary trap",
            kind: "Practice",
            minutes: 12,
            summary: "Why true statements make excellent wrong answers.",
            objectives: ["Test candidate answers against every paragraph", "Recognise detail-as-main-idea distractors"],
            blocks: [
              {
                kind: "prose",
                heading: "Coverage, not correctness",
                body: [
                  "Main idea questions are decided by coverage. Two or three options are usually true statements about the passage; only one of them accounts for all of it.",
                  "Run each candidate against the paragraphs in order. The moment a paragraph does not fit under the option, it is out — even though nothing about it is false.",
                ],
              },
              { kind: "question", questionId: "q-rd-1" },
              { kind: "question", questionId: "q-tr-2" },
            ],
            questionIds: ["q-rd-1", "q-tr-2"],
          },
        ],
      },
      {
        id: "m-sat-2",
        title: "Craft & Structure",
        summary: "Words in context, purpose and cross-text connections.",
        lessons: [
          {
            id: "l-sat-2-1",
            courseId: "sat-rw",
            title: "Words in context",
            kind: "Concept",
            minutes: 15,
            summary: "Ignore the dictionary. Read the sentence's structural signals.",
            objectives: ["Predict before reading options", "Use punctuation as a meaning signal", "Separate near-synonyms by connotation"],
            blocks: [
              {
                kind: "prose",
                heading: "Predict, then match",
                body: [
                  "The reliable procedure is to cover the options, read the sentence with a blank, and say aloud a word that fits. Your word does not need to be elegant — it needs to fix the meaning before the options can bias you.",
                  "Then match. The correct option is usually the one closest to your prediction; the trap is usually the one that is a synonym of the correct answer in some other context.",
                ],
              },
              {
                kind: "list",
                title: "Structural signals worth memorising",
                items: [
                  "A semicolon or colon usually means the second half restates or proves the first",
                  "'Neither… nor' and 'not… but' define the blank by exclusion",
                  "A dash often introduces an example that pins down the sense",
                  "'Studiously', 'deliberately', 'ostensibly' tell you the quality was intentional",
                ],
              },
              { kind: "question", questionId: "q-vc-1" },
              { kind: "question", questionId: "q-tide-3" },
            ],
            questionIds: ["q-vc-1", "q-tide-3"],
          },
          {
            id: "l-sat-2-2",
            courseId: "sat-rw",
            title: "Purpose of a sentence or paragraph",
            kind: "Practice",
            minutes: 13,
            summary: "Function questions ask what a part does, not what it says.",
            objectives: ["Describe a paragraph's job in one verb", "Track the grammatical subject to find a shift"],
            blocks: [
              {
                kind: "prose",
                heading: "One verb",
                body: [
                  "Before you look at the options, finish this sentence: 'This paragraph ______s.' Introduces. Complicates. Concedes. Redirects. Illustrates. A function answer that does not match your verb is wrong regardless of its content.",
                  "When a paragraph turns inward or outward, the grammatical subject usually gives it away. Watch what the sentences are about, not only what they claim.",
                ],
              },
              { kind: "question", questionId: "q-lib-1" },
            ],
            questionIds: ["q-lib-1"],
          },
        ],
      },
      {
        id: "m-sat-3",
        title: "Expression of Ideas",
        summary: "Transitions and rhetorical synthesis.",
        lessons: [
          {
            id: "l-sat-3-1",
            courseId: "sat-rw",
            title: "Transitions: name the relationship first",
            kind: "Concept",
            minutes: 11,
            summary: "Decide the logical relationship before you read a single option.",
            objectives: ["Classify sentence pairs into four relationships", "Eliminate by category rather than by feel"],
            blocks: [
              {
                kind: "prose",
                heading: "Four relationships cover almost everything",
                body: [
                  "Addition, contrast, cause or consequence, and example. Read the two sentences, decide which of the four you are looking at, then eliminate every option belonging to the other three. Usually one option survives.",
                  "Students who read options first get pulled by transitions that sound sophisticated. 'Nevertheless' is not more correct for being less common.",
                ],
              },
              {
                kind: "callout",
                tone: "warn",
                title: "The blank is not always a contrast",
                body: "'However' feels academic, which makes it the most over-chosen transition on the test. Only choose it once you have named an actual opposition between the two sentences.",
              },
              { kind: "question", questionId: "q-wr-1" },
            ],
            questionIds: ["q-wr-1"],
          },
          {
            id: "l-sat-3-2",
            courseId: "sat-rw",
            title: "Rhetorical synthesis",
            kind: "Workshop",
            minutes: 16,
            summary: "The stated goal is the entire rubric.",
            objectives: ["Read the goal before the notes", "Reject accurate answers that miss the goal"],
            blocks: [
              {
                kind: "prose",
                heading: "Grade against the goal",
                body: [
                  "Synthesis questions give you bullet-point notes and a sentence naming a rhetorical goal. Every option is factually consistent with the notes; only one accomplishes the goal.",
                  "So read the goal first, underline its key noun — emphasise the scale, introduce the study to an unfamiliar audience, contrast the two findings — and pick the option that does that job.",
                ],
              },
              { kind: "question", questionId: "q-wr-2" },
              {
                kind: "reflection",
                prompt: "When you miss a synthesis question, check whether you chose an option that was more interesting than the goal required. That is the usual failure.",
              },
            ],
            questionIds: ["q-wr-2"],
          },
        ],
      },
      {
        id: "m-sat-4",
        title: "Standard English Conventions",
        summary: "Boundaries, agreement and modifiers.",
        lessons: [
          {
            id: "l-sat-4-1",
            courseId: "sat-rw",
            title: "Sentence boundaries",
            kind: "Concept",
            minutes: 12,
            summary: "Test each side of the punctuation independently.",
            objectives: ["Identify independent clauses on sight", "Apply the four legal joins", "Recognise conjunctive adverbs"],
            blocks: [
              {
                kind: "prose",
                heading: "Four legal joins",
                body: [
                  "Two independent clauses may be joined by a period, a semicolon, a comma plus a coordinating conjunction (for, and, nor, but, or, yet, so), or a colon when the second explains the first. Nothing else is legal, and the test knows it.",
                  "Conjunctive adverbs — however, therefore, moreover, consequently — are not conjunctions. They cannot hold two sentences together with only a comma.",
                ],
              },
              { kind: "question", questionId: "q-gr-1" },
            ],
            questionIds: ["q-gr-1"],
          },
          {
            id: "l-sat-4-2",
            courseId: "sat-rw",
            title: "Agreement across distance",
            kind: "Review",
            minutes: 10,
            summary: "Interrupting phrases never change the subject's number.",
            objectives: ["Find the true subject", "Discount modifying phrases"],
            blocks: [
              {
                kind: "prose",
                heading: "Cover the middle",
                body: [
                  "The test separates subjects from verbs with prepositional phrases and appositives so that a nearby noun can lure you into the wrong number. Cover everything between the commas and read what remains.",
                ],
              },
              { kind: "question", questionId: "q-gr-2" },
            ],
            questionIds: ["q-gr-2"],
          },
        ],
      },
    ],
  },

  {
    id: "ielts-writing",
    title: "IELTS Academic Writing",
    subtitle: "Task 1 description and Task 2 argument",
    description:
      "Build both writing tasks against the public band descriptors. You will learn what each band actually rewards, then write, revise and score your own paragraphs.",
    category: "IELTS",
    skillTags: ["Task Response", "Coherence", "Lexical Range"],
    instructor: "Priya Raghunathan",
    instructorTitle: "Former IELTS examiner",
    hours: 18,
    difficulty: "Core",
    lessonCount: 4,
    mastery: 42,
    progress: 38,
    accent: "sage",
    recommended: true,
    goals: [
      "Answer every part of a two-part Task 2 question",
      "Report trends in Task 1 without listing every number",
      "Use cohesive devices that a reader does not notice",
      "Raise lexical range without thesaurus errors",
    ],
    modules: [
      {
        id: "m-ielts-1",
        title: "Task 2 — the argument essay",
        summary: "Position, development and the parts students forget to answer.",
        lessons: [
          {
            id: "l-ielts-1-1",
            courseId: "ielts-writing",
            title: "Reading the question as a contract",
            kind: "Concept",
            minutes: 14,
            summary: "Most band-6 essays lose marks for answering three-quarters of the question.",
            objectives: ["Split a prompt into its required parts", "Commit to a position in the introduction", "Plan before writing"],
            blocks: [
              {
                kind: "prose",
                heading: "Underline the parts",
                body: [
                  "A prompt such as 'Some people believe X. Others believe Y. Discuss both views and give your own opinion' contains three obligations. An essay that discusses both views brilliantly and never states an opinion is capped, regardless of its language.",
                  "Before writing, list the obligations as a checklist in the margin. Tick them off as you draft. This single habit moves more essays from band 6 to band 7 than any vocabulary work.",
                ],
              },
              {
                kind: "list",
                title: "Common uncounted obligations",
                items: [
                  "'To what extent do you agree?' requires a degree, not just a side",
                  "'Discuss both views' requires genuine treatment of both, not one paragraph of straw man",
                  "'What are the causes and what can be done?' is two essays' worth of obligation in one prompt",
                  "'Give reasons and include relevant examples' means an unsupported paragraph is a scored deficiency",
                ],
              },
              {
                kind: "callout",
                tone: "tip",
                title: "State the position in sentence two",
                body: "Examiners look for a clear position that is maintained. Putting it early makes it easier for you to maintain and easier for them to credit.",
              },
              {
                kind: "reflection",
                prompt: "Take your last essay. Can you point to the sentence stating your position, and does every body paragraph serve it?",
              },
            ],
            questionIds: [],
          },
          {
            id: "l-ielts-1-2",
            courseId: "ielts-writing",
            title: "Paragraph development: P-E-E-L",
            kind: "Workshop",
            minutes: 20,
            summary: "The four moves that turn an assertion into an argument.",
            objectives: ["Write a topic sentence that makes a claim", "Explain before exemplifying", "Link back to the position"],
            blocks: [
              {
                kind: "steps",
                title: "The four moves",
                items: [
                  { label: "Point", body: "One sentence naming the claim. Not the topic — the claim. 'Remote work reduces commuting emissions' is a point; 'Remote work has environmental effects' is a topic." },
                  { label: "Explanation", body: "Two to three sentences on the mechanism. Why does the point follow? This is the paragraph's reasoning, and it is the move most often skipped." },
                  { label: "Evidence", body: "A concrete instance, statistic or scenario. Invented but plausible examples are acceptable on IELTS; vagueness is not." },
                  { label: "Link", body: "One sentence tying the paragraph back to your position, so the reader never has to reconstruct why the paragraph exists." },
                ],
              },
              {
                kind: "example",
                title: "Explanation is the missing move",
                before: "Remote work is good for the environment. For example, many companies in my country now allow it.",
                after: "Remote work reduces transport emissions because it removes the daily commute for a large share of office employees. A company of 500 staff that shifts to three remote days a week eliminates roughly 1,500 car journeys each week, and those journeys are typically single-occupancy.",
                note: "The first version has a point and an example with nothing between them. The second explains the mechanism, then quantifies it. Same length; different band.",
              },
              {
                kind: "callout",
                tone: "note",
                title: "Practise this in the Writing Studio",
                body: "The structure visualiser will flag any paragraph missing explanation or evidence, which makes the gap visible before an examiner sees it.",
              },
            ],
            questionIds: [],
          },
        ],
      },
      {
        id: "m-ielts-2",
        title: "Task 1 — describing data",
        summary: "Selecting, grouping and comparing rather than listing.",
        lessons: [
          {
            id: "l-ielts-2-1",
            courseId: "ielts-writing",
            title: "Select and group",
            kind: "Concept",
            minutes: 13,
            summary: "The band descriptor rewards selection. Listing every figure is a band-5 habit.",
            objectives: ["Write an overview with no numbers", "Group series by behaviour", "Compare rather than enumerate"],
            blocks: [
              {
                kind: "prose",
                heading: "The overview carries the band",
                body: [
                  "Task 1 asks you to 'select and report the main features, and make comparisons where relevant.' The overview paragraph is where selection happens: two or three sentences stating the largest patterns, deliberately without specific figures.",
                  "Then group. If three lines rise and one falls, that is your paragraph structure — not four paragraphs, one per line.",
                ],
              },
              {
                kind: "example",
                title: "Listing versus reporting",
                before: "In 1990 the figure was 12%. In 1995 it was 19%. In 2000 it was 26%. In 2005 it was 31%.",
                after: "The proportion climbed steadily across the whole period, roughly tripling from 12% in 1990 to 31% in 2005, with the sharpest rise in the first decade.",
                note: "The second version reports the shape and anchors it with two endpoints. It uses fewer numbers and earns more credit.",
              },
            ],
            questionIds: [],
          },
          {
            id: "l-ielts-2-2",
            courseId: "ielts-writing",
            title: "Cohesion you do not notice",
            kind: "Review",
            minutes: 12,
            summary: "Overusing linkers is penalised as often as omitting them.",
            objectives: ["Vary reference and substitution", "Avoid mechanical Firstly/Secondly/Finally"],
            blocks: [
              {
                kind: "prose",
                heading: "Cohesion is not a list of connectives",
                body: [
                  "Band descriptors mention cohesive devices used 'appropriately' — and explicitly penalise over-use. An essay that opens every paragraph with Firstly, Secondly, Finally is signalling structure without creating it.",
                  "Stronger cohesion comes from reference (this argument, such measures, the same pattern) and from topic sentences that pick up a word from the previous paragraph's final sentence.",
                ],
              },
              {
                kind: "list",
                title: "Replace these habits",
                items: [
                  "Firstly / Secondly / Finally → a topic sentence naming the claim",
                  "In addition, moreover, furthermore stacked → one, then reference",
                  "In conclusion, in a nutshell → a sentence that actually concludes",
                  "Repeating the key noun every sentence → this shift, such policies, the practice",
                ],
              },
            ],
            questionIds: [],
          },
        ],
      },
    ],
  },

  {
    id: "vocab-academic",
    title: "Academic Vocabulary",
    subtitle: "Precision over volume",
    description:
      "Six hundred words that recur across academic reading, taught in the contexts where they actually appear and reviewed on a spaced schedule.",
    category: "Vocabulary",
    skillTags: ["Words in Context", "Lexical Range"],
    instructor: "Dr. Elena Marsh",
    instructorTitle: "Former test developer, 14 years teaching",
    hours: 22,
    difficulty: "Core",
    lessonCount: 3,
    mastery: 71,
    progress: 74,
    accent: "ochre",
    recommended: true,
    goals: [
      "Distinguish near-synonyms by connotation and register",
      "Recognise words in unfamiliar contexts",
      "Retain vocabulary past the week of learning it",
    ],
    modules: [
      {
        id: "m-vocab-1",
        title: "Words of stance and hedging",
        summary: "How writers signal certainty, doubt and reservation.",
        lessons: [
          {
            id: "l-vocab-1-1",
            courseId: "vocab-academic",
            title: "Certainty and its opposites",
            kind: "Concept",
            minutes: 15,
            summary: "Ambivalent, noncommittal, indifferent, equivocal — four words students treat as one.",
            objectives: ["Separate internal conflict from outward reticence", "Read hedging as evidence of stance"],
            blocks: [
              {
                kind: "prose",
                heading: "Four words, four different situations",
                body: [
                  "Ambivalent means holding two conflicting feelings at once. Indifferent means having no feeling. These are opposites in a way that trips up a great many students, because both can produce the same shrug.",
                  "Noncommittal describes what someone reveals, not what they feel. Equivocal describes language that can be read two ways — often deliberately.",
                ],
              },
              {
                kind: "list",
                title: "Quick discriminations",
                items: [
                  "Ambivalent → two feelings, both present",
                  "Indifferent → no feeling, no stake",
                  "Noncommittal → a feeling withheld from view",
                  "Equivocal → wording open to more than one reading",
                ],
              },
              { kind: "question", questionId: "q-vc-1" },
            ],
            questionIds: ["q-vc-1"],
          },
          {
            id: "l-vocab-1-2",
            courseId: "vocab-academic",
            title: "Verbs of evidence",
            kind: "Practice",
            minutes: 12,
            summary: "Corroborate, substantiate, refute, undermine, qualify.",
            objectives: ["Match evidence verbs to the relationship they encode"],
            blocks: [
              {
                kind: "prose",
                heading: "Direction and strength",
                body: [
                  "Evidence verbs encode two things: direction (supports or opposes) and strength (partial or complete). Corroborate is independent support. Substantiate is providing proof for a claim previously asserted. Qualify is partial retreat, not opposition.",
                ],
              },
              { kind: "question", questionId: "q-vc-2" },
            ],
            questionIds: ["q-vc-2"],
          },
        ],
      },
      {
        id: "m-vocab-2",
        title: "Words in context",
        summary: "Applying vocabulary knowledge to test items.",
        lessons: [
          {
            id: "l-vocab-2-1",
            courseId: "vocab-academic",
            title: "Secondary meanings",
            kind: "Review",
            minutes: 14,
            summary: "The tested sense is often the one you would not list first.",
            objectives: ["Suspend the primary definition", "Use sentence structure to select the sense"],
            blocks: [
              {
                kind: "prose",
                heading: "The familiar word is the trap",
                body: [
                  "Words-in-context items frequently use common words in less common senses: 'legible' for detectable, 'qualify' for limit, 'sustain' for endure. Recognising the word is not the same as knowing which sense is on the page.",
                ],
              },
              { kind: "question", questionId: "q-tide-3" },
            ],
            questionIds: ["q-tide-3"],
          },
        ],
      },
    ],
  },

  {
    id: "grammar",
    title: "Grammar Foundations",
    subtitle: "Structure you can hear",
    description:
      "Sentence structure taught as a set of testable decisions rather than as terminology. Every rule arrives with the error it prevents.",
    category: "Grammar",
    skillTags: ["Boundaries", "Agreement", "Modifiers"],
    instructor: "Tomas Feld",
    instructorTitle: "Department chair, English",
    hours: 12,
    difficulty: "Foundation",
    lessonCount: 3,
    mastery: 72,
    progress: 55,
    accent: "clay",
    goals: ["Punctuate clause boundaries reliably", "Fix agreement across interrupting phrases", "Place modifiers next to what they modify"],
    modules: [
      {
        id: "m-gr-1",
        title: "Clauses and punctuation",
        summary: "Where sentences may legally be joined.",
        lessons: [
          {
            id: "l-gr-1-1",
            courseId: "grammar",
            title: "Independent and dependent",
            kind: "Concept",
            minutes: 12,
            summary: "One test decides most punctuation questions.",
            objectives: ["Identify independent clauses", "Apply the four legal joins"],
            blocks: [
              {
                kind: "prose",
                heading: "Read each side alone",
                body: [
                  "Cover the punctuation and read what is on the left. Could it stand as a sentence? Now the right. Two independent clauses need a full join; an independent and a dependent clause usually take a comma or nothing at all.",
                ],
              },
              { kind: "question", questionId: "q-gr-1" },
            ],
            questionIds: ["q-gr-1"],
          },
          {
            id: "l-gr-1-2",
            courseId: "grammar",
            title: "Agreement and interrupting phrases",
            kind: "Practice",
            minutes: 10,
            summary: "The noun nearest the verb is often not the subject.",
            objectives: ["Locate the head noun", "Ignore prepositional phrases"],
            blocks: [
              {
                kind: "prose",
                heading: "Find the head noun",
                body: [
                  "In 'The collection of letters, along with several manuscripts, is held…', the head noun is collection. Everything after it modifies. Verb number follows the head noun and nothing else.",
                ],
              },
              { kind: "question", questionId: "q-gr-2" },
            ],
            questionIds: ["q-gr-2"],
          },
        ],
      },
    ],
  },

  {
    id: "lit-analysis",
    title: "Literature Analysis",
    subtitle: "Character, structure and the work a sentence does",
    description:
      "Close reading for school literature courses: how narrative perspective, structure and diction produce meaning, and how to write about them precisely.",
    category: "Literature",
    skillTags: ["Characterisation", "Structure", "Close Reading"],
    instructor: "Marguerite Doyle",
    instructorTitle: "IB English, 11 years",
    hours: 16,
    difficulty: "Advanced",
    lessonCount: 2,
    mastery: 58,
    progress: 30,
    accent: "plum",
    goals: ["Read narrative distance and its effects", "Support a claim about character with diction", "Write analytical paragraphs that argue"],
    modules: [
      {
        id: "m-lit-1",
        title: "Character and perspective",
        summary: "Who is telling us, and what does that cost.",
        lessons: [
          {
            id: "l-lit-1-1",
            courseId: "lit-analysis",
            title: "Narrative distance",
            kind: "Passage",
            minutes: 18,
            summary: "How close third-person narration lets a novel judge without saying so.",
            objectives: ["Detect evaluative narration", "Trace a shift in the object of attention"],
            blocks: [
              {
                kind: "prose",
                heading: "The narrator's thumb on the scale",
                body: [
                  "Close third-person narration reports a character's thoughts in the narrator's voice. That overlap creates room for judgement: a phrase like 'with a certain pleasure in her own cleverness' belongs to the narrator, not to the character, and it tells us how to read her.",
                  "When you notice such a phrase, ask what it is preparing. Evaluative narration is rarely idle; it usually sets up a later reversal.",
                ],
              },
              {
                kind: "passage",
                title: "The Reading Room",
                source: "Adapted from a contemporary novel",
                paragraphs: [
                  "She constructed explanations for him the way she constructed explanations for everything: quickly, confidently, and with a certain pleasure in her own cleverness. Each theory lasted about a day, until some detail refused to fit inside it.",
                  "What unsettled her was not the mystery. It was the discovery that she had spent six weeks in the same room as a person and had learned nothing about him except the rhythm of turning paper.",
                ],
              },
              { kind: "question", questionId: "q-lib-2" },
              { kind: "question", questionId: "q-lib-1" },
            ],
            questionIds: ["q-lib-2", "q-lib-1"],
          },
        ],
      },
    ],
  },

  {
    id: "reading-lab",
    title: "Reading Lab",
    subtitle: "Comprehension, inference and evidence",
    description:
      "General-purpose reading practice across science, social science and narrative texts, calibrated for middle and high school readers.",
    category: "Reading",
    skillTags: ["Central Ideas", "Inference", "Evidence"],
    instructor: "Tomas Feld",
    instructorTitle: "Department chair, English",
    hours: 14,
    difficulty: "Foundation",
    lessonCount: 1,
    mastery: 78,
    progress: 46,
    accent: "sage",
    goals: ["Summarise a text in one accurate sentence", "Separate detail from main idea", "Read graphs embedded in prose"],
    modules: [
      {
        id: "m-rl-1",
        title: "Finding the argument",
        summary: "What the text is doing, one paragraph at a time.",
        lessons: [
          {
            id: "l-rl-1-1",
            courseId: "reading-lab",
            title: "Main idea and its impostors",
            kind: "Practice",
            minutes: 12,
            summary: "True, relevant, and still the wrong answer.",
            objectives: ["Test coverage across paragraphs", "Reject overreaching answers"],
            blocks: [
              {
                kind: "prose",
                heading: "Two ways to be wrong",
                body: [
                  "A main-idea distractor is normally too narrow (a real detail promoted to thesis) or too broad (a claim the passage never commits to). Naming which failure you are looking at makes elimination fast.",
                ],
              },
              { kind: "question", questionId: "q-rd-1" },
            ],
            questionIds: ["q-rd-1"],
          },
        ],
      },
    ],
  },

  {
    id: "toefl-speaking",
    title: "TOEFL Speaking",
    subtitle: "Integrated tasks under a clock",
    description:
      "Templates, note-taking systems and delivery practice for the four TOEFL speaking tasks, with an emphasis on the integrated items.",
    category: "TOEFL",
    skillTags: ["Task Response", "Coherence", "Delivery"],
    instructor: "Priya Raghunathan",
    instructorTitle: "Former IELTS examiner",
    hours: 15,
    difficulty: "Core",
    lessonCount: 1,
    mastery: 34,
    progress: 12,
    accent: "blue",
    goals: ["Take notes that survive 45 seconds of preparation", "Cover both source texts in an integrated response"],
    modules: [
      {
        id: "m-toefl-1",
        title: "Independent speaking",
        summary: "Structure for the 45-second response.",
        lessons: [
          {
            id: "l-toefl-1-1",
            courseId: "toefl-speaking",
            title: "The 45-second shape",
            kind: "Concept",
            minutes: 12,
            summary: "Position, two reasons, one concrete instance.",
            objectives: ["Plan in 15 seconds", "Finish inside the clock"],
            blocks: [
              {
                kind: "prose",
                heading: "Fewer ideas, finished",
                body: [
                  "The most common failure in independent speaking is running out of time mid-sentence because the response opened three lines of argument. Two reasons, one of them exemplified, reliably fills 45 seconds and reaches a conclusion.",
                ],
              },
              {
                kind: "steps",
                title: "Fifteen seconds of planning",
                items: [
                  { label: "0–5s", body: "Choose a side. Do not weigh which side is truer; choose the one you can exemplify." },
                  { label: "5–12s", body: "Write two reason stubs, three words each." },
                  { label: "12–15s", body: "Note one concrete instance for the first reason." },
                ],
              },
            ],
            questionIds: [],
          },
        ],
      },
    ],
  },

  {
    id: "essay-structure",
    title: "Essay Structure",
    subtitle: "Argument architecture for school writing",
    description:
      "How an academic essay holds together: thesis, paragraph function, evidence integration and conclusions that do more than restate.",
    category: "Writing",
    skillTags: ["Essay Development", "Coherence"],
    instructor: "Marguerite Doyle",
    instructorTitle: "IB English, 11 years",
    hours: 13,
    difficulty: "Core",
    lessonCount: 1,
    mastery: 53,
    progress: 20,
    accent: "clay",
    goals: ["Write a thesis that could be disagreed with", "Give every paragraph one job", "Integrate quotations grammatically"],
    modules: [
      {
        id: "m-es-1",
        title: "Thesis and paragraph function",
        summary: "An essay is a sequence of jobs.",
        lessons: [
          {
            id: "l-es-1-1",
            courseId: "essay-structure",
            title: "A thesis someone could argue with",
            kind: "Concept",
            minutes: 14,
            summary: "If no reasonable reader could disagree, it is a topic, not a thesis.",
            objectives: ["Convert observations into arguable claims", "Preview structure without listing"],
            blocks: [
              {
                kind: "prose",
                heading: "The disagreement test",
                body: [
                  "Read your thesis and ask whether an intelligent reader could hold the opposite view. 'The novel explores memory' fails: nobody disputes it. 'The novel treats memory as a form of authorship rather than of retrieval' passes, and it tells you what the body paragraphs must prove.",
                ],
              },
              {
                kind: "example",
                title: "Topic to claim",
                before: "This essay will discuss the theme of isolation in the novel.",
                after: "The novel presents isolation not as a condition imposed on its narrator but as one she repeatedly chooses, which is why her final decision reads as continuity rather than as change.",
                note: "The second is longer because it commits. Every added clause is a promise the essay can now be graded against.",
              },
            ],
            questionIds: [],
          },
        ],
      },
    ],
  },

  {
    id: "school-english",
    title: "School English — Grades 7–9",
    subtitle: "Structured support for middle school",
    description:
      "Reading, writing and grammar aligned to middle school coursework, with shorter lessons and more frequent review.",
    category: "School",
    skillTags: ["Reading", "Grammar", "Writing"],
    instructor: "Tomas Feld",
    instructorTitle: "Department chair, English",
    hours: 20,
    difficulty: "Foundation",
    lessonCount: 1,
    mastery: 0,
    progress: 0,
    accent: "ochre",
    goals: ["Build reading stamina", "Write a clear five-sentence paragraph", "Punctuate confidently"],
    modules: [
      {
        id: "m-se-1",
        title: "Paragraph basics",
        summary: "One idea, properly finished.",
        lessons: [
          {
            id: "l-se-1-1",
            courseId: "school-english",
            title: "One idea per paragraph",
            kind: "Concept",
            minutes: 10,
            summary: "How to tell when a paragraph has ended.",
            objectives: ["Write a topic sentence", "Recognise when a new idea has started"],
            blocks: [
              {
                kind: "prose",
                heading: "The one-idea rule",
                body: [
                  "A paragraph handles one idea and finishes it. If you can split your paragraph in two and both halves still make sense, it was holding two ideas and should be split.",
                ],
              },
            ],
            questionIds: [],
          },
        ],
      },
    ],
  },
];

export const courseById = Object.fromEntries(courses.map((c) => [c.id, c]));

export const allLessons = courses.flatMap((c) => c.modules.flatMap((m) => m.lessons));
export const lessonById = Object.fromEntries(allLessons.map((l) => [l.id, l]));

export function courseOfLesson(lessonId: string) {
  return courses.find((c) => c.modules.some((m) => m.lessons.some((l) => l.id === lessonId)));
}

export function lessonNeighbours(courseId: string, lessonId: string) {
  const course = courseById[courseId];
  if (!course) return { prev: null, next: null };
  const flat = course.modules.flatMap((m) => m.lessons);
  const i = flat.findIndex((l) => l.id === lessonId);
  return { prev: i > 0 ? flat[i - 1] : null, next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null };
}
