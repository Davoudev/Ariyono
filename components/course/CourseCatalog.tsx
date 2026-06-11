"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CategorySlug, Course, Level } from "@/lib/types";
import { categories, levelLabels } from "@/lib/mock/categories";
import { CourseCard } from "@/components/course/CourseCard";
import { Icon } from "@/components/ui/Icon";
import { classNames } from "@/lib/utils";

type PriceFilter = "all" | "free" | "paid";

export function CourseCatalog({ allCourses }: { allCourses: Course[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategorySlug | "all">(
    (params.get("category") as CategorySlug) || "all",
  );
  const [level, setLevel] = useState<Level | "all">("all");
  const [price, setPrice] = useState<PriceFilter>("all");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allCourses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (level !== "all" && c.level !== level) return false;
      if (price === "free" && c.price !== 0) return false;
      if (price === "paid" && c.price === 0) return false;
      if (q) {
        const hay = `${c.title} ${c.subtitle} ${c.skills.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allCourses, query, category, level, price]);

  const chip = (active: boolean) =>
    classNames(
      "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
      active ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white text-ink-soft hover:border-brand-300",
    );

  return (
    <div>
      {/* Search */}
      <div className="relative mb-5">
        <span className="pointer-events-none absolute inset-y-0 start-4 grid place-items-center text-ink-muted">
          <Icon name="search" size={20} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در دوره‌ها، مهارت‌ها…"
          className="input-field h-12 ps-12 text-base"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="card p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
              <Icon name="filter" size={16} /> دسته‌بندی
            </h3>
            <div className="flex flex-wrap gap-2">
              <button className={chip(category === "all")} onClick={() => setCategory("all")}>
                همه
              </button>
              {categories.map((c) => (
                <button key={c.slug} className={chip(category === c.slug)} onClick={() => setCategory(c.slug)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold text-ink">سطح</h3>
            <div className="flex flex-wrap gap-2">
              <button className={chip(level === "all")} onClick={() => setLevel("all")}>
                همه
              </button>
              {(["beginner", "intermediate", "advanced"] as Level[]).map((lv) => (
                <button key={lv} className={chip(level === lv)} onClick={() => setLevel(lv)}>
                  {levelLabels[lv]}
                </button>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-3 text-sm font-bold text-ink">قیمت</h3>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["all", "همه"],
                  ["free", "رایگان"],
                  ["paid", "پولی"],
                ] as [PriceFilter, string][]
              ).map(([val, label]) => (
                <button key={val} className={chip(price === val)} onClick={() => setPrice(val)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-4 text-sm text-ink-soft">
            {results.length > 0 ? `${results.length} دوره یافت شد` : ""}
          </p>
          {results.length === 0 ? (
            <div className="card grid place-items-center p-16 text-center">
              <Icon name="search" size={40} className="text-line" />
              <p className="mt-3 font-semibold text-ink">دوره‌ای پیدا نشد</p>
              <p className="mt-1 text-sm text-ink-muted">فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
