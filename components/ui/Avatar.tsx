import { initials } from "@/lib/utils";

export function Avatar({
  name,
  color,
  size = 40,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(135deg, ${color}, ${color}aa)`,
      }}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
