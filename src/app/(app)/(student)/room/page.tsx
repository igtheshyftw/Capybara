"use client";

import { useState } from "react";
import { PageBody, PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, Tag } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MasteryBar } from "@/components/ui/Progress";
import { CapybaraDesk } from "@/components/mascot/CapybaraDesk";
import { CapybaraGuide } from "@/components/learning/CapybaraGuide";
import { useStats } from "@/lib/store";
import { roomItems } from "@/lib/data/people";

export default function RoomPage() {
  const stats = useStats();
  const [preview, setPreview] = useState<number | null>(null);
  const shownLevel = preview ?? stats.level;

  const unlocked = roomItems.filter((i) => i.level <= stats.level);
  const locked = roomItems.filter((i) => i.level > stats.level);
  const nextItem = locked[0];

  return (
    <PageBody>
      <PageHeader
        eyebrow="Study room"
        title="A room that fills up as you work"
        serif
        description="The only reward system here that is purely for pleasure. Items unlock by level and stay unlocked — nothing expires and nothing can be bought."
      />

      <div className="mt-7 grid gap-3.5 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow mb-1">
                {preview !== null && preview !== stats.level ? `Previewing level ${preview}` : "Your room"}
              </p>
              <p className="text-[15px] font-semibold text-ink">Level {shownLevel}</p>
            </div>
            {preview !== null && preview !== stats.level && (
              <button
                onClick={() => setPreview(null)}
                className="text-[12.5px] text-ink-2 underline decoration-line-2 underline-offset-4 hover:text-ink"
              >
                Back to your room
              </button>
            )}
          </div>

          <div className="overflow-hidden rounded-[14px] border border-line">
            <CapybaraDesk level={shownLevel} idle title="Your capybara's study room" />
          </div>

          <div className="mt-5">
            <MasteryBar
              label={`Level ${stats.level}`} value={(stats.xpIntoLevel / stats.xpToNext) * 100}
              accent="var(--color-sage)" showValue={false}
              sublabel={nextItem
                ? `${stats.xpToNext - stats.xpIntoLevel} XP to level ${stats.level + 1} · ${nextItem.name} unlocks at level ${nextItem.level}`
                : "Every item unlocked."}
            />
          </div>
        </Card>

        <div className="space-y-3.5">
          <Card>
            <CardHeader eyebrow="Unlocked" title={`${unlocked.length} of ${roomItems.length} items`} />
            <ul className="mt-4 space-y-2">
              {unlocked.map((i) => (
                <li key={i.id} className="flex items-start gap-3 rounded-[10px] border border-line bg-surface-2/50 px-3.5 py-2.5">
                  <Icon name="check" size={15} className="mt-[3px] shrink-0 text-sage" />
                  <span className="min-w-0">
                    <span className="block text-[13.5px] font-medium text-ink">{i.name}</span>
                    <span className="block text-[12px] text-ink-3">{i.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader eyebrow="Still locked" title="Coming up" description="Tap one to preview how the room will look." />
            <ul className="mt-4 space-y-2">
              {locked.map((i) => (
                <li key={i.id}>
                  <button
                    onClick={() => setPreview(i.level)}
                    className="flex w-full items-start gap-3 rounded-[10px] border border-line bg-surface px-3.5 py-2.5 text-left transition-colors hover:border-line-2 hover:bg-surface-2/60"
                  >
                    <Icon name="lock" size={15} className="mt-[3px] shrink-0 text-ink-3" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-medium text-ink">{i.name}</span>
                      <span className="block text-[12px] text-ink-3">{i.description}</span>
                    </span>
                    <Tag className="shrink-0">Lv {i.level}</Tag>
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          <CapybaraGuide variant="plain" name="A note on this" tone="sage" size={54}
            action={<ButtonLink href="/focus" size="sm" variant="secondary">Start a session</ButtonLink>}>
            The room is deliberately slow. Reaching level 30 takes months of real study, and that is
            the point — it marks time you actually spent, not money or a daily check-in.
          </CapybaraGuide>
        </div>
      </div>
    </PageBody>
  );
}
