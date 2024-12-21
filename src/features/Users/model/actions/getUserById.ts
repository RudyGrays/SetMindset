"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const getUserById = async (userId: string) => {
  return await dbClient.user.findUnique({
    where: {
      id: userId,
    },
  });
};
