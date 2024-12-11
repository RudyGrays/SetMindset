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

    const friendshipRequests = await dbClient.friend.findMany({
      where: {
        OR: [{ userId: currentUserId }, { friendId: currentUserId }],
      },
    });

    const friendIds = friendshipRequests
      .filter((friendship) => friendship.status === "ACCEPTED")
      .map((friendship) =>
        friendship.userId === currentUserId
          ? friendship.friendId
          : friendship.userId
      );

    const requestIds = friendshipRequests
      .filter(
        (friendship) =>
          friendship.status === "PENDING" && friendship.userId === currentUserId
      )
      .map((friendship) => friendship.friendId);

    const usersWithFriendStatus = users.map((user) => {
      const isFriend = friendIds.includes(user.id);
      const isRequest = requestIds.includes(user.id);

      return {
        ...user,
        isFriend,
        isRequest,
      };
    });

    return usersWithFriendStatus;
  },
};
