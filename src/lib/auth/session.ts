import "server-only";
import { cookies, headers } from "next/headers";
import { cache } from "react";
import type { Role } from "@prisma/client";
import { db, isDatabaseConfigured } from "@/lib/db";
import { createToken, hashToken } from "./tokens";
import { SESSION_COOKIE } from "./constants";

export { SESSION_COOKIE };

const DAY = 24 * 60 * 60 * 1000;
const SESSION_TTL = 30 * DAY;
/** Sessions past this age get a fresh expiry, so active users are not logged out. */
const REFRESH_AFTER = 15 * DAY;

export interface SessionUser {
  id: string;
  orgId: string;
  email: string;
  name: string;
  role: Role;
  /** Profile row id for the user's role, when one exists. */
  profileId: string | null;
  initials: string;
}

/** Titles are not initials — "Dr. Elena Marsh" is EM, not DE. */
const TITLES = new Set(["dr", "dr.", "mr", "mr.", "mrs", "mrs.", "ms", "ms.", "mx", "mx.", "prof", "prof.", "miss"]);

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/).filter((p) => !TITLES.has(p.toLowerCase()));
  const use = parts.length ? parts : name.trim().split(/\s+/);
  if (use.length === 1) return use[0].slice(0, 2).toUpperCase();
  return [use[0], use[use.length - 1]].map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

async function clientMeta() {
  const h = await headers();
  return {
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: h.get("user-agent")?.slice(0, 300) ?? null,
  };
}

export async function createSession(userId: string) {
  const { token, tokenHash } = createToken();
  const { ip, userAgent } = await clientMeta();

  await db.session.create({
    data: { tokenHash, userId, expiresAt: new Date(Date.now() + SESSION_TTL), ip, userAgent },
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL / 1000,
  });
}

/**
 * Resolve the signed-in user, or null.
 *
 * Wrapped in React's `cache` so several server components on one page share a
 * single query rather than each hitting the database.
 */
export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  if (!isDatabaseConfigured()) return null;

  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { tokenHash: hashToken(token) },
    include: {
      user: {
        include: { studentProfile: true, teacherProfile: true, parentProfile: true },
      },
    },
  });

  if (!session) return null;

  if (session.expiresAt.getTime() < Date.now()) {
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }

  // A suspended account keeps its rows but loses access immediately.
  if (session.user.status !== "ACTIVE") return null;

  if (session.expiresAt.getTime() - Date.now() < SESSION_TTL - REFRESH_AFTER) {
    await db.session
      .update({
        where: { id: session.id },
        data: { expiresAt: new Date(Date.now() + SESSION_TTL), lastSeenAt: new Date() },
      })
      .catch(() => {});
  }

  const { user } = session;
  return {
    id: user.id,
    orgId: user.orgId,
    email: user.email,
    name: user.name,
    role: user.role,
    profileId:
      user.studentProfile?.id ?? user.teacherProfile?.id ?? user.parentProfile?.id ?? null,
    initials: initialsFor(user.name),
  };
});

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token && isDatabaseConfigured()) {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } }).catch(() => {});
  }
  jar.delete(SESSION_COOKIE);
}

/** Sign every device out — used after a password change. */
export async function destroyAllSessions(userId: string) {
  await db.session.deleteMany({ where: { userId } });
}
