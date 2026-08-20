import type { Metadata } from "next";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/auth/Field";
import { EmptyState } from "@/components/learning/EmptyState";
import { requireRole } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { createClassAction } from "@/lib/actions/classes";

export const metadata: Metadata = { title: "Classes" };
export const dynamic = "force-dynamic";

export default async function ClassesPage() {
  const admin = await requireRole("ADMIN", "TEACHER");

  const [classes, teachers] = await Promise.all([
    db.class.findMany({
      where: { orgId: admin.orgId, archived: false },
      orderBy: { name: "asc" },
      include: {
        teacher: { include: { user: { select: { name: true } } } },
        _count: { select: { enrollments: true } },
      },
    }),
    db.teacherProfile.findMany({
      where: { user: { orgId: admin.orgId, status: "ACTIVE" } },
      include: { user: { select: { name: true } } },
    }),
  ]);

  return (
    <PageBody>
      <PageHeader
        eyebrow="Classes"
        title="Groups of students"
        serif
        description="A class gives assignments and analytics a scope. Students can belong to more than one."
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1fr_340px]">
        <div>
          {classes.length === 0 ? (
            <EmptyState
              level={2}
              variant="professor"
              title="No classes yet."
              body="Create one on the right, then invite students straight into it."
            />
          ) : (
            <ul className="space-y-2.5">
              {classes.map((c) => (
                <Card key={c.id} as="li">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-[15.5px] font-semibold tracking-[-0.01em] text-ink">{c.name}</h2>
                      <p className="mt-1 text-[12.5px] text-ink-3">
                        {c.period ?? "No schedule set"} · {c.teacher?.user.name ?? "No teacher assigned"}
                      </p>
                    </div>
                    <Tag>{c._count.enrollments} student{c._count.enrollments === 1 ? "" : "s"}</Tag>
                  </div>
                </Card>
              ))}
            </ul>
          )}
        </div>

        <Card className="lg:sticky lg:top-[76px] lg:self-start">
          <CardHeader eyebrow="New" title="Create a class" />
          <form action={createClassAction} className="mt-5 space-y-4">
            <Field label="Class name" name="name" required hint="For example, SAT Intensive — Section A" />
            <Field label="When it meets" name="period" hint="Optional. For example, Mon/Wed 4:00 pm" />
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-ink">Teacher</span>
              <select
                name="teacherId"
                className="h-11 w-full appearance-none rounded-[10px] border border-line-strong bg-surface px-3 text-[14px] outline-none focus:border-ink"
              >
                <option value="">Assign later</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>{t.user.name}</option>
                ))}
              </select>
            </label>
            <Button type="submit" full icon="plus">Create class</Button>
          </form>
        </Card>
      </div>
    </PageBody>
  );
}
