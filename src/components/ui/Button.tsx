"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "tertiary" | "danger";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-[10px] " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-150 " +
  "active:scale-[0.975] disabled:opacity-45 disabled:pointer-events-none select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ink-inv border border-ink hover:bg-[#35322b] shadow-[0_1px_2px_rgba(38,36,31,0.12)]",
  secondary: "bg-surface text-ink border border-line-2 hover:bg-surface-2 hover:border-ink-3",
  tertiary: "bg-transparent text-ink-2 border border-transparent hover:text-ink hover:bg-surface-2",
  danger: "bg-surface text-wrong-ink border border-wrong/35 hover:bg-wrong-soft",
};

const sizes: Record<Size, string> = {
  sm: "text-[13px] h-8 px-3",
  md: "text-[14px] h-10 px-4",
  lg: "text-[15px] h-12 px-6",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
  className?: string;
  full?: boolean;
}

export function Button({
  variant = "primary", size = "md", icon, iconRight, children, className = "", full,
  ...rest
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 17} />}
    </button>
  );
}

export function ButtonLink({
  variant = "primary", size = "md", icon, iconRight, children, className = "", full, href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${full ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} size={size === "sm" ? 15 : 17} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === "sm" ? 15 : 17} />}
    </Link>
  );
}

/** Square icon-only button. Always pass a label — it becomes the accessible name. */
export function IconButton({
  name, label, size = 36, active, className = "", ...rest
}: { name: IconName; label: string; size?: number; active?: boolean } & ComponentProps<"button">) {
  return (
    <button
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`inline-flex items-center justify-center rounded-[9px] border transition-colors duration-150 active:scale-[0.94] ${
        active
          ? "bg-ink text-ink-inv border-ink"
          : "bg-transparent text-ink-2 border-transparent hover:bg-surface-2 hover:text-ink"
      } ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    >
      <Icon name={name} size={Math.round(size * 0.48)} />
    </button>
  );
}
