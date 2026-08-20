import type { ReactNode } from "react";
import { Capybara, type CapyVariant } from "@/components/mascot/Capybara";

/**
 * A capybara with something to say. Used only where a short piece of guidance
 * genuinely helps — never as decoration.
 */
export function CapybaraGuide({
  variant = "professor",
  name,
  children,
  action,
  tone = "paper",
  size = 52,
  mood = "calm",
}: {
  variant?: CapyVariant;
  name?: string;
  children: ReactNode;
  action?: ReactNode;
  tone?: "paper" | "sage" | "ochre" | "blue" | "clay" | "plum" | "plain";
  size?: number;
  mood?: "calm" | "pleased" | "thinking";
}) {
  const tones = {
    paper: "border-line bg-surface-2/70",
    sage: "border-sage/25 bg-sage-soft/60",
    ochre: "border-ochre/25 bg-ochre-soft/55",
    blue: "border-blue/25 bg-blue-soft/55",
    clay: "border-clay/25 bg-clay-soft/55",
    plum: "border-plum/25 bg-plum-soft/55",
    plain: "border-transparent bg-transparent",
  };
  return (
    <div className={`flex items-start gap-3.5 rounded-[13px] border p-3.5 ${tones[tone]}`}>
      <Capybara variant={variant} mood={mood} size={size} className="-mt-1 shrink-0" />
      <div className="min-w-0 flex-1">
        {name && <p className="eyebrow mb-1">{name}</p>}
        <div className="text-[13px] leading-relaxed text-ink-2">{children}</div>
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}
