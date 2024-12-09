import { dbClient } from "@/shared/db/prisma.client";

export const FriendsRepository = {
  getFriends: async (userId: string) => {
    return dbClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friends: {
          include: {
            friend: true,
          },
        },
      },
    });
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
    return dbClient.friend.updateMany({
      where: {
        userId: requesterId,
        friendId: responderId,
        status: "PENDING",
      },
      data: {
        status: "ACCEPTED",
      },
    });
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
