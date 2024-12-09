"use client";

import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../actions/getFriends";
import { UserEntity } from "@/entities/User/model/types/User";

interface UseFriendsResult {
  friends: UserEntity[] | undefined | null;
  isLoading: boolean;
  isError: boolean;
}

export const useFriends = (userId: string): UseFriendsResult => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => getFriends(userId),
    enabled: !!userId,
  });

  return {
    friends: data || [],
    isLoading,
    isError,
  };
};
