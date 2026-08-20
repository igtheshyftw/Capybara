import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { questions } from "@/lib/data/questions";
import { skills, skillById } from "@/lib/data/skills";
import { PracticeRunner } from "./PracticeRunner";
import type { SkillId } from "@/lib/types";

export function generateStaticParams() {
  return [{ setId: "all" }, ...skills.map((s) => ({ setId: s.id }))];
}

export async function generateMetadata({ params }: { params: Promise<{ setId: string }> }): Promise<Metadata> {
  const { setId } = await params;
  const title = setId === "all" ? "Mixed practice" : skillById[setId as SkillId]?.name;
  return title ? { title: `${title} practice` } : {};
}

export default async function PracticeSetPage({ params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params;
  const skill = setId === "all" ? null : skillById[setId as SkillId];
  if (setId !== "all" && !skill) notFound();

  const pool = setId === "all" ? questions : questions.filter((q) => q.skill === setId);

  return (
    <PracticeRunner
      setId={setId}
      title={skill ? skill.name : "Mixed practice"}
      description={skill ? skill.description : "Every question in the bank, across all twelve skills."}
      questions={pool}
    />
  );
}
