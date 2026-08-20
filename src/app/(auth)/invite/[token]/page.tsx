import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { db, isDatabaseConfigured } from "@/lib/db";
import { hashToken } from "@/lib/auth/tokens";
import { ButtonLink } from "@/components/ui/Button";
import { AcceptInviteForm } from "./AcceptInviteForm";

export const metadata: Metadata = { title: "Accept your invite" };
/**
 * Rendered per request.
 *
 * Sign-in state depends on cookies and on DATABASE_URL being present at run
 * time. Without this, Next prerenders the page during the build — when there is
 * no database — and bakes "demo mode" into the HTML for good.
 */
export const dynamic = "force-dynamic";


const roleWord = {
  STUDENT: "student", PARENT: "parent", TEACHER: "teacher", ADMIN: "administrator",
} as const;

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  if (!isDatabaseConfigured()) {
    return (
      <AuthShell title="Invites are unavailable." description="This deployment has no database configured.">
        <ButtonLink href="/" full>Back to the homepage</ButtonLink>
      </AuthShell>
    );
  }

  const invite = await db.invite.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { org: { select: { name: true } } },
  });

  const dead =
    !invite || invite.revokedAt || invite.acceptedAt || invite.expiresAt.getTime() < Date.now();

  if (dead) {
    return (
      <AuthShell
        variant="professor"
        title="This link has expired."
        description="Invite links are valid for 14 days and can only be used once. Ask whoever invited you to send a new one."
      >
        <ButtonLink href="/login" full variant="secondary">Go to sign in</ButtonLink>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Set up your account."
      description={
        <>
          You have been invited to <strong className="text-ink">{invite.org.name}</strong> as a{" "}
          {roleWord[invite.role]}. Choose a password and you are in.
        </>
      }
    >
      <AcceptInviteForm token={token} email={invite.email} name={invite.name} />
    </AuthShell>
  );
}
