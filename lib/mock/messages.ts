import type { Message } from "@/lib/types";

export const messages: Message[] = [
  { id: "m1", fromId: "s1", toId: "i2", courseId: "c3", subject: "سوال درباره پروژه پایانی", body: "سلام استاد، برای پروژه فروشگاه آنلاین می‌تونم از Next.js نسخه ۱۴ استفاده کنم؟", date: "۲ ساعت پیش", read: false },
  { id: "m2", fromId: "i2", toId: "s1", courseId: "c3", subject: "پاسخ: سوال درباره پروژه پایانی", body: "سلام، بله حتماً. نسخه ۱۴ با App Router دقیقاً همون چیزیه که در دوره استفاده کردیم.", date: "۱ ساعت پیش", read: true },
  { id: "m3", fromId: "s4", toId: "i2", courseId: "c6", subject: "درخواست بازخورد روی طراحی", body: "استاد ممکنه روی موکاپی که ساختم نظر بدید؟ لینکش رو در ادامه می‌فرستم.", date: "دیروز", read: false },
  { id: "m4", fromId: "s3", toId: "i2", courseId: "c1", subject: "مشکل در نصب پایتون", body: "موقع نصب با خطای PATH مواجه شدم. چطور حلش کنم؟", date: "۲ روز پیش", read: true },
  { id: "m5", fromId: "s2", toId: "i1", courseId: "c2", subject: "منابع تکمیلی", body: "سلام، برای مطالعه بیشتر درباره جنگل تصادفی منبعی پیشنهاد می‌کنید؟", date: "۳ روز پیش", read: false },
  { id: "m6", fromId: "i1", toId: "s2", courseId: "c2", subject: "پاسخ: منابع تکمیلی", body: "بله، فصل ۸ کتاب Hands-On ML رو حتماً بخونید. خیلی کمک‌کننده‌ست.", date: "۳ روز پیش", read: true },
];

export function inboxFor(userId: string): Message[] {
  return messages.filter((m) => m.toId === userId);
}

export function outboxFor(userId: string): Message[] {
  return messages.filter((m) => m.fromId === userId);
}
