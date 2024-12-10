import { dbClient } from "@/shared/db/prisma.client";

export const ChatRepository = {
  getUserChats: async (userId: string) => {
    return dbClient.chat.findMany({
      where: {
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: {
        user1: true,
        user2: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  },

  createChat: async (user1Id: string, user2Id: string) => {
    return dbClient.chat.create({
      data: {
        user1Id,
        user2Id,
      },
    });
  },

  getChatById: async (chatId: number) => {
    return dbClient.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        user1: true,
        user2: true,
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  },

  addMessage: async (chatId: number, senderId: string, content: string) => {
    return dbClient.message.create({
      data: {
        chatId,
        senderId,
        content,
      },
    });
  },

  getMessagesForChat: async (chatId: number) => {
    return dbClient.message.findMany({
      where: {
        chatId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  },
};
