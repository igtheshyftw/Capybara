import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { writingPrompts } from "@/lib/data/people";
import { WritingEditor } from "./WritingEditor";

export function generateStaticParams() {
  return writingPrompts.map((p) => ({ promptId: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ promptId: string }> }): Promise<Metadata> {
  const { promptId } = await params;
  const prompt = writingPrompts.find((p) => p.id === promptId);
  return prompt ? { title: prompt.title, description: prompt.brief } : {};
}

export default async function WritingPromptPage({ params }: { params: Promise<{ promptId: string }> }) {
  const { promptId } = await params;
  const prompt = writingPrompts.find((p) => p.id === promptId);
  if (!prompt) notFound();
  return <WritingEditor prompt={prompt} />;
}
