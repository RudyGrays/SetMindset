"use server";

import { FriendsRepository } from "../repository/repository";

export const removeFriend = async (
  requesterId: string,
  responderId: string
) => {
  const friendship = await FriendsRepository.removeFriend(
    requesterId,
    responderId
  );
  return friendship || undefined;
};
