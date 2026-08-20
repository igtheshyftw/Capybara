import type { ComponentProps, ReactNode } from "react";

type CardTag = "div" | "section" | "article" | "li";

export function Card({
  className = "", as = "div", padded = true, ...rest
}: { className?: string; as?: CardTag; padded?: boolean } & Omit<ComponentProps<"div">, "ref">) {
  const As = as as "div";
  return <As className={`paper-card ${padded ? "p-5 sm:p-6" : ""} ${className}`} {...rest} />;
}

export function CardHeader({
  title, eyebrow, action, description, className = "", level = 2,
}: {
  title: ReactNode;
  eyebrow?: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
  /** Heading level, so cards nested inside a section can drop to h3. */
  level?: 2 | 3 | 4;
}) {
  const Heading = `h${level}` as "h2";
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow mb-1.5">{eyebrow}</p>}
        <Heading className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</Heading>
        {description && <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Small pill used for status, difficulty, subject and count labels. */
export function Tag({
  children, tone = "neutral", className = "",
}: {
  children: ReactNode;
  tone?: "neutral" | "sage" | "blue" | "clay" | "ochre" | "plum" | "correct" | "wrong" | "solid";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-surface-2 text-ink-2 border-line",
    sage: "bg-sage-soft text-sage-ink border-sage/25",
    blue: "bg-blue-soft text-blue-ink border-blue/25",
    clay: "bg-clay-soft text-clay-ink border-clay/25",
    ochre: "bg-ochre-soft text-ochre-ink border-ochre/25",
    plum: "bg-plum-soft text-plum-ink border-plum/25",
    correct: "bg-correct-soft text-correct-ink border-correct/25",
    wrong: "bg-wrong-soft text-wrong-ink border-wrong/25",
    solid: "bg-ink text-ink-inv border-ink",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-[3px] text-[11px] font-medium leading-none ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
