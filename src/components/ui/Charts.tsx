"use client";

import { useId, useMemo, useState } from "react";

/** Minimal line chart with an area wash. No library, no axes clutter. */
export function LineChart({
  data, height = 132, accent = "var(--color-ink)", valueSuffix = "", ariaLabel,
}: {
  data: { label: string; value: number }[];
  height?: number;
  accent?: string;
  valueSuffix?: string;
  ariaLabel: string;
}) {
  const id = useId();
  const [hover, setHover] = useState<number | null>(null);
  const W = 100, H = 40, pad = 3;

  const { path, area, points, min, max } = useMemo(() => {
    const values = data.map((d) => d.value);
    const min = Math.min(...values), max = Math.max(...values);
    const span = max - min || 1;
    const pts = data.map((d, i) => ({
      x: pad + (i / Math.max(1, data.length - 1)) * (W - pad * 2),
      y: H - pad - ((d.value - min) / span) * (H - pad * 2),
    }));
    const path = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
    const area = `${path} L${pts[pts.length - 1].x.toFixed(2)} ${H} L${pts[0].x.toFixed(2)} ${H} Z`;
    return { path, area, points: pts, min, max };
  }, [data]);

  const active = hover ?? data.length - 1;

  return (
    <figure className="w-full">
      <div className="relative" style={{ height }}>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" role="img" aria-label={ariaLabel}>
          <defs>
            <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.16" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#g-${id})`} />
          <path d={path} fill="none" stroke={accent} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {points.map((p, i) => (
            <circle
              key={i} cx={p.x} cy={p.y} r={i === active ? 1.5 : 0.9}
              fill={i === active ? accent : "var(--color-surface)"} stroke={accent} strokeWidth="0.7"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        {/* hover targets sit above the svg so the chart itself stays non-interactive */}
        <div className="absolute inset-0 flex">
          {data.map((d, i) => (
            <button
              key={d.label}
              className="h-full flex-1 cursor-default focus:outline-none focus-visible:bg-surface-2/70"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-label={`${d.label}: ${d.value}${valueSuffix}`}
              type="button"
            />
          ))}
        </div>
      </div>
      <figcaption className="mt-2 flex items-baseline justify-between text-[11.5px] text-ink-3">
        <span>{data[0]?.label}</span>
        <span className="tabular font-medium text-ink">
          {hover === null ? "Latest" : data[active]?.label} · {data[active]?.value}{valueSuffix}
        </span>
        <span>{data[data.length - 1]?.label}</span>
      </figcaption>
      <span className="sr-only">Range {min}{valueSuffix} to {max}{valueSuffix}.</span>
    </figure>
  );
}

/** Vertical bars with an optional target line. */
export function BarChart({
  data, height = 120, accent = "var(--color-ink)", suffix = "", ariaLabel, target,
}: {
  data: { label: string; value: number }[];
  height?: number; accent?: string; suffix?: string; ariaLabel: string; target?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), target ?? 0) || 1;
  return (
    <figure role="img" aria-label={ariaLabel} className="w-full">
      <div className="relative flex items-end gap-1.5" style={{ height }}>
        {typeof target === "number" && (
          <div
            className="pointer-events-none absolute inset-x-0 border-t border-dashed border-line-2"
            style={{ bottom: `${(target / max) * 100}%` }}
          >
            <span className="absolute -top-4 right-0 text-[10px] text-ink-3">target {target}</span>
          </div>
        )}
        {data.map((d) => (
          <div key={d.label} className="group flex h-full flex-1 flex-col justify-end" title={`${d.label}: ${d.value}${suffix}`}>
            <div
              className="w-full rounded-t-[4px] transition-[height,background-color] duration-500 group-hover:opacity-85"
              style={{
                height: `${Math.max(3, (d.value / max) * 100)}%`,
                background: typeof target === "number" && d.value < target ? "var(--color-surface-3)" : accent,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-[10.5px] text-ink-3">{d.label}</span>
        ))}
      </div>
    </figure>
  );
}

/** Horizontal skill bars, sorted by the caller. */
export function SkillChart({
  data, accentFor,
}: {
  data: { skill: string; value: number; attempts?: number }[];
  accentFor?: (v: number) => string;
}) {
  const accent = accentFor ?? ((v: number) => (v >= 75 ? "var(--color-sage)" : v >= 60 ? "var(--color-ochre)" : "var(--color-clay)"));
  return (
    <ul className="space-y-3.5">
      {data.map((d) => (
        <li key={d.skill}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3">
            <span className="truncate text-[13px] text-ink">{d.skill}</span>
            <span className="shrink-0 tabular text-[12px] text-ink-2">
              {d.value}%{d.attempts != null && <span className="ml-1.5 text-ink-3">· {d.attempts}</span>}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
            <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${d.value}%`, background: accent(d.value) }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Sparkline for stat cards. */
export function Sparkline({ data, accent = "var(--color-ink-3)", width = 72, height = 24 }: { data: number[]; accent?: string; width?: number; height?: number }) {
  const min = Math.min(...data), max = Math.max(...data), span = max - min || 1;
  const d = data
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (data.length - 1)) * width).toFixed(1)} ${(height - ((v - min) / span) * height).toFixed(1)}`)
    .join(" ");
  return (
    <svg width={width} height={height} fill="none" aria-hidden="true" className="overflow-visible">
      <path d={d} stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
