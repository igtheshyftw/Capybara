import { guardSection } from "@/lib/auth/rbac";

/** Teaching staff, plus administrators overseeing them. */
export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  await guardSection("TEACHER", "ADMIN");
  return <>{children}</>;
}
