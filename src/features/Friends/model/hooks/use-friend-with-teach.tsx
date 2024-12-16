"use client";

import { useQuery } from "@tanstack/react-query";

import { UserEntity } from "@/entities/User/model/types/User";
import { getFriendsWithCanTeach } from "@/features/Lesson/model/actions/getFriendsWithCanTeach";
import {
  getFriendsWithTeach,
  UserWithIsFriend,
} from "../actions/getFriendsWithCanTeach";

interface UseFriendsResult {
  friends: UserWithIsFriend[] | undefined | null;
  isLoading: boolean;
  isError: boolean;
}

export const useFriendsWithTeach = (userId: string): UseFriendsResult => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => getFriendsWithTeach(userId),
    enabled: !!userId,
  });

  return {
    friends: data || [],
    isLoading,
    isError,
  };
};
