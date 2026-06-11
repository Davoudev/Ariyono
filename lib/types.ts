export type Role = "student" | "instructor";

export type CategorySlug =
  | "programming"
  | "data-science"
  | "ai-ml"
  | "web-dev"
  | "databases"
  | "cybersecurity"
  | "ui-ux";

export type Level = "beginner" | "intermediate" | "advanced";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // mock only — never do this in a real app
  role: Role;
  avatarColor: string; // gradient seed
  bio?: string;
  title?: string; // e.g. "دانشجوی دکترای هوش مصنوعی"
}

export interface Lesson {
  id: string;
  title: string;
  durationMin: number;
  isPreview?: boolean;
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  instructorId: string;
  category: CategorySlug;
  level: Level;
  price: number; // 0 === free
  rating: number;
  ratingCount: number;
  studentCount: number;
  skills: string[];
  thumbnailColors: [string, string]; // gradient stops for the mock thumbnail
  curriculum: Section[];
  updatedAt: string; // jalali-style display string
}

export interface Enrollment {
  userId: string;
  courseId: string;
  progress: number; // 0..100
  completedLessons: string[];
  lastWatchedLessonId?: string;
}

export interface LiveSession {
  id: string;
  title: string;
  topic: string;
  instructorId: string;
  courseId: string;
  startsAt: string; // ISO
  durationMin: number;
  meetUrl: string;
}

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  courseId?: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}
