"use server";

import { Message } from "@prisma/client";
import { ChatRepository } from "../repository/chat-repository";

export const sendMessage = async (
  chatId: string,
  senderId: string,
  content: string
) => {
  const message = await ChatRepository.addMessage(+chatId, senderId, content);
  return message;
};
