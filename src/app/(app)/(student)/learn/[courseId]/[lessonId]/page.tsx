import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, courseById, lessonById, lessonNeighbours } from "@/lib/data/courses";
import { LessonView } from "./LessonView";

export function generateStaticParams() {
  return courses.flatMap((c) => c.modules.flatMap((m) => m.lessons.map((l) => ({ courseId: c.id, lessonId: l.id }))));
}

export async function generateMetadata({ params }: { params: Promise<{ lessonId: string }> }): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = lessonById[lessonId];
  return lesson ? { title: lesson.title, description: lesson.summary } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ courseId: string; lessonId: string }> }) {
  const { courseId, lessonId } = await params;
  const course = courseById[courseId];
  const lesson = lessonById[lessonId];
  if (!course || !lesson || lesson.courseId !== courseId) notFound();
  const { prev, next } = lessonNeighbours(courseId, lessonId);
  return <LessonView course={course} lesson={lesson} prev={prev} next={next} />;
}
