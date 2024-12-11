"use client";

import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../actions/getFriendshipRequests";

export const useGetFriendRequests = (senderId: string, responderId: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["friend requests"],
    queryFn: async () => {
      return await getFriendRequests(senderId, responderId);
    },
  });

  return {
    data,
    isPending,
  };
};
