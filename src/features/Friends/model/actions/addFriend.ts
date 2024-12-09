import { FriendsRepository } from "../repository/repository";

export const addFriend = async (requesterId: string, responderId: string) => {
  const friendship = await FriendsRepository.addFriend(
    requesterId,
    responderId
  );
  return friendship || undefined;
};
