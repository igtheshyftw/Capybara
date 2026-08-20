import "server-only";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

/** Append-only account trail. Never allowed to break the action it records. */
export async function audit(entry: {
  orgId: string;
  actorId?: string | null;
  action: string;
  targetType?: string;
  targetId?: string;
  meta?: Prisma.InputJsonValue;
}) {
  try {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    await db.auditLog.create({ data: { ...entry, ip } });
  } catch {
    // Auditing is best-effort; losing a log line must not fail a sign-in.
  }
}
