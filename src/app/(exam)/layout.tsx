/**
 * Exam mode sits outside the app shell on purpose: no sidebar, no mascots,
 * no streak counter, nothing that is not part of the test.
 */
export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-dvh bg-paper">{children}</div>;
}
