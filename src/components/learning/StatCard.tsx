"use client";

import { Icon, type IconName } from "@/components/ui/Icon";
import { CountUp } from "@/components/ui/Progress";
import { Sparkline } from "@/components/ui/Charts";

export function StatCard({
  label, value, suffix = "", decimals = 0, delta, deltaLabel, icon, trend, footnote, accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
  delta?: number;
  deltaLabel?: string;
  icon?: IconName;
  trend?: number[];
  footnote?: string;
  accent?: string;
}) {
  return (
    <div className="paper-card flex flex-col p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12.5px] font-medium text-ink-2">{label}</p>
        {icon && (
          <span className="shrink-0 text-ink-3">
            <Icon name={icon} size={16} />
          </span>
        )}
      </div>
      <p className="mt-2.5 flex items-baseline gap-1.5">
        <span className="tabular text-[27px] font-semibold leading-none tracking-[-0.02em] text-ink">
          <CountUp to={value} suffix={suffix} decimals={decimals} />
        </span>
        {typeof delta === "number" && delta !== 0 && (
          <span className={`tabular flex items-center gap-0.5 text-[12px] font-medium ${delta > 0 ? "text-correct" : "text-wrong"}`}>
            <Icon name={delta > 0 ? "trend-up" : "trend-down"} size={13} />
            {delta > 0 ? "+" : ""}{delta}{deltaLabel}
          </span>
        )}
      </p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-3">
        {footnote && <p className="text-[11.5px] leading-snug text-ink-3">{footnote}</p>}
        {trend && (
          <span className="hidden shrink-0 sm:block">
            <Sparkline data={trend} accent={accent ?? "var(--color-line-2)"} />
          </span>
        )}
      </div>
    </div>
  );
}
