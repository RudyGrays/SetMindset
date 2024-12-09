import { dbClient } from "@/shared/db/prisma.client";
import { FriendsRepository } from "../repository/repository";
import { UserEntity } from "@/entities/User/model/types/User";

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
  console.log();
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
        } as UserEntity)
    );

    return transformedFriends;
  }

  return [];
};
