"use server";

import { getAllSubjects, getSubjectsByUserId } from "../Repository/SubjectRepo";

export const getAllSubjectForUsersAction = async (userId: string) => {
  return await getSubjectsByUserId(userId);
};
