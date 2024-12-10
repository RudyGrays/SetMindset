"use server";

import { ChatRepository } from "../repository/chat-repository";

export const getUserChats = async (userId: string) => {
  const chats = await ChatRepository.getUserChats(userId);

  return chats;
};
