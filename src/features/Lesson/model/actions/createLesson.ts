"use server";

import { assignLesson } from "../repo/repo";

export const createLessonAction = async (data: {
  teacherId: string;
  studentId: string;
  date: Date;
  price: number;
  subjectId: number;
}) => {
  const lesson = await assignLesson(data);
  if (!lesson) return;

  return lesson;
};
