import type { ReactNode } from "react";
import { Capybara, type CapyVariant } from "@/components/mascot/Capybara";

export function EmptyState({
  title, body, action, variant = "plain", compact = false,
}: {
  title: string;
  body: string;
  action?: ReactNode;
  variant?: CapyVariant;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center rounded-[13px] border border-dashed border-line-2 bg-surface-2/40 text-center ${compact ? "px-5 py-7" : "px-6 py-12"}`}>
      <Capybara variant={variant} mood="calm" size={compact ? 48 : 68} />
      <h3 className="mt-3 text-[14.5px] font-semibold text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-ink-2">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
