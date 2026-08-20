import type { Metadata } from "next";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, Tag } from "@/components/ui/Card";
import { EmptyState } from "@/components/learning/EmptyState";
import { requireRole } from "@/lib/auth/rbac";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Activity log" };
export const dynamic = "force-dynamic";

/** Actions worth colouring, so a failed sign-in stands out from a routine one. */
const tone = (action: string) =>
  action.includes("failed") || action.includes("suspended")
    ? "wrong"
    : action.includes("invite")
      ? "ochre"
      : action.includes("password")
        ? "plum"
        : "neutral";

export default async function ActivityPage() {
  const admin = await requireRole("ADMIN");

  const entries = await db.auditLog.findMany({
    where: { orgId: admin.orgId },
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { actor: { select: { name: true, email: true, role: true } } },
  });

  return (
    <PageBody>
      <PageHeader
        eyebrow="Activity log"
        title="Who did what"
        serif
        description="Sign-ins, invites and account changes, newest first. Append-only — entries are never edited or deleted from here."
      />

      {entries.length === 0 ? (
        <div className="mt-7">
          <EmptyState
            level={2}
            variant="detective"
            title="Nothing recorded yet."
            body="The log fills as people sign in and accounts are created. It keeps the last 200 events on this page."
          />
        </div>
      ) : (
        <Card padded={false} className="mt-7 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-[13.5px]">
              <thead>
                <tr className="border-b border-line bg-surface-2/50 text-left">
                  <th className="px-4 py-2.5 font-semibold text-ink">When</th>
                  <th className="px-4 py-2.5 font-semibold text-ink">Action</th>
                  <th className="px-4 py-2.5 font-semibold text-ink">Who</th>
                  <th className="px-4 py-2.5 font-semibold text-ink">Detail</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-b-0">
                    <td className="px-4 py-3 text-ink-2">
                      {e.createdAt.toLocaleString(undefined, {
                        day: "numeric", month: "short", hour: "2-digit", minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3"><Tag tone={tone(e.action)}>{e.action}</Tag></td>
                    <td className="px-4 py-3">
                      {e.actor ? (
                        <>
                          <p className="text-ink">{e.actor.name}</p>
                          <p className="text-[12px] text-ink-3">{e.actor.email}</p>
                        </>
                      ) : (
                        <span className="text-ink-3">System</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[12.5px] text-ink-3">
                      {e.meta ? JSON.stringify(e.meta) : e.targetType ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </PageBody>
  );
}
