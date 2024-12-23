"use server";

import { Message } from "@prisma/client";
import { ChatRepository } from "../repository/chat-repository";

export const deleteMessage = async (messageId: number) => {
  const message = await ChatRepository.deleteMessage(messageId);
  return message;
};
