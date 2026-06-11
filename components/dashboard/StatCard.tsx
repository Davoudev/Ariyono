import { Icon, type IconName } from "@/components/ui/Icon";

export function StatCard({
  label,
  value,
  icon,
  hint,
  tone = "brand",
}: {
  label: string;
  value: string;
  icon: IconName;
  hint?: string;
  tone?: "brand" | "green" | "gold" | "red";
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-50 text-brand-700",
    green: "bg-emerald-50 text-emerald-700",
    gold: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
  };
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon name={icon} size={22} />
        </span>
        {hint && <span className="text-xs font-medium text-emerald-600">{hint}</span>}
      </div>
      <p className="tnum mt-4 text-2xl font-extrabold text-ink">{value}</p>
      <p className="mt-1 text-sm text-ink-soft">{label}</p>
    </div>
  );
}
