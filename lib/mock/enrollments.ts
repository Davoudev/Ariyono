import type { Enrollment } from "@/lib/types";

export const enrollments: Enrollment[] = [
  { userId: "s1", courseId: "c1", progress: 100, completedLessons: [], lastWatchedLessonId: "c1-s3-l3" },
  { userId: "s1", courseId: "c3", progress: 62, completedLessons: [], lastWatchedLessonId: "c3-s2-l1" },
  { userId: "s1", courseId: "c9", progress: 25, completedLessons: [], lastWatchedLessonId: "c9-s1-l2" },
  { userId: "s2", courseId: "c2", progress: 48, completedLessons: [], lastWatchedLessonId: "c2-s2-l2" },
  { userId: "s2", courseId: "c4", progress: 90, completedLessons: [], lastWatchedLessonId: "c4-s2-l2" },
  { userId: "s2", courseId: "c10", progress: 33, completedLessons: [], lastWatchedLessonId: "c10-s1-l2" },
  { userId: "s3", courseId: "c1", progress: 70, completedLessons: [], lastWatchedLessonId: "c1-s2-l3" },
  { userId: "s3", courseId: "c7", progress: 15, completedLessons: [], lastWatchedLessonId: "c7-s1-l1" },
  { userId: "s4", courseId: "c6", progress: 55, completedLessons: [], lastWatchedLessonId: "c6-s2-l1" },
  { userId: "s4", courseId: "c12", progress: 20, completedLessons: [], lastWatchedLessonId: "c12-s1-l1" },
  { userId: "s5", courseId: "c5", progress: 40, completedLessons: [], lastWatchedLessonId: "c5-s2-l1" },
  { userId: "s5", courseId: "c8", progress: 10, completedLessons: [], lastWatchedLessonId: "c8-s1-l1" },
  { userId: "s5", courseId: "c11", progress: 5, completedLessons: [], lastWatchedLessonId: "c11-s1-l1" },
];

export function enrollmentsFor(userId: string): Enrollment[] {
  return enrollments.filter((e) => e.userId === userId);
}

export function studentsInCourse(courseId: string): string[] {
  return enrollments.filter((e) => e.courseId === courseId).map((e) => e.userId);
}

export function isEnrolled(userId: string, courseId: string): boolean {
  return enrollments.some((e) => e.userId === userId && e.courseId === courseId);
}
