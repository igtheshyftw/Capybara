import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { getSessionUser } from "@/lib/auth/session";
import { isDatabaseConfigured, db } from "@/lib/db";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata: Metadata = { title: "Your account" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  if (!isDatabaseConfigured()) redirect("/profile");
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const sessions = await db.session.count({ where: { userId: user.id, expiresAt: { gt: new Date() } } });

  return (
    <PageBody>
      <PageHeader eyebrow="Account" title={user.name} serif description={user.email} />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-2">
        <Card>
          <CardHeader eyebrow="Details" title="Your account" />
          <dl className="mt-4 space-y-3 text-[13.5px]">
            <div className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-ink-3">Role</dt>
              <dd><Tag tone="blue">{user.role.toLowerCase()}</Tag></dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-3">
              <dt className="text-ink-3">Email</dt>
              <dd className="text-right text-ink">{user.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-3">Active sessions</dt>
              <dd className="tabular text-right text-ink">{sessions}</dd>
            </div>
          </dl>
          <p className="mt-4 border-t border-line pt-3.5 text-[12.5px] leading-relaxed text-ink-3">
            Your role and email are set by your organisation. Ask an administrator if either needs changing.
          </p>
        </Card>

        <Card>
          <CardHeader
            eyebrow="Security" title="Change your password"
            description="Changing it signs you out everywhere else."
          />
          <div className="mt-5">
            <ChangePasswordForm />
          </div>
        </Card>
      </div>
    </PageBody>
  );
}
