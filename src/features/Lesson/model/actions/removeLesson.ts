"use server";

import { deleteLesson } from "../repo/repo";

export const removeLesson = async (lessonId: string) => {
  return await deleteLesson(lessonId);
};
