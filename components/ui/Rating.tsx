import { Icon } from "@/components/ui/Icon";
import { toFa } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = 16,
}: {
  value: number;
  count?: number;
  size?: number;
}) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex items-center text-gold-500">
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name="star" size={size} filled={i <= full} className={i <= full ? "" : "text-line"} />
        ))}
      </span>
      <span className="tnum text-sm font-semibold text-ink">{toFa(value.toFixed(1))}</span>
      {count !== undefined && (
        <span className="tnum text-xs text-ink-muted">({toFa(count.toLocaleString("en-US"))})</span>
      )}
    </span>
  );
}
