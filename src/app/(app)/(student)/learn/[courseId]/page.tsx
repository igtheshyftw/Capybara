import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, courseById } from "@/lib/data/courses";
import { CourseDetail } from "./CourseDetail";

export function generateStaticParams() {
  return courses.map((c) => ({ courseId: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }): Promise<Metadata> {
  const { courseId } = await params;
  const course = courseById[courseId];
  return course ? { title: course.title, description: course.description } : {};
}

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = courseById[courseId];
  if (!course) notFound();
  return <CourseDetail course={course} />;
}
