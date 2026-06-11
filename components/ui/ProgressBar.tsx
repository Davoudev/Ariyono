import { toFa } from "@/lib/utils";

export function ProgressBar({ value, showLabel = true }: { value: number; showLabel?: boolean }) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full bg-gradient-to-l from-brand-500 to-brand-700 transition-all"
          style={{ width: `${v}%` }}
        />
      </div>
      {showLabel && <span className="tnum text-xs font-medium text-ink-soft">{toFa(v)}٪</span>}
    </div>
  );
}
