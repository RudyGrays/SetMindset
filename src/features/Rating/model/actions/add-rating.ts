"use server";

import { AddRating } from "../repo/repo";

export const AddRatingAction = async (
  from: string,
  to: string,
  ratingValue: number
) => {
  try {
    const rating = await AddRating(from, to, ratingValue);

    return rating;
  } catch (e: any) {
    throw new Error(e);
  }
};
