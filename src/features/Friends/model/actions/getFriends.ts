"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { FriendsRepository } from "../repository/repository";
import { UserEntity } from "@/entities/User/model/types/User";

export type UserWithIsFriend = UserEntity & {
  isFriend: boolean;
};

export const getFriends = async (userId: string) => {
  const userWithFriends = await dbClient.user.findUnique({
    where: { id: userId },
    include: {
      friends: {
        include: {
          friend: true,
        },
      },
    },
  });

  if (userWithFriends && userWithFriends.friends) {
    const transformedFriends = userWithFriends.friends.map(
      (friendRecord) =>
        ({
          id: friendRecord.friend.id,
          email: friendRecord.friend.email,
          emailVerified: friendRecord.friend.emailVerified,
          image: friendRecord.friend.image,
          role: friendRecord.friend.role,
          name: friendRecord.friend.name,
          isFriend: true,
        } as UserWithIsFriend)
    );

    return transformedFriends;
  }

  return [];
};
