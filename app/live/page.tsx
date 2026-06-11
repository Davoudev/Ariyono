import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { sessions } from "@/lib/mock/sessions";
import { getUser } from "@/lib/mock/users";
import { getCourse } from "@/lib/mock/courses";
import { categoryMap } from "@/lib/mock/categories";
import { formatDateTime, formatDuration, toFa } from "@/lib/utils";

export const metadata = {
  title: "پخش زنده | دانش‌یار",
  description: "کلاس‌ها و کارگاه‌های زنده آینده در پلتفرم دانش‌یار",
};

export default function LivePage() {
  const upcoming = [...sessions].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-gradient-to-bl from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="container-page py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-brand-100">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            پخش زنده
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            کلاس‌ها و کارگاه‌های زنده
          </h1>
          <p className="mt-3 max-w-2xl text-brand-100/90">
            در جلسات تعاملی زنده شرکت کنید، مستقیماً از استادان بپرسید و پروژه‌ها را گام‌به‌گام دنبال کنید.
            هر جلسه از طریق گوگل میت برگزار می‌شود.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 className="text-xl font-extrabold text-ink">
            جلسات پیش‌رو
            <span className="ms-2 text-sm font-normal text-ink-muted">({toFa(upcoming.length)} جلسه)</span>
          </h2>
        </div>

        <div className="grid gap-5">
          {upcoming.map((s) => {
            const instructor = getUser(s.instructorId);
            const course = getCourse(s.courseId);
            const cat = course ? categoryMap[course.category] : undefined;
            return (
              <div
                key={s.id}
                className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 gap-4">
                  <div
                    className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl sm:flex"
                    style={{
                      background: course
                        ? `linear-gradient(135deg, ${course.thumbnailColors[0]}, ${course.thumbnailColors[1]})`
                        : "#5a45e2",
                    }}
                  >
                    {cat?.icon ?? "🎥"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      {cat && <Badge tone="brand">{cat.label}</Badge>}
                      <Badge tone="gray">
                        <Icon name="clock" size={13} className="me-1" />
                        {formatDuration(s.durationMin)}
                      </Badge>
                    </div>
                    <h3 className="mt-2 truncate text-base font-bold text-ink">{s.title}</h3>
                    <p className="mt-1 line-clamp-1 text-sm text-ink-soft">{s.topic}</p>
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
                      {course && (
                        <Link
                          href={`/courses/${course.id}`}
                          className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700"
                        >
                          <Icon name="book" size={14} />
                          {course.title}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="shrink-0">
                  <a href={s.meetUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" className="w-full sm:w-auto">
                      <Icon name="video" size={18} className="me-2" />
                      پیوستن به جلسه
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 rounded-xl bg-paper p-4 text-center text-sm text-ink-muted">
          برای دسترسی به جلسات اختصاصی دوره‌های خود، وارد حساب کاربری شوید.
        </p>
      </section>
    </SiteShell>
  );
}
