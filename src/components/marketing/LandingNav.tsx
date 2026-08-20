"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { label: "Learning worlds", href: "#worlds" },
  { label: "How it works", href: "#how" },
  { label: "Inside the product", href: "#showcase" },
  { label: "For parents & teachers", href: "#roles" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-paper/88 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Sections">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13.5px] text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <ButtonLink href="/dashboard" variant="tertiary" size="sm">Sign in</ButtonLink>
          <ButtonLink href="/dashboard" size="sm" iconRight="arrow-right">Start learning</ButtonLink>
        </div>
        <button
          className="ml-auto rounded-[9px] p-2 text-ink-2 transition-colors hover:bg-surface-2 sm:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <Icon name={open ? "close" : "menu"} size={20} />
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-paper px-4 py-3 sm:hidden">
          <nav className="flex flex-col" aria-label="Sections">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-[9px] px-2 py-2.5 text-[14px] text-ink-2 hover:bg-surface-2">
                {l.label}
              </a>
            ))}
          </nav>
          <ButtonLink href="/dashboard" full className="mt-2" iconRight="arrow-right">Start learning</ButtonLink>
        </div>
      )}
    </header>
  );
}
