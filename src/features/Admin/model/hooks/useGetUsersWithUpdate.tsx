"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersWithUpdate } from "../actions/getUsersWithUpdate";

export const useGetUsersWithUpdate = (userId: string) => {
  const { data: usersWithUpdate, isPending } = useQuery({
    queryKey: ["usersWithUpdate"],
    queryFn: () => {
      return getUsersWithUpdate(userId);
    },
  });

  return {
    usersWithUpdate,
    isPending,
  };
};
