import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { Capybara } from "@/components/mascot/Capybara";

/** The frame every signed-out page shares: quiet, centred, one job. */
export function AuthShell({
  title, description, children, footer, variant = "plain",
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  variant?: "plain" | "professor" | "vocab";
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <header className="px-4 py-5 sm:px-8">
        <Logo />
      </header>

      <main id="main" className="flex flex-1 items-start justify-center px-4 py-8 sm:py-14">
        <div className="w-full max-w-[420px]">
          <div className="mb-6 text-center">
            <Capybara variant={variant} size={64} className="mx-auto" />
            <h1 className="serif-display mt-4 text-[30px]">{title}</h1>
            {description && (
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">{description}</p>
            )}
          </div>

          <div className="paper-card p-6 sm:p-7">{children}</div>

          {footer && <div className="mt-5 text-center text-[13px] text-ink-2">{footer}</div>}
        </div>
      </main>

      <footer className="border-t border-line px-4 py-5 text-center text-[12px] text-ink-3 sm:px-8">
        <Link href="/" className="underline decoration-line-2 underline-offset-4 hover:text-ink">
          Capybara Motion
        </Link>
      </footer>
    </div>
  );
}
