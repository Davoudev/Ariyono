"use client";

import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { BarChart, LineChart, DonutChart } from "@/components/dashboard/Charts";
import { coursesByInstructor } from "@/lib/mock/courses";
import { studentsInCourse } from "@/lib/mock/enrollments";
import { formatPrice, toFa } from "@/lib/utils";

const CHART_COLORS = ["#5a45e2", "#0ea5e9", "#059669", "#d97706", "#db2777", "#7c3aed", "#0d9488"];
const MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور"];

export default function InstructorAnalytics() {
  const { user } = useAuth();
  if (!user) return null;

  const courses = coursesByInstructor(user.id);
  const totalStudents = courses.reduce((s, c) => s + studentsInCourse(c.id).length, 0);
  const revenue = courses.reduce((s, c) => s + c.price * studentsInCourse(c.id).length, 0);

  // Mock month-over-month enrollment trend derived deterministically from totals.
  const base = Math.max(2, Math.round(totalStudents / 6));
  const enrollTrend = MONTHS.map((m, i) => ({
    label: m,
    value: base + Math.round(base * 0.4 * Math.sin(i)) + i,
  }));

  // Mock revenue per month (in thousands of Toman for readable bars).
  const revenueTrend = MONTHS.map((m, i) => ({
    label: m,
    value: Math.round((revenue / 6 / 1000) * (0.8 + 0.1 * i)),
  }));

  const popular = courses
    .map((c, i) => ({
      label: c.title,
      value: studentsInCourse(c.id).length || 1,
      color: CHART_COLORS[i % CHART_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);

  const avgRating =
    courses.length > 0 ? (courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1) : "0";

  return (
    <>
      <PageHeader title="تحلیل‌ها" subtitle="نمای کلی عملکرد دوره‌های شما (داده‌های نمونه)" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="کل ثبت‌نام‌ها" value={toFa(totalStudents)} icon="users" tone="brand" />
        <StatCard label="درآمد کل" value={formatPrice(revenue)} icon="wallet" tone="gold" />
        <StatCard label="دوره‌های فعال" value={toFa(courses.length)} icon="book" tone="green" />
        <StatCard label="میانگین امتیاز" value={toFa(avgRating)} icon="star" tone="red" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-bold text-ink">روند ثبت‌نام</h2>
          <p className="text-xs text-ink-muted">شش ماه گذشته</p>
          <div className="mt-5">
            <LineChart data={enrollTrend} />
          </div>
        </div>

        <div className="card p-6">
          <h2 className="font-bold text-ink">درآمد ماهانه</h2>
          <p className="text-xs text-ink-muted">به هزار تومان</p>
          <div className="mt-5">
            <BarChart data={revenueTrend} />
          </div>
        </div>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="font-bold text-ink">محبوب‌ترین دوره‌ها</h2>
        <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          {popular.length > 0 ? (
            <>
              <DonutChart segments={popular} size={200} />
              <div className="grid flex-1 gap-3">
                {popular.map((p) => (
                  <div key={p.label} className="flex items-center justify-between gap-3 text-sm">
                    <span className="inline-flex items-center gap-2 text-ink-soft">
                      <span className="h-3 w-3 rounded-full" style={{ background: p.color }} />
                      {p.label}
                    </span>
                    <span className="tnum font-semibold text-ink">{toFa(p.value)} دانشجو</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-ink-muted">داده‌ای موجود نیست.</p>
          )}
        </div>
      </div>
    </>
  );
}
