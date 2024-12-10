"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentChat } from "../actions/get-current-chat";

export const useCurrentChat = (chatId: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["currentChat", chatId],
    queryFn: () => getCurrentChat(chatId),
  });

  return {
    chat: data,
    isError,
    isLoading,
  };
};
