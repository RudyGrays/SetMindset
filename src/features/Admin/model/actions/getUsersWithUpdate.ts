"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const getUsersWithUpdate = async (userId: string) => {
  const users = await dbClient.user.findMany({
    where: {
      isOk: false,
      NOT: {
        id: userId,
      },
    },
  });

  return users;
};
