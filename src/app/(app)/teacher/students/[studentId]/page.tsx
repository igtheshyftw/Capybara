import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { teacherStudents } from "@/lib/data/people";
import { StudentProfileView } from "./StudentProfileView";

export function generateStaticParams() {
  return teacherStudents.map((s) => ({ studentId: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ studentId: string }> }): Promise<Metadata> {
  const { studentId } = await params;
  const s = teacherStudents.find((x) => x.id === studentId);
  return s ? { title: s.name } : {};
}

export default async function TeacherStudentPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  const s = teacherStudents.find((x) => x.id === studentId);
  if (!s) notFound();
  return <StudentProfileView student={s} />;
}
