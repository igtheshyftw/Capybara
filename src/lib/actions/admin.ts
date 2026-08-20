"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Role } from "@prisma/client";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth/tokens";
import { getSessionUser, destroyAllSessions } from "@/lib/auth/session";
import { audit } from "@/lib/auth/audit";
import type { FormState } from "./auth";

const INVITE_TTL_DAYS = 14;

/** Who may invite whom. A teacher can bring in students and their parents, nothing more. */
const CAN_INVITE: Record<Role, Role[]> = {
  ADMIN: ["ADMIN", "TEACHER", "PARENT", "STUDENT"],
  TEACHER: ["STUDENT", "PARENT"],
  PARENT: [],
  STUDENT: [],
};

const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  name: z.string().trim().min(2, "Enter their full name.").max(80),
  role: z.enum(["ADMIN", "TEACHER", "PARENT", "STUDENT"]),
  classId: z.string().optional(),
  childId: z.string().optional(),
});

export async function createInviteAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const actor = await getSessionUser();
  if (!actor) return { error: "You are not signed in." };

  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    name: formData.get("name"),
    role: formData.get("role"),
    classId: formData.get("classId") || undefined,
    childId: formData.get("childId") || undefined,
  });
  if (!parsed.success) {
    const out: Record<string, string> = {};
    for (const i of parsed.error.issues) out[String(i.path[0] ?? "form")] ||= i.message;
    return { fieldErrors: out };
  }

  const { email, name, role, classId, childId } = parsed.data;

  if (!CAN_INVITE[actor.role].includes(role)) {
    return { error: `Your account cannot invite ${role.toLowerCase()} accounts.` };
  }

  const existing = await db.user.findUnique({
    where: { orgId_email: { orgId: actor.orgId, email } },
    select: { status: true },
  });
  if (existing && existing.status === "ACTIVE") {
    return { fieldErrors: { email: "Somebody with that address already has an account." } };
  }

  // A class or child referenced by the invite must belong to this organisation.
  if (classId) {
    const cls = await db.class.findFirst({ where: { id: classId, orgId: actor.orgId }, select: { id: true } });
    if (!cls) return { error: "That class does not exist." };
  }
  if (childId) {
    const child = await db.studentProfile.findFirst({
      where: { id: childId, user: { orgId: actor.orgId } },
      select: { id: true },
    });
    if (!child) return { error: "That student does not exist." };
  }

  const { token, tokenHash } = createToken();

  // Supersede any outstanding invite for the same address rather than leaving
  // two live links for one person.
  await db.invite.updateMany({
    where: { orgId: actor.orgId, email, acceptedAt: null, revokedAt: null },
    data: { revokedAt: new Date() },
  });

  const invite = await db.invite.create({
    data: {
      orgId: actor.orgId,
      email,
      name,
      role,
      tokenHash,
      classId: classId ?? null,
      childId: childId ?? null,
      createdById: actor.id,
      expiresAt: new Date(Date.now() + INVITE_TTL_DAYS * 24 * 60 * 60 * 1000),
    },
  });

  // Placeholder account so the person shows in the roster as "invited".
  await db.user.upsert({
    where: { orgId_email: { orgId: actor.orgId, email } },
    update: { name, role },
    create: { orgId: actor.orgId, email, name, role, status: "INVITED" },
  });

  await audit({
    orgId: actor.orgId, actorId: actor.id, action: "invite.created",
    targetType: "Invite", targetId: invite.id, meta: { email, role },
  });

  revalidatePath("/admin/people");
  const base = process.env.APP_URL ?? "";
  return {
    notice: `Invite ready for ${name}. Send them this link — it expires in ${INVITE_TTL_DAYS} days:\n${base}/invite/${token}`,
  };
}

export async function revokeInviteAction(formData: FormData) {
  const actor = await getSessionUser();
  if (!actor || !["ADMIN", "TEACHER"].includes(actor.role)) return;

  const id = String(formData.get("inviteId") ?? "");
  const invite = await db.invite.findFirst({ where: { id, orgId: actor.orgId } });
  if (!invite || invite.acceptedAt) return;

  await db.invite.update({ where: { id }, data: { revokedAt: new Date() } });
  await db.user.deleteMany({
    where: { orgId: actor.orgId, email: invite.email, status: "INVITED" },
  });
  await audit({
    orgId: actor.orgId, actorId: actor.id, action: "invite.revoked",
    targetType: "Invite", targetId: id,
  });
  revalidatePath("/admin/people");
}

export async function setUserStatusAction(formData: FormData) {
  const actor = await getSessionUser();
  if (!actor || actor.role !== "ADMIN") return;

  const userId = String(formData.get("userId") ?? "");
  const suspend = formData.get("suspend") === "true";

  // An admin cannot lock themselves out of their own organisation.
  if (userId === actor.id) return;

  const target = await db.user.findFirst({ where: { id: userId, orgId: actor.orgId } });
  if (!target) return;

  if (suspend && target.role === "ADMIN") {
    const admins = await db.user.count({
      where: { orgId: actor.orgId, role: "ADMIN", status: "ACTIVE" },
    });
    if (admins <= 1) return; // never suspend the last active admin
  }

  await db.user.update({
    where: { id: userId },
    data: { status: suspend ? "SUSPENDED" : "ACTIVE" },
  });
  if (suspend) await destroyAllSessions(userId);

  await audit({
    orgId: actor.orgId, actorId: actor.id,
    action: suspend ? "user.suspended" : "user.reactivated",
    targetType: "User", targetId: userId,
  });
  revalidatePath("/admin/people");
}
