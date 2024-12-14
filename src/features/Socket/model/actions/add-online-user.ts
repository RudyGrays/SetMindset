"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const addOnlineUser = async (userId: string) => {
  const user = await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      online: true,
    },
  });

  console.log(user, "online");
};
