import type { Question } from "@/lib/types";

export const questions: Question[] = [
  /* ---------- Tide pool passage ---------- */
  {
    id: "q-tide-1",
    passageId: "p-tide",
    courseId: "sat-rw",
    skill: "inference",
    difficulty: "Core",
    source: "SAT Reading & Writing — Information & Ideas",
    prompt:
      "Which choice best states the main reason Vega believes hand-collected records remain valuable?",
    choices: [
      { id: "A", text: "Automated cameras frequently misidentify intertidal species.", rationale: "The passage explicitly concedes the opposite: Vega 'did not doubt that a camera could identify a limpet.' This answer contradicts the text." },
      { id: "B", text: "Sustained personal observation makes small, unanticipated changes noticeable.", rationale: "Correct. Vega noticed a shift she 'had not set out to collect' because she had spent enough hours in the pools for the deviation to register." },
      { id: "C", text: "Graduate students learn field techniques faster without automated systems.", rationale: "The training requirement appears in the passage, but it is presented as a consequence of her view, not the reason for it. Plausible, but not what the question asks." },
      { id: "D", text: "Long records are more likely to be accepted for publication.", rationale: "Publication is mentioned only to describe what she credited the finding to. The passage never claims long records are easier to publish." },
    ],
    correct: "B",
    why: "The second and third paragraphs draw a distinction between collecting information and having a baseline. Vega's argument is that duration of attention — not volume of data — is what makes a small deviation legible.",
    evidence:
      "That shift was not a data point she had set out to collect; it was a pattern she recognised only because she had spent enough hours in the same pools to feel when something had changed.",
  },
  {
    id: "q-tide-2",
    passageId: "p-tide",
    courseId: "sat-rw",
    skill: "evidence",
    difficulty: "Core",
    source: "SAT Reading & Writing — Command of Evidence",
    prompt:
      "A student claims that Vega values the hand census for reasons unrelated to sentiment. Which quotation most directly supports that claim?",
    choices: [
      { id: "A", text: "\"She arrived before dawn, knelt on wet rock, and recorded every anemone…\"", rationale: "This describes the labour involved. Vivid, but it establishes effort rather than justification." },
      { id: "B", text: "\"Colleagues occasionally suggested that automated cameras could do the same job…\"", rationale: "This states the opposing position. It sets up the argument but does not support it." },
      { id: "C", text: "\"The requirement is not nostalgia. It is… the only reliable way to learn what the instruments are not asking.\"", rationale: "Correct. The sentence explicitly rejects sentiment and supplies a functional reason in its place." },
      { id: "D", text: "\"The census continues.\"", rationale: "A transitional statement of fact. It carries no reasoning at all." },
    ],
    correct: "C",
    why: "The claim has two parts: that the value is real and that it is not sentimental. Only choice C addresses both, and it does so in the passage's own words — 'not nostalgia' answers the sentiment half directly.",
    evidence: "The requirement is not nostalgia. It is, she argues, the only reliable way to learn what the instruments are not asking.",
  },
  {
    id: "q-tide-3",
    passageId: "p-tide",
    courseId: "sat-rw",
    skill: "vocab-in-context",
    difficulty: "Advanced",
    source: "SAT Reading & Writing — Craft & Structure",
    prompt:
      "As used in the third paragraph, \"legible\" most nearly means",
    choices: [
      { id: "A", text: "handwritten", rationale: "The literal sense of legible relates to handwriting, and the passage does mention a notebook — which is exactly why this distractor is tempting. Context overrides the literal sense here." },
      { id: "B", text: "detectable", rationale: "Correct. Deviations become possible to perceive against a baseline; the word is used metaphorically for interpretation, not penmanship." },
      { id: "C", text: "permissible", rationale: "Nothing in the passage concerns permission or authorisation." },
      { id: "D", text: "significant", rationale: "Close, but the sentence is about whether the deviations can be noticed at all, not about how important they are once noticed." },
    ],
    correct: "B",
    why: "Substitute each option into the sentence. The baseline does not make deviations handwritten or permitted; it makes them possible to see. 'Detectable' preserves that meaning; 'significant' quietly changes the claim from perceptibility to importance.",
    evidence: "What the record provided, she wrote, was not more information but a baseline against which small deviations became legible.",
  },

  /* ---------- Reading room passage ---------- */
  {
    id: "q-lib-1",
    passageId: "p-library",
    courseId: "lit-analysis",
    skill: "inference",
    difficulty: "Advanced",
    source: "Literature — Characterisation",
    prompt: "The third paragraph primarily serves to",
    choices: [
      { id: "A", text: "reveal the man's true occupation to the reader", rationale: "His occupation is never revealed; the final paragraph deliberately withholds it." },
      { id: "B", text: "shift Nadia's attention from the man to her own habits of interpretation", rationale: "Correct. The paragraph turns inward: what unsettles her is 'not the mystery' but what she has learned about how she reads." },
      { id: "C", text: "explain why the reading room is an unusual setting", rationale: "The setting is established earlier and is not the paragraph's concern." },
      { id: "D", text: "criticise the novels Nadia has been assigned", rationale: "The assigned novels appear only as a comparison for her reading habits. They are the vehicle, not the target." },
    ],
    correct: "B",
    why: "Track the grammatical subject across the paragraph: it moves from 'What unsettled her' to 'she had spent' to 'She had… been reading him.' The object of scrutiny becomes Nadia herself.",
    evidence: "She had, she realised, been reading him the way she read her assigned novels: skimming for a thesis, impatient with anything that did not confirm it.",
  },
  {
    id: "q-lib-2",
    passageId: "p-library",
    courseId: "lit-analysis",
    skill: "main-idea",
    difficulty: "Core",
    source: "Literature — Central Ideas",
    prompt: "Which choice best describes the function of the theories Nadia constructs in the second paragraph?",
    choices: [
      { id: "A", text: "They demonstrate the accuracy of her powers of observation.", rationale: "Every theory collapses. The paragraph is built to show the opposite." },
      { id: "B", text: "They illustrate a tendency that the narrative later treats as a flaw.", rationale: "Correct. Her quickness is described with 'a certain pleasure in her own cleverness,' and paragraph three names the cost of it." },
      { id: "C", text: "They provide the reader with background about the man's history.", rationale: "They are her inventions, not information. Nothing they contain is confirmed." },
      { id: "D", text: "They explain why she avoids speaking to strangers.", rationale: "Her reluctance to speak is not attributed to the theories anywhere in the text." },
    ],
    correct: "B",
    why: "The narrator's phrasing is quietly evaluative — 'quickly, confidently, and with a certain pleasure in her own cleverness.' That set-up pays off in the next paragraph, where the same quickness is reframed as skimming.",
    evidence: "She constructed explanations for him the way she constructed explanations for everything: quickly, confidently, and with a certain pleasure in her own cleverness.",
  },

  /* ---------- Transit passage ---------- */
  {
    id: "q-tr-1",
    passageId: "p-transit",
    courseId: "sat-rw",
    skill: "evidence",
    difficulty: "Core",
    source: "SAT Reading & Writing — Quantitative Evidence",
    prompt:
      "Which finding, if accurate, would most strengthen the argument that countdown displays are a cost-effective intervention?",
    choices: [
      { id: "A", text: "Riders at stops with displays overestimated their waits by 68 percent.", rationale: "This reverses the study's result. The displays reduced overestimation; they did not cause it." },
      { id: "B", text: "Installing displays across a route costs a small fraction of adding a vehicle while producing comparable gains in perceived wait.", rationale: "Correct. Cost-effectiveness is a ratio, so the strongest support pairs the low cost with a comparable benefit." },
      { id: "C", text: "Riders consistently prefer trains to buses on routes of equal length.", rationale: "Mode preference is not the subject of the argument and does nothing for the cost claim." },
      { id: "D", text: "Most transit agencies have increased their budgets over the last decade.", rationale: "Larger budgets would, if anything, weaken the appeal of the cheaper option." },
    ],
    correct: "B",
    why: "The paragraph already establishes that displays are 'dramatically cheaper.' To strengthen a cost-effectiveness claim you must supply the missing half of the ratio: that the benefit holds up.",
    evidence: "Adding a bus to a route reduces average wait time, but so does installing a sign that displays accurate arrival predictions — and the sign is dramatically cheaper.",
  },
  {
    id: "q-tr-2",
    passageId: "p-transit",
    courseId: "sat-rw",
    skill: "inference",
    difficulty: "Advanced",
    source: "SAT Reading & Writing — Information & Ideas",
    prompt:
      "Based on the final paragraph, the disagreement between the two positions is best characterised as one about",
    choices: [
      { id: "A", text: "whether perceived wait times differ from actual wait times", rationale: "The passage states plainly that 'both positions accept the underlying finding.' This is the shared premise, not the dispute." },
      { id: "B", text: "which obligation an agency has to the people it serves", rationale: "Correct. The closing sentence frames the dispute as 'what an agency owes its riders.'" },
      { id: "C", text: "how countdown displays should be technically implemented", rationale: "Implementation is never discussed; the debate is about priorities." },
      { id: "D", text: "whether the 2016 study used a sufficiently large sample", rationale: "No one in the passage questions the study's methods." },
    ],
    correct: "B",
    why: "When a passage says outright that both sides accept a finding, the disagreement must lie elsewhere. The final sentence supplies it explicitly, and it is a question of obligation rather than of fact.",
    evidence: "What they dispute is what an agency owes its riders: the shortest possible trip, or the most honest possible account of the trip they are about to take.",
  },

  /* ---------- Grammar & writing (standalone) ---------- */
  {
    id: "q-gr-1",
    courseId: "grammar",
    skill: "boundaries",
    difficulty: "Core",
    source: "Grammar Workshop — Sentence Boundaries",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe archive had been catalogued twice ______ neither catalogue survived the flood of 1953.",
    choices: [
      { id: "A", text: ", however", rationale: "'However' is a conjunctive adverb, not a conjunction. A comma before it cannot join two independent clauses — this is a comma splice." },
      { id: "B", text: "; however,", rationale: "Correct. A semicolon joins the two independent clauses, and the conjunctive adverb takes a following comma." },
      { id: "C", text: " however", rationale: "With no punctuation at all the two independent clauses run together." },
      { id: "D", text: ", however;", rationale: "The punctuation is inverted: the semicolon lands inside the second clause rather than at the boundary." },
    ],
    correct: "B",
    why: "Test each side of the blank independently. 'The archive had been catalogued twice' and 'neither catalogue survived the flood of 1953' are both complete sentences, so the boundary needs a semicolon, a period, or a comma plus a coordinating conjunction. 'However' is none of those.",
  },
  {
    id: "q-gr-2",
    courseId: "grammar",
    skill: "form-structure-sense",
    difficulty: "Foundation",
    source: "Grammar Workshop — Agreement",
    prompt:
      "Which choice completes the text so that it conforms to the conventions of Standard English?\n\nThe collection of letters, along with several unpublished manuscripts, ______ held in a temperature-controlled vault.",
    choices: [
      { id: "A", text: "are", rationale: "Plural. It agrees with the nearby 'manuscripts', which is exactly the trap — that noun sits inside a modifying phrase." },
      { id: "B", text: "were", rationale: "Also plural, with the same error, plus a tense shift the sentence does not call for." },
      { id: "C", text: "is", rationale: "Correct. The subject is 'The collection', which is singular. 'Along with several unpublished manuscripts' is a modifier, not part of the subject." },
      { id: "D", text: "have been", rationale: "Plural again. Cover the phrase between the commas and the error becomes audible." },
    ],
    correct: "C",
    why: "Phrases introduced by 'along with', 'as well as', and 'in addition to' never change the number of the subject. Cross out everything between the commas and read the sentence again: 'The collection … is held.'",
  },
  {
    id: "q-wr-1",
    courseId: "sat-rw",
    skill: "transitions",
    difficulty: "Core",
    source: "SAT Reading & Writing — Expression of Ideas",
    prompt:
      "Which transition best fits?\n\nEarly telescopes distorted colour badly at the edges of the lens. ______ Newton abandoned lenses entirely and built an instrument that gathered light with a curved mirror.",
    choices: [
      { id: "A", text: "For example,", rationale: "Newton's mirror is not an instance of colour distortion; it is a response to it." },
      { id: "B", text: "In response,", rationale: "Correct. The second sentence describes an action taken because of the problem in the first." },
      { id: "C", text: "Similarly,", rationale: "Signals that two things are alike. A problem and its solution are not parallel." },
      { id: "D", text: "Nevertheless,", rationale: "Signals contrast. Newton's action follows from the problem rather than defying it." },
    ],
    correct: "B",
    why: "Name the relationship before you read the options. Sentence one states a defect; sentence two states what someone did about it. That is cause and response — so any transition signalling example, similarity, or contrast is wrong before you compare them.",
  },
  {
    id: "q-wr-2",
    courseId: "sat-rw",
    skill: "rhetorical-synthesis",
    difficulty: "Advanced",
    source: "SAT Reading & Writing — Rhetorical Synthesis",
    prompt:
      "The student wants to emphasise the scale of the restoration project. Which choice best accomplishes this goal?\n\nNotes: The mural covers 340 square metres. • Restoration took nine years. • Twelve conservators worked on it. • The pigments were analysed at three laboratories.",
    choices: [
      { id: "A", text: "The pigments in the mural were analysed at three separate laboratories.", rationale: "Accurate, but it emphasises analytical rigour rather than scale." },
      { id: "B", text: "Restoring the 340-square-metre mural occupied twelve conservators for nine years.", rationale: "Correct. It stacks the three magnitude facts — area, people, duration — into one sentence." },
      { id: "C", text: "The mural was restored by a team of conservators over several years.", rationale: "True but vague. Removing the numbers removes the very thing the goal asks you to emphasise." },
      { id: "D", text: "Conservators restored the mural after analysing its pigments carefully.", rationale: "Describes sequence, not scale, and drops every quantity." },
    ],
    correct: "B",
    why: "Synthesis questions are graded against the stated goal, not against interest or accuracy. 'Scale' means magnitude, so the winning choice is the one carrying the most quantitative weight without misreporting the notes.",
  },
  {
    id: "q-vc-1",
    courseId: "vocab-academic",
    skill: "vocab-in-context",
    difficulty: "Core",
    source: "Academic Vocabulary — Precision",
    prompt:
      "Which word most logically completes the text?\n\nThe committee's report neither endorsed nor rejected the proposal; its tone throughout was studiously ______.",
    choices: [
      { id: "A", text: "hostile", rationale: "Hostility would be a clear position. The sentence describes the refusal to take one." },
      { id: "B", text: "noncommittal", rationale: "Correct. 'Neither endorsed nor rejected' is the definition of noncommittal, and 'studiously' signals it was deliberate." },
      { id: "C", text: "ambivalent", rationale: "Very close — but ambivalence is having conflicting feelings, while the report withholds a position. The distinction is internal conflict versus outward reticence." },
      { id: "D", text: "meticulous", rationale: "Describes care in execution, not stance. It would fit 'studiously' but not the neither/nor structure." },
    ],
    correct: "B",
    why: "The semicolon means the second half restates the first. 'Neither endorsed nor rejected' must be re-expressed by the missing word, so the answer has to name the absence of a position — not an attitude toward the proposal.",
  },
  {
    id: "q-vc-2",
    courseId: "vocab-academic",
    skill: "vocab-in-context",
    difficulty: "Advanced",
    source: "Academic Vocabulary — Precision",
    prompt:
      "Which word most logically completes the text?\n\nThe second excavation ______ the dating proposed by the first: two independent methods returned the same range.",
    choices: [
      { id: "A", text: "corroborated", rationale: "Correct. Independent confirmation by a second source is precisely corroboration." },
      { id: "B", text: "supplanted", rationale: "Means replaced. The colon shows agreement, not displacement." },
      { id: "C", text: "anticipated", rationale: "Reverses the order — the second excavation follows the first." },
      { id: "D", text: "complicated", rationale: "Suggests trouble. 'The same range' indicates the opposite." },
    ],
    correct: "A",
    why: "The colon introduces the proof. 'Two independent methods returned the same range' describes independent agreement, and corroborate is the verb reserved for exactly that relationship.",
  },
  {
    id: "q-rd-1",
    passageId: "p-transit",
    courseId: "reading-lab",
    skill: "main-idea",
    difficulty: "Foundation",
    source: "Reading Lab — Central Ideas",
    prompt: "Which choice best states the main idea of the text?",
    choices: [
      { id: "A", text: "Transit agencies should stop measuring total trip time.", rationale: "Too extreme. The passage complicates the measure without proposing that it be abandoned." },
      { id: "B", text: "How riders perceive time affects which transit improvements are worth making.", rationale: "Correct. This covers the finding, its budget implication, and the debate that follows." },
      { id: "C", text: "Countdown displays are the cheapest available transit upgrade.", rationale: "A supporting detail from one paragraph, presented as if it were the whole argument." },
      { id: "D", text: "Riders in mid-sized systems wait longer than riders elsewhere.", rationale: "The passage never compares systems by size." },
    ],
    correct: "B",
    why: "A main-idea answer must fit every paragraph. Choices C and D are true statements about single sentences — the classic detail-as-main-idea trap.",
    evidence: "Yet a growing body of research suggests that riders do not experience all minutes equally.",
  },
];

export const questionById = Object.fromEntries(questions.map((q) => [q.id, q]));
