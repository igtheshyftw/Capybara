import type { Metadata } from "next";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { requireRole } from "@/lib/auth/rbac";
import { db } from "@/lib/db";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const admin = await requireRole("ADMIN");
  const org = await db.organization.findUnique({ where: { id: admin.orgId } });

  const policies = [
    ["Account creation", "Invite only. There is no public sign-up form."],
    ["Password storage", "scrypt, 64 MB work factor. Passwords are never stored or logged in readable form."],
    ["Sessions", "30 days, renewed while in use. Only a hash of each session token is stored."],
    ["Failed sign-ins", "Locked for 15 minutes after 8 consecutive failures."],
    ["Password reset", "One-hour, single-use links. Resetting signs out every other device."],
    ["Parent access", "A parent sees only children they are explicitly linked to."],
  ];

  return (
    <PageBody>
      <PageHeader
        eyebrow="Settings" title="Organisation" serif
        description="How accounts behave here. These rules are enforced in code rather than being toggles, so they cannot be weakened by accident."
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Details" title={org?.name ?? ""} />
          <dl className="mt-4 space-y-3 text-[13.5px]">
            <div className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-ink-3">Identifier</dt>
              <dd className="text-right font-medium text-ink">{org?.slug}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-ink-3">Created</dt>
              <dd className="text-right text-ink">
                {org?.createdAt.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-3">Sign-up mode</dt>
              <dd className="text-right"><Tag tone="sage">Invite only</Tag></dd>
            </div>
          </dl>
          <ButtonLink href="/admin/people" variant="secondary" size="sm" full className="mt-5">
            Manage accounts
          </ButtonLink>
        </Card>

        <Card>
          <CardHeader eyebrow="Security" title="What is enforced" />
          <ul className="mt-4 space-y-3.5">
            {policies.map(([title, body]) => (
              <li key={title} className="flex items-start gap-2.5">
                <Icon name="check" size={15} className="mt-[3px] shrink-0 text-sage" />
                <span>
                  <span className="block text-[13.5px] font-medium text-ink">{title}</span>
                  <span className="block text-[12.5px] leading-relaxed text-ink-2">{body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </PageBody>
  );
}
