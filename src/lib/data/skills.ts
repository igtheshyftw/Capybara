import type { Skill, SkillId } from "@/lib/types";

export const skills: Skill[] = [
  { id: "inference", name: "Inference", domain: "Reading", description: "Draw conclusions the text supports but does not state outright." },
  { id: "evidence", name: "Command of Evidence", domain: "Reading", description: "Select the line or data point that actually proves a claim." },
  { id: "vocab-in-context", name: "Words in Context", domain: "Vocabulary", description: "Choose the word whose precise sense fits the sentence." },
  { id: "main-idea", name: "Central Ideas", domain: "Reading", description: "Identify what a text is fundamentally arguing." },
  { id: "transitions", name: "Transitions", domain: "Writing", description: "Signal the true logical relationship between two sentences." },
  { id: "rhetorical-synthesis", name: "Rhetorical Synthesis", domain: "Writing", description: "Combine notes to accomplish a stated rhetorical goal." },
  { id: "boundaries", name: "Sentence Boundaries", domain: "Grammar", description: "Punctuate independent and dependent clauses correctly." },
  { id: "form-structure-sense", name: "Form & Agreement", domain: "Grammar", description: "Match verbs, pronouns and modifiers to what they refer to." },
  { id: "essay-development", name: "Essay Development", domain: "Writing", description: "Extend a claim with explanation, evidence and consequence." },
  { id: "task-response", name: "Task Response", domain: "Writing", description: "Answer every part of the question that was actually asked." },
  { id: "coherence", name: "Coherence & Cohesion", domain: "Writing", description: "Order ideas so a reader never has to re-read." },
  { id: "lexical-range", name: "Lexical Range", domain: "Vocabulary", description: "Vary word choice with precision rather than with thesaurus swaps." },
];

export const skillById = Object.fromEntries(skills.map((s) => [s.id, s])) as Record<SkillId, Skill>;
