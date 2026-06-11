import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { Rating } from "@/components/ui/Rating";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import { Curriculum } from "@/components/course/Curriculum";
import { EnrollBox } from "@/components/course/EnrollBox";
import { getCourse, totalLessons, totalDuration } from "@/lib/mock/courses";
import { getUser } from "@/lib/mock/users";
import { categoryMap, levelLabels } from "@/lib/mock/categories";
import { reviewsFor } from "@/lib/mock/reviews";
import { formatDuration, toFa } from "@/lib/utils";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id);
  if (!course) notFound();

  const instructor = getUser(course.instructorId);
  const cat = categoryMap[course.category];
  const courseReviews = reviewsFor(course.id);

  return (
    <SiteShell>
      {/* Header */}
      <section className="bg-brand-950 text-white">
        <div className="container-page py-10">
          <Link href="/courses" className="mb-5 inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white">
            <Icon name="chevron" size={16} /> بازگشت به دوره‌ها
          </Link>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{cat.label}</Badge>
                <Badge tone="gray">{levelLabels[course.level]}</Badge>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight">{course.title}</h1>
              <p className="mt-3 text-white/75">{course.subtitle}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
                <Rating value={course.rating} count={course.ratingCount} />
                <span className="tnum">{toFa(course.studentCount.toLocaleString("en-US"))} دانشجو</span>
                <span className="tnum flex items-center gap-1.5">
                  <Icon name="clock" size={16} /> {formatDuration(totalDuration(course))}
                </span>
                <span className="tnum">{toFa(totalLessons(course))} درس</span>
              </div>
              {instructor && (
                <div className="mt-5 flex items-center gap-3">
                  <Avatar name={instructor.name} color={instructor.avatarColor} size={40} />
                  <div>
                    <p className="text-sm font-semibold">{instructor.name}</p>
                    <p className="text-xs text-white/60">{instructor.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-8 py-10 lg:grid-cols-3">
        {/* Main column */}
        <div className="space-y-10 lg:col-span-2">
          {/* Preview video placeholder */}
          <div className="overflow-hidden rounded-2xl">
            <div className="relative aspect-video">
              <Thumbnail course={course} className="absolute inset-0 h-full w-full" />
              <button className="absolute inset-0 grid place-items-center bg-black/20 transition hover:bg-black/30">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-brand-700 shadow-lift">
                  <Icon name="play" size={26} filled />
                </span>
              </button>
              <span className="absolute bottom-3 start-3 rounded-lg bg-black/50 px-2.5 py-1 text-xs text-white">پیش‌نمایش دوره</span>
            </div>
          </div>

          <section>
            <h2 className="mb-3 text-xl font-bold text-ink">درباره این دوره</h2>
            <p className="leading-8 text-ink-soft">{course.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {course.skills.map((s) => (
                <span key={s} className="rounded-lg bg-paper px-3 py-1.5 text-sm text-ink-soft">{s}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold text-ink">سرفصل‌های دوره</h2>
            <Curriculum sections={course.curriculum} />
          </section>

          {instructor && (
            <section>
              <h2 className="mb-3 text-xl font-bold text-ink">مدرس دوره</h2>
              <div className="card flex items-start gap-4 p-5">
                <Avatar name={instructor.name} color={instructor.avatarColor} size={56} />
                <div>
                  <p className="font-bold text-ink">{instructor.name}</p>
                  <p className="text-sm text-ink-muted">{instructor.title}</p>
                  {instructor.bio && <p className="mt-2 text-sm leading-7 text-ink-soft">{instructor.bio}</p>}
                </div>
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-xl font-bold text-ink">نظرات دانشجویان</h2>
            {courseReviews.length === 0 ? (
              <p className="text-sm text-ink-muted">هنوز نظری ثبت نشده است.</p>
            ) : (
              <div className="space-y-4">
                {courseReviews.map((r) => {
                  const u = getUser(r.userId);
                  return (
                    <div key={r.id} className="card p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {u && <Avatar name={u.name} color={u.avatarColor} size={36} />}
                          <div>
                            <p className="text-sm font-semibold text-ink">{u?.name}</p>
                            <p className="text-xs text-ink-muted">{r.date}</p>
                          </div>
                        </div>
                        <Rating value={r.rating} size={14} />
                      </div>
                      <p className="mt-3 text-sm leading-7 text-ink-soft">{r.comment}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Sticky enroll sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-20">
            <EnrollBox course={course} />
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
