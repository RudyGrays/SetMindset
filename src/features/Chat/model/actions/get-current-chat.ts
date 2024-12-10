"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { ChatRepository } from "../repository/chat-repository";

export const getCurrentChat = async (chatId: string) => {
  const currentChat = await ChatRepository.getChatById(+chatId);

  return currentChat;
};
