"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { enrollmentsFor } from "@/lib/mock/enrollments";
import { getCourse, totalLessons } from "@/lib/mock/courses";
import { getUser } from "@/lib/mock/users";
import { categoryMap } from "@/lib/mock/categories";
import { toFa } from "@/lib/utils";

export default function StudentCourses() {
  const { user } = useAuth();
  if (!user) return null;

  const items = enrollmentsFor(user.id)
    .map((e) => ({ enrollment: e, course: getCourse(e.courseId) }))
    .filter((x) => x.course);

  return (
    <>
      <PageHeader
        title="دوره‌های من"
        subtitle={`${toFa(items.length)} دوره در حال یادگیری`}
        action={
          <Link href="/courses">
            <Button variant="secondary">
              <Icon name="plus" size={16} className="me-1.5" />
              دوره جدید
            </Button>
          </Link>
        }
      />

      {items.length === 0 ? (
        <div className="card p-10 text-center">
          <p className="text-ink-soft">هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
          <Link href="/courses">
            <Button className="mt-4">مرور دوره‌ها</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {items.map(({ enrollment, course }) => {
            const instructor = getUser(course!.instructorId);
            const done = enrollment.progress >= 100;
            return (
              <div key={course!.id} className="card overflow-hidden">
                <Thumbnail course={course!} className="h-40 w-full" />
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <Badge tone="brand">{categoryMap[course!.category].label}</Badge>
                    {done && <Badge tone="green">تکمیل شده</Badge>}
                  </div>
                  <h3 className="mt-2 font-bold text-ink">{course!.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{instructor?.name}</p>
                  <div className="mt-4">
                    <ProgressBar value={enrollment.progress} />
                    <p className="mt-1.5 text-xs text-ink-muted tnum">
                      {toFa(enrollment.completedLessons.length)} از {toFa(totalLessons(course!))} درس
                    </p>
                  </div>
                  <Link href={`/student/courses/${course!.id}`}>
                    <Button className="mt-4 w-full">
                      <Icon name="play" size={16} className="me-1.5" />
                      {done ? "مرور دوباره" : "ادامه دوره"}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
