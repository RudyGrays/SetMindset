"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const getFriendRequests = async (
  senderId: string,
  responderId: string
) => {
  const requests = await dbClient.friend.findMany({
    where: {
      userId: senderId,
      friendId: responderId,
      status: "PENDING",
    },
  });
  return requests;
};
