import { guardSection } from "@/lib/auth/rbac";

/** Everything a student uses. Teachers and parents have their own sections. */
export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  await guardSection("STUDENT");
  return <>{children}</>;
}
