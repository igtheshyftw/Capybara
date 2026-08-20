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
 * The capybara's study corner, drawn flat and in side profile so the animal
 * keeps the same silhouette as the avatar. Doubles as the hero illustration,
 * the focus-session scene and the study room.
 */
export function CapybaraDesk({
  level = 99,
  className = "",
  style,
  night = false,
  idle = false,
  title = "A capybara studying on the floor beside a desk",
  width = "100%",
}: CapybaraDeskProps) {
  const has = (k: keyof typeof UNLOCK) => level >= UNLOCK[k];
  const wall = night ? "var(--color-surface-3)" : "var(--color-surface-2)";

  return (
    <svg
      viewBox="0 0 360 240"
      width={width}
      fill="none"
      role="img"
      aria-label={title}
      className={className}
      style={style}
    >
      {/* ---- room ---- */}
      <rect x="0" y="0" width="360" height="196" fill={wall} rx="10" />
      <rect x="0" y="188" width="360" height="52" fill="var(--color-surface-3)" rx="10" />
      <line x1="0" y1="190" x2="360" y2="190" stroke="var(--color-line-2)" strokeWidth="1.5" />

      {/* ---- window (level 30) ---- */}
      {has("window") && (
        <g>
          <rect x="240" y="24" width="84" height="64" rx="6" fill={night ? "#2f3a46" : "var(--color-blue-soft)"} stroke="var(--color-line-2)" strokeWidth="2" />
          {night ? (
            <g fill="var(--color-ochre-soft)">
              <circle cx="303" cy="42" r="7" opacity="0.9" />
              <circle cx="264" cy="38" r="1.3" /><circle cx="278" cy="54" r="1.1" /><circle cx="256" cy="64" r="1.2" />
            </g>
          ) : (
            <g>
              <path d="M240 74q22-19 40-5t44-13v32h-84Z" fill="var(--color-sage-soft)" />
              <circle cx="264" cy="44" r="8" fill="var(--color-ochre-soft)" />
            </g>
          )}
          <line x1="282" y1="24" x2="282" y2="88" stroke="var(--color-line-2)" strokeWidth="2" />
          <line x1="240" y1="56" x2="324" y2="56" stroke="var(--color-line-2)" strokeWidth="2" />
          {/* ---- visitor on the sill (level 25) ---- */}
          {has("cat") && (
            <g stroke="var(--color-ink-2)" strokeWidth="1.6" strokeLinejoin="round">
              <path d="M296 88c0-6 5-9 10-9s10 3 10 9h-20Z" fill="var(--color-ink-3)" />
              <path d="M298 80l2-5 3 4M314 80l-2-5-3 4" fill="var(--color-ink-3)" />
            </g>
          )}
        </g>
      )}

      {/* ---- wall shelf ---- */}
      <g>
        <rect x="30" y="52" width="100" height="6" rx="3" fill="var(--color-fur-light)" stroke="var(--color-fur-dark)" strokeWidth="1.5" />
        <rect x="38" y="30" width="9" height="22" rx="2" fill="var(--color-sage)" />
        <rect x="49" y="26" width="8" height="26" rx="2" fill="var(--color-clay)" />
        <rect x="59" y="33" width="10" height="19" rx="2" fill="var(--color-blue)" />
        {has("books") && (
          <>
            <rect x="71" y="28" width="8" height="24" rx="2" fill="var(--color-ochre)" />
            <rect x="81" y="34" width="9" height="18" rx="2" fill="var(--color-plum)" />
            <rect x="98" y="44" width="24" height="8" rx="2" fill="var(--color-fur)" stroke="var(--color-fur-dark)" strokeWidth="1.2" />
          </>
        )}
      </g>

      {/* ---- desk ---- */}
      <g stroke="var(--color-fur-dark)" strokeWidth="2" strokeLinejoin="round">
        <rect x="200" y="140" width="130" height="10" rx="4" fill="var(--color-fur)" />
        <rect x="210" y="150" width="9" height="40" rx="3" fill="var(--color-fur-dark)" />
        <rect x="312" y="150" width="9" height="40" rx="3" fill="var(--color-fur-dark)" />
      </g>

      {/* ---- desk lamp ---- */}
      <g stroke="var(--color-ink-2)" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M228 140v-22l14-11" />
        <path d="M234 104l17-6 6 13-17 6-6-13Z" fill={night ? "var(--color-ochre-soft)" : "var(--color-surface-3)"} strokeLinejoin="round" />
        <rect x="219" y="136" width="18" height="5" rx="2.5" fill="var(--color-surface-3)" />
      </g>
      {night && <path d="M243 118 L214 140 L272 140 Z" fill="var(--color-ochre-soft)" opacity="0.35" />}

      {/* ---- mug (level 8) ---- */}
      {has("mug") && (
        <g stroke="var(--color-ink-2)" strokeWidth="1.8" strokeLinejoin="round">
          <path d="M262 140v-13h16v13Z" fill="var(--color-sage-soft)" />
          <path d="M278 130h5a4 4 0 0 1 0 8h-5" fill="none" />
          {night && <path d="M266 122q2-4 0-7M273 122q2-4 0-7" stroke="var(--color-ink-3)" strokeWidth="1.4" fill="none" opacity="0.7" />}
        </g>
      )}

      {/* ---- stacked notebooks (level 10) ---- */}
      {has("notebook") && (
        <g stroke="var(--color-ink-3)" strokeWidth="1.5" strokeLinejoin="round">
          <rect x="290" y="133" width="30" height="7" rx="2" fill="var(--color-blue-soft)" />
          <rect x="293" y="127" width="26" height="6" rx="2" fill="var(--color-clay-soft)" />
        </g>
      )}

      {/* ---- floor reading lamp (level 15) ---- */}
      {has("readingLamp") && (
        <g stroke="var(--color-ink-2)" strokeWidth="2.2" strokeLinecap="round" fill="none">
          <path d="M344 190v-70" />
          <path d="M330 120h28l-7-16h-14l-7 16Z" fill="var(--color-clay-soft)" strokeLinejoin="round" />
          <path d="M336 190h16" />
        </g>
      )}

      {/* ---- plant (level 5) ---- */}
      {has("plant") && (
        <g strokeLinejoin="round" strokeLinecap="round">
          <path d="M14 190v-16h30v16Z" fill="var(--color-clay-soft)" stroke="var(--color-ink-3)" strokeWidth="1.8" />
          <g stroke="var(--color-sage)" strokeWidth="2.6" fill="none">
            <path d="M29 174v-22M29 161q-10-3-12-13M29 157q10-4 13-14" />
          </g>
          <ellipse cx="15" cy="146" rx="6.5" ry="4.5" fill="var(--color-sage)" transform="rotate(-24 15 146)" />
          <ellipse cx="43" cy="141" rx="6.5" ry="4.5" fill="var(--color-sage)" transform="rotate(22 43 141)" />
          <ellipse cx="29" cy="148" rx="5.5" ry="7.5" fill="var(--color-sage)" />
        </g>
      )}

      {/* ---- the capybara, same silhouette as the avatar ---- */}
      {/* Positioning lives on the outer group: a CSS transform from the idle
          animation would otherwise override a transform attribute on the same
          element and snap the capybara back to the origin. */}
      <g transform="translate(45 110) scale(0.82)">
      <g className={idle ? "animate-breathe" : ""} style={{ transformOrigin: "60px 98px" }}>
        <g stroke="var(--color-fur-dark)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
          <rect x="25" y="82" width="10" height="15" rx="5" fill="var(--color-fur-dark)" />
          <rect x="72" y="82" width="10" height="15" rx="5" fill="var(--color-fur-dark)" />
          <rect x="39" y="84" width="11" height="14" rx="5.5" fill="var(--color-fur)" />
          <rect x="84" y="84" width="11" height="14" rx="5.5" fill="var(--color-fur)" />
          <ellipse cx="87" cy="51" rx="6.5" ry="5.5" fill="var(--color-fur-dark)" transform="rotate(-12 87 51)" />
          <path
            d="M12 73c0-17 15-27 38-27 18 0 32 3 42 10 8 5 15 9 15 16v6c0 7-7 11-17 12-18 1-42 1-56 0C21 89 12 83 12 73Z"
            fill="var(--color-fur)"
          />
        </g>
        <ellipse cx="104" cy="70" rx="3.4" ry="2.8" fill="var(--color-fur-dark)" />
        {/* eyes lowered toward the book */}
        <path d="M89 66q4 3.5 8 0" stroke="var(--color-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <path d="M99 79q3.5 2 6 0" stroke="var(--color-fur-dark)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
      </g>

      {/* ---- open book on the floor, in front of the capybara ---- */}
      <g stroke="var(--color-ink-3)" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M150 190h48l-4-16h-40l-4 16Z" fill="var(--color-surface)" />
        <path d="M174 174v16" />
        <g stroke="var(--color-line-2)" strokeWidth="1.2">
          <path d="M157 179h12M156 184h14M180 179h12M179 184h14" />
        </g>
      </g>
    </svg>
  );
}
