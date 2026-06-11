import type { CategorySlug } from "@/lib/types";

export interface Category {
  slug: CategorySlug;
  label: string;
  icon: string; // emoji used as a lightweight, dependency-free glyph
  color: [string, string];
}

export const categories: Category[] = [
  { slug: "programming", label: "برنامه‌نویسی", icon: "⌨️", color: ["#5a45e2", "#827ff8"] },
  { slug: "data-science", label: "علم داده", icon: "📊", color: ["#0ea5e9", "#22d3ee"] },
  { slug: "ai-ml", label: "هوش مصنوعی", icon: "🧠", color: ["#7c3aed", "#c084fc"] },
  { slug: "web-dev", label: "توسعه وب", icon: "🌐", color: ["#059669", "#34d399"] },
  { slug: "databases", label: "پایگاه داده", icon: "🗄️", color: ["#ea580c", "#fb923c"] },
  { slug: "cybersecurity", label: "امنیت سایبری", icon: "🛡️", color: ["#dc2626", "#f87171"] },
  { slug: "ui-ux", label: "طراحی UI/UX", icon: "🎨", color: ["#db2777", "#f472b6"] },
];

export const categoryMap: Record<CategorySlug, Category> = Object.fromEntries(
  categories.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;

export const levelLabels: Record<string, string> = {
  beginner: "مقدماتی",
  intermediate: "متوسط",
  advanced: "پیشرفته",
};
