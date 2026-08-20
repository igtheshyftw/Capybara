export type WorldKind =
  | "sat" | "ielts" | "toefl" | "vocab" | "writing"
  | "literature" | "reading" | "grammar" | "school"
  | "focus" | "progress" | "tutor" | "mistakes";

/**
 * Miniature environment for a learning-world tile. Each is a small still life
 * built from the same paper vocabulary, so nine tiles read as one family.
 */
export function WorldArt({ kind, className = "" }: { kind: WorldKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 120" fill="none" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {art[kind]}
    </svg>
  );
}

const line = "var(--color-line-2)";
const ink3 = "var(--color-ink-3)";
const surf = "var(--color-surface)";

/** Repeated ruled lines used as "text" inside the miniatures. */
function Rules({ x, y, w, n = 3, gap = 7, stroke = line }: { x: number; y: number; w: number; n?: number; gap?: number; stroke?: string }) {
  return (
    <g stroke={stroke} strokeWidth="2" strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => (
        <line key={i} x1={x} y1={y + i * gap} x2={x + (i === n - 1 ? w * 0.6 : w)} y2={y + i * gap} />
      ))}
    </g>
  );
}

const art: Record<WorldKind, React.ReactNode> = {
  sat: (
    <g>
      <rect x="30" y="16" width="86" height="90" rx="6" fill={surf} stroke={line} strokeWidth="2" />
      <Rules x={42} y={30} w={58} n={2} />
      <g>
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            {[0, 1, 2, 3].map((c) => (
              <circle
                key={c} cx={44 + c * 16} cy={54 + r * 13} r="4.5"
                fill={r === 1 && c === 2 ? "var(--color-ink)" : "none"}
                stroke={r === 1 && c === 2 ? "var(--color-ink)" : line} strokeWidth="1.6"
              />
            ))}
          </g>
        ))}
      </g>
      <circle cx="147" cy="52" r="24" fill="var(--color-blue-soft)" stroke={line} strokeWidth="2" />
      <path d="M147 38v14l9 6" stroke="var(--color-blue)" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="126" y="86" width="42" height="8" rx="4" fill="var(--color-surface-3)" />
    </g>
  ),
  ielts: (
    <g>
      {[
        { x: 26, y: 18, fill: "var(--color-sage-soft)", stroke: "var(--color-sage)" },
        { x: 104, y: 18, fill: "var(--color-blue-soft)", stroke: "var(--color-blue)" },
        { x: 26, y: 66, fill: "var(--color-ochre-soft)", stroke: "var(--color-ochre)" },
        { x: 104, y: 66, fill: "var(--color-clay-soft)", stroke: "var(--color-clay)" },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width="70" height="38" rx="6" fill={b.fill} stroke={line} strokeWidth="1.8" />
          <Rules x={b.x + 12} y={b.y + 14} w={44} n={2} gap={8} stroke={b.stroke} />
        </g>
      ))}
    </g>
  ),
  toefl: (
    <g>
      <rect x="22" y="24" width="92" height="50" rx="9" fill={surf} stroke={line} strokeWidth="2" />
      <path d="M44 74v13l17-13" fill={surf} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <Rules x={36} y={42} w={64} n={3} gap={9} />
      <circle cx="150" cy="52" r="15" fill="var(--color-blue-soft)" stroke={line} strokeWidth="2" />
      <path d="M150 44v10M146 47v4M154 47v4" stroke="var(--color-blue)" strokeWidth="2.4" strokeLinecap="round" />
      <g stroke="var(--color-blue)" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75">
        <path d="M172 42a16 16 0 0 1 0 20" />
        <path d="M180 34a28 28 0 0 1 0 36" />
      </g>
      <rect x="128" y="82" width="44" height="8" rx="4" fill="var(--color-surface-3)" />
    </g>
  ),
  vocab: (
    <g>
      <rect x="34" y="30" width="94" height="62" rx="7" fill="var(--color-surface-3)" stroke={line} strokeWidth="2" transform="rotate(-8 81 61)" />
      <rect x="44" y="24" width="94" height="62" rx="7" fill="var(--color-surface-2)" stroke={line} strokeWidth="2" transform="rotate(-3 91 55)" />
      <rect x="54" y="20" width="94" height="62" rx="7" fill={surf} stroke={line} strokeWidth="2" />
      <text x="101" y="47" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="19" fill="var(--color-ink)">candid</text>
      <Rules x={72} y={60} w={58} n={2} gap={8} />
    </g>
  ),
  writing: (
    <g>
      <rect x="34" y="14" width="96" height="94" rx="6" fill={surf} stroke={line} strokeWidth="2" />
      <Rules x={46} y={30} w={72} n={2} />
      <rect x="46" y="46" width="72" height="1.5" fill="var(--color-ochre-soft)" />
      <Rules x={46} y={54} w={72} n={4} />
      <path d="M104 92l14-4-3-11-14 4 3 11Z" fill="var(--color-clay-soft)" stroke={line} strokeWidth="1.6" />
      <g stroke="var(--color-ochre)" strokeWidth="2.6" strokeLinecap="round">
        <path d="M140 100 168 40" />
      </g>
      <path d="M168 40l4-9 3 10-7-1Z" fill="var(--color-ink-2)" />
      <path d="M139 100l-5 8 9-3" fill="var(--color-clay-soft)" stroke={line} strokeWidth="1.5" />
    </g>
  ),
  literature: (
    <g>
      <path d="M100 30c-14-8-30-8-44-3v66c14-5 30-5 44 3V30Z" fill={surf} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <path d="M100 30c14-8 30-8 44-3v66c-14-5-30-5-44 3V30Z" fill={surf} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <Rules x={66} y={44} w={26} n={4} gap={9} />
      <Rules x={108} y={44} w={26} n={4} gap={9} />
      <text x="100" y="26" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="26" fill="var(--color-plum)">&#8220;</text>
    </g>
  ),
  reading: (
    <g>
      <rect x="40" y="16" width="120" height="90" rx="6" fill={surf} stroke={line} strokeWidth="2" />
      <Rules x={54} y={32} w={92} n={2} />
      <rect x="54" y="47" width="66" height="11" rx="3" fill="var(--color-ochre-soft)" />
      <Rules x={54} y={68} w={92} n={3} />
      <path d="M126 45v18M126 45h-5M126 63h-5" stroke="var(--color-clay)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="134" cy="54" r="4.5" fill="var(--color-clay-soft)" stroke="var(--color-clay)" strokeWidth="1.8" />
    </g>
  ),
  grammar: (
    <g>
      <line x1="26" y1="62" x2="174" y2="62" stroke={ink3} strokeWidth="2.4" />
      <line x1="86" y1="40" x2="86" y2="84" stroke={ink3} strokeWidth="2.4" />
      <line x1="130" y1="48" x2="130" y2="62" stroke={ink3} strokeWidth="2" />
      <path d="M146 62l-7 16" stroke={ink3} strokeWidth="2" strokeLinecap="round" />
      <rect x="38" y="46" width="40" height="12" rx="3" fill="var(--color-sage-soft)" />
      <rect x="94" y="46" width="30" height="12" rx="3" fill="var(--color-blue-soft)" />
      <rect x="136" y="46" width="30" height="12" rx="3" fill="var(--color-ochre-soft)" />
      <rect x="132" y="78" width="30" height="10" rx="3" fill="var(--color-surface-3)" />
      <text x="100" y="28" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="16" fill={ink3}>;</text>
    </g>
  ),
  school: (
    <g>
      <rect x="42" y="16" width="102" height="90" rx="6" fill={surf} stroke={line} strokeWidth="2" />
      <line x1="62" y1="16" x2="62" y2="106" stroke="var(--color-clay-soft)" strokeWidth="2" />
      <g fill="var(--color-line)">
        {[0, 1, 2, 3].map((i) => <circle key={i} cx="52" cy={32 + i * 20} r="3" />)}
      </g>
      <Rules x={72} y={34} w={58} n={4} gap={17} />
      <rect x="150" y="40" width="12" height="52" rx="3" fill="var(--color-sage)" />
      <rect x="164" y="52" width="10" height="40" rx="3" fill="var(--color-ochre)" />
    </g>
  ),
  focus: (
    <g>
      <circle cx="100" cy="60" r="36" fill={surf} stroke={line} strokeWidth="2" />
      <circle cx="100" cy="60" r="36" fill="none" stroke="var(--color-sage)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="226" strokeDashoffset="80" transform="rotate(-90 100 60)" />
      <text x="100" y="66" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="17" fontWeight="600" fill="var(--color-ink)">24:36</text>
      <rect x="42" y="98" width="116" height="8" rx="4" fill="var(--color-surface-3)" />
    </g>
  ),
  progress: (
    <g>
      <path d="M28 92 62 66l24 16 30-38 26 18 24-30" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M28 92 62 66l24 16 30-38 26 18 24-30V106H28V92Z" fill="var(--color-sage-soft)" opacity="0.65" />
      {[[62, 66], [86, 82], [116, 44], [142, 62]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill={surf} stroke="var(--color-ink)" strokeWidth="2" />
      ))}
    </g>
  ),
  tutor: (
    <g>
      <rect x="26" y="24" width="106" height="46" rx="10" fill={surf} stroke={line} strokeWidth="2" />
      <path d="M46 70v12l16-12" fill={surf} stroke={line} strokeWidth="2" strokeLinejoin="round" />
      <Rules x={40} y={40} w={76} n={2} gap={11} />
      <circle cx="156" cy="60" r="22" fill="var(--color-plum-soft)" stroke={line} strokeWidth="2" />
      <path d="M156 48l2.6 7.4 7.4 2.6-7.4 2.6L156 68l-2.6-7.4-7.4-2.6 7.4-2.6L156 48Z" fill="var(--color-plum)" />
    </g>
  ),
  mistakes: (
    <g>
      <rect x="30" y="18" width="94" height="86" rx="6" fill={surf} stroke={line} strokeWidth="2" />
      <Rules x={44} y={34} w={66} n={2} />
      <g stroke="var(--color-wrong)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M46 58l10 10M56 58l-10 10" />
      </g>
      <Rules x={64} y={60} w={46} n={2} gap={9} />
      <g stroke="var(--color-correct)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46 84l6 6 11-12" />
      </g>
      <circle cx="150" cy="52" r="20" fill="var(--color-blue-soft)" fillOpacity="0.6" stroke="var(--color-ink-2)" strokeWidth="2.4" />
      <path d="M165 67 178 80" stroke="var(--color-ink-2)" strokeWidth="4.5" strokeLinecap="round" />
    </g>
  ),
};
