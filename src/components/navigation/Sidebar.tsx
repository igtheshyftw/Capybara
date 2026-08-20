"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { RoleSwitcher } from "./RoleSwitcher";
import { navByRole, isActive, roleForPath } from "@/lib/nav";
import { useStats } from "@/lib/store";
import { useViewer } from "@/lib/viewer";
import { logoutAction } from "@/lib/actions/auth";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const viewer = useViewer();
  const role = viewer.mode === "live" ? viewer.role : roleForPath(pathname);
  const stats = useStats();
  const sections = navByRole[role];

  const person = { name: viewer.name, initials: viewer.initials, sub: subtitleFor(viewer, role) };

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto px-4 py-5">
      <div className="px-1">
        <Logo />
      </div>

      <nav className="flex-1 space-y-6" aria-label="Main">
        {sections.map((section, si) => (
          <div key={section.label ?? si}>
            {section.label && <p className="eyebrow mb-2 px-3">{section.label}</p>}
            <ul className="space-y-[2px]">
              {section.items.map((item) => {
                const active = isActive(pathname, item);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`group relative flex items-center gap-3 rounded-[9px] px-3 py-[9px] text-[13.5px] transition-colors duration-150 ${
                        active ? "text-ink font-medium" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          className="absolute inset-0 rounded-[9px] border border-line bg-surface shadow-[var(--shadow-paper)]"
                          transition={{ type: "spring", stiffness: 420, damping: 36 }}
                          aria-hidden="true"
                        />
                      )}
                      <Icon name={item.icon} size={17} className={`relative shrink-0 ${active ? "text-ink" : "text-ink-3 group-hover:text-ink-2"}`} />
                      <span className="relative truncate">{item.label}</span>
                      {item.href === "/mistakes" && stats.openMistakes > 0 && (
                        <span className="relative ml-auto tabular rounded-full bg-wrong-soft px-1.5 py-[1px] text-[10.5px] font-medium text-wrong-ink">
                          {stats.openMistakes}
                        </span>
                      )}
                      {item.href === "/vocabulary" && stats.dueWords > 0 && (
                        <span className="relative ml-auto tabular rounded-full bg-surface-2 px-1.5 py-[1px] text-[10.5px] font-medium text-ink-2">
                          {stats.dueWords}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="space-y-3">
        {viewer.mode === "demo" && <RoleSwitcher />}
        <Link
          href={role === "student" ? "/profile" : "/account"}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-[11px] border border-transparent px-2 py-2 transition-colors hover:border-line hover:bg-surface"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface-2 text-[12px] font-semibold text-ink-2">
            {person.initials}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[13px] font-medium text-ink">{person.name}</span>
            <span className="block truncate text-[11.5px] text-ink-3">{person.sub}</span>
          </span>
          {role === "student" && (
            <span className="tabular shrink-0 text-[11px] text-ink-3">Lv {stats.level}</span>
          )}
        </Link>

        {viewer.mode === "live" && (
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2 text-[12.5px] text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <Icon name="logout" size={15} />
              Sign out
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function subtitleFor(viewer: { mode: string; email: string; orgName: string | null }, role: string) {
  if (viewer.mode === "live") return viewer.orgName ?? viewer.email;
  return role === "student" ? "Grade 11" : role === "parent" ? "Parent account" : role === "admin" ? "Administrator" : "English & Test Preparation";
}
