"use server";

import { FriendsRepository } from "../repository/repository";

export const acceptFriendship = async (
  requesterId: string,
  responderId: string
) => {
  const friendship = await FriendsRepository.acceptRequest(
    requesterId,
    responderId
  );
  return friendship || undefined;
};
