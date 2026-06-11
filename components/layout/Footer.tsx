import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const columns = [
  {
    title: "پلتفرم",
    links: [
      { href: "/courses", label: "همه دوره‌ها" },
      { href: "/live", label: "کلاس‌های زنده" },
      { href: "/about", label: "درباره ما" },
    ],
  },
  {
    title: "دسته‌بندی‌ها",
    links: [
      { href: "/courses?category=programming", label: "برنامه‌نویسی" },
      { href: "/courses?category=ai-ml", label: "هوش مصنوعی" },
      { href: "/courses?category=web-dev", label: "توسعه وب" },
    ],
  },
  {
    title: "حساب کاربری",
    links: [
      { href: "/login", label: "ورود" },
      { href: "/register", label: "ثبت‌نام" },
      { href: "/student/dashboard", label: "داشبورد" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-white">
      <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
              <Icon name="graduation" size={22} />
            </span>
            <span className="text-lg font-extrabold text-ink">دانش‌یار</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-7 text-ink-soft">
            پلتفرم آموزش آنلاین برای دانشجویان و اساتید دانشگاهی. یادگیری مهارت‌های روز، در هر زمان و هر مکان.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold text-ink">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-ink-soft transition hover:text-brand-700">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-ink-muted sm:flex-row">
          <p>© ۱۴۰۴ دانش‌یار — تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده به‌عنوان نمونه اولیه (MVP)</p>
        </div>
      </div>
    </footer>
  );
}
