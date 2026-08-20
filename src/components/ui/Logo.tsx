import Link from "next/link";

/** Capybara head resolved into two open page shapes. */
export function LogoMark({ size = 30, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      {/* open book / two pages */}
      <path d="M3 24V8.5c3.6-1.6 7.5-1.6 11 0V24c-3.5-1.6-7.4-1.6-11 0Z" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M29 24V8.5c-3.6-1.6-7.5-1.6-11 0V24c3.5-1.6 7.4-1.6 11 0Z" fill="var(--color-surface)" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      {/* capybara head rising from the gutter */}
      <ellipse cx="12.6" cy="10.6" rx="2" ry="1.8" fill="currentColor" />
      <ellipse cx="19.4" cy="10.6" rx="2" ry="1.8" fill="currentColor" />
      <path d="M10.5 16.5c0-3.2 2.4-5.4 5.5-5.4s5.5 2.2 5.5 5.4c0 3-2 4.8-5.5 4.8s-5.5-1.8-5.5-4.8Z" fill="currentColor" />
      <ellipse cx="14.4" cy="18.4" rx="0.75" ry="0.6" fill="var(--color-surface)" />
      <ellipse cx="17.6" cy="18.4" rx="0.75" ry="0.6" fill="var(--color-surface)" />
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
