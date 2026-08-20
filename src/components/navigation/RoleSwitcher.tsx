"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "@/lib/store";
import { roleForPath, roleHome } from "@/lib/nav";
import type { Role } from "@/lib/types";

const roles: { id: Role; label: string }[] = [
  { id: "student", label: "Student" },
  { id: "parent", label: "Parent" },
  { id: "teacher", label: "Teacher" },
];

/**
 * Demo-only role switcher. Each role gets its own navigation, its own home
 * route and a different interface — not the same dashboard relabelled.
 * Remove this component and the `role` field in the store to ship a single role.
 */
export function RoleSwitcher({ compact = false }: { compact?: boolean }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const role = roleForPath(pathname);

  function pick(next: Role) {
    if (next === role) return;
    dispatch({ type: "set-role", role: next });
    router.push(roleHome[next]);
  }

  return (
    <div className={compact ? "" : "rounded-[12px] border border-line bg-surface-2/60 p-2.5"}>
      {!compact && (
        <p className="eyebrow mb-2 px-0.5">
          Demo view
        </p>
      )}
      <div
        className="relative flex rounded-[9px] border border-line bg-surface p-[3px]"
        role="radiogroup"
        aria-label="Switch demo role"
      >
        {roles.map((r) => {
          const active = r.id === role;
          return (
            <button
              key={r.id}
              role="radio"
              aria-checked={active}
              onClick={() => pick(r.id)}
              className={`relative flex-1 rounded-[7px] px-2 py-[6px] text-[12px] font-medium transition-colors duration-200 ${
                active ? "text-ink-inv" : "text-ink-3 hover:text-ink"
              }`}
            >
              {active && (
                <span className="absolute inset-0 rounded-[7px] bg-ink transition-all duration-300" aria-hidden="true" />
              )}
              <span className="relative">{r.label}</span>
            </button>
          );
        })}
      </div>
      {!compact && (
        <p className="mt-2 px-0.5 text-[11px] leading-snug text-ink-3">
          Switches the whole interface, not just the labels.
        </p>
      )}
    </div>
  );
}
