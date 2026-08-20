import { guardSection } from "@/lib/auth/rbac";

/**
 * Parents only. Administrators deliberately cannot browse here — a parent's
 * view is about one family, and staff already reach student records through
 * the teacher and admin sections, where access is audit-logged.
 */
export default async function ParentLayout({ children }: { children: React.ReactNode }) {
  await guardSection("PARENT");
  return <>{children}</>;
}
