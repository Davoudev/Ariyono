import Link from "next/link";
import type { Course } from "@/lib/types";
import { getUser } from "@/lib/mock/users";
import { categoryMap, levelLabels } from "@/lib/mock/categories";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, toFa } from "@/lib/utils";

export function CourseCard({ course }: { course: Course }) {
  const instructor = getUser(course.instructorId);
  const cat = categoryMap[course.category];
  const free = course.price === 0;

  return (
    <Link
      href={`/courses/${course.id}`}
      className="group card flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift focus-ring"
    >
      <Thumbnail course={course} className="aspect-[16/10] w-full" />
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center gap-2">
          <Badge tone="brand">{cat.label}</Badge>
          <Badge tone="gray">{levelLabels[course.level]}</Badge>
        </div>
        <h3 className="line-clamp-2 font-bold leading-7 text-ink transition-colors group-hover:text-brand-700">
          {course.title}
        </h3>
        <p className="mt-1.5 text-xs text-ink-muted">{instructor?.name}</p>

        <div className="mt-3">
          <Rating value={course.rating} count={course.ratingCount} size={14} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="tnum text-xs text-ink-muted">
            {toFa(course.studentCount.toLocaleString("en-US"))} دانشجو
          </span>
          {free ? (
            <span className="font-extrabold text-emerald-600">رایگان</span>
          ) : (
            <span className="tnum font-extrabold text-ink">{formatPrice(course.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
