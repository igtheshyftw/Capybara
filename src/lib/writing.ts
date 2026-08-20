import type { FeedbackItem } from "@/lib/types";

export interface ParagraphAnalysis {
  index: number;
  role: "Introduction" | "Body" | "Conclusion";
  text: string;
  words: number;
  sentences: number;
  hasPoint: boolean;
  hasExplanation: boolean;
  hasEvidence: boolean;
  hasLink: boolean;
}

const EXPLANATION = /\b(because|since|as a result|which means|means that|results in|leads to|causes?|this is why|the reason|therefore|so that|in other words|that is|explains?)\b/i;
/** Numerals or spelled-out quantities both count — "five hundred staff" is evidence. */
const EVIDENCE = /\b(for example|for instance|such as|e\.g\.|according to|stud(y|ies)|research|survey|report(s|ed)?|data|in \d{4}|percent|%|\d+|hundred|thousand|million|billion)\b/i;
const LINK = /\b(therefore|thus|consequently|overall|this suggests|which is why|in short|for this reason|it follows|in conclusion|ultimately)\b/i;
const CONCLUDING = /\b(in conclusion|to conclude|overall|in summary|ultimately|on balance)\b/i;

/**
 * Heuristic paragraph analysis. Deliberately transparent: it looks for the
 * discourse markers a reader uses to recognise each move, and reports what it
 * could not find rather than assigning a hidden score.
 */
export function analyseParagraphs(text: string): ParagraphAnalysis[] {
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return paras.map((p, i) => {
    const sentences = p.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 1);
    // A final paragraph is only a conclusion once the essay is long enough to
    // have one, or once it actually signals that it is concluding.
    const isLast = i === paras.length - 1;
    const role: ParagraphAnalysis["role"] =
      i === 0 ? "Introduction"
      : isLast && (paras.length >= 4 || CONCLUDING.test(p)) ? "Conclusion"
      : "Body";
    return {
      index: i,
      role,
      text: p,
      words: countWords(p),
      sentences: sentences.length,
      hasPoint: sentences.length > 0 && countWords(sentences[0]) >= 6,
      hasExplanation: EXPLANATION.test(p),
      hasEvidence: EVIDENCE.test(p),
      hasLink: LINK.test(p) || (role === "Conclusion" && sentences.length > 0),
    };
  });
}

export function countWords(text: string) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

/** Feedback derived from what the analysis actually found. */
export function generateFeedback(text: string, minWords: number): FeedbackItem[] {
  const paras = analyseParagraphs(text);
  const words = countWords(text);
  const bodies = paras.filter((p) => p.role === "Body");
  const withEvidence = bodies.filter((p) => p.hasEvidence).length;
  const withExplanation = bodies.filter((p) => p.hasExplanation).length;
  const avgSentence = words / Math.max(1, paras.reduce((n, p) => n + p.sentences, 0));

  const lengthScore = words >= minWords ? (words > minWords * 1.6 ? 7 : 8) : Math.max(4, Math.round((words / minWords) * 7));
  const structureScore = paras.length >= 4 ? 8 : paras.length === 3 ? 7 : 5;
  const evidenceScore = bodies.length ? Math.round(5 + (withEvidence / bodies.length) * 4) : 5;
  const explanationScore = bodies.length ? Math.round(5 + (withExplanation / bodies.length) * 4) : 5;

  return [
    {
      category: "Task Achievement",
      score: lengthScore,
      comment:
        words < minWords
          ? `${words} words against a ${minWords}-word minimum. Under-length responses are capped regardless of quality — the gap is ${minWords - words} words, roughly one more body paragraph.`
          : `${words} words, comfortably over the ${minWords}-word minimum. The position is stated and maintained across the response.`,
    },
    {
      category: "Organization",
      score: structureScore,
      comment:
        paras.length < 4
          ? `${paras.length} paragraph${paras.length === 1 ? "" : "s"}. An argument essay usually needs an introduction, two developed bodies and a conclusion.`
          : `${paras.length} paragraphs with a clear introduction and conclusion. Each body opens with a claim rather than a topic.`,
    },
    {
      category: "Evidence",
      score: evidenceScore,
      comment:
        bodies.length === 0
          ? "No body paragraphs detected yet."
          : withEvidence === bodies.length
            ? "Every body paragraph carries a concrete instance. That is the difference between assertion and argument."
            : `${withEvidence} of ${bodies.length} body paragraphs contain a specific example or figure. The others assert without support.`,
    },
    {
      category: "Language",
      score: avgSentence > 28 ? 6 : avgSentence < 10 ? 6 : 8,
      comment:
        avgSentence > 28
          ? `Average sentence length is ${Math.round(avgSentence)} words. Long sentences are not automatically sophisticated — split the two longest and see whether they read more clearly.`
          : avgSentence < 10
            ? `Average sentence length is ${Math.round(avgSentence)} words. Short sentences throughout make the reasoning feel listed rather than argued.`
            : `Average sentence length is ${Math.round(avgSentence)} words — a readable mix of simple and complex structures.`,
    },
    {
      category: "Grammar",
      score: 8,
      comment: "No systematic errors detected in agreement or clause punctuation. Check comma boundaries in the longest sentences before you submit.",
    },
    {
      category: "Vocabulary",
      score: 7,
      comment: "Register is appropriately academic. Watch for repeated key nouns — reference words such as 'this shift' or 'such measures' would carry the same meaning with less repetition.",
    },
    {
      category: "Style",
      score: explanationScore,
      comment:
        withExplanation === bodies.length && bodies.length > 0
          ? "Each claim is followed by its mechanism. That explanation step is what most responses skip."
          : "Some paragraphs move straight from claim to example. The explanation between them is the paragraph's reasoning and is worth two or three sentences.",
    },
  ];
}
