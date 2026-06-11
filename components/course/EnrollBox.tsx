"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { isEnrolled } from "@/lib/mock/enrollments";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatPrice } from "@/lib/utils";
import type { Course } from "@/lib/types";

export function EnrollBox({ course }: { course: Course }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [enrolled, setEnrolled] = useState(false);
  const free = course.price === 0;

  useEffect(() => {
    if (user) setEnrolled(isEnrolled(user.id, course.id));
  }, [user, course.id]);

  function handle() {
    if (!user) {
      router.push("/login");
      return;
    }
    // Mock action — in a real app this would hit an API.
    setEnrolled(true);
  }

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-line p-5">
        {free ? (
          <p className="text-2xl font-extrabold text-emerald-600">رایگان</p>
        ) : (
          <p className="tnum text-2xl font-extrabold text-ink">{formatPrice(course.price)}</p>
        )}
      </div>
      <div className="space-y-3 p-5">
        {!ready ? (
          <div className="h-11 animate-pulse rounded-xl bg-paper" />
        ) : enrolled ? (
          <>
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
              <Icon name="check" size={18} /> شما در این دوره ثبت‌نام کرده‌اید
            </div>
            <ButtonLink href={`/student/courses/${course.id}`} className="w-full">
              ادامه یادگیری
            </ButtonLink>
          </>
        ) : (
          <Button className="w-full" onClick={handle}>
            {free ? "ثبت‌نام در دوره" : "خرید دوره"}
          </Button>
        )}
        <ul className="space-y-2 pt-2 text-sm text-ink-soft">
          <li className="flex items-center gap-2"><Icon name="check" size={16} className="text-brand-600" /> دسترسی مادام‌العمر</li>
          <li className="flex items-center gap-2"><Icon name="check" size={16} className="text-brand-600" /> گواهی پایان دوره</li>
          <li className="flex items-center gap-2"><Icon name="check" size={16} className="text-brand-600" /> پشتیبانی پرسش و پاسخ</li>
        </ul>
      </div>
    </div>
  );
}
