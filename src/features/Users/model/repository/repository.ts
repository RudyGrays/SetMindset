import { dbClient } from "@/shared/db/prisma.client";

export const UsersRepository = {
  getUsers: async (
    userId: string,
    currentUserId: string,
    searchValue?: string
  ) => {
    const users = await dbClient.user.findMany({
      where: {
        isOk: true,
        NOT: {
          id: userId,
        },
        ...(searchValue && {
          OR: [
            { email: { contains: searchValue, mode: "insensitive" } },
            { name: { contains: searchValue, mode: "insensitive" } },
            {
              subjects: {
                some: {
                  name: { contains: searchValue, mode: "insensitive" },
                  documents: {
                    some: {
                      isOk: true,
                    },
                  },
                },
              },
            },
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
      .filter((friendship) => friendship.status === "PENDING")
      .map((friendship) => friendship);

    const usersWithRatings = await Promise.all(
      users.map(async (user) => {
        const ratingArr = await dbClient.rating.findMany({
          where: {
            userId: user.id,
          },
        });

        const rating =
          ratingArr.length > 0
            ? Math.round(
                ratingArr.reduce((acc, rate) => acc + rate.rating, 0) /
                  ratingArr.length
              )
            : 0;

        const isFriend = friendIds.includes(user.id);
        const isRequest = requestIds.some(
          (request) =>
            request.friendId === user.id || request.userId === user.id
        );
        const request = requestIds.find(
          (request) =>
            request.friendId === user.id || request.userId === user.id
        );
        const requesterId = request?.userId;

        return {
          ...user,
          rating,
          isFriend,
          isRequest,
          requesterId,
        };
      })
    );

    const sortedUsers = usersWithRatings.sort((a, b) => b.rating - a.rating);

    return sortedUsers;
  },
};
