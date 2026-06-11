"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { enrollmentsFor } from "@/lib/mock/enrollments";
import { sessionsForCourses } from "@/lib/mock/sessions";
import { getCourse } from "@/lib/mock/courses";
import { getUser } from "@/lib/mock/users";
import { categoryMap } from "@/lib/mock/categories";
import { formatDateTime, formatDuration } from "@/lib/utils";

export default function StudentLive() {
  const { user } = useAuth();
  if (!user) return null;

  const courseIds = enrollmentsFor(user.id).map((e) => e.courseId);
  const upcoming = sessionsForCourses(courseIds).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  return (
    <>
      <PageHeader
        title="کلاس‌های زنده"
        subtitle="جلسات زنده دوره‌هایی که در آن‌ها ثبت‌نام کرده‌اید"
      />

      {upcoming.length === 0 ? (
        <div className="card p-10 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper text-ink-muted">
            <Icon name="video" size={26} />
          </span>
          <p className="mt-4 text-ink-soft">در حال حاضر جلسه زنده‌ای برای دوره‌های شما برنامه‌ریزی نشده است.</p>
          <Link href="/student/courses">
            <Button variant="secondary" className="mt-4">مشاهده دوره‌های من</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {upcoming.map((s) => {
            const instructor = getUser(s.instructorId);
            const course = getCourse(s.courseId);
            const cat = course ? categoryMap[course.category] : undefined;
            return (
              <div key={s.id} className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {cat && <Badge tone="brand">{cat.label}</Badge>}
                    <Badge tone="gray">
                      <Icon name="clock" size={13} className="me-1" />
                      {formatDuration(s.durationMin)}
                    </Badge>
                  </div>
                  <h3 className="mt-2 font-bold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{s.topic}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                    {instructor && (
                      <span className="inline-flex items-center gap-1.5">
                        <Avatar name={instructor.name} color={instructor.avatarColor} size={22} />
                        {instructor.name}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 tnum">
                      <Icon name="clock" size={14} />
                      {formatDateTime(s.startsAt)}
                    </span>
                  </div>
                </div>
                <a href={s.meetUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button className="w-full sm:w-auto">
                    <Icon name="video" size={18} className="me-2" />
                    پیوستن به کلاس
                  </Button>
                </a>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
