"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { sessionsForInstructor } from "@/lib/mock/sessions";
import { coursesByInstructor, getCourse } from "@/lib/mock/courses";
import { categoryMap } from "@/lib/mock/categories";
import { formatDateTime, formatDuration } from "@/lib/utils";
import type { LiveSession } from "@/lib/types";

export default function InstructorLive() {
  const { user } = useAuth();
  const baseSessions = user ? sessionsForInstructor(user.id) : [];
  const courses = user ? coursesByInstructor(user.id) : [];

  const [extra, setExtra] = useState<LiveSession[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const [datetime, setDatetime] = useState("");
  const [meetUrl, setMeetUrl] = useState("https://meet.google.com/new");

  if (!user) return null;

  const sessions = [...baseSessions, ...extra].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  function createSession() {
    const iso = datetime ? new Date(datetime).toISOString() : new Date().toISOString();
    setExtra((prev) => [
      ...prev,
      {
        id: `new${Date.now()}`,
        title: title || "جلسه بدون عنوان",
        topic: topic || "—",
        instructorId: user!.id,
        courseId: courseId || courses[0]?.id || "",
        startsAt: iso,
        durationMin: 60,
        meetUrl: meetUrl || "https://meet.google.com/new",
      },
    ]);
    setTitle(""); setTopic(""); setDatetime(""); setShowForm(false);
  }

  return (
    <>
      <PageHeader
        title="کلاس‌های زنده"
        subtitle="جلسات زنده خود را مدیریت کنید"
        action={
          <Button onClick={() => setShowForm((v) => !v)}>
            <Icon name={showForm ? "close" : "plus"} size={16} className="me-1.5" />
            {showForm ? "بستن فرم" : "جلسه جدید"}
          </Button>
        }
      />

      {showForm && (
        <div className="card mb-6 p-6">
          <h2 className="font-bold text-ink">ساخت جلسه زنده (نمونه نمایشی)</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">عنوان جلسه</span>
              <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً: کارگاه عملی" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">دوره مرتبط</span>
              <select className="input-field" value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">موضوع</span>
              <input className="input-field" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="موضوع جلسه" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">تاریخ و زمان</span>
              <input type="datetime-local" className="input-field" value={datetime} onChange={(e) => setDatetime(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">لینک گوگل میت</span>
              <input className="input-field" value={meetUrl} onChange={(e) => setMeetUrl(e.target.value)} dir="ltr" />
            </label>
          </div>
          <div className="mt-5">
            <Button onClick={createSession} disabled={!title.trim()}>
              <Icon name="check" size={16} className="me-1.5" />
              ایجاد جلسه
            </Button>
          </div>
        </div>
      )}

      {sessions.length === 0 ? (
        <div className="card p-10 text-center text-ink-soft">هنوز جلسه‌ای نساخته‌اید.</div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((s) => {
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
                  <p className="mt-2 text-sm text-ink-muted tnum">{formatDateTime(s.startsAt)}</p>
                </div>
                <a href={s.meetUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    <Icon name="video" size={18} className="me-2" />
                    شروع جلسه
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
