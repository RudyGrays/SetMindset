"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const removeOnlineUser = async (userId: string) => {
  console.log("try remove");
  const user = await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      online: false,
    },
  });
};
