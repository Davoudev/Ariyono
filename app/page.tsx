import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Rating } from "@/components/ui/Rating";
import { CourseCard } from "@/components/course/CourseCard";
import { courses } from "@/lib/mock/courses";
import { categories } from "@/lib/mock/categories";
import { users, getUser } from "@/lib/mock/users";
import { reviews } from "@/lib/mock/reviews";
import { toFa } from "@/lib/utils";

const featured = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 6);

const stats = [
  { value: "۱۲٬۰۰۰+", label: "دانشجوی فعال" },
  { value: `${toFa(courses.length)}+`, label: "دوره آموزشی" },
  { value: `${toFa(users.filter((u) => u.role === "instructor").length)}`, label: "مدرس متخصص" },
  { value: "۹۴٪", label: "رضایت دانشجویان" },
];

const steps = [
  { title: "حساب بسازید", desc: "در چند ثانیه ثبت‌نام کنید و وارد پنل شخصی خود شوید.", icon: "users" as const },
  { title: "دوره را انتخاب کنید", desc: "از میان ده‌ها دوره در حوزه‌های مختلف، مسیر یادگیری خود را بسازید.", icon: "book" as const },
  { title: "یاد بگیرید و رشد کنید", desc: "ویدیوها را ببینید، در کلاس‌های زنده شرکت کنید و پیشرفت‌تان را دنبال کنید.", icon: "trophy" as const },
];

const testimonials = reviews.filter((r) => r.rating === 5).slice(0, 3);

export default function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-950 text-white">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(60% 60% at 80% 0%, rgba(106,94,240,0.55), transparent), radial-gradient(50% 50% at 0% 100%, rgba(56,189,248,0.25), transparent)",
          }}
          aria-hidden="true"
        />
        <div className="container-page relative grid gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              پلتفرم یادگیری دانشگاهی
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] md:text-5xl">
              مهارت‌های آینده را
              <br />
              همین امروز یاد بگیر
            </h1>
            <p className="mt-5 max-w-md text-base leading-8 text-white/75">
              دانش‌یار محیطی سریع و ساده برای یادگیری برنامه‌نویسی، علم داده، هوش مصنوعی و طراحی است — ساخته‌شده برای دانشجویان و اساتید دانشگاه.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/courses" size="lg" className="bg-white text-brand-800 hover:bg-white/90">
                کاوش در دوره‌ها
              </ButtonLink>
              <ButtonLink
                href="/register"
                size="lg"
                className="border border-white/25 bg-transparent text-white hover:bg-white/10"
              >
                ثبت‌نام رایگان
              </ButtonLink>
            </div>
          </div>

          {/* Signature: stacked "course" cards floating */}
          <div className="relative hidden md:block">
            <div className="absolute end-4 top-2 w-64 rotate-3 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <div className="h-24 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600" />
              <div className="mt-3 h-3 w-3/4 rounded bg-white/40" />
              <div className="mt-2 h-3 w-1/2 rounded bg-white/25" />
            </div>
            <div className="absolute end-24 top-28 w-64 -rotate-2 rounded-2xl border border-white/15 bg-white/15 p-4 backdrop-blur">
              <div className="h-24 rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500" />
              <div className="mt-3 h-3 w-2/3 rounded bg-white/40" />
              <div className="mt-2 h-3 w-1/3 rounded bg-white/25" />
            </div>
            <div className="absolute end-2 top-56 w-64 rotate-1 rounded-2xl border border-white/15 bg-white/20 p-4 backdrop-blur">
              <div className="h-24 rounded-xl bg-gradient-to-br from-fuchsia-400 to-pink-500" />
              <div className="mt-3 h-3 w-3/5 rounded bg-white/40" />
              <div className="mt-2 h-3 w-2/5 rounded bg-white/25" />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10">
          <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="tnum text-3xl font-extrabold">{s.value}</p>
                <p className="mt-1 text-sm text-white/65">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-page py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">دسته‌بندی‌ها را کشف کنید</h2>
          <p className="mt-2 text-ink-soft">مسیر یادگیری خود را از میان حوزه‌های پرطرفدار انتخاب کنید.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/courses?category=${c.slug}`}
              className="card group flex flex-col items-center gap-3 p-5 text-center transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span
                className="grid h-14 w-14 place-items-center rounded-2xl text-2xl"
                style={{ background: `linear-gradient(135deg, ${c.color[0]}22, ${c.color[1]}22)` }}
              >
                {c.icon}
              </span>
              <span className="text-sm font-semibold text-ink group-hover:text-brand-700">{c.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-white py-16">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-ink md:text-3xl">دوره‌های برگزیده</h2>
              <p className="mt-2 text-ink-soft">محبوب‌ترین و پرامتیازترین دوره‌های پلتفرم.</p>
            </div>
            <Link href="/courses" className="hidden items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800 sm:flex">
              مشاهده همه <Icon name="arrowLeft" size={16} />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container-page py-16">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink md:text-3xl">چطور شروع کنیم؟</h2>
          <p className="mt-2 text-ink-soft">تنها در سه گام ساده به یادگیری برسید.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="relative card p-6">
              <span className="tnum absolute end-6 top-6 text-4xl font-extrabold text-brand-50">
                {toFa(i + 1)}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon name={s.icon} size={24} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16">
        <div className="container-page">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-ink md:text-3xl">دانشجویان چه می‌گویند</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => {
              const u = getUser(t.userId);
              return (
                <figure key={t.id} className="card flex flex-col p-6">
                  <Rating value={t.rating} size={15} />
                  <blockquote className="mt-4 flex-1 text-sm leading-7 text-ink-soft">«{t.comment}»</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    {u && <Avatar name={u.name} color={u.avatarColor} size={38} />}
                    <div>
                      <p className="text-sm font-semibold text-ink">{u?.name}</p>
                      <p className="text-xs text-ink-muted">{u?.title}</p>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="relative overflow-hidden rounded-2xl bg-brand-700 px-8 py-12 text-center text-white md:py-16">
          <div
            className="absolute inset-0 opacity-50"
            style={{ backgroundImage: "radial-gradient(50% 80% at 50% 0%, rgba(255,255,255,0.18), transparent)" }}
            aria-hidden="true"
          />
          <h2 className="relative text-2xl font-extrabold md:text-3xl">آماده‌اید یادگیری را شروع کنید؟</h2>
          <p className="relative mx-auto mt-3 max-w-md text-white/80">
            همین حالا ثبت‌نام کنید و به ده‌ها دوره و کلاس زنده دسترسی پیدا کنید.
          </p>
          <div className="relative mt-7">
            <ButtonLink href="/register" size="lg" className="bg-white text-brand-800 hover:bg-white/90">
              ساخت حساب رایگان
            </ButtonLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
