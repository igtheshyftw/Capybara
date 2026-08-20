import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ButtonLink } from "@/components/ui/Button";
import { db, isDatabaseConfigured } from "@/lib/db";
import { hashToken } from "@/lib/auth/tokens";
import { ResetForm } from "./ResetForm";

export const metadata: Metadata = { title: "Choose a new password" };
/**
 * Rendered per request.
 *
 * Sign-in state depends on cookies and on DATABASE_URL being present at run
 * time. Without this, Next prerenders the page during the build — when there is
 * no database — and bakes "demo mode" into the HTML for good.
 */
export const dynamic = "force-dynamic";


export default async function ResetPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  if (!isDatabaseConfigured()) {
    return (
      <AuthShell title="Unavailable." description="This deployment has no database configured.">
        <ButtonLink href="/" full>Back to the homepage</ButtonLink>
      </AuthShell>
    );
  }

  const record = await db.passwordResetToken.findUnique({ where: { tokenHash: hashToken(token) } });
  const dead = !record || record.usedAt || record.expiresAt.getTime() < Date.now();

  if (dead) {
    return (
      <AuthShell
        variant="professor"
        title="This link has expired."
        description="Reset links last one hour and work once. Request a fresh one and it will arrive shortly."
      >
        <ButtonLink href="/forgot-password" full>Request a new link</ButtonLink>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="Choose a new password." description="Signing in again on your other devices will be required.">
      <ResetForm token={token} />
    </AuthShell>
  );
}
