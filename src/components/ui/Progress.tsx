"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a number upward once it enters the viewport. */
export function useCountUp<T extends HTMLElement = HTMLSpanElement>(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const ref = useRef<T>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setValue(target); return; }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(target * eased);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

export function CountUp({ to, suffix = "", decimals = 0, className = "" }: { to: number; suffix?: string; decimals?: number; className?: string }) {
  const { value, ref } = useCountUp(to);
  return (
    <span ref={ref} className={`tabular ${className}`}>
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function ProgressRing({
  value, size = 64, stroke = 5, label, sublabel, accent = "var(--color-ink)",
}: {
  value: number; size?: number; stroke?: number; label?: string; sublabel?: string; accent?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const { value: shown, ref } = useCountUp(value, 850);
  const offset = c - (Math.min(100, Math.max(0, shown)) / 100) * c;

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-surface-3)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={accent} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
        />
      </svg>
      <span ref={ref} className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="tabular font-semibold text-ink" style={{ fontSize: size * 0.26 }}>
          {label ?? `${Math.round(shown)}%`}
        </span>
        {sublabel && <span className="mt-0.5 text-[9px] uppercase tracking-[0.09em] text-ink-3">{sublabel}</span>}
      </span>
    </div>
  );
}

export function MasteryBar({
  label, value, delta, accent = "var(--color-ink)", showValue = true, height = 8, sublabel,
}: {
  label?: string; value: number; delta?: number; accent?: string; showValue?: boolean; height?: number; sublabel?: string;
}) {
  const { value: shown, ref } = useCountUp<HTMLDivElement>(value, 950);
  return (
    <div ref={ref}>
      {label && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="text-[13px] font-medium text-ink">{label}</span>
          <span className="flex items-baseline gap-2">
            {typeof delta === "number" && delta !== 0 && (
              <span className={`tabular text-[11px] ${delta > 0 ? "text-correct" : "text-wrong"}`}>
                {delta > 0 ? "+" : ""}{delta}
              </span>
            )}
            {showValue && <span className="tabular text-[13px] font-semibold text-ink-2">{Math.round(shown)}%</span>}
          </span>
        </div>
      )}
      <div className="w-full overflow-hidden rounded-full bg-surface-3" style={{ height }} role="presentation">
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, shown))}%`, background: accent }}
        />
      </div>
      {sublabel && <p className="mt-1.5 text-[11.5px] text-ink-3">{sublabel}</p>}
    </div>
  );
}

/** Blocked mastery meter — ten segments, the way the spec sketches it. */
export function MasteryBlocks({ value, accent = "var(--color-ink)" }: { value: number; accent?: string }) {
  const filled = Math.round(value / 10);
  return (
    <div className="flex gap-[3px]" role="presentation">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="h-2.5 w-[7px] rounded-[2px] transition-colors duration-300"
          style={{ background: i < filled ? accent : "var(--color-surface-3)", transitionDelay: `${i * 28}ms` }}
        />
      ))}
    </div>
  );
}
