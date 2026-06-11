import type { Course, Section } from "@/lib/types";

// Small helper to build a curriculum without repeating boilerplate.
function section(id: string, title: string, lessons: [string, number, boolean?][]): Section {
  return {
    id,
    title,
    lessons: lessons.map(([t, d, p], idx) => ({
      id: `${id}-l${idx + 1}`,
      title: t,
      durationMin: d,
      isPreview: p ?? false,
    })),
  };
}

export const courses: Course[] = [
  {
    id: "c1",
    title: "دوره جامع پایتون از صفر تا پروژه",
    subtitle: "یادگیری برنامه‌نویسی پایتون با تمرکز بر پروژه‌های واقعی",
    description:
      "در این دوره از مفاهیم پایه‌ای زبان پایتون شروع می‌کنیم و تا ساخت پروژه‌های کاربردی پیش می‌رویم. مناسب برای دانشجویانی که می‌خواهند برنامه‌نویسی را به شکل اصولی یاد بگیرند.",
    instructorId: "i2",
    category: "programming",
    level: "beginner",
    price: 0,
    rating: 4.8,
    ratingCount: 1240,
    studentCount: 5820,
    skills: ["Python", "مبانی برنامه‌نویسی", "ساختار داده"],
    thumbnailColors: ["#5a45e2", "#827ff8"],
    updatedAt: "خرداد ۱۴۰۴",
    curriculum: [
      section("c1-s1", "مقدمه و راه‌اندازی محیط", [
        ["معرفی دوره و مسیر یادگیری", 8, true],
        ["نصب پایتون و VS Code", 14, true],
        ["اولین برنامه: Hello World", 10],
      ]),
      section("c1-s2", "مفاهیم پایه", [
        ["متغیرها و انواع داده", 22],
        ["عملگرها و شرط‌ها", 26],
        ["حلقه‌ها", 24],
      ]),
      section("c1-s3", "توابع و ساختار داده", [
        ["تعریف و فراخوانی توابع", 28],
        ["لیست، تاپل و دیکشنری", 32],
        ["پروژه: ماشین‌حساب خط فرمان", 40],
      ]),
    ],
  },
  {
    id: "c2",
    title: "یادگیری ماشین کاربردی با پایتون",
    subtitle: "از رگرسیون تا شبکه‌های عصبی برای پروژه‌های دنیای واقعی",
    description:
      "این دوره مفاهیم بنیادی یادگیری ماشین را با رویکردی عملی آموزش می‌دهد. با کتابخانه‌های scikit-learn و pandas کار می‌کنیم و چند پروژه واقعی پیاده‌سازی می‌کنیم.",
    instructorId: "i1",
    category: "ai-ml",
    level: "intermediate",
    price: 1290000,
    rating: 4.9,
    ratingCount: 860,
    studentCount: 3120,
    skills: ["Machine Learning", "scikit-learn", "Pandas", "NumPy"],
    thumbnailColors: ["#7c3aed", "#c084fc"],
    updatedAt: "اردیبهشت ۱۴۰۴",
    curriculum: [
      section("c2-s1", "مبانی یادگیری ماشین", [
        ["یادگیری ماشین چیست؟", 16, true],
        ["انواع یادگیری: نظارت‌شده و بدون نظارت", 20],
      ]),
      section("c2-s2", "مدل‌های پایه", [
        ["رگرسیون خطی", 30],
        ["درخت تصمیم و جنگل تصادفی", 34],
        ["ارزیابی مدل و اعتبارسنجی متقابل", 28],
      ]),
      section("c2-s3", "شبکه‌های عصبی", [
        ["پرسپترون و شبکه چندلایه", 36],
        ["پروژه: تشخیص ارقام دست‌نویس", 48],
      ]),
    ],
  },
  {
    id: "c3",
    title: "توسعه وب مدرن با React و Next.js",
    subtitle: "ساخت اپلیکیشن‌های سریع و مقیاس‌پذیر با اکوسیستم React",
    description:
      "در این دوره از مبانی React تا قابلیت‌های پیشرفته Next.js را پوشش می‌دهیم؛ شامل مسیریابی، رندر سمت سرور و بهینه‌سازی عملکرد.",
    instructorId: "i2",
    category: "web-dev",
    level: "intermediate",
    price: 990000,
    rating: 4.7,
    ratingCount: 1530,
    studentCount: 6240,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    thumbnailColors: ["#059669", "#34d399"],
    updatedAt: "خرداد ۱۴۰۴",
    curriculum: [
      section("c3-s1", "مبانی React", [
        ["کامپوننت‌ها و Props", 24, true],
        ["State و رویدادها", 28],
        ["هوک‌های پرکاربرد", 32],
      ]),
      section("c3-s2", "Next.js App Router", [
        ["ساختار پروژه و مسیریابی", 30],
        ["رندر سمت سرور و Server Components", 34],
        ["پروژه: فروشگاه آنلاین", 52],
      ]),
    ],
  },
  {
    id: "c4",
    title: "تحلیل داده با Pandas و تجسم‌سازی",
    subtitle: "پاک‌سازی، تحلیل و مصورسازی داده‌های واقعی",
    description:
      "یاد می‌گیرید چطور داده‌های خام را پاک‌سازی، تحلیل و به نمودارهای گویا تبدیل کنید. تمرکز دوره بر پروژه‌های عملی با داده‌های واقعی است.",
    instructorId: "i1",
    category: "data-science",
    level: "beginner",
    price: 0,
    rating: 4.6,
    ratingCount: 720,
    studentCount: 2980,
    skills: ["Pandas", "Matplotlib", "تحلیل داده"],
    thumbnailColors: ["#0ea5e9", "#22d3ee"],
    updatedAt: "فروردین ۱۴۰۴",
    curriculum: [
      section("c4-s1", "آشنایی با Pandas", [
        ["ساختار DataFrame", 22, true],
        ["خواندن و نوشتن داده", 20],
      ]),
      section("c4-s2", "تحلیل و مصورسازی", [
        ["گروه‌بندی و تجمیع", 26],
        ["رسم نمودار با Matplotlib", 30],
      ]),
    ],
  },
  {
    id: "c5",
    title: "مبانی امنیت سایبری و تست نفوذ",
    subtitle: "اصول امنیت شبکه و شناسایی آسیب‌پذیری‌ها",
    description:
      "این دوره مفاهیم بنیادی امنیت سایبری، انواع حملات رایج و روش‌های دفاعی را آموزش می‌دهد. مناسب برای کسانی که می‌خواهند وارد حوزه امنیت شوند.",
    instructorId: "i3",
    category: "cybersecurity",
    level: "intermediate",
    price: 1490000,
    rating: 4.8,
    ratingCount: 540,
    studentCount: 1870,
    skills: ["Network Security", "Penetration Testing", "Linux"],
    thumbnailColors: ["#dc2626", "#f87171"],
    updatedAt: "اردیبهشت ۱۴۰۴",
    curriculum: [
      section("c5-s1", "مفاهیم پایه امنیت", [
        ["سه‌گانه CIA", 18, true],
        ["انواع حملات سایبری", 26],
      ]),
      section("c5-s2", "تست نفوذ", [
        ["شناسایی و جمع‌آوری اطلاعات", 30],
        ["ابزارهای متن‌باز تست نفوذ", 34],
      ]),
    ],
  },
  {
    id: "c6",
    title: "طراحی رابط و تجربه کاربری (UI/UX)",
    subtitle: "از پژوهش کاربر تا طراحی پروتوتایپ در Figma",
    description:
      "اصول طراحی تجربه کاربری، پژوهش کاربر، وایرفریم و ساخت پروتوتایپ تعاملی را به شکل عملی یاد می‌گیرید.",
    instructorId: "i2",
    category: "ui-ux",
    level: "beginner",
    price: 0,
    rating: 4.7,
    ratingCount: 980,
    studentCount: 4100,
    skills: ["Figma", "UX Research", "Prototyping", "Design System"],
    thumbnailColors: ["#db2777", "#f472b6"],
    updatedAt: "خرداد ۱۴۰۴",
    curriculum: [
      section("c6-s1", "اصول طراحی", [
        ["تفاوت UI و UX", 16, true],
        ["اصول بصری و چیدمان", 24],
      ]),
      section("c6-s2", "کار با Figma", [
        ["وایرفریم و موکاپ", 28],
        ["پروتوتایپ تعاملی", 30],
      ]),
    ],
  },
  {
    id: "c7",
    title: "پایگاه داده و زبان SQL",
    subtitle: "طراحی پایگاه داده رابطه‌ای و کوئری‌نویسی حرفه‌ای",
    description:
      "از طراحی جدول‌ها و روابط تا نوشتن کوئری‌های پیچیده و بهینه‌سازی، همه‌چیز را برای کار با پایگاه‌های داده رابطه‌ای یاد می‌گیرید.",
    instructorId: "i2",
    category: "databases",
    level: "beginner",
    price: 690000,
    rating: 4.5,
    ratingCount: 610,
    studentCount: 2350,
    skills: ["SQL", "PostgreSQL", "Database Design"],
    thumbnailColors: ["#ea580c", "#fb923c"],
    updatedAt: "فروردین ۱۴۰۴",
    curriculum: [
      section("c7-s1", "مبانی پایگاه داده", [
        ["مدل رابطه‌ای", 20, true],
        ["طراحی جدول و کلیدها", 24],
      ]),
      section("c7-s2", "کوئری‌نویسی", [
        ["SELECT و فیلترها", 26],
        ["JOIN و توابع تجمیعی", 32],
      ]),
    ],
  },
  {
    id: "c8",
    title: "یادگیری عمیق با PyTorch",
    subtitle: "ساخت و آموزش شبکه‌های عصبی عمیق",
    description:
      "دوره‌ای پیشرفته برای ساخت مدل‌های یادگیری عمیق با PyTorch؛ از شبکه‌های کانولوشنی تا مدل‌های ترنسفورمر.",
    instructorId: "i1",
    category: "ai-ml",
    level: "advanced",
    price: 1890000,
    rating: 4.9,
    ratingCount: 420,
    studentCount: 1290,
    skills: ["PyTorch", "Deep Learning", "CNN", "Transformers"],
    thumbnailColors: ["#7c3aed", "#a855f7"],
    updatedAt: "اردیبهشت ۱۴۰۴",
    curriculum: [
      section("c8-s1", "مبانی PyTorch", [
        ["تنسورها و گرادیان", 28, true],
        ["ساخت اولین شبکه عصبی", 34],
      ]),
      section("c8-s2", "مدل‌های پیشرفته", [
        ["شبکه‌های کانولوشنی (CNN)", 40],
        ["مقدمه‌ای بر ترنسفورمرها", 44],
      ]),
    ],
  },
  {
    id: "c9",
    title: "جاوااسکریپت پیشرفته",
    subtitle: "تسلط بر مفاهیم عمیق زبان جاوااسکریپت",
    description:
      "مفاهیم پیشرفته جاوااسکریپت شامل closure، async/await، prototype و الگوهای طراحی را به‌صورت کاربردی پوشش می‌دهیم.",
    instructorId: "i2",
    category: "programming",
    level: "advanced",
    price: 890000,
    rating: 4.7,
    ratingCount: 730,
    studentCount: 2680,
    skills: ["JavaScript", "Async", "Design Patterns"],
    thumbnailColors: ["#4c37c7", "#6a5ef0"],
    updatedAt: "خرداد ۱۴۰۴",
    curriculum: [
      section("c9-s1", "مفاهیم عمیق", [
        ["Scope و Closure", 30, true],
        ["this و bind", 26],
      ]),
      section("c9-s2", "ناهمگام‌سازی", [
        ["Promise و async/await", 34],
        ["پروژه: کلاینت API", 38],
      ]),
    ],
  },
  {
    id: "c10",
    title: "آمار و احتمال برای علم داده",
    subtitle: "پایه‌های آماری موردنیاز برای تحلیل و یادگیری ماشین",
    description:
      "مفاهیم آماری ضروری برای علم داده شامل توزیع‌ها، آزمون فرض و استنباط آماری را با مثال‌های عملی یاد می‌گیرید.",
    instructorId: "i1",
    category: "data-science",
    level: "intermediate",
    price: 0,
    rating: 4.6,
    ratingCount: 510,
    studentCount: 1980,
    skills: ["Statistics", "Probability", "Hypothesis Testing"],
    thumbnailColors: ["#0284c7", "#38bdf8"],
    updatedAt: "فروردین ۱۴۰۴",
    curriculum: [
      section("c10-s1", "آمار توصیفی", [
        ["میانگین، میانه و واریانس", 22, true],
        ["توزیع‌های احتمال", 28],
      ]),
      section("c10-s2", "آمار استنباطی", [
        ["آزمون فرض", 30],
        ["فاصله اطمینان", 26],
      ]),
    ],
  },
  {
    id: "c11",
    title: "رمزنگاری کاربردی",
    subtitle: "از رمزنگاری متقارن تا زیرساخت کلید عمومی",
    description:
      "اصول رمزنگاری مدرن، الگوریتم‌های متقارن و نامتقارن، توابع درهم‌سازی و کاربرد آن‌ها در امنیت سیستم‌ها.",
    instructorId: "i3",
    category: "cybersecurity",
    level: "advanced",
    price: 1190000,
    rating: 4.8,
    ratingCount: 290,
    studentCount: 960,
    skills: ["Cryptography", "PKI", "TLS"],
    thumbnailColors: ["#b91c1c", "#ef4444"],
    updatedAt: "اردیبهشت ۱۴۰۴",
    curriculum: [
      section("c11-s1", "مبانی رمزنگاری", [
        ["رمزنگاری متقارن", 26, true],
        ["رمزنگاری نامتقارن", 30],
      ]),
      section("c11-s2", "کاربردها", [
        ["توابع درهم‌سازی", 24],
        ["پروتکل TLS", 32],
      ]),
    ],
  },
  {
    id: "c12",
    title: "طراحی سیستم طراحی (Design System)",
    subtitle: "ساخت کتابخانه کامپوننت منسجم و مقیاس‌پذیر",
    description:
      "روش ساخت یک Design System منسجم، توکن‌های طراحی، مستندسازی کامپوننت‌ها و همکاری میان طراح و توسعه‌دهنده.",
    instructorId: "i2",
    category: "ui-ux",
    level: "intermediate",
    price: 790000,
    rating: 4.6,
    ratingCount: 340,
    studentCount: 1120,
    skills: ["Design System", "Design Tokens", "Component Library"],
    thumbnailColors: ["#be185d", "#ec4899"],
    updatedAt: "خرداد ۱۴۰۴",
    curriculum: [
      section("c12-s1", "مبانی", [
        ["توکن‌های طراحی", 22, true],
        ["تایپوگرافی و رنگ", 24],
      ]),
      section("c12-s2", "ساخت کتابخانه", [
        ["کامپوننت‌های پایه", 28],
        ["مستندسازی", 26],
      ]),
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function coursesByInstructor(instructorId: string): Course[] {
  return courses.filter((c) => c.instructorId === instructorId);
}

export function totalLessons(course: Course): number {
  return course.curriculum.reduce((sum, s) => sum + s.lessons.length, 0);
}

export function totalDuration(course: Course): number {
  return course.curriculum.reduce(
    (sum, s) => sum + s.lessons.reduce((a, l) => a + l.durationMin, 0),
    0,
  );
}
