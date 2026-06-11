import type { ReactNode } from "react";
import { classNames } from "@/lib/utils";

type Tone = "brand" | "green" | "gold" | "gray" | "red";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700",
  green: "bg-emerald-50 text-emerald-700",
  gold: "bg-amber-50 text-amber-700",
  gray: "bg-paper text-ink-soft",
  red: "bg-red-50 text-red-700",
};

export function Badge({
  children,
  tone = "gray",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
