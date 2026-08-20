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
 * Capybara portrait. Simple shapes, soft outlines, muted fur, minimal face —
 * the expression lives in the eyes and the tilt, not in a grin.
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
  const eyeY = mood === "pleased" ? 49 : 50;

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
      <g stroke="var(--color-fur-dark)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* ears: small, low-set side bumps in the same fur as the head */}
        <ellipse cx="31" cy="40" rx="6" ry="5" fill="var(--color-fur)" transform="rotate(-20 31 40)" />
        <ellipse cx="89" cy="40" rx="6" ry="5" fill="var(--color-fur)" transform="rotate(20 89 40)" />

        {/* head: flat across the crown, wider than it is tall */}
        <path
          d="M26 52c0-12 8-18 20-18h28c12 0 20 6 20 18v18c0 12-15 19-34 19S26 82 26 70V52Z"
          fill="var(--color-fur)"
        />

        {/* muzzle: broad and blunt, nearly the full width of the head */}
        <path
          d="M32 70c0-10 12-15 28-15s28 5 28 15-12 17-28 17-28-6-28-17Z"
          fill="var(--color-fur-light)"
          strokeWidth="1.5"
        />

        {/* nose pad */}
        <ellipse cx="60" cy="66" rx="15" ry="7.5" fill="var(--color-fur-dark)" strokeWidth="1.3" />
        <ellipse cx="54.5" cy="65" rx="2" ry="1.4" fill="var(--color-ink)" stroke="none" opacity="0.5" />
        <ellipse cx="65.5" cy="65" rx="2" ry="1.4" fill="var(--color-ink)" stroke="none" opacity="0.5" />

        {/* eyes: small, high and wide-set */}
        {mood === "asleep" ? (
          <>
            <path d="M39 50q4 3 8 0" strokeWidth="2.2" />
            <path d="M73 50q4 3 8 0" strokeWidth="2.2" />
          </>
        ) : mood === "pleased" ? (
          <>
            <path d="M39 51q4-4 8 0" strokeWidth="2.2" />
            <path d="M73 51q4-4 8 0" strokeWidth="2.2" />
          </>
        ) : (
          <>
            <ellipse cx="43" cy={eyeY} rx="2.8" ry="3" fill="var(--color-ink)" stroke="none" />
            <ellipse cx="77" cy={eyeY} rx="2.8" ry="3" fill="var(--color-ink)" stroke="none" />
          </>
        )}

        {/* mouth */}
        <path d="M60 74.5v3.5" strokeWidth="1.5" />
        {mood === "pleased" ? <path d="M54 78q6 4.5 12 0" strokeWidth="1.5" /> : <path d="M56 78.5q4 2 8 0" strokeWidth="1.3" />}
      </g>

      {variant === "professor" && <Glasses />}
      {variant === "focus" && <Headphones />}
      {variant === "detective" && <Magnifier />}
      {variant === "writing" && <Pencil />}
      {variant === "exam" && <Stopwatch />}
      {variant === "vocab" && <FlashCard />}
      {mood === "thinking" && <ThinkingDots />}
    </svg>
  );
}

/* ---------------- accessories ---------------- */

function Glasses() {
  return (
    <g stroke="var(--color-ink-2)" strokeWidth="2" fill="none" strokeLinecap="round">
      <circle cx="43" cy="50" r="10" fill="var(--color-surface)" fillOpacity="0.4" />
      <circle cx="77" cy="50" r="10" fill="var(--color-surface)" fillOpacity="0.4" />
      <path d="M53 49q7-3 14 0" />
      <path d="M33 48 24 45M87 48 96 45" />
    </g>
  );
}

function Headphones() {
  return (
    <g stroke="var(--color-ink-2)" strokeWidth="2.4" fill="none" strokeLinecap="round">
      <path d="M24 54a36 32 0 0 1 72 0" />
      <rect x="17" y="48" width="12" height="21" rx="6" fill="var(--color-blue-soft)" />
      <rect x="91" y="48" width="12" height="21" rx="6" fill="var(--color-blue-soft)" />
    </g>
  );
}

function Magnifier() {
  return (
    <g strokeLinecap="round">
      <circle cx="95" cy="76" r="13" fill="var(--color-blue-soft)" fillOpacity="0.55" stroke="var(--color-ink-2)" strokeWidth="2.4" />
      <path d="M104.5 85.5 114 95" stroke="var(--color-ink-2)" strokeWidth="4" />
      <path d="M89 71a13 13 0 0 1 5.5-3.5" stroke="var(--color-surface)" strokeWidth="2.5" fill="none" opacity="0.8" />
    </g>
  );
}

function Pencil() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M88 92 104 60" stroke="var(--color-ochre)" strokeWidth="7" />
      <path d="M104 60l3.5-7 2 7.5-5.5-.5Z" fill="var(--color-ink-2)" stroke="var(--color-ink-2)" strokeWidth="1.5" />
      <path d="M87.5 92l-4.5 6 7-2.5" fill="var(--color-clay-soft)" stroke="var(--color-ink-2)" strokeWidth="1.5" />
    </g>
  );
}

function Stopwatch() {
  return (
    <g stroke="var(--color-ink-2)" strokeWidth="2.2" fill="none" strokeLinecap="round">
      <circle cx="96" cy="82" r="12" fill="var(--color-surface)" />
      <path d="M96 74v8l4.5 3" strokeWidth="2" />
      <path d="M92 69h8M96 69v-3" />
    </g>
  );
}

function FlashCard() {
  return (
    <g strokeLinejoin="round">
      <rect x="76" y="70" width="34" height="24" rx="4" fill="var(--color-surface)" stroke="var(--color-ink-2)" strokeWidth="2" transform="rotate(-7 93 82)" />
      <g stroke="var(--color-ink-3)" strokeWidth="2" strokeLinecap="round" transform="rotate(-7 93 82)">
        <path d="M82 79h18M82 85h12" />
      </g>
    </g>
  );
}

function ThinkingDots() {
  return (
    <g fill="var(--color-ink-3)">
      <circle cx="96" cy="40" r="2.5" opacity="0.9" />
      <circle cx="104" cy="32" r="3.5" opacity="0.7" />
      <circle cx="112" cy="23" r="4.5" opacity="0.5" />
    </g>
  );
}
