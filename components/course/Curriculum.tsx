"use client";

import { useState } from "react";
import type { Section } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { formatDuration, toFa } from "@/lib/utils";

export function Curriculum({ sections }: { sections: Section[] }) {
  const [open, setOpen] = useState<string | null>(sections[0]?.id ?? null);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {sections.map((s, idx) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id}>
            <button
              onClick={() => setOpen(isOpen ? null : s.id)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start transition hover:bg-paper"
            >
              <span className="flex items-center gap-3">
                <span className="tnum grid h-7 w-7 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">
                  {toFa(idx + 1)}
                </span>
                <span className="font-semibold text-ink">{s.title}</span>
              </span>
              <span className="flex items-center gap-3 text-xs text-ink-muted">
                <span className="tnum">{toFa(s.lessons.length)} درس</span>
                <Icon name="chevronDown" size={18} className={isOpen ? "rotate-180 transition" : "transition"} />
              </span>
            </button>
            {isOpen && (
              <ul className="bg-paper/50">
                {s.lessons.map((l) => (
                  <li key={l.id} className="flex items-center justify-between gap-3 px-5 py-3 ps-14">
                    <span className="flex items-center gap-2.5 text-sm text-ink-soft">
                      <Icon name={l.isPreview ? "play" : "lock"} size={15} className={l.isPreview ? "text-brand-600" : "text-ink-muted"} />
                      {l.title}
                      {l.isPreview && <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] text-brand-700">پیش‌نمایش</span>}
                    </span>
                    <span className="tnum shrink-0 text-xs text-ink-muted">{formatDuration(l.durationMin)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
