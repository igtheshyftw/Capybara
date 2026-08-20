import Link from "next/link";
import { Capybara } from "@/components/mascot/Capybara";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <header className="border-b border-line px-4 py-4 sm:px-8">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="max-w-md text-center">
          <Capybara variant="detective" size={84} className="mx-auto" />
          <p className="eyebrow mt-6">404</p>
          <h1 className="serif-display mt-2 text-[32px]">This page is not in the library.</h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
            The link may be out of date, or the material may have moved. Detective Bara has
            checked the shelf twice.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <ButtonLink href="/dashboard">Go to dashboard</ButtonLink>
            <ButtonLink href="/learn" variant="secondary">Browse courses</ButtonLink>
          </div>
          <p className="mt-8 text-[12.5px] text-ink-3">
            Or press <kbd className="rounded-[4px] border border-line bg-surface px-1.5 py-0.5">⌘K</kbd> anywhere in the app to search.
          </p>
        </div>
      </main>
      <footer className="border-t border-line px-4 py-5 text-center text-[12px] text-ink-3 sm:px-8">
        <Link href="/" className="underline decoration-line-2 underline-offset-4 hover:text-ink">Capybara Motion</Link>
      </footer>
    </div>
  );
}
