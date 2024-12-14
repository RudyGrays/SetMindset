"use server";

import { getAllSubjects } from "../Repository/SubjectRepo";

export const getAllSubjectsAction = async () => {
  return await getAllSubjects();
};
