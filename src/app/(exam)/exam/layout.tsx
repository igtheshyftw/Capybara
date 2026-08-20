import { guardSection } from "@/lib/auth/rbac";

/** Depends on the session cookie, so it is rendered per request. */
export const dynamic = "force-dynamic";

export default async function ExamLayout({ children }: { children: React.ReactNode }) {
  await guardSection("STUDENT");
  return <>{children}</>;
}
