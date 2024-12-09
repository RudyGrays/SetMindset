import { FriendsRepository } from "../repository/repository";

export const cancelFriendship = async (
  requesterId: string,
  responderId: string
) => {
  const friendship = await FriendsRepository.cancelRequest(
    requesterId,
    responderId
  );
  return friendship || undefined;
};
