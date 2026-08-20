import type { Metadata } from "next";
import Link from "next/link";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { requireRole } from "@/lib/auth/rbac";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireRole("ADMIN");

  const [org, counts, pendingInvites, recent] = await Promise.all([
    db.organization.findUnique({ where: { id: admin.orgId }, select: { name: true, createdAt: true } }),
    db.user.groupBy({
      by: ["role", "status"],
      where: { orgId: admin.orgId },
      _count: true,
    }),
    db.invite.count({
      where: { orgId: admin.orgId, acceptedAt: null, revokedAt: null, expiresAt: { gt: new Date() } },
    }),
    db.auditLog.findMany({
      where: { orgId: admin.orgId },
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { actor: { select: { name: true } } },
    }),
  ]);

  const tally = (role: string, status?: string) =>
    counts
      .filter((c) => c.role === role && (status ? c.status === status : true))
      .reduce((n, c) => n + c._count, 0);

  const roles = [
    { key: "STUDENT", label: "Students", href: "/admin/people?role=STUDENT" },
    { key: "TEACHER", label: "Teachers", href: "/admin/people?role=TEACHER" },
    { key: "PARENT", label: "Parents", href: "/admin/people?role=PARENT" },
    { key: "ADMIN", label: "Admins", href: "/admin/people?role=ADMIN" },
  ];

  return (
    <PageBody>
      <PageHeader
        eyebrow="Administration"
        title={org?.name ?? "Your organisation"}
        serif
        description="Accounts, classes and the record of who changed what. Everyone here signs in with their own credentials."
        action={<ButtonLink href="/admin/people" icon="plus">Invite someone</ButtonLink>}
      />

      <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {roles.map((r) => (
          <Link
            key={r.key}
            href={r.href}
            className="paper-card p-5 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[2px] hover:border-line-2 hover:shadow-[var(--shadow-lift)]"
          >
            <p className="text-[12.5px] font-medium text-ink-2">{r.label}</p>
            <p className="tabular mt-2.5 text-[27px] font-semibold leading-none text-ink">
              {tally(r.key, "ACTIVE")}
            </p>
            <p className="mt-2.5 text-[11.5px] text-ink-3">
              {tally(r.key, "INVITED")} invited · {tally(r.key, "SUSPENDED")} suspended
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-3.5 grid gap-3.5 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            eyebrow="Accounts" title={`${pendingInvites} invite${pendingInvites === 1 ? "" : "s"} outstanding`}
            description="Invites expire after 14 days and can only be used once."
            action={<ButtonLink href="/admin/people" variant="secondary" size="sm">Manage people</ButtonLink>}
          />
          <ul className="mt-5 space-y-2.5">
            {[
              ["Invite a teacher", "They can then add their own students and parents.", "/admin/people"],
              ["Create a class", "Group students so assignments and analytics have a scope.", "/admin/classes"],
              ["Review the activity log", "Every sign-in, invite and account change is recorded.", "/admin/activity"],
            ].map(([title, body, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-3.5 rounded-[11px] border border-line bg-surface-2/50 p-3.5 transition-colors hover:border-line-2 hover:bg-surface-2"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-medium text-ink">{title}</span>
                    <span className="block text-[12.5px] text-ink-3">{body}</span>
                  </span>
                  <Icon name="chevron-right" size={16} className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-3.5">
          <Card>
            <CardHeader
              eyebrow="Activity" title="Latest events"
              action={<Link href="/admin/activity" className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink">All</Link>}
            />
            {recent.length === 0 ? (
              <p className="mt-4 text-[13px] leading-relaxed text-ink-2">
                Nothing recorded yet. Sign-ins and account changes will appear here.
              </p>
            ) : (
              <ul className="mt-4 space-y-2.5">
                {recent.map((entry) => (
                  <li key={entry.id} className="flex items-start justify-between gap-3 border-b border-line pb-2.5 last:border-b-0 last:pb-0">
                    <span className="min-w-0">
                      <span className="block text-[13px] text-ink">{entry.action}</span>
                      <span className="block truncate text-[11.5px] text-ink-3">
                        {entry.actor?.name ?? "System"}
                      </span>
                    </span>
                    <span className="shrink-0 text-[11.5px] text-ink-3">
                      {entry.createdAt.toLocaleDateString(undefined, { day: "numeric", month: "short" })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <CapybaraGuide variant="professor" name="How accounts work here" tone="paper">
            Nobody can sign themselves up. You invite teachers; teachers invite their students and
            those students&rsquo; parents. A parent only ever sees the child they are linked to.
          </CapybaraGuide>

          <Card>
            <CardHeader eyebrow="Organisation" title="Details" />
            <dl className="mt-4 space-y-2.5 text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Name</dt>
                <dd className="text-right font-medium text-ink">{org?.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Created</dt>
                <dd className="text-right text-ink">
                  {org?.createdAt.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-3">Signed in as</dt>
                <dd className="text-right text-ink">{admin.email}</dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-line pt-3.5">
              <Tag tone="sage">Invite-only</Tag>
            </div>
          </Card>
        </div>
      </div>
    </PageBody>
  );
}
