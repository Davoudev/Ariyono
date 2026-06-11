"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Thumbnail } from "@/components/ui/Thumbnail";
import { StatCard } from "@/components/dashboard/StatCard";
import { getCourse, totalLessons } from "@/lib/mock/courses";
import { studentsInCourse } from "@/lib/mock/enrollments";
import { categories, levelLabels } from "@/lib/mock/categories";
import { formatPrice, toFa } from "@/lib/utils";
import type { CategorySlug } from "@/lib/types";

export default function EditCourse() {
  const params = useParams();
  const id = String(params.id);
  const course = getCourse(id);

  const [title, setTitle] = useState(course?.title ?? "");
  const [subtitle, setSubtitle] = useState(course?.subtitle ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [category, setCategory] = useState<CategorySlug>(course?.category ?? "programming");
  const [price, setPrice] = useState(String(course?.price ?? 0));
  const [saved, setSaved] = useState(false);

  if (!course) {
    return (
      <div className="card p-10 text-center">
        <p className="text-ink-soft">دوره یافت نشد.</p>
        <Link href="/instructor/courses">
          <Button className="mt-4">بازگشت</Button>
        </Link>
      </div>
    );
  }

  function onSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <PageHeader
        title="ویرایش دوره"
        subtitle={course.title}
        action={
          <Link href="/instructor/courses" className="inline-flex items-center gap-1 text-sm text-ink-muted hover:text-ink">
            <Icon name="arrowLeft" size={16} />
            بازگشت به فهرست
          </Link>
        }
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="دانشجویان" value={toFa(studentsInCourse(course.id).length)} icon="users" tone="brand" />
        <StatCard label="دروس" value={toFa(totalLessons(course))} icon="book" tone="green" />
        <StatCard label="امتیاز" value={toFa(course.rating)} icon="star" tone="gold" hint={`${toFa(course.ratingCount)} رأی`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-2">
          <h2 className="font-bold text-ink">اطلاعات دوره</h2>
          <div className="mt-5 grid gap-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">عنوان</span>
              <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">عنوان کوتاه</span>
              <input className="input-field" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink-soft">توضیحات</span>
              <textarea className="input-field min-h-[120px] resize-y" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">دسته‌بندی</span>
                <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value as CategorySlug)}>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.label}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-soft">قیمت (تومان، ۰ = رایگان)</span>
                <input className="input-field tnum" inputMode="numeric" value={price} onChange={(e) => setPrice(e.target.value)} />
              </label>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={onSave}>
                <Icon name="check" size={16} className="me-1.5" />
                ذخیره تغییرات
              </Button>
              {saved && (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600">
                  <Icon name="check" size={16} />
                  ذخیره شد (نمونه نمایشی)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid h-fit gap-6">
          <div className="card p-6">
            <h2 className="font-bold text-ink">پیش‌نمایش</h2>
            <Thumbnail course={course} className="mt-4 h-36 w-full" />
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="brand">{categories.find((c) => c.slug === category)?.label}</Badge>
              <Badge tone="gray">{levelLabels[course.level]}</Badge>
              {Number(price) === 0 ? <Badge tone="green">رایگان</Badge> : <Badge tone="gold">{formatPrice(Number(price) || 0)}</Badge>}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-ink">سرفصل‌ها</h2>
            <ul className="mt-3 grid gap-2">
              {course.curriculum.map((s, i) => (
                <li key={s.id} className="flex items-center gap-2 text-sm text-ink-soft">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-paper text-xs font-bold tnum">
                    {toFa(i + 1)}
                  </span>
                  <span className="truncate">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
