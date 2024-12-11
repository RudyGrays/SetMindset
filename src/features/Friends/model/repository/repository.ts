import { dbClient } from "@/shared/db/prisma.client";

export const FriendsRepository = {
  getFriends: async (userId: string) => {
    const friends = await dbClient.friend.findMany({
      where: {
        status: "ACCEPTED",
        OR: [{ userId: userId }, { friendId: userId }],
      },
      include: {
        user: true,
        friend: true,
      },
    });

    const friendsList = friends.map((friendship) => {
      if (friendship.userId === userId) {
        return friendship.friend;
      } else {
        return friendship.user;
      }
    });

    return friendsList;
  },

  addFriend: async (requesterId: string, responderId: string) => {
    return dbClient.friend.create({
      data: {
        userId: requesterId,
        friendId: responderId,
        status: "PENDING",
      },
    });
  },

  acceptRequest: async (requesterId: string, responderId: string) => {
    console.log("from db", requesterId, responderId);
    const data = await dbClient.friend.updateMany({
      where: {
        userId: requesterId,
        friendId: responderId,
        status: "PENDING",
      },
      data: {
        status: "ACCEPTED",
      },
    });

    return data;
  },

  cancelRequest: async (requesterId: string, responderId: string) => {
    return dbClient.friend.updateMany({
      where: {
        userId: requesterId,
        friendId: responderId,
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
      },
    });
  },

  removeFriend: async (requesterId: string, responderId: string) => {
    return dbClient.friend.deleteMany({
      where: {
        OR: [
          { userId: requesterId, friendId: responderId },
          { userId: responderId, friendId: requesterId },
        ],
      },
    });
  },
};
