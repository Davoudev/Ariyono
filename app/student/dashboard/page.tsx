"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { enrollmentsFor } from "@/lib/mock/enrollments";
import { getCourse, totalLessons } from "@/lib/mock/courses";
import { sessionsForCourses } from "@/lib/mock/sessions";
import { getUser } from "@/lib/mock/users";
import { categoryMap } from "@/lib/mock/categories";
import { formatDateTime, toFa } from "@/lib/utils";

export default function StudentDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const enrollments = enrollmentsFor(user.id);
  const courses = enrollments
    .map((e) => ({ enrollment: e, course: getCourse(e.courseId) }))
    .filter((x) => x.course);

  const courseIds = enrollments.map((e) => e.courseId);
  const upcoming = sessionsForCourses(courseIds).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  const avgProgress =
    enrollments.length > 0
      ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
      : 0;
  const completed = enrollments.filter((e) => e.progress >= 100).length;

  return (
    <>
      <PageHeader
        title={`سلام، ${user.name.split(" ")[0]} 👋`}
        subtitle="مرور یادگیری امروز شما"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="دوره‌های من" value={toFa(enrollments.length)} icon="book" tone="brand" />
        <StatCard label="میانگین پیشرفت" value={`${toFa(avgProgress)}٪`} icon="chart" tone="green" />
        <StatCard label="دوره‌های تکمیل‌شده" value={toFa(completed)} icon="trophy" tone="gold" />
        <StatCard label="جلسات زنده پیش‌رو" value={toFa(upcoming.length)} icon="video" tone="red" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Continue learning */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">ادامه یادگیری</h2>
            <Link href="/student/courses" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              مشاهده همه
            </Link>
          </div>

          {courses.length === 0 ? (
            <div className="card p-8 text-center">
              <p className="text-ink-soft">هنوز در دوره‌ای ثبت‌نام نکرده‌اید.</p>
              <Link href="/courses">
                <Button className="mt-4">مرور دوره‌ها</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {courses.slice(0, 4).map(({ enrollment, course }) => (
                <Link
                  key={course!.id}
                  href={`/student/courses/${course!.id}`}
                  className="card flex gap-4 p-4 transition hover:shadow-lift"
                >
                  <Thumbnail course={course!} className="h-20 w-28 shrink-0" />
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div>
                      <Badge tone="brand">{categoryMap[course!.category].label}</Badge>
                      <h3 className="mt-1.5 truncate font-bold text-ink">{course!.title}</h3>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={enrollment.progress} />
                      <p className="mt-1 text-xs text-ink-muted tnum">
                        {toFa(enrollment.completedLessons.length)} از {toFa(totalLessons(course!))} درس
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming live */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">کلاس‌های زنده</h2>
            <Link href="/student/live" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              همه
            </Link>
          </div>
          <div className="grid gap-3">
            {upcoming.length === 0 ? (
              <div className="card p-6 text-center text-sm text-ink-soft">
                جلسه زنده‌ای پیش‌رو ندارید.
              </div>
            ) : (
              upcoming.slice(0, 3).map((s) => {
                const instructor = getUser(s.instructorId);
                return (
                  <div key={s.id} className="card p-4">
                    <h3 className="text-sm font-bold text-ink">{s.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
                      {instructor && <Avatar name={instructor.name} color={instructor.avatarColor} size={20} />}
                      <span>{instructor?.name}</span>
                    </div>
                    <p className="mt-2 text-xs text-ink-soft tnum">{formatDateTime(s.startsAt)}</p>
                    <a href={s.meetUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="secondary" className="mt-3 w-full">
                        <Icon name="video" size={15} className="me-1.5" />
                        پیوستن
                      </Button>
                    </a>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
