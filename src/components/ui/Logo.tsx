import Link from "next/link";

/** A capybara in side profile, sitting on an open book. */
export function LogoMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      {/* open book */}
      <path
        d="M2 23.5c4.4-2 8.6-2 12.6 0v5c-4-2-8.2-2-12.6 0v-5ZM30 23.5c-4.4-2-8.6-2-12.6 0v5c4-2 8.2-2 12.6 0v-5Z"
        fill="var(--color-surface)"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* capybara loaf */}
      <ellipse cx="21.4" cy="11.6" rx="1.9" ry="1.6" fill="currentColor" />
      <path
        d="M5 17.2c0-4.3 3.9-6.8 9.8-6.8 4.7 0 8.2.9 10.8 2.6 2 1.3 3.4 2.3 3.4 4v1.5c0 1.8-1.8 2.8-4.3 3-4.6.3-10.8.3-14.3 0C6.6 21.2 5 19.8 5 17.2Z"
        fill="currentColor"
      />
      <ellipse cx="24" cy="15.6" rx="1" ry="1.05" fill="var(--color-surface)" />
      <ellipse cx="28.3" cy="17.4" rx="1" ry="0.8" fill="var(--color-surface)" opacity="0.65" />
    </svg>
  );
}

export function Logo({ href = "/", compact = false, className = "" }: { href?: string; compact?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-[8px] text-ink ${className}`}
      aria-label="Capybara Motion — home"
    >
      <LogoMark size={compact ? 26 : 30} className="transition-transform duration-300 group-hover:-translate-y-[1.5px]" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="serif-display text-[17px] tracking-[-0.01em]">Capybara Motion</span>
          <span className="mt-[3px] text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-3">
            Learning Platform
          </span>
        </span>
      )}
    </Link>
  );
}
