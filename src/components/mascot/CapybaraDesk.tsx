import type { CSSProperties } from "react";

export interface CapybaraDeskProps {
  /** Items unlock as the student levels up; pass a level to gate the scene. */
  level?: number;
  className?: string;
  style?: CSSProperties;
  /** Turns the lamp on and dims the room, for focus sessions in the evening. */
  night?: boolean;
  /** Very slow idle motion. Suppressed by prefers-reduced-motion. */
  idle?: boolean;
  title?: string;
  width?: number | string;
}

const UNLOCK = { plant: 5, mug: 8, notebook: 10, readingLamp: 15, books: 20, cat: 25, window: 30 };

/**
 * The capybara's study room, drawn flat with soft outlines.
 * Doubles as the hero illustration, the focus-session scene and the study room.
 */
export function CapybaraDesk({
  level = 99,
  className = "",
  style,
  night = false,
  idle = false,
  title = "A capybara studying at a desk",
  width = "100%",
}: CapybaraDeskProps) {
  const has = (k: keyof typeof UNLOCK) => level >= UNLOCK[k];
  const wall = night ? "var(--color-surface-3)" : "var(--color-surface-2)";

  return (
    <svg
      viewBox="0 0 340 240"
      width={width}
      fill="none"
      role="img"
      aria-label={title}
      className={className}
      style={style}
    >
      {/* ---- room ---- */}
      <rect x="0" y="0" width="340" height="196" fill={wall} rx="10" />
      <rect x="0" y="188" width="340" height="52" fill="var(--color-surface-3)" rx="10" />
      <line x1="0" y1="190" x2="340" y2="190" stroke="var(--color-line-2)" strokeWidth="1.5" />

      {/* ---- window (level 30) ---- */}
      {has("window") && (
        <g>
          <rect x="228" y="26" width="84" height="66" rx="6" fill={night ? "#2f3a46" : "var(--color-blue-soft)"} stroke="var(--color-line-2)" strokeWidth="2" />
          {night ? (
            <g fill="var(--color-ochre-soft)">
              <circle cx="292" cy="44" r="7" opacity="0.9" />
              <circle cx="252" cy="40" r="1.3" /><circle cx="266" cy="56" r="1.1" /><circle cx="244" cy="66" r="1.2" />
            </g>
          ) : (
            <g>
              <path d="M228 78q22-20 40-6t44-14v34H228Z" fill="var(--color-sage-soft)" />
              <circle cx="252" cy="46" r="8" fill="var(--color-ochre-soft)" />
            </g>
          )}
          <line x1="270" y1="26" x2="270" y2="92" stroke="var(--color-line-2)" strokeWidth="2" />
          <line x1="228" y1="59" x2="312" y2="59" stroke="var(--color-line-2)" strokeWidth="2" />
        </g>
      )}

      {/* ---- wall shelf ---- */}
      <g>
        <rect x="18" y="52" width="96" height="6" rx="3" fill="var(--color-fur-light)" stroke="var(--color-fur-dark)" strokeWidth="1.5" />
        <rect x="26" y="30" width="9" height="22" rx="2" fill="var(--color-sage)" />
        <rect x="37" y="26" width="8" height="26" rx="2" fill="var(--color-clay)" />
        <rect x="47" y="33" width="10" height="19" rx="2" fill="var(--color-blue)" />
        {has("books") && (
          <>
            <rect x="59" y="28" width="8" height="24" rx="2" fill="var(--color-ochre)" />
            <rect x="69" y="34" width="9" height="18" rx="2" fill="var(--color-plum)" />
            <rect x="86" y="44" width="22" height="8" rx="2" fill="var(--color-fur)" stroke="var(--color-fur-dark)" strokeWidth="1.2" />
          </>
        )}
      </g>

      {/* ---- cat on the sill (level 25) ---- */}
      {has("cat") && has("window") && (
        <g stroke="var(--color-ink-2)" strokeWidth="1.6" strokeLinejoin="round">
          <path d="M286 92c0-6 5-9 10-9s10 3 10 9h-20Z" fill="var(--color-ink-3)" />
          <path d="M288 84l2-5 3 4M304 84l-2-5-3 4" fill="var(--color-ink-3)" />
        </g>
      )}

      {/* ---- desk ---- */}
      <g stroke="var(--color-fur-dark)" strokeWidth="2" strokeLinejoin="round">
        <rect x="42" y="150" width="238" height="10" rx="4" fill="var(--color-fur)" />
        <rect x="54" y="160" width="9" height="34" rx="3" fill="var(--color-fur-dark)" />
        <rect x="259" y="160" width="9" height="34" rx="3" fill="var(--color-fur-dark)" />
      </g>

      {/* ---- capybara at the desk ---- */}
      <g className={idle ? "animate-breathe" : ""} style={{ transformOrigin: "168px 150px" }}>
        {/* body behind the desk */}
        <path d="M126 152c0-19 19-30 42-30s42 11 42 30H126Z" fill="var(--color-fur)" stroke="var(--color-fur-dark)" strokeWidth="2" strokeLinejoin="round" />
        {/* head */}
        <g stroke="var(--color-fur-dark)" strokeWidth="2" strokeLinejoin="round">
          <ellipse cx="136" cy="94" rx="5" ry="4.2" fill="var(--color-fur)" transform="rotate(-22 136 94)" />
          <ellipse cx="200" cy="94" rx="5" ry="4.2" fill="var(--color-fur)" transform="rotate(22 200 94)" />
          <path d="M136 100c0-8 6-12 14-12h36c8 0 14 4 14 12v20c0 9-10 14-32 14s-32-5-32-14v-20Z" fill="var(--color-fur)" />
          <path d="M141 120c0-7 11-10 27-10s27 3 27 10-11 14-27 14-27-7-27-14Z" fill="var(--color-fur-light)" strokeWidth="1.4" />
          <ellipse cx="168" cy="117" rx="12" ry="5" fill="var(--color-fur-dark)" strokeWidth="1.2" />
        </g>
        {/* eyes: lowered, reading the page */}
        <path d="M146 101q3.5 2.6 7 0M183 101q3.5 2.6 7 0" stroke="var(--color-ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* paws resting on the desk, either side of the notebook */}
        <path d="M126 150c0-5 4-8 9-8s9 3 9 8" fill="var(--color-fur-light)" stroke="var(--color-fur-dark)" strokeWidth="1.8" />
        <path d="M192 150c0-5 4-8 9-8s9 3 9 8" fill="var(--color-fur-light)" stroke="var(--color-fur-dark)" strokeWidth="1.8" />
      </g>

      {/* ---- open notebook on the desk ---- */}
      <g stroke="var(--color-ink-3)" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M146 150h44l-3-12h-38l-3 12Z" fill="var(--color-surface)" />
        <path d="M168 138v12" />
        <g stroke="var(--color-line-2)" strokeWidth="1.2">
          <path d="M152 142h12M151 146h14M172 142h12M171 146h14" />
        </g>
      </g>

      {/* ---- desk lamp ---- */}
      <g stroke="var(--color-ink-2)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M72 150v-26l16-12" />
        <path d="M78 108l18-6 6 14-18 6-6-14Z" fill={night ? "var(--color-ochre-soft)" : "var(--color-surface-3)"} strokeLinejoin="round" />
        <rect x="63" y="146" width="18" height="5" rx="2.5" fill="var(--color-surface-3)" />
      </g>
      {night && <path d="M88 122 L60 150 L124 150 Z" fill="var(--color-ochre-soft)" opacity="0.35" />}

      {/* ---- reading lamp (level 15) ---- */}
      {has("readingLamp") && (
        <g stroke="var(--color-ink-2)" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M312 190v-52" />
          <path d="M300 138h24l-6-14h-12l-6 14Z" fill="var(--color-clay-soft)" strokeLinejoin="round" />
          <path d="M304 190h16" />
        </g>
      )}

      {/* ---- mug (level 8) ---- */}
      {has("mug") && (
        <g stroke="var(--color-ink-2)" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M212 150v-13h16v13Z" fill="var(--color-sage-soft)" />
          <path d="M228 140h5a4 4 0 0 1 0 8h-5" fill="none" />
          {night && <path d="M216 132q2-4 0-7M223 132q2-4 0-7" stroke="var(--color-ink-3)" strokeWidth="1.4" fill="none" opacity="0.7" />}
        </g>
      )}

      {/* ---- stacked notebooks (level 10) ---- */}
      {has("notebook") && (
        <g stroke="var(--color-ink-3)" strokeWidth="1.5" strokeLinejoin="round">
          <rect x="238" y="143" width="30" height="7" rx="2" fill="var(--color-blue-soft)" />
          <rect x="241" y="137" width="26" height="6" rx="2" fill="var(--color-clay-soft)" />
        </g>
      )}

      {/* ---- plant (level 5) ---- */}
      {has("plant") && (
        <g strokeLinejoin="round" strokeLinecap="round">
          <path d="M22 190v-14h26v14Z" fill="var(--color-clay-soft)" stroke="var(--color-ink-3)" strokeWidth="1.8" />
          <g stroke="var(--color-sage)" strokeWidth="2.6" fill="none">
            <path d="M35 176v-20M35 164q-9-3-11-12M35 160q9-4 12-13" />
          </g>
          <ellipse cx="22" cy="150" rx="6" ry="4" fill="var(--color-sage)" transform="rotate(-24 22 150)" />
          <ellipse cx="48" cy="145" rx="6" ry="4" fill="var(--color-sage)" transform="rotate(22 48 145)" />
          <ellipse cx="35" cy="152" rx="5" ry="7" fill="var(--color-sage)" />
        </g>
      )}
    </svg>
  );
}
