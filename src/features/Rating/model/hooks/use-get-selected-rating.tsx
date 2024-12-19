"use client";

import { useQuery } from "@tanstack/react-query";
import { getSelectedRatingForUser } from "../repo/repo";

export const useGetSelectedRating = (from: string, to: string) => {
  const { data: SelectedRating } = useQuery({
    queryKey: ["selected-rating"],
    queryFn: async () => {
      const rating = await getSelectedRatingForUser(from, to);

      return rating;
    },
  });

  return {
    SelectedRating,
  };
};
