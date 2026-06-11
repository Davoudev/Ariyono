import type { User } from "@/lib/types";

// Mock users — passwords are plain text purely for the demo login flow.
export const users: User[] = [
  // ---- Students ----
  {
    id: "s1",
    name: "آرمان رضایی",
    email: "arman@student.ir",
    password: "123456",
    role: "student",
    avatarColor: "#5a45e2",
    title: "دانشجوی کارشناسی مهندسی کامپیوتر",
    bio: "علاقه‌مند به توسعه وب و هوش مصنوعی.",
  },
  {
    id: "s2",
    name: "سارا محمدی",
    email: "sara@student.ir",
    password: "123456",
    role: "student",
    avatarColor: "#0ea5e9",
    title: "دانشجوی کارشناسی ارشد علم داده",
    bio: "در حال یادگیری یادگیری ماشین و تحلیل داده.",
  },
  {
    id: "s3",
    name: "نیما کریمی",
    email: "nima@student.ir",
    password: "123456",
    role: "student",
    avatarColor: "#059669",
    title: "دانشجوی کارشناسی مهندسی برق",
  },
  {
    id: "s4",
    name: "مهسا اکبری",
    email: "mahsa@student.ir",
    password: "123456",
    role: "student",
    avatarColor: "#db2777",
    title: "دانشجوی کارشناسی ریاضی",
  },
  {
    id: "s5",
    name: "پویا حسینی",
    email: "pouya@student.ir",
    password: "123456",
    role: "student",
    avatarColor: "#ea580c",
    title: "دانشجوی کارشناسی فناوری اطلاعات",
  },
  // ---- Instructors ----
  {
    id: "i1",
    name: "دکتر مریم نوری",
    email: "nouri@teacher.ir",
    password: "123456",
    role: "instructor",
    avatarColor: "#7c3aed",
    title: "دکترای هوش مصنوعی، عضو هیئت علمی",
    bio: "پژوهشگر یادگیری عمیق با بیش از ۱۰ سال سابقه تدریس.",
  },
  {
    id: "i2",
    name: "مهندس بابک شریفی",
    email: "sharifi@teacher.ir",
    password: "123456",
    role: "instructor",
    avatarColor: "#5a45e2",
    title: "دانشجوی دکترای مهندسی نرم‌افزار",
    bio: "متخصص توسعه وب مدرن و معماری نرم‌افزار.",
  },
  {
    id: "i3",
    name: "دکتر الهام صادقی",
    email: "sadeghi@teacher.ir",
    password: "123456",
    role: "instructor",
    avatarColor: "#dc2626",
    title: "دکترای امنیت اطلاعات",
    bio: "مدرس امنیت سایبری و رمزنگاری کاربردی.",
  },
];

export function findUserByCredentials(email: string, password: string): User | undefined {
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password,
  );
}

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
