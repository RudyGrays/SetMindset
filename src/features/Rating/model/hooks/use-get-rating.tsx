"use client";

import { useQuery } from "@tanstack/react-query";
import { getRating, getSelectedRatingForUser } from "../repo/repo";
import { getUserRating } from "../actions/get-user-rating";

export const useGetRating = (userId: string) => {
  const { data: Rating } = useQuery({
    queryKey: ["rating"],
    queryFn: async () => {
      const rating = await getUserRating(userId);

      return rating;
    },
  });

  return {
    Rating,
  };
};
