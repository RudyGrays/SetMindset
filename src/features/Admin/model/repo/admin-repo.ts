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

  const user = await dbClient.user.update({
    where: {
      id: document.userId,
    },
    data: {
      canTeach: true,
    },
  });

  return document;
};

export const acceptUserUpdates = async (userId: string) => {
  await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      isOk: true,
    },
  });
};

export const getUsersForAdmin = async (
  userId: string,
  searchValue?: string
) => {
  const users = await dbClient.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
      ...(searchValue && {
        OR: [
          { email: { contains: searchValue, mode: "insensitive" } },
          { name: { contains: searchValue, mode: "insensitive" } },
          {
            subjects: {
              some: {
                name: { contains: searchValue, mode: "insensitive" },
              },
            },
          },
        ],
      }),
    },
  });

  return users;
};
