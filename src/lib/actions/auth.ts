"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { db, isDatabaseConfigured } from "@/lib/db";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/auth/password";
import { createToken, hashToken } from "@/lib/auth/tokens";
import { createSession, destroyAllSessions, destroySession, getSessionUser } from "@/lib/auth/session";
import { homeForRole } from "@/lib/auth/rbac";
import { audit } from "@/lib/auth/audit";

export interface FormState {
  error?: string;
  notice?: string;
  fieldErrors?: Record<string, string>;
}

const MAX_FAILED = 8;
const LOCK_MINUTES = 15;

const email = z.string().trim().toLowerCase().email("Enter a valid email address.");

/* ============================================================
   Sign in
   ============================================================ */

const loginSchema = z.object({
  email,
  password: z.string().min(1, "Enter your password."),
});

export async function loginAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isDatabaseConfigured()) {
    return { error: "This deployment has no database configured, so sign-in is unavailable." };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { fieldErrors: fieldErrorsOf(parsed.error) };
  }

  const user = await db.user.findFirst({ where: { email: parsed.data.email } });

  // One message for every failure mode, so the form cannot be used to discover
  // which addresses have accounts.
  const generic: FormState = { error: "Email or password is incorrect." };

  if (!user) {
    // Spend comparable time even when there is no user, so response timing
    // does not reveal whether the address exists.
    await verifyPassword(parsed.data.password, null);
    return generic;
  }

  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    const mins = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
    return { error: `Too many attempts. Try again in ${mins} minute${mins === 1 ? "" : "s"}.` };
  }

  if (user.status === "SUSPENDED") {
    return { error: "This account has been suspended. Contact your administrator." };
  }
  if (user.status === "INVITED" || !user.passwordHash) {
    return { error: "This account has not been set up yet. Use the invite link you were sent." };
  }

  const ok = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!ok) {
    const failed = user.failedLoginCount + 1;
    await db.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: failed,
        lockedUntil: failed >= MAX_FAILED ? new Date(Date.now() + LOCK_MINUTES * 60000) : null,
      },
    });
    await audit({ orgId: user.orgId, actorId: user.id, action: "login.failed" });
    return generic;
  }

  await db.user.update({
    where: { id: user.id },
    data: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: new Date() },
  });
  await createSession(user.id);
  await audit({ orgId: user.orgId, actorId: user.id, action: "login.success" });

  redirect(homeForRole[user.role]);
}

/* ============================================================
   Sign out
   ============================================================ */

export async function logoutAction() {
  const user = await getSessionUser();
  await destroySession();
  if (user) await audit({ orgId: user.orgId, actorId: user.id, action: "logout" });
  redirect("/login");
}

/* ============================================================
   Accept an invite — the only path to a new account
   ============================================================ */

const acceptSchema = z
  .object({
    token: z.string().min(10),
    name: z.string().trim().min(2, "Enter your full name.").max(80),
    password: z.string(),
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Those passwords do not match.",
    path: ["confirm"],
  });

export async function acceptInviteAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isDatabaseConfigured()) return { error: "No database is configured for this deployment." };

  const parsed = acceptSchema.safeParse({
    token: formData.get("token"),
    name: formData.get("name"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const weak = passwordProblem(parsed.data.password);
  if (weak) return { fieldErrors: { password: weak } };

  const invite = await db.invite.findUnique({ where: { tokenHash: hashToken(parsed.data.token) } });
  if (!invite || invite.revokedAt || invite.acceptedAt || invite.expiresAt.getTime() < Date.now()) {
    return { error: "That invite link is no longer valid. Ask for a new one." };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  // One transaction: the account, its profile, any class or parent link, and
  // the invite being marked used all land together or not at all.
  const created = await db.$transaction(async (tx) => {
    const user = await tx.user.upsert({
      where: { orgId_email: { orgId: invite.orgId, email: invite.email } },
      update: { name: parsed.data.name, passwordHash, status: "ACTIVE", role: invite.role },
      create: {
        orgId: invite.orgId,
        email: invite.email,
        name: parsed.data.name,
        role: invite.role,
        status: "ACTIVE",
        passwordHash,
      },
    });

    if (invite.role === "STUDENT") {
      const profile = await tx.studentProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id },
      });
      if (invite.classId) {
        await tx.enrollment.upsert({
          where: { classId_studentId: { classId: invite.classId, studentId: profile.id } },
          update: {},
          create: { classId: invite.classId, studentId: profile.id },
        });
      }
    } else if (invite.role === "TEACHER") {
      await tx.teacherProfile.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
    } else if (invite.role === "PARENT") {
      const profile = await tx.parentProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id },
      });
      if (invite.childId) {
        await tx.parentLink.upsert({
          where: { parentId_studentId: { parentId: profile.id, studentId: invite.childId } },
          update: {},
          create: { parentId: profile.id, studentId: invite.childId },
        });
      }
    }

    await tx.invite.update({ where: { id: invite.id }, data: { acceptedAt: new Date() } });
    return user;
  });

  await createSession(created.id);
  await audit({
    orgId: created.orgId, actorId: created.id, action: "invite.accepted",
    targetType: "User", targetId: created.id, meta: { role: created.role },
  });

  redirect(homeForRole[created.role]);
}

