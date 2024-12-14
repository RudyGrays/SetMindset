"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const acceptDocument = async (documentId: number) => {
  const document = await dbClient.document.update({
    where: {
      id: documentId,
    },
    data: {
      isOk: true,
    },
  });
  if (!document) return;

  const user = dbClient.user.update({
    where: {
      id: document.userId,
    },
    data: {
      canTeach: true,
    },
  });

  return document;
};
