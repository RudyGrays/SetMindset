"use server";

import { UserWithSubjects } from "../../ui/subject-file-list";
import { getSubjectsWithFilesForUser } from "../repository/getSubjectsAndFiles";

export const getUserSubjectsAndFiles = async (userId: string) => {
  const subjects = await getSubjectsWithFilesForUser(userId);

  return subjects;
};
