import type { CSSProperties } from "react";

export type CapyVariant =
  | "plain"      // no accessory
  | "professor"  // glasses — explanations, AI tutor
  | "vocab"      // flashcard — vocabulary
  | "focus"      // headphones — focus sessions
  | "writing"    // pencil — writing studio
  | "exam"       // stopwatch — timed practice
  | "detective"; // magnifier — mistake analysis

export interface CapybaraProps {
  variant?: CapyVariant;
  size?: number;
  /** A single, very small reaction. Never looping unless idle. */
  mood?: "calm" | "pleased" | "thinking" | "asleep";
  className?: string;
  style?: CSSProperties;
  /** Slow breathing idle. Disabled automatically under prefers-reduced-motion. */
  idle?: boolean;
  title?: string;
}

/**
 * Capybara, drawn in side profile — the view that actually reads as a capybara:
 * a long loaf of a body, stubby legs, a blunt squared-off snout and a tiny ear.
 * Front-facing versions of this animal read as a bear.
 */
export function Capybara({
  variant = "plain",
  size = 96,
  mood = "calm",
  className = "",
  style,
  idle = false,
  title,
}: CapybaraProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={`${idle ? "animate-breathe" : ""} ${className}`}
      style={style}
    >
      {/* props sit in the free space above the back */}
      {variant === "detective" && <Magnifier />}
      {variant === "writing" && <Pencil />}
      {variant === "exam" && <Stopwatch />}
      {variant === "vocab" && <FlashCard />}

      <g stroke="var(--color-fur-dark)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        {/* legs, behind the body so only the stubs show */}
        <rect x="25" y="82" width="10" height="15" rx="5" fill="var(--color-fur-dark)" />
        <rect x="72" y="82" width="10" height="15" rx="5" fill="var(--color-fur-dark)" />
        <rect x="39" y="84" width="11" height="14" rx="5.5" fill="var(--color-fur)" />
        <rect x="84" y="84" width="11" height="14" rx="5.5" fill="var(--color-fur)" />

        {/* ear: small and low, tucked at the back of the head */}
        <ellipse cx="87" cy="51" rx="6.5" ry="5.5" fill="var(--color-fur-dark)" transform="rotate(-12 87 51)" />

        {/* body and head as one silhouette — no neck, blunt vertical face */}
        <path
          d="M12 73c0-17 15-27 38-27 18 0 32 3 42 10 8 5 15 9 15 16v6c0 7-7 11-17 12-18 1-42 1-56 0C21 89 12 83 12 73Z"
          fill="var(--color-fur)"
        />
      </g>

      {/* nose at the front tip */}
      <ellipse cx="104" cy="70" rx="3.4" ry="2.8" fill="var(--color-fur-dark)" />

      {/* eye */}
      {mood === "asleep" ? (
        <path d="M89 66q4 3.5 8 0" stroke="var(--color-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      ) : mood === "pleased" ? (
        <path d="M89 67q4-4.5 8 0" stroke="var(--color-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx="93" cy="65" rx="3" ry="3.2" fill="var(--color-ink)" />
      )}

      {/* mouth: a short line under the snout */}
      <path d="M99 79q3.5 2 6 0" stroke="var(--color-fur-dark)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

      {/* worn accessories go over the head */}
      {variant === "professor" && <Glasses />}
      {variant === "focus" && <Headphones />}
      {mood === "thinking" && <ThinkingDots />}
    </svg>
  );
}

/* ---------------- worn accessories ---------------- */

function Glasses() {
  return (
    <g stroke="var(--color-ink-2)" strokeWidth="2.2" fill="none" strokeLinecap="round">
      <circle cx="93" cy="65" r="9.5" fill="var(--color-surface)" fillOpacity="0.4" />
      <path d="M83.5 63 76 60" />
      <path d="M102.5 64q3 1.5 4 3.5" />
    </g>
  );
}

function Headphones() {
  return (
    <g stroke="var(--color-ink-2)" strokeWidth="2.6" fill="none" strokeLinecap="round">
      <path d="M70 53q17-20 33-4" />
      <rect x="79" y="42" width="16" height="16" rx="7.5" fill="var(--color-blue-soft)" />
    </g>
  );
}

/* ---------------- props ---------------- */

function Magnifier() {
  return (
    <g strokeLinecap="round">
      <circle cx="34" cy="31" r="14.5" fill="var(--color-blue-soft)" fillOpacity="0.6" stroke="var(--color-ink-2)" strokeWidth="2.6" />
      <path d="M44.5 41.5 55 52" stroke="var(--color-ink-2)" strokeWidth="4.5" />
      <path d="M26 25a14.5 14.5 0 0 1 7-4.5" stroke="var(--color-surface)" strokeWidth="2.6" fill="none" opacity="0.85" />
    </g>
  );
}

function Pencil() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 52 42 16" stroke="var(--color-ochre)" strokeWidth="8" />
      <path d="M42 16l4-8 3 8.5-7-.5Z" fill="var(--color-ink-2)" stroke="var(--color-ink-2)" strokeWidth="1.6" />
      <path d="M21.5 52l-5 7 8-3" fill="var(--color-clay-soft)" stroke="var(--color-ink-2)" strokeWidth="1.6" />
    </g>
  );
}

function Stopwatch() {
  return (
    <g stroke="var(--color-ink-2)" strokeWidth="2.4" fill="none" strokeLinecap="round">
      <circle cx="34" cy="33" r="13.5" fill="var(--color-surface)" />
      <path d="M34 24v9l6 4" strokeWidth="2.2" />
      <path d="M29 17h10M34 17v-4" />
    </g>
  );
}

function FlashCard() {
  return (
    <g strokeLinejoin="round">
      <rect x="10" y="17" width="40" height="28" rx="4" fill="var(--color-surface)" stroke="var(--color-ink-2)" strokeWidth="2.2" transform="rotate(-8 30 31)" />
      <g stroke="var(--color-ink-3)" strokeWidth="2.2" strokeLinecap="round" transform="rotate(-8 30 31)">
        <path d="M17 27h22M17 35h15" />
      </g>
    </g>
  );
}

function ThinkingDots() {
  return (
    <g fill="var(--color-ink-3)">
      <circle cx="66" cy="34" r="2.6" opacity="0.9" />
      <circle cx="75" cy="25" r="3.6" opacity="0.7" />
      <circle cx="85" cy="15" r="4.6" opacity="0.5" />
    </g>
  );
}
