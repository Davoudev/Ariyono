"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { coursesByInstructor, totalLessons } from "@/lib/mock/courses";
import { studentsInCourse } from "@/lib/mock/enrollments";
import { categoryMap, levelLabels } from "@/lib/mock/categories";
import { formatPrice, toFa } from "@/lib/utils";
import type { Course } from "@/lib/types";

export default function InstructorCourses() {
  const { user } = useAuth();
  const [hidden, setHidden] = useState<Set<string>>(new Set());

  if (!user) return null;

  const courses: Course[] = coursesByInstructor(user.id).filter((c) => !hidden.has(c.id));

  function remove(id: string) {
    // Mock delete — removes from view only (no backend).
    if (confirm("این دوره حذف شود؟ (نمونه نمایشی)")) {
      setHidden((prev) => new Set(prev).add(id));
    }
  }

  return (
    <>
      <PageHeader
        title="مدیریت دوره‌ها"
        subtitle={`${toFa(courses.length)} دوره منتشرشده`}
        action={
          <Link href="/instructor/courses/create">
            <Button>
              <Icon name="plus" size={16} className="me-1.5" />
              دوره جدید
            </Button>
          </Link>
        }
      />

      {courses.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-ink-soft">دوره‌ای برای نمایش وجود ندارد.</p>
          <Link href="/instructor/courses/create">
            <Button className="mt-4">ساخت اولین دوره</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {courses.map((c) => (
            <div key={c.id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
              <Thumbnail course={c} className="h-28 w-full shrink-0 sm:h-20 sm:w-32" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="brand">{categoryMap[c.category].label}</Badge>
                  <Badge tone="gray">{levelLabels[c.level]}</Badge>
                  {c.price === 0 ? <Badge tone="green">رایگان</Badge> : <Badge tone="gold">{formatPrice(c.price)}</Badge>}
                </div>
                <h3 className="mt-2 font-bold text-ink">{c.title}</h3>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1 tnum">
                    <Icon name="users" size={13} />
                    {toFa(studentsInCourse(c.id).length)} دانشجو
                  </span>
                  <span className="inline-flex items-center gap-1 tnum">
                    <Icon name="book" size={13} />
                    {toFa(totalLessons(c))} درس
                  </span>
                  <Rating value={c.rating} count={c.ratingCount} size={13} />
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link href={`/courses/${c.id}`}>
                  <Button size="sm" variant="ghost" title="مشاهده">
                    <Icon name="play" size={16} />
                  </Button>
                </Link>
                <Link href={`/instructor/courses/${c.id}`}>
                  <Button size="sm" variant="secondary">
                    <Icon name="edit" size={15} className="me-1.5" />
                    ویرایش
                  </Button>
                </Link>
                <Button size="sm" variant="danger" onClick={() => remove(c.id)} title="حذف">
                  <Icon name="trash" size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
