import { guardSection } from "@/lib/auth/rbac";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // People is shared with teachers so they can invite their own students;
  // the page itself narrows what a teacher may do there.
  await guardSection("ADMIN", "TEACHER");
  return <>{children}</>;
}
