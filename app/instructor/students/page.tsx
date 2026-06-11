"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Icon } from "@/components/ui/Icon";
import { coursesByInstructor } from "@/lib/mock/courses";
import { studentsInCourse, enrollments } from "@/lib/mock/enrollments";
import { getUser } from "@/lib/mock/users";
import { toFa } from "@/lib/utils";

export default function InstructorStudents() {
  const { user } = useAuth();
  const courses = user ? coursesByInstructor(user.id) : [];
  const [activeCourse, setActiveCourse] = useState<string>(courses[0]?.id ?? "");

  if (!user) return null;

  const students = studentsInCourse(activeCourse)
    .map((sid) => {
      const enr = enrollments.find((e) => e.userId === sid && e.courseId === activeCourse);
      return { user: getUser(sid), progress: enr?.progress ?? 0 };
    })
    .filter((x) => x.user);

  return (
    <>
      <PageHeader title="دانشجویان" subtitle="دانشجویان ثبت‌نام‌شده در هر دوره" />

      {/* Course tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {courses.map((c) => {
          const active = c.id === activeCourse;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCourse(c.id)}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition ${
                active ? "bg-brand-600 text-white" : "bg-white text-ink-soft ring-1 ring-line hover:ring-brand-300"
              }`}
            >
              {c.title}
              <span className="ms-1.5 tnum opacity-80">({toFa(studentsInCourse(c.id).length)})</span>
            </button>
          );
        })}
      </div>

      {students.length === 0 ? (
        <div className="card p-10 text-center text-ink-soft">دانشجویی در این دوره ثبت‌نام نکرده است.</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-start text-sm">
            <thead className="border-b border-line bg-paper text-ink-muted">
              <tr>
                <th className="px-5 py-3 text-start font-medium">دانشجو</th>
                <th className="hidden px-5 py-3 text-start font-medium sm:table-cell">عنوان تحصیلی</th>
                <th className="px-5 py-3 text-start font-medium">پیشرفت</th>
              </tr>
            </thead>
            <tbody>
              {students.map(({ user: st, progress }) => (
                <tr key={st!.id} className="border-b border-line last:border-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar name={st!.name} color={st!.avatarColor} size={36} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{st!.name}</p>
                        <p className="truncate text-xs text-ink-muted">{st!.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-5 py-3.5 text-ink-soft sm:table-cell">{st!.title ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-32"><ProgressBar value={progress} showLabel={false} /></div>
                      {progress >= 100 ? (
                        <Badge tone="green">
                          <Icon name="check" size={12} className="me-1" />
                          تکمیل
                        </Badge>
                      ) : (
                        <span className="tnum text-xs text-ink-muted">{toFa(progress)}٪</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
