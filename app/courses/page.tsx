import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { CourseCatalog } from "@/components/course/CourseCatalog";
import { courses } from "@/lib/mock/courses";

export const metadata = { title: "دوره‌ها | دانش‌یار" };

export default function CoursesPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-white">
        <div className="container-page py-10">
          <h1 className="text-3xl font-extrabold text-ink">همه دوره‌ها</h1>
          <p className="mt-2 text-ink-soft">مهارت تازه‌ای پیدا کنید و مسیر یادگیری‌تان را بسازید.</p>
        </div>
      </section>
      <div className="container-page py-8">
        <Suspense fallback={<div className="py-20 text-center text-ink-muted">در حال بارگذاری…</div>}>
          <CourseCatalog allCourses={courses} />
        </Suspense>
      </div>
    </SiteShell>
  );
}
