"use server";

import { getStudentFriends } from "../repo/repo";

export const getStudents = async (userId: string) => {
  return await getStudentFriends(userId);
};
