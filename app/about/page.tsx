import { SiteShell } from "@/components/layout/SiteShell";
import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";


export const metadata = {
  title: "درباره ما | دانش‌یار",
  description: "آشنایی با تیم، ماموریت و ارزش‌های پلتفرم آموزشی دانش‌یار",
};

const team = [
  { name: "دکتر مریم حسینی", role: "بنیان‌گذار و مدیرعامل", color: "#5a45e2", title: "دکترای هوش مصنوعی" },
  { name: "علی موسوی", role: "مدیر فنی", color: "#0ea5e9", title: "مهندس ارشد نرم‌افزار" },
  { name: "نگار شریفی", role: "مدیر محصول", color: "#059669", title: "کارشناس ارشد تعامل انسان و رایانه" },
  { name: "رضا تهرانی", role: "مدیر محتوای آموزشی", color: "#d97706", title: "دانشجوی دکترای علوم تربیتی" },
];

const values = [
  { icon: "graduation" as const, title: "آموزش در دسترس", text: "باور داریم آموزش باکیفیت باید برای هر دانشجویی، در هر کجا، قابل دسترس باشد." },
  { icon: "users" as const, title: "جامعه‌محوری", text: "یادگیری در کنار هم اتفاق می‌افتد؛ ما فضایی برای تعامل دانشجو و استاد می‌سازیم." },
  { icon: "trophy" as const, title: "کیفیت بی‌سازش", text: "هر دوره توسط متخصصان دانشگاهی طراحی و بازبینی می‌شود." },
  { icon: "check" as const, title: "یادگیری کاربردی", text: "تمرکز ما بر پروژه‌های واقعی و مهارت‌هایی است که در بازار کار به‌کار می‌آیند." },
];

const stats = [
  { value: "۱۲٬۵۰۰+", label: "دانشجوی فعال" },
  { value: "۸۵+", label: "دوره تخصصی" },
  { value: "۴۰+", label: "استاد مجرب" },
  { value: "۹۶٪", label: "رضایت دانشجویان" },
];

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="bg-gradient-to-bl from-brand-950 via-brand-900 to-brand-800 text-white">
        <div className="container-page py-20 text-center">
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            ما به قدرت یادگیری باور داریم
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-brand-100/90">
            دانش‌یار با هدف کوتاه‌کردن فاصله میان دانشجویان و دانش روز ساخته شد؛
            جایی که استادان و پژوهشگران، تجربه‌شان را به‌صورت دوره‌های کاربردی و کلاس‌های زنده به اشتراک می‌گذارند.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <div className="container-page grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="tnum text-3xl font-extrabold text-brand-700">{s.value}</div>
              <div className="mt-1 text-sm text-ink-soft">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="container-page py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-bold text-brand-600">ماموریت ما</span>
          <h2 className="mt-2 text-2xl font-extrabold text-ink">
            تبدیل اشتیاق به یادگیری، به مهارت‌های واقعی
          </h2>
          <p className="mt-4 leading-8 text-ink-soft">
            ما تلاش می‌کنیم محیطی فراهم کنیم که در آن دانشجویان دانشگاهی بتوانند فراتر از کلاس‌های رسمی،
            مهارت‌های فنی و حرفه‌ای موردنیاز خود را بیاموزند. هر دوره با تمرکز بر پروژه‌های عملی طراحی شده تا
            یادگیری از حالت نظری خارج شده و به توانایی واقعی تبدیل شود.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="card p-6">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <Icon name={v.icon} size={24} />
              </span>
              <h3 className="mt-4 font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-paper py-16">
        <div className="container-page">
          <div className="text-center">
            <span className="text-sm font-bold text-brand-600">تیم ما</span>
            <h2 className="mt-2 text-2xl font-extrabold text-ink">افراد پشت دانش‌یار</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="card flex flex-col items-center p-6 text-center">
                <Avatar name={m.name} color={m.color} size={84} />
                <h3 className="mt-4 font-bold text-ink">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-600">{m.role}</p>
                <p className="mt-1 text-xs text-ink-muted">{m.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="container-page py-16">
        <div className="card mx-auto flex max-w-4xl flex-col items-center gap-8 p-8 sm:flex-row sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">با ما در ارتباط باشید</h2>
            <p className="mt-2 text-ink-soft">سوال یا پیشنهادی دارید؟ خوشحال می‌شویم بشنویم.</p>
          </div>
          <div className="grid gap-3 text-sm">
            <span className="inline-flex items-center gap-3 text-ink-soft">
              <Icon name="message" size={18} className="text-brand-600" />
              info@daneshyar.example
            </span>
            <span className="inline-flex items-center gap-3 text-ink-soft tnum">
              <Icon name="users" size={18} className="text-brand-600" />
              ۰۲۱ - ۱۲۳۴ ۵۶۷۸
            </span>
            <span className="inline-flex items-center gap-3 text-ink-soft">
              <Icon name="home" size={18} className="text-brand-600" />
              تهران، خیابان دانشگاه، پلاک ۴۲
            </span>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
