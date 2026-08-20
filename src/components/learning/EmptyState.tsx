import type { ReactNode } from "react";
import { Capybara, type CapyVariant } from "@/components/mascot/Capybara";

export function EmptyState({
  title, body, action, variant = "plain", compact = false, level = 3,
}: {
  title: string;
  body: string;
  action?: ReactNode;
  variant?: CapyVariant;
  compact?: boolean;
  /** Use 2 when the empty state is the page's own section rather than inside a card. */
  level?: 2 | 3;
}) {
  const Heading = `h${level}` as "h3";
  return (
    <div className={`flex flex-col items-center rounded-[13px] border border-dashed border-line-2 bg-surface-2/40 text-center ${compact ? "px-5 py-7" : "px-6 py-12"}`}>
      <Capybara variant={variant} mood="calm" size={compact ? 48 : 68} />
      <Heading className="mt-3 text-[14.5px] font-semibold text-ink">{title}</Heading>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-ink-2">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
