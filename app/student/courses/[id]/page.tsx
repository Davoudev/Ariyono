"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getCourse, totalLessons } from "@/lib/mock/courses";
import { enrollmentsFor } from "@/lib/mock/enrollments";
import { getUser } from "@/lib/mock/users";
import { categoryMap } from "@/lib/mock/categories";
import { formatDuration, toFa } from "@/lib/utils";
import type { Lesson } from "@/lib/types";

export default function CoursePlayer() {
  const params = useParams();
  const id = String(params.id);
  const { user } = useAuth();

  const course = getCourse(id);
  const enrollment = useMemo(
    () => (user ? enrollmentsFor(user.id).find((e) => e.courseId === id) : undefined),
    [user, id],
  );

  const allLessons = useMemo<Lesson[]>(
    () => (course ? course.curriculum.flatMap((s) => s.lessons) : []),
    [course],
  );

  const [activeId, setActiveId] = useState<string>(
    enrollment?.lastWatchedLessonId ?? allLessons[0]?.id ?? "",
  );
  const [openSection, setOpenSection] = useState<string>(course?.curriculum[0]?.id ?? "");

  if (!course) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-soft">دوره یافت نشد.</p>
        <Link href="/student/courses">
          <Button className="mt-4">بازگشت به دوره‌های من</Button>
        </Link>
      </div>
    );
  }

  const instructor = getUser(course.instructorId);
  const activeLesson = allLessons.find((l) => l.id === activeId) ?? allLessons[0];
  const completed = new Set(enrollment?.completedLessons ?? []);

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8">
      <div className="grid lg:grid-cols-[1fr_360px]">
        {/* Player */}
        <div className="min-w-0">
          <div className="relative flex aspect-video items-center justify-center bg-brand-950 text-white">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(135deg, ${course.thumbnailColors[0]}, ${course.thumbnailColors[1]})`,
              }}
            />
            <div className="relative text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <Icon name="play" size={30} filled />
              </span>
              <p className="mt-4 max-w-md px-4 text-sm text-white/80">{activeLesson?.title}</p>
              <p className="mt-1 text-xs text-white/50">(پخش‌کننده ویدیو — نمونه نمایشی)</p>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <Link
              href="/student/courses"
              className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink"
            >
              <Icon name="arrowLeft" size={16} />
              دوره‌های من
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{categoryMap[course.category].label}</Badge>
              {activeLesson && (
                <Badge tone="gray">
                  <Icon name="clock" size={13} className="me-1" />
                  {formatDuration(activeLesson.durationMin)}
                </Badge>
              )}
            </div>
            <h1 className="mt-3 text-2xl font-extrabold text-ink">{activeLesson?.title}</h1>
            <p className="mt-1 text-ink-soft">{course.title}</p>

            <div className="mt-5 flex items-center gap-3 rounded-xl bg-paper p-4">
              {instructor && <Avatar name={instructor.name} color={instructor.avatarColor} size={44} />}
              <div>
                <p className="text-sm font-bold text-ink">{instructor?.name}</p>
                <p className="text-xs text-ink-muted">{instructor?.title}</p>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="font-bold text-ink">درباره این درس</h2>
              <p className="mt-2 leading-8 text-ink-soft">{course.description}</p>
            </div>
          </div>
        </div>

        {/* Curriculum sidebar */}
        <aside className="border-t border-line bg-white lg:border-s lg:border-t-0">
          <div className="border-b border-line p-5">
            <h2 className="font-bold text-ink">محتوای دوره</h2>
            <p className="mt-1 text-xs text-ink-muted tnum">
              {toFa(course.curriculum.length)} بخش · {toFa(totalLessons(course))} درس
            </p>
            {enrollment && (
              <div className="mt-3">
                <ProgressBar value={enrollment.progress} />
              </div>
            )}
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {course.curriculum.map((section, si) => {
              const open = openSection === section.id;
              return (
                <div key={section.id} className="border-b border-line">
                  <button
                    onClick={() => setOpenSection(open ? "" : section.id)}
                    className="focus-ring flex w-full items-center justify-between gap-2 px-5 py-3.5 text-start"
                  >
                    <span className="text-sm font-bold text-ink">
                      {toFa(si + 1)}. {section.title}
                    </span>
                    <Icon
                      name="chevronDown"
                      size={18}
                      className={`shrink-0 text-ink-muted transition ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <ul className="pb-2">
                      {section.lessons.map((lesson) => {
                        const active = lesson.id === activeId;
                        const done = completed.has(lesson.id);
                        return (
                          <li key={lesson.id}>
                            <button
                              onClick={() => setActiveId(lesson.id)}
                              className={`focus-ring flex w-full items-center gap-3 px-5 py-2.5 text-start text-sm transition ${
                                active ? "bg-brand-50 text-brand-700" : "text-ink-soft hover:bg-paper"
                              }`}
                            >
                              <span
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                  done ? "bg-emerald-100 text-emerald-700" : "bg-paper text-ink-muted"
                                }`}
                              >
                                <Icon name={done ? "check" : "play"} size={12} filled={done} />
                              </span>
                              <span className="flex-1 truncate">{lesson.title}</span>
                              <span className="tnum text-xs text-ink-muted">
                                {formatDuration(lesson.durationMin)}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
