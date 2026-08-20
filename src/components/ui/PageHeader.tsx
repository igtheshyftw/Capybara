import type { ReactNode } from "react";

export function PageHeader({
  eyebrow, title, description, action, serif = false, className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  serif?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="min-w-0 max-w-2xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className={serif ? "serif-display text-[30px] sm:text-[38px]" : "text-[23px] font-semibold tracking-[-0.02em] sm:text-[27px]"}>
          {title}
        </h1>
        {description && <p className="mt-2 text-[14px] leading-relaxed text-ink-2 sm:text-[15px]">{description}</p>}
      </div>
      {action && (
        <div className="flex shrink-0 flex-wrap items-center gap-2 [&>*]:flex-1 sm:[&>*]:flex-none">{action}</div>
      )}
    </div>
  );
}

/** Standard page frame: consistent gutters and max width across every screen. */
export function PageBody({ children, className = "", wide = false }: { children: ReactNode; className?: string; wide?: boolean }) {
  return (
    <div className={`mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 ${wide ? "max-w-[1500px]" : "max-w-[1240px]"} ${className}`}>
      {children}
    </div>
  );
}
