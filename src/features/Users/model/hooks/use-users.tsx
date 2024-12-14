"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../actions/getUsers";
import { UserEntity } from "@/entities/User/model/types/User";
import { UserWithIsFriend } from "@/features/Friends/model/actions/getFriends";

interface UseFriendsResult {
  users: UserWithIsFriend[] | undefined | null;
  isLoading: boolean;
  isError: boolean;
}

export const useUsers = (
  userId: string,
  currentUserId: string,
  searchValue?: string
): UseFriendsResult => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", userId, searchValue],
    queryFn: () => getUsers(userId, currentUserId, searchValue),
  });

  return {
    users: data || [],
    isLoading,
    isError,
  };
};
