"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { ChatRepository } from "../repository/chat-repository";

export const createChat = async (user1Id: string, user2Id: string) => {
  const [chat] = await dbClient.chat.findMany({
    where: {
      user1Id: user2Id,
      user2Id: user1Id,
    },
  });
  if (chat) return chat;
  try {
    const newChat = await ChatRepository.createChat(user1Id, user2Id);
    return newChat;
  } catch {
    return {} as {
      id: number;
      user1Id: string;
      user2Id: string;
    };
  }
};
