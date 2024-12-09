import { FriendsRepository } from "../repository/repository";

export const removeFriend = async (
  requesterId: string,
  responderId: string
) => {
  const friendship = await FriendsRepository.addFriend(
    requesterId,
    responderId
  );
  return friendship || undefined;
};
