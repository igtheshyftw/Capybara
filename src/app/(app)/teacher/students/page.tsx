import type { Metadata } from "next";
import { getSessionUser } from "@/lib/auth/session";
import { isDatabaseConfigured, db } from "@/lib/db";
import { getVisibleStudentSummaries, toRosterRow } from "@/lib/queries/students";
import { teacherStudents, classes as demoClasses } from "@/lib/data/people";
import { StudentsView } from "./StudentsView";

export const metadata: Metadata = { title: "Students" };
export const dynamic = "force-dynamic";

export default async function TeacherStudentsPage() {
  // Live deployments show the organisation's real roster; the demo keeps its
  // sample class so the screen is never empty with nothing to look at.
  if (!isDatabaseConfigured()) {
    return <StudentsView rows={teacherStudents} classes={demoClasses.map((c) => ({ id: c.id, name: c.name }))} />;
  }

  const user = await getSessionUser();
  if (!user) return null;

  const [summaries, classRows] = await Promise.all([
    getVisibleStudentSummaries(user),
    db.class.findMany({
      where: { orgId: user.orgId, archived: false },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  return <StudentsView rows={summaries.map(toRosterRow)} classes={classRows} />;
}
