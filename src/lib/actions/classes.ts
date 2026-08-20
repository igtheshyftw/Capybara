"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth/session";
import { audit } from "@/lib/auth/audit";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  period: z.string().trim().max(60).optional(),
  teacherId: z.string().optional(),
});

export async function createClassAction(formData: FormData) {
  const actor = await getSessionUser();
  if (!actor || !["ADMIN", "TEACHER"].includes(actor.role)) return;

  const parsed = schema.safeParse({
    name: formData.get("name"),
    period: formData.get("period") || undefined,
    teacherId: formData.get("teacherId") || undefined,
  });
  if (!parsed.success) return;

  // A teacher creating a class owns it unless an admin says otherwise.
  let teacherId = parsed.data.teacherId || null;
  if (teacherId) {
    const owner = await db.teacherProfile.findFirst({
      where: { id: teacherId, user: { orgId: actor.orgId } },
      select: { id: true },
    });
    if (!owner) teacherId = null;
  } else if (actor.role === "TEACHER") {
    teacherId = actor.profileId;
  }

  const created = await db.class.create({
    data: {
      orgId: actor.orgId,
      name: parsed.data.name,
      period: parsed.data.period ?? null,
      teacherId,
    },
  });

  await audit({
    orgId: actor.orgId, actorId: actor.id, action: "class.created",
    targetType: "Class", targetId: created.id, meta: { name: created.name },
  });
  revalidatePath("/admin/classes");
}
