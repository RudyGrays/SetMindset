"use client";

import { useQuery } from "@tanstack/react-query";

import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";
import { getUsersForAdmin } from "../repo/admin-repo";

export const useUsersForAdmin = (userId: string, searchValue?: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["usersForAdmin", userId, searchValue],
    queryFn: () => getUsersForAdmin(userId, searchValue),
  });

  return {
    users: data || [],
    isLoading,
    isError,
  };
};
