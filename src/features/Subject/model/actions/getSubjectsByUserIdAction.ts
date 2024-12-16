"use server";

import { getSubjectById, getSubjectsByUserId } from "../Repository/SubjectRepo";

export const getSubjectsByUserIdAction = async (userId: string) => {
  return await getSubjectsByUserId(userId);
};
