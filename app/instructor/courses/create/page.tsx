"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/DashboardShell";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { categories, levelLabels } from "@/lib/mock/categories";
import type { CategorySlug, Level } from "@/lib/types";

interface DraftSection {
  id: string;
  title: string;
}

export default function CreateCourse() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<CategorySlug>("programming");
  const [level, setLevel] = useState<Level>("beginner");
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [sections, setSections] = useState<DraftSection[]>([{ id: "sec1", title: "" }]);
  const [submitted, setSubmitted] = useState(false);

  function addSkill() {
    const v = skillInput.trim();
    if (v && !skills.includes(v)) setSkills([...skills, v]);
    setSkillInput("");
  }

  function addSection() {
    setSections([...sections, { id: `sec${Date.now()}`, title: "" }]);
  }

  function updateSection(id: string, value: string) {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, title: value } : s)));
  }

  function removeSection(id: string) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  function onSubmit() {
    // Mock create — no backend. Show confirmation then return to list.
    setSubmitted(true);
    setTimeout(() => router.push("/instructor/courses"), 1600);
  }

  const levels: Level[] = ["beginner", "intermediate", "advanced"];

  return (
    <>
      <PageHeader title="ساخت دوره جدید" subtitle="اطلاعات دوره خود را وارد کنید (نمونه نمایشی)" />

      {submitted ? (
        <div className="card flex flex-col items-center p-12 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Icon name="check" size={32} />
          </span>
          <h2 className="mt-4 text-lg font-bold text-ink">دوره با موفقیت ثبت شد</h2>
          <p className="mt-1 text-sm text-ink-muted">در حال انتقال به فهرست دوره‌ها…</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="grid gap-6 lg:col-span-2">
            {/* Basics */}
            <div className="card p-6">
              <h2 className="font-bold text-ink">اطلاعات اصلی</h2>
              <div className="mt-5 grid gap-5">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink-soft">عنوان دوره</span>
                  <input className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثلاً: دوره جامع توسعه وب با React" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink-soft">عنوان کوتاه</span>
                  <input className="input-field" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="یک توضیح یک‌خطی جذاب" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-ink-soft">توضیحات</span>
                  <textarea className="input-field min-h-[120px] resize-y" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="در این دوره چه چیزی آموزش می‌دهید؟" />
                </label>
              </div>
            </div>

            {/* Skills */}
            <div className="card p-6">
              <h2 className="font-bold text-ink">مهارت‌ها / برچسب‌ها</h2>
              <div className="mt-4 flex gap-2">
                <input
                  className="input-field"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="یک مهارت بنویسید و Enter بزنید"
                />
                <Button type="button" variant="secondary" onClick={addSkill}>افزودن</Button>
              </div>
              {skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <button key={s} onClick={() => setSkills(skills.filter((x) => x !== s))} className="focus-ring">
                      <Badge tone="brand">
                        {s}
                        <Icon name="close" size={12} className="ms-1" />
                      </Badge>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Curriculum */}
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-ink">سرفصل‌ها</h2>
                <Button type="button" size="sm" variant="ghost" onClick={addSection}>
                  <Icon name="plus" size={15} className="me-1" />
                  بخش جدید
                </Button>
              </div>
              <div className="mt-4 grid gap-3">
                {sections.map((s, i) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper text-sm font-bold text-ink-soft tnum">
                      {/* simple Persian index */}
                      {["۱","۲","۳","۴","۵","۶","۷","۸","۹","۱۰"][i] ?? i + 1}
                    </span>
                    <input
                      className="input-field"
                      value={s.title}
                      onChange={(e) => updateSection(s.id, e.target.value)}
                      placeholder={`عنوان بخش ${i + 1}`}
                    />
                    {sections.length > 1 && (
                      <Button type="button" size="sm" variant="ghost" onClick={() => removeSection(s.id)}>
                        <Icon name="trash" size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="grid h-fit gap-6">
            <div className="card p-6">
              <h2 className="font-bold text-ink">دسته‌بندی</h2>
              <select
                className="input-field mt-4"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategorySlug)}
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>

              <h3 className="mt-5 text-sm font-medium text-ink-soft">سطح دوره</h3>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {levels.map((lv) => (
                  <button
                    key={lv}
                    onClick={() => setLevel(lv)}
                    className={`focus-ring rounded-lg border px-2 py-2 text-xs font-medium transition ${
                      level === lv ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line text-ink-soft hover:border-brand-300"
                    }`}
                  >
                    {levelLabels[lv]}
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-bold text-ink">قیمت‌گذاری</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsFree(true)}
                  className={`focus-ring rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    isFree ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line text-ink-soft"
                  }`}
                >
                  رایگان
                </button>
                <button
                  onClick={() => setIsFree(false)}
                  className={`focus-ring rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    !isFree ? "border-brand-500 bg-brand-50 text-brand-700" : "border-line text-ink-soft"
                  }`}
                >
                  پولی
                </button>
              </div>
              {!isFree && (
                <label className="mt-4 block">
                  <span className="mb-1.5 block text-sm font-medium text-ink-soft">قیمت (تومان)</span>
                  <input
                    className="input-field tnum"
                    inputMode="numeric"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="۴۹۰۰۰۰"
                  />
                </label>
              )}
            </div>

            <div className="card p-6">
              <h2 className="font-bold text-ink">تصویر شاخص</h2>
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-paper py-8 text-center">
                <Icon name="plus" size={24} className="text-ink-muted" />
                <p className="mt-2 text-sm text-ink-soft">بارگذاری تصویر</p>
                <p className="text-xs text-ink-muted">(نمونه نمایشی — بدون آپلود واقعی)</p>
              </div>
            </div>

            <Button onClick={onSubmit} size="lg" className="w-full" disabled={!title.trim()}>
              <Icon name="check" size={18} className="me-2" />
              انتشار دوره
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
