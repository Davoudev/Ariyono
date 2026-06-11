import type { LiveSession } from "@/lib/types";

// Dates are generated relative to "now" so upcoming sessions always look upcoming.
function inDays(days: number, hour: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const sessions: LiveSession[] = [
  {
    id: "live1",
    title: "کارگاه زنده: پروژه عملی React",
    topic: "ساخت یک کامپوننت فرم پیشرفته به‌صورت زنده",
    instructorId: "i2",
    courseId: "c3",
    startsAt: inDays(1, 18),
    durationMin: 90,
    meetUrl: "https://meet.google.com/abc-defg-hij",
  },
  {
    id: "live2",
    title: "پرسش و پاسخ یادگیری ماشین",
    topic: "رفع اشکال تمرین‌های رگرسیون و درخت تصمیم",
    instructorId: "i1",
    courseId: "c2",
    startsAt: inDays(2, 17),
    durationMin: 60,
    meetUrl: "https://meet.google.com/klm-nopq-rst",
  },
  {
    id: "live3",
    title: "وبینار امنیت سایبری",
    topic: "تحلیل یک حمله واقعی و روش‌های مقابله",
    instructorId: "i3",
    courseId: "c5",
    startsAt: inDays(3, 19),
    durationMin: 75,
    meetUrl: "https://meet.google.com/uvw-xyz0-123",
  },
  {
    id: "live4",
    title: "نقد و بررسی طراحی شرکت‌کنندگان",
    topic: "بازخورد زنده روی پروژه‌های UI/UX",
    instructorId: "i2",
    courseId: "c6",
    startsAt: inDays(4, 16),
    durationMin: 90,
    meetUrl: "https://meet.google.com/456-789a-bcd",
  },
  {
    id: "live5",
    title: "کارگاه PyTorch پیشرفته",
    topic: "پیاده‌سازی یک شبکه کانولوشنی از صفر",
    instructorId: "i1",
    courseId: "c8",
    startsAt: inDays(5, 18),
    durationMin: 120,
    meetUrl: "https://meet.google.com/efg-hijk-lmn",
  },
  {
    id: "live6",
    title: "جلسه عملی SQL",
    topic: "حل تمرین‌های JOIN و بهینه‌سازی کوئری",
    instructorId: "i2",
    courseId: "c7",
    startsAt: inDays(6, 17),
    durationMin: 60,
    meetUrl: "https://meet.google.com/opq-rstu-vwx",
  },
];

export function sessionsForInstructor(instructorId: string): LiveSession[] {
  return sessions
    .filter((s) => s.instructorId === instructorId)
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}

export function sessionsForCourses(courseIds: string[]): LiveSession[] {
  return sessions
    .filter((s) => courseIds.includes(s.courseId))
    .sort((a, b) => +new Date(a.startsAt) - +new Date(b.startsAt));
}
