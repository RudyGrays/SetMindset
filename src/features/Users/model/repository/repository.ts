import { dbClient } from "@/shared/db/prisma.client";

export const UsersRepository = {
  getUsers: async (
    userId: string,
    currentUserId: string,
    searchValue?: string
  ) => {
    const users = await dbClient.user.findMany({
      where: {
        NOT: {
          id: userId,
        },
        ...(searchValue && {
          OR: [
            { email: { contains: searchValue, mode: "insensitive" } },
            { name: { contains: searchValue, mode: "insensitive" } },
          ],
        }),
      },
    });

    const friends = await dbClient.friend.findMany({
      where: {
        OR: [{ userId: currentUserId }, { friendId: currentUserId }],
      },
    });

    const friendIds = friends.map((friend) =>
      friend.userId === currentUserId ? friend.friendId : friend.userId
    );

    const usersWithIsFriend = users.map((user) => ({
      ...user,
      isFriend: friendIds.includes(user.id),
    }));

    return usersWithIsFriend;
  },
};
