import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotForm } from "./ForgotForm";

export const metadata: Metadata = { title: "Reset your password" };
/**
 * Rendered per request.
 *
 * Sign-in state depends on cookies and on DATABASE_URL being present at run
 * time. Without this, Next prerenders the page during the build — when there is
 * no database — and bakes "demo mode" into the HTML for good.
 */
export const dynamic = "force-dynamic";


export default function ForgotPasswordPage() {
  return (
    <AuthShell
      variant="professor"
      title="Reset your password."
      description="Enter the address you sign in with and we will send a link to set a new password."
      footer={
        <Link href="/login" className="font-medium text-ink underline decoration-line-2 underline-offset-4">
          Back to sign in
        </Link>
      }
    >
      <ForgotForm />
    </AuthShell>
  );
}
