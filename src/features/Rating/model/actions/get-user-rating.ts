"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const getUserRating = async (userId: string) => {
  const ratingArr = await dbClient.rating.findMany({
    where: {
      userId: userId,
    },
  });

  const rating = Math.round(
    ratingArr.reduce((acc, rate) => {
      return acc + rate.rating;
    }, 0) / ratingArr.length
  );

  return rating;
};
