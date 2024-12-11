"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../actions/create-chat";
import { useRouter } from "next/navigation";

export const useCreateChat = (user1: string, user2: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, data, isPending } = useMutation({
    mutationFn: () => createChat(user1, user2),
    onSuccess: (data) => {
      router.push(`chats/${data.id}`);
    },
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
    },
  });

  return {
    chat: data,
    isPending,
    mutate,
  };
};