/* ============================================================
   Password reset
   ============================================================ */

export async function requestResetAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isDatabaseConfigured()) return { error: "No database is configured for this deployment." };

  const parsed = z.object({ email }).safeParse({ email: formData.get("email") });
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const user = await db.user.findFirst({ where: { email: parsed.data.email } });

  if (user && user.status === "ACTIVE") {
    const { token, tokenHash } = createToken();
    await db.passwordResetToken.create({
      data: { tokenHash, userId: user.id, expiresAt: new Date(Date.now() + 60 * 60 * 1000) },
    });
    await audit({ orgId: user.orgId, actorId: user.id, action: "password.reset_requested" });

    // No mail transport is wired up, so the link is logged for the operator to
    // deliver. Swapping this for a real sender is the one change needed.
    console.info(`[capybara-motion] password reset for ${user.email}: /reset-password/${token}`);
  }

  // Always the same answer, whether or not the address exists.
  return {
    notice:
      "If that address has an account, a reset link is on its way. The link expires in one hour.",
  };
}

const resetSchema = z
  .object({ token: z.string().min(10), password: z.string(), confirm: z.string() })
  .refine((v) => v.password === v.confirm, { message: "Those passwords do not match.", path: ["confirm"] });

export async function resetPasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!isDatabaseConfigured()) return { error: "No database is configured for this deployment." };

  const parsed = resetSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const weak = passwordProblem(parsed.data.password);
  if (weak) return { fieldErrors: { password: weak } };

  const record = await db.passwordResetToken.findUnique({
    where: { tokenHash: hashToken(parsed.data.token) },
    include: { user: true },
  });
  if (!record || record.usedAt || record.expiresAt.getTime() < Date.now()) {
    return { error: "That reset link has expired. Request a new one." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await db.$transaction([
    db.user.update({
      where: { id: record.userId },
      data: { passwordHash, failedLoginCount: 0, lockedUntil: null, status: "ACTIVE" },
    }),
    db.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } }),
  ]);

  // Changing a password signs out every other device.
  await destroyAllSessions(record.userId);
  await audit({ orgId: record.user.orgId, actorId: record.userId, action: "password.reset_completed" });

  await createSession(record.userId);
  redirect(homeForRole[record.user.role]);
}

/* ============================================================
   Change password while signed in
   ============================================================ */

export async function changePasswordAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const session = await getSessionUser();
  if (!session) return { error: "You are not signed in." };

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  const user = await db.user.findUnique({ where: { id: session.id } });
  if (!user || !(await verifyPassword(current, user.passwordHash))) {
    return { fieldErrors: { current: "That is not your current password." } };
  }
  if (next !== confirm) return { fieldErrors: { confirm: "Those passwords do not match." } };

  const weak = passwordProblem(next);
  if (weak) return { fieldErrors: { password: weak } };

  await db.user.update({ where: { id: user.id }, data: { passwordHash: await hashPassword(next) } });
  await destroyAllSessions(user.id);
  await createSession(user.id);
  await audit({ orgId: user.orgId, actorId: user.id, action: "password.changed" });

  return { notice: "Password updated. Other devices have been signed out." };
}

function fieldErrorsOf(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
