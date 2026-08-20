import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { getSessionUser } from "@/lib/auth/session";
import { homeForRole } from "@/lib/auth/rbac";
import { isDatabaseConfigured } from "@/lib/db";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };
/**
 * Rendered per request.
 *
 * Sign-in state depends on cookies and on DATABASE_URL being present at run
 * time. Without this, Next prerenders the page during the build — when there is
 * no database — and bakes "demo mode" into the HTML for good.
 */
export const dynamic = "force-dynamic";


export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) redirect(homeForRole[user.role]);

  return (
    <AuthShell
      title="Welcome back."
      description="Sign in to pick up where you left off."
      footer={
        <>
          No account yet? Accounts are created by your school.{" "}
          <Link href="/" className="font-medium text-ink underline decoration-line-2 underline-offset-4">
            About Capybara Motion
          </Link>
        </>
      }
    >
      <LoginForm configured={isDatabaseConfigured()} />
    </AuthShell>
  );
}
