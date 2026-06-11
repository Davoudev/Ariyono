import { categoryMap } from "@/lib/mock/categories";
import type { Course } from "@/lib/types";

// A lightweight, offline-friendly gradient thumbnail. Using a styled element
// instead of a remote image keeps the demo fast and dependency-free.
export function Thumbnail({ course, className = "" }: { course: Course; className?: string }) {
  const [from, to] = course.thumbnailColors;
  const cat = categoryMap[course.category];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <span
        className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-white/15"
        aria-hidden="true"
      />
      <span
        className="absolute -bottom-8 -right-4 h-28 w-28 rounded-full bg-black/10"
        aria-hidden="true"
      />
      <span className="select-none text-5xl drop-shadow" aria-hidden="true">
        {cat.icon}
      </span>
    </div>
  );
}
