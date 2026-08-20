export type TutorMode = "explain" | "hint" | "quiz" | "simplify" | "example" | "why-wrong" | "improve" | "challenge";

export interface TutorTurn {
  id: string;
  role: "student" | "tutor";
  text: string;
  /** Tutors escalate: hint → guided question → explanation → answer. */
  stage?: "hint" | "guided" | "explanation" | "answer";
  followUps?: string[];
}

export const modes: { id: TutorMode; label: string; description: string }[] = [
  { id: "explain", label: "Explain", description: "Walk me through the idea" },
  { id: "hint", label: "Give me a hint", description: "Nudge, don't solve" },
  { id: "quiz", label: "Quiz me", description: "Ask, then check my reasoning" },
  { id: "simplify", label: "Simplify this", description: "Same idea, plainer words" },
  { id: "example", label: "Show another example", description: "A second case to compare" },
  { id: "why-wrong", label: "Why is my answer wrong?", description: "Diagnose the reasoning" },
  { id: "improve", label: "Help me improve my paragraph", description: "Structure and support" },
  { id: "challenge", label: "Challenge me", description: "Harder version of this" },
];

/**
 * A scripted tutor. It escalates through hint → guided reasoning → explanation
 * → answer, and refuses to open with the answer while the student is practising.
 */
export function tutorReply(input: string, stage: TutorTurn["stage"] = "hint"): TutorTurn {
  const q = input.toLowerCase();
  const id = `t${Date.now()}`;

  if (q.includes("inference")) {
    const byStage: Record<string, TutorTurn> = {
      hint: {
        id, role: "tutor", stage: "hint",
        text: "Before we look at the options: can you point to a single sentence in the passage that would have to be true for your answer to hold? If you cannot find one, that is usually where the problem is rather than in the reading.",
        followUps: ["I can't find a sentence", "Walk me through it", "Show me an example"],
      },
      guided: {
        id, role: "tutor", stage: "guided",
        text: "Then let's narrow it. Inference options fail in two ways: they contradict the text, or the text simply does not commit to them. Take your option and ask which of those two it is. Which one does it feel like?",
        followUps: ["The text doesn't commit to it", "Explain the difference", "Give me the answer"],
      },
      explanation: {
        id, role: "tutor", stage: "explanation",
        text: "That second failure is the expensive one, because the answer still sounds reasonable. The SAT distinguishes what a passage permits from what it requires. An option you cannot rule out is not thereby supported — support means a sentence forces it. Scope words matter here too: 'most', 'primarily' and 'always' are claims about magnitude, and the text has to back those as well.",
        followUps: ["Show me an example", "Quiz me on this", "Got it"],
      },
      answer: {
        id, role: "tutor", stage: "answer",
        text: "Concretely: if the passage says a researcher stopped publishing after 1974, then 'she produced no finished work after 1974' is supported — the text states it. 'She lost interest in the subject' is not, because the passage records the silence but never its cause. Same evidence, two very different claims.",
        followUps: ["Quiz me on this", "Another example", "Back to practice"],
      },
    };
    return byStage[stage ?? "hint"];
  }

  if (q.includes("paragraph") || q.includes("essay") || q.includes("improve") || q.includes("writing")) {
    return {
      id, role: "tutor", stage: stage ?? "hint",
      text:
        stage === "explanation" || stage === "answer"
          ? "Here is the shape that usually fixes it. Point: one sentence naming the claim, not the topic. Explanation: two or three sentences on the mechanism — why does the claim follow? Evidence: one concrete instance or figure. Link: tie it back to your position. When a paragraph feels thin, the missing move is almost always explanation: students jump from claim straight to example, and the reasoning never gets written down."
          : "Read your paragraph and mark where the claim is, where the reasoning is, and where the evidence is. Most paragraphs that feel weak turn out to have a claim and an example with nothing in between. Which of the three is missing in yours?",
      followUps: ["Explanation is missing", "Show me the full structure", "Open the Writing Studio"],
    };
  }

  if (q.includes("vocab") || q.includes("word") || q.includes("ambivalent") || q.includes("corroborate")) {
    return {
      id, role: "tutor", stage: stage ?? "hint",
      text:
        stage === "explanation" || stage === "answer"
          ? "Ambivalent means holding two conflicting feelings at once; indifferent means having none. They produce the same shrug, which is exactly why the test pairs them. Noncommittal is different again — it describes what someone reveals rather than what they feel. Equivocal describes wording that can be read two ways."
          : "Try this first: cover the options, read the sentence with a blank, and say a word that fits. Your word does not have to be elegant — it just has to fix the meaning before the options can pull you. What word did you land on?",
      followUps: ["I said 'uncertain'", "Explain the differences", "Quiz me on these"],
    };
  }

  if (q.includes("transition")) {
    return {
      id, role: "tutor", stage: stage ?? "hint",
      text:
        stage === "explanation" || stage === "answer"
          ? "Four relationships cover nearly every transition item: addition, contrast, cause or consequence, and example. Name which one you are looking at before you read a single option, then eliminate everything belonging to the other three. 'However' is the most over-chosen transition on the test because it sounds academic — only take it once you can state the actual opposition."
          : "Cover the options. In your own words, what is the relationship between the two sentences — are they adding, contrasting, causing, or exemplifying? Say it out loud before you look.",
      followUps: ["It's cause and effect", "Explain the four types", "Quiz me"],
    };
  }

  if (q.includes("quiz")) {
    return {
      id, role: "tutor", stage: "guided",
      text: "Here is one. A passage states: 'The archive was catalogued twice; neither catalogue survived the flood.' Which is supported — (a) the archive's contents are now unknown, or (b) no catalogue of the archive currently exists? Say which, and more importantly, why.",
      followUps: ["(b), because the text says both were lost", "(a)", "I'm not sure"],
    };
  }

  return {
    id, role: "tutor", stage: stage ?? "hint",
    text:
      "Tell me what you have tried so far and I will start from there. If you are mid-practice I will give you a hint first rather than the answer — you can ask for the full explanation at any point, but the hint is usually enough.",
    followUps: ["Help with inference questions", "Improve my paragraph", "Quiz me on vocabulary"],
  };
}

export const nextStage: Record<NonNullable<TutorTurn["stage"]>, NonNullable<TutorTurn["stage"]>> = {
  hint: "guided", guided: "explanation", explanation: "answer", answer: "answer",
};
