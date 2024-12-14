"use server";

import { createSubject } from "../Repository/SubjectRepo";

export const addSubject = async (name: string, userId: string) => {
  const subject = await createSubject(name, userId);

  if (subject) return subject;
};
