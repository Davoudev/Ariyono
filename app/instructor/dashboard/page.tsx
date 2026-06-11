"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChart, DonutChart } from "@/components/dashboard/Charts";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Rating } from "@/components/ui/Rating";
import { coursesByInstructor } from "@/lib/mock/courses";
import { studentsInCourse } from "@/lib/mock/enrollments";
import { sessionsForInstructor } from "@/lib/mock/sessions";
import { categoryMap } from "@/lib/mock/categories";
import { formatPrice, formatDateTime, toFa } from "@/lib/utils";

const CHART_COLORS = ["#5a45e2", "#0ea5e9", "#059669", "#d97706", "#db2777", "#7c3aed", "#0d9488"];

export default function InstructorDashboard() {
  const { user } = useAuth();
  if (!user) return null;

  const courses = coursesByInstructor(user.id);
  const totalStudents = courses.reduce((s, c) => s + studentsInCourse(c.id).length, 0);
  const revenue = courses.reduce((s, c) => s + c.price * studentsInCourse(c.id).length, 0);
  const avgRating =
    courses.length > 0
      ? (courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1)
      : "0";

  const sessions = sessionsForInstructor(user.id).sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  const enrollBars = courses.map((c) => ({
    label: c.title.length > 8 ? c.title.slice(0, 8) + "…" : c.title,
    value: studentsInCourse(c.id).length,
  }));

  const donut = courses.map((c, i) => ({
    label: c.title,
    value: studentsInCourse(c.id).length || 1,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <>
      <PageHeader
        title={`داشبورد استاد`}
        subtitle={`خوش آمدید، ${user.name}`}
        action={
          <Link href="/instructor/courses/create">
            <Button>
              <Icon name="plus" size={16} className="me-1.5" />
              دوره جدید
            </Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="کل دانشجویان" value={toFa(totalStudents)} icon="users" tone="brand" />
        <StatCard label="دوره‌ها" value={toFa(courses.length)} icon="book" tone="green" />
        <StatCard label="درآمد (نمونه)" value={formatPrice(revenue)} icon="wallet" tone="gold" hint="مجموع فروش" />
        <StatCard label="میانگین امتیاز" value={toFa(avgRating)} icon="star" tone="red" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-bold text-ink">دانشجویان به تفکیک دوره</h2>
          <div className="mt-6">
            {enrollBars.length > 0 ? (
              <BarChart data={enrollBars} />
            ) : (
              <p className="py-10 text-center text-sm text-ink-muted">داده‌ای موجود نیست.</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-ink">سهم دوره‌ها از ثبت‌نام</h2>
          <div className="mt-6 flex justify-center">
            {donut.length > 0 ? (
              <DonutChart segments={donut} />
            ) : (
              <p className="py-10 text-center text-sm text-ink-muted">داده‌ای موجود نیست.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Courses */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">دوره‌های من</h2>
            <Link href="/instructor/courses" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              مدیریت دوره‌ها
            </Link>
          </div>
          <div className="grid gap-3">
            {courses.map((c) => (
              <div key={c.id} className="card flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <Badge tone="brand">{categoryMap[c.category].label}</Badge>
                  <h3 className="mt-1.5 truncate font-bold text-ink">{c.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1 tnum">
                      <Icon name="users" size={13} />
                      {toFa(studentsInCourse(c.id).length)} دانشجو
                    </span>
                    <Rating value={c.rating} size={13} />
                  </div>
                </div>
                <Link href={`/instructor/courses/${c.id}`}>
                  <Button size="sm" variant="ghost">
                    <Icon name="edit" size={15} />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Sessions */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">جلسات زنده</h2>
            <Link href="/instructor/live" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              همه
            </Link>
          </div>
          <div className="grid gap-3">
            {sessions.length === 0 ? (
              <div className="card p-6 text-center text-sm text-ink-soft">جلسه‌ای ندارید.</div>
            ) : (
              sessions.slice(0, 3).map((s) => (
                <div key={s.id} className="card p-4">
                  <h3 className="text-sm font-bold text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-xs text-ink-soft tnum">{formatDateTime(s.startsAt)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
