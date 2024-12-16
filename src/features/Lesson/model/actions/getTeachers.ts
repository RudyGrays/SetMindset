"use server";

import { getTeacherFriends } from "../repo/repo";

export const getTeachersAction = async (userId: string) => {
  return await getTeacherFriends(userId);
};
