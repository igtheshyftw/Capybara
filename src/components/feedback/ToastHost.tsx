"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp, useDispatch } from "@/lib/store";
import { Capybara } from "@/components/mascot/Capybara";
import { Icon } from "@/components/ui/Icon";

/**
 * Small, quiet confirmations. Never more than three, never longer than four seconds.
 */
export function ToastHost() {
  const { toasts } = useApp();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!toasts.length) return;
    const timers = toasts.map((t) =>
      setTimeout(() => dispatch({ type: "dismiss-toast", id: t.id }), 4000),
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dispatch]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-[76px] z-[80] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end"
      role="status"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex w-full max-w-[340px] items-start gap-3 rounded-[13px] border border-line bg-surface p-3 pr-3.5 shadow-[var(--shadow-float)]"
          >
            {t.tone === "good" ? (
              <Capybara variant="plain" mood="pleased" size={34} className="mt-[-2px] shrink-0" />
            ) : (
              <span className="mt-[3px] flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-2 text-ink-2">
                <Icon name="note" size={14} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-medium leading-snug text-ink">{t.title}</p>
              {t.body && <p className="mt-0.5 text-[12.5px] leading-snug text-ink-3">{t.body}</p>}
            </div>
            <button
              onClick={() => dispatch({ type: "dismiss-toast", id: t.id })}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1 text-ink-3 transition-colors hover:bg-surface-2 hover:text-ink"
              aria-label="Dismiss"
            >
              <Icon name="close" size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
