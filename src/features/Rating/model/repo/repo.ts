"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const AddRating = async (
  fromId: string,
  toId: string,
  rating: number
) => {
  const prevRating = await dbClient.rating.findFirst({
    where: {
      authorId: fromId,
      userId: toId,
    },
  });

  if (!!prevRating) {
    return dbClient.rating.update({
      where: {
        id: prevRating.id,
      },
      data: {
        rating: rating,
      },
    });
  }
  return await dbClient.rating.create({
    data: {
      authorId: fromId,
      userId: toId,
      rating,
    },
  });
};

export const getSelectedRatingForUser = async (
  fromId: string,
  toId: string
) => {
  const rating = await dbClient.rating.findFirst({
    where: {
      authorId: fromId,
      userId: toId,
    },
  });
  if (rating) return rating;

  return {
    rating: 0,
  };
};

export const getRating = async (userId: string) => {
  const rating = await dbClient.rating.findFirst({
    where: {
      userId: userId,
    },
  });
  if (rating) return rating;

  return {
    rating: 0,
  };
};
