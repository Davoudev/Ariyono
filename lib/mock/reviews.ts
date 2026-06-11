import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  { id: "r1", courseId: "c1", userId: "s1", rating: 5, comment: "بهترین دوره‌ای بود که برای شروع پایتون دیدم. توضیحات کاملاً واضح بود.", date: "۲ هفته پیش" },
  { id: "r2", courseId: "c1", userId: "s3", rating: 4, comment: "محتوای خوبی داشت، فقط کاش تمرین‌های بیشتری می‌بود.", date: "۱ ماه پیش" },
  { id: "r3", courseId: "c2", userId: "s2", rating: 5, comment: "مثال‌های عملی فوق‌العاده بودند. مفاهیم پیچیده ساده توضیح داده شد.", date: "۱ هفته پیش" },
  { id: "r4", courseId: "c3", userId: "s1", rating: 5, comment: "پروژه پایانی واقعاً کاربردی بود و کلی چیز یاد گرفتم.", date: "۳ روز پیش" },
  { id: "r5", courseId: "c3", userId: "s4", rating: 4, comment: "سرعت تدریس مناسب بود. برای سطح متوسط عالیه.", date: "۲ هفته پیش" },
  { id: "r6", courseId: "c4", userId: "s2", rating: 5, comment: "با این دوره کار با Pandas برام خیلی راحت شد.", date: "۱ ماه پیش" },
  { id: "r7", courseId: "c5", userId: "s5", rating: 5, comment: "مدرس واقعاً به موضوع مسلط بود. توصیه می‌کنم.", date: "۵ روز پیش" },
  { id: "r8", courseId: "c6", userId: "s4", rating: 5, comment: "بخش Figma خیلی کاربردی بود و الان راحت پروتوتایپ می‌سازم.", date: "۲ هفته پیش" },
  { id: "r9", courseId: "c8", userId: "s5", rating: 5, comment: "سطح پیشرفته اما کاملاً قابل فهم. ارزشش رو داشت.", date: "۱ هفته پیش" },
  { id: "r10", courseId: "c9", userId: "s1", rating: 4, comment: "مفاهیم closure و async خیلی خوب جا افتاد.", date: "۴ روز پیش" },
];

export function reviewsFor(courseId: string): Review[] {
  return reviews.filter((r) => r.courseId === courseId);
}
