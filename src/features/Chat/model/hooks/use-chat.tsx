"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserChats } from "../actions/get-user-chats";

export const useChat = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["chats", userId],
    queryFn: () => getUserChats(userId),
  });

  return {
    chats: data,
    isLoading,
  };
};
