import { redirect } from "next/navigation";
import { AppShell } from "@/components/navigation/AppShell";
import { ViewerProvider, type Viewer } from "@/lib/viewer";
import { getSessionUser } from "@/lib/auth/session";
import { isDatabaseConfigured } from "@/lib/db";
import { db } from "@/lib/db";
import { student as demoStudent } from "@/lib/data/people";
import type { Role } from "@/lib/types";

/** Depends on the session cookie, so it is rendered per request. */
export const dynamic = "force-dynamic";

const roleFromPrisma: Record<string, Role> = {
  STUDENT: "student", PARENT: "parent", TEACHER: "teacher", ADMIN: "admin",
};

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  let viewer: Viewer;

  if (isDatabaseConfigured()) {
    const user = await getSessionUser();
    if (!user) redirect("/login");

    const org = await db.organization.findUnique({
      where: { id: user.orgId },
      select: { name: true },
    });
    const studentId =
      user.role === "STUDENT" ? user.profileId : null;

    viewer = {
      mode: "live",
      role: roleFromPrisma[user.role],
      name: user.name,
      initials: user.initials,
      email: user.email,
      studentId,
      orgName: org?.name ?? null,
    };
  } else {
    // No database: the original demo experience, with the role switcher.
    viewer = {
      mode: "demo",
      role: "student",
      name: demoStudent.name,
      initials: demoStudent.initials,
      email: "alex.chen@school.example",
      studentId: demoStudent.id,
      orgName: null,
    };
  }

  return (
    <ViewerProvider viewer={viewer}>
      <AppShell>{children}</AppShell>
    </ViewerProvider>
  );
}
