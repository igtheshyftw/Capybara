import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { vocabularySets, setById } from "@/lib/data/vocabulary";
import { WordSetView } from "./WordSetView";

export function generateStaticParams() {
  return vocabularySets.map((s) => ({ setId: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ setId: string }> }): Promise<Metadata> {
  const { setId } = await params;
  const set = setById[setId];
  return set ? { title: set.title, description: set.description } : {};
}

export default async function WordSetPage({ params }: { params: Promise<{ setId: string }> }) {
  const { setId } = await params;
  const set = setById[setId];
  if (!set) notFound();
  return <WordSetView set={set} />;
}
