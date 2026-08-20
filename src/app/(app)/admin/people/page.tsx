import type { Metadata } from "next";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/learning/EmptyState";
import { requireRole } from "@/lib/auth/rbac";
import { db } from "@/lib/db";
import { revokeInviteAction, setUserStatusAction } from "@/lib/actions/admin";
import { InviteForm } from "./InviteForm";

export const metadata: Metadata = { title: "People" };
export const dynamic = "force-dynamic";

const roleTone = { STUDENT: "blue", TEACHER: "sage", PARENT: "plum", ADMIN: "clay" } as const;
const statusTone = { ACTIVE: "correct", INVITED: "ochre", SUSPENDED: "wrong" } as const;

export default async function PeoplePage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const admin = await requireRole("ADMIN", "TEACHER");
  const { role: roleFilter } = await searchParams;

  const [people, invites, classes, students] = await Promise.all([
    db.user.findMany({
      where: {
        orgId: admin.orgId,
        ...(roleFilter && ["STUDENT", "TEACHER", "PARENT", "ADMIN"].includes(roleFilter)
          ? { role: roleFilter as "STUDENT" }
          : {}),
      },
      orderBy: [{ status: "asc" }, { name: "asc" }],
      select: {
        id: true, name: true, email: true, role: true, status: true,
        lastLoginAt: true, createdAt: true,
      },
    }),
    db.invite.findMany({
      where: { orgId: admin.orgId, acceptedAt: null, revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
      select: { id: true, email: true, name: true, role: true, expiresAt: true },
    }),
    db.class.findMany({
      where: { orgId: admin.orgId, archived: false },
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    }),
    db.studentProfile.findMany({
      where: { user: { orgId: admin.orgId, status: "ACTIVE" } },
      select: { id: true, user: { select: { name: true } } },
      orderBy: { user: { name: "asc" } },
    }),
  ]);

  const isAdmin = admin.role === "ADMIN";

  return (
    <PageBody>
      <PageHeader
        eyebrow="People"
        title="Accounts"
        serif
        description="Everyone with access to this organisation. Accounts are created by invitation only — there is no public sign-up."
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-3.5">
          <Card padded={false} className="overflow-hidden">
            <div className="p-5 pb-0">
              <CardHeader
                eyebrow="Roster" title={`${people.length} account${people.length === 1 ? "" : "s"}`}
                description={roleFilter ? `Filtered to ${roleFilter.toLowerCase()}s.` : undefined}
              />
            </div>
            {people.length === 0 ? (
              <div className="p-5">
                <EmptyState
                  variant="professor"
                  title="Nobody here yet."
                  body="Send an invite and the person will appear in this list straight away, marked as invited until they set a password."
                />
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[620px] border-collapse text-[13.5px]">
                  <thead>
                    <tr className="border-y border-line bg-surface-2/50 text-left">
                      <th className="px-4 py-2.5 font-semibold text-ink">Name</th>
                      <th className="px-4 py-2.5 font-semibold text-ink">Role</th>
                      <th className="px-4 py-2.5 font-semibold text-ink">Status</th>
                      <th className="px-4 py-2.5 font-semibold text-ink">Last sign-in</th>
                      {isAdmin && <th className="px-4 py-2.5 text-right font-semibold text-ink">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {people.map((p) => (
                      <tr key={p.id} className="border-b border-line last:border-b-0">
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink">{p.name}</p>
                          <p className="text-[12px] text-ink-3">{p.email}</p>
                        </td>
                        <td className="px-4 py-3"><Tag tone={roleTone[p.role]}>{p.role.toLowerCase()}</Tag></td>
                        <td className="px-4 py-3"><Tag tone={statusTone[p.status]}>{p.status.toLowerCase()}</Tag></td>
                        <td className="px-4 py-3 text-ink-2">
                          {p.lastLoginAt
                            ? p.lastLoginAt.toLocaleDateString(undefined, { day: "numeric", month: "short" })
                            : "—"}
                        </td>
                        {isAdmin && (
                          <td className="px-4 py-3 text-right">
                            {p.id === admin.id ? (
                              <span className="text-[12px] text-ink-3">You</span>
                            ) : (
                              <form action={setUserStatusAction} className="inline">
                                <input type="hidden" name="userId" value={p.id} />
                                <input type="hidden" name="suspend" value={String(p.status !== "SUSPENDED")} />
                                <Button
                                  type="submit" size="sm"
                                  variant={p.status === "SUSPENDED" ? "secondary" : "danger"}
                                >
                                  {p.status === "SUSPENDED" ? "Reactivate" : "Suspend"}
                                </Button>
                              </form>
                            )}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {invites.length > 0 && (
            <Card>
              <CardHeader
                eyebrow="Outstanding" title={`${invites.length} unaccepted invite${invites.length === 1 ? "" : "s"}`}
                description="Revoking an invite makes its link stop working immediately."
              />
              <ul className="mt-4 divide-y divide-line">
                {invites.map((i) => (
                  <li key={i.id} className="flex items-center gap-3 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-medium text-ink">{i.name}</span>
                      <span className="block truncate text-[12px] text-ink-3">
                        {i.email} · expires {i.expiresAt.toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                      </span>
                    </span>
                    <Tag tone={roleTone[i.role]}>{i.role.toLowerCase()}</Tag>
                    <form action={revokeInviteAction}>
                      <input type="hidden" name="inviteId" value={i.id} />
                      <Button type="submit" size="sm" variant="tertiary">Revoke</Button>
                    </form>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="lg:sticky lg:top-[76px] lg:self-start">
          <InviteForm
            canInviteStaff={isAdmin}
            classes={classes}
            students={students.map((s) => ({ id: s.id, name: s.user.name }))}
          />
        </div>
      </div>
    </PageBody>
  );
}
