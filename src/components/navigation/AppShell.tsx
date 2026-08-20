"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { CommandSearch } from "./CommandSearch";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/Button";
import { navByRole, isActive, roleForPath } from "@/lib/nav";
import { useApp, useDispatch, useStats } from "@/lib/store";
import { useViewer } from "@/lib/viewer";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role: storedRole } = useApp();
  const dispatch = useDispatch();
  const stats = useStats();
  const viewer = useViewer();
  // A signed-in account has exactly one role; the URL only decides in demo mode.
  const role = viewer.mode === "live" ? viewer.role : roleForPath(pathname);
  const [drawer, setDrawer] = useState(false);
  const [search, setSearch] = useState(false);

  // ⌘K / Ctrl+K anywhere in the app
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((s) => !s);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => { setDrawer(false); }, [pathname]);

  // Keep the persisted choice in step with wherever the user actually navigated.
  useEffect(() => {
    if (role !== storedRole) dispatch({ type: "set-role", role });
  }, [role, storedRole, dispatch]);

  const mobileItems = navByRole[role].flatMap((s) => s.items).filter((i) => i.mobile).slice(0, 5);

  return (
    <div className="min-h-dvh bg-paper">
      {/* ---------- desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[252px] border-r border-line bg-paper lg:block">
        <Sidebar />
      </aside>

      {/* ---------- mobile drawer ---------- */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-40 bg-ink/25 lg:hidden"
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 460, damping: 42 }}
              className="fixed inset-y-0 left-0 z-50 w-[272px] border-r border-line bg-paper lg:hidden"
              aria-label="Navigation"
            >
              <Sidebar onNavigate={() => setDrawer(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-[252px]">
        {/* ---------- top bar ---------- */}
        <header className="sticky top-0 z-30 border-b border-line bg-paper/85 backdrop-blur-md">
          <div className="flex h-14 items-center gap-2 px-4 sm:px-6 lg:h-[60px] lg:px-8">
            <button
              onClick={() => setDrawer(true)}
              className="-ml-1.5 rounded-[9px] p-2 text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink lg:hidden"
              aria-label="Open navigation"
            >
              <Icon name="menu" size={20} />
            </button>

            <div className="lg:hidden"><Logo compact /></div>

            <button
              onClick={() => setSearch(true)}
              className="hidden h-9 items-center gap-2.5 rounded-[9px] border border-line bg-surface px-3 text-[13px] text-ink-3 transition-colors hover:border-line-2 hover:text-ink-2 lg:flex lg:w-[300px] xl:w-[380px]"
            >
              <Icon name="search" size={16} />
              <span>Search everything</span>
              <kbd className="ml-auto hidden rounded-[5px] border border-line bg-surface-2 px-1.5 py-[1px] text-[10.5px] lg:block">⌘K</kbd>
            </button>

            <div className="ml-auto hidden items-center gap-1.5 lg:flex">
              {role === "student" && (
                <>
                  <Link
                    href="/focus"
                    className="flex h-9 items-center gap-2 rounded-[9px] px-3 text-[13px] text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
                  >
                    <Icon name="clock" size={16} />
                    Focus
                  </Link>
                  <Link
                    href="/progress"
                    className="flex h-9 items-center gap-2 rounded-[9px] border border-line bg-surface px-3 text-[13px] transition-colors hover:border-line-2"
                    title={`${stats.streak}-day study streak`}
                  >
                    <Icon name="flame" size={15} className="text-clay" />
                    <span className="tabular font-medium text-ink">{stats.streak}</span>
                    <span className="text-ink-3">day streak</span>
                  </Link>
                </>
              )}
              {role === "teacher" && (
                <Link
                  href="/teacher/assignments/new"
                  className="flex h-9 items-center gap-2 rounded-[9px] bg-ink px-3.5 text-[13px] font-medium text-ink-inv transition-colors hover:bg-[#35322b]"
                >
                  <Icon name="plus" size={15} />
                  New assignment
                </Link>
              )}
              {role === "parent" && (
                <Link
                  href="/parent/report"
                  className="flex h-9 items-center gap-2 rounded-[9px] border border-line bg-surface px-3.5 text-[13px] transition-colors hover:border-line-2"
                >
                  <Icon name="print" size={15} />
                  Progress report
                </Link>
              )}
            </div>

            <div className="ml-auto flex items-center lg:hidden">
              <IconButton name="search" label="Search" onClick={() => setSearch(true)} size={38} />
            </div>
          </div>
        </header>

        <main id="main" className="pb-24 lg:pb-12">
          {children}
        </main>
      </div>

      {/* ---------- mobile bottom navigation ---------- */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
        aria-label="Primary"
      >
        <ul className="flex">
          {mobileItems.map((item) => {
            const active = isActive(pathname, item);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="relative flex flex-col items-center gap-[3px] py-2.5 text-[10.5px]"
                >
                  {active && (
                    <motion.span
                      layoutId="mobile-active"
                      className="absolute inset-x-4 top-0 h-[2px] rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 460, damping: 38 }}
                    />
                  )}
                  <Icon name={item.icon} size={20} className={active ? "text-ink" : "text-ink-3"} />
                  <span className={`px-0.5 text-center leading-tight ${active ? "font-medium text-ink" : "text-ink-3"}`}>
                    {item.short ?? item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <CommandSearch open={search} onClose={() => setSearch(false)} />
    </div>
  );
}
