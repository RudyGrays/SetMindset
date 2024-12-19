"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { FriendsRepository } from "../repository/repository";
import { UserEntity } from "@/entities/User/model/types/User";

export type UserWithIsFriend = UserEntity & {
  isFriend: boolean;
  isRequest?: boolean;
  requesterId?: string;
};

export const getFriends = async (userId: string) => {
  const friends = await FriendsRepository.getFriends(userId);

  const transformedFriends = friends.map(
    (friendRecord) =>
      ({
        id: friendRecord.id,
        email: friendRecord.email,
        emailVerified: friendRecord.emailVerified,
        image: friendRecord.image,
        role: friendRecord.role,
        name: friendRecord.name,
        isFriend: true,
      } as UserWithIsFriend)
  );

  return transformedFriends;
};
