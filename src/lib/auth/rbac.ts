import "server-only";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { db, isDatabaseConfigured } from "@/lib/db";
import { getSessionUser, type SessionUser } from "./session";

/** Where each role lands after signing in. */
export const homeForRole: Record<Role, string> = {
  STUDENT: "/dashboard",
  PARENT: "/parent",
  TEACHER: "/teacher",
  ADMIN: "/admin",
};

export class AccessError extends Error {
  constructor(message = "You do not have access to that.") {
    super(message);
    this.name = "AccessError";
  }
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  return user;
}

/**
 * Section guard for layouts.
 *
 * With no database the app is the unauthenticated demo, where the role switcher
 * is the point and there is nothing to protect. With one, this is a hard gate.
 */
export async function guardSection(...roles: Role[]): Promise<SessionUser | null> {
  if (!isDatabaseConfigured()) return null;
  return requireRole(...roles);
}

export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  // Admins administer accounts; they do not get a free pass into other roles'
  // screens, so this stays an explicit membership test.
  if (!roles.includes(user.role)) redirect(homeForRole[user.role]);
  return user;
}

/**
 * The single gate on student data.
 *
 * A student may read their own record. A parent may read a child they are
 * linked to. A teacher or admin may read any student in their organisation.
 * Everything that surfaces student data goes through here.
 */
export async function assertCanViewStudent(user: SessionUser, studentProfileId: string): Promise<void> {
  const student = await db.studentProfile.findUnique({
    where: { id: studentProfileId },
    select: { id: true, user: { select: { orgId: true } } },
  });
  if (!student) throw new AccessError("That student does not exist.");
  if (student.user.orgId !== user.orgId) throw new AccessError();

  switch (user.role) {
    case "STUDENT":
      if (user.profileId !== studentProfileId) throw new AccessError();
      return;
    case "PARENT": {
      if (!user.profileId) throw new AccessError();
      const link = await db.parentLink.findUnique({
        where: { parentId_studentId: { parentId: user.profileId, studentId: studentProfileId } },
        select: { id: true },
      });
      if (!link) throw new AccessError();
      return;
    }
    case "TEACHER":
    case "ADMIN":
      return;
    default:
      throw new AccessError();
  }
}

/** Students the signed-in user is allowed to see, already scoped. */
export async function visibleStudentIds(user: SessionUser): Promise<string[]> {
  switch (user.role) {
    case "STUDENT":
      return user.profileId ? [user.profileId] : [];
    case "PARENT": {
      if (!user.profileId) return [];
      const links = await db.parentLink.findMany({
        where: { parentId: user.profileId },
        select: { studentId: true },
      });
      return links.map((l) => l.studentId);
    }
    case "TEACHER":
    case "ADMIN": {
      const rows = await db.studentProfile.findMany({
        where: { user: { orgId: user.orgId } },
        select: { id: true },
      });
      return rows.map((r) => r.id);
    }
    default:
      return [];
  }
}
