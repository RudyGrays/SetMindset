"use client";

import { useAddRating } from "../model/hooks/use-add-rating";
import { useGetRating } from "../model/hooks/use-get-rating";
import { useGetSelectedRating } from "../model/hooks/use-get-selected-rating";
import { FilledStar } from "./filled-star";
import { Star } from "./star";

export const Stars = ({ userId }: { userId: string }) => {
  const stars = [];
  const { Rating } = useGetRating(userId);

  for (let i = 0; i < 5; i++) {
    if (i < (Rating ?? 0)) {
      stars.push({ type: "fill" });
    } else {
      stars.push({ type: "empty" });
    }
  }

  return (
    <div className="flex gap-1">
      {stars.map((star, idx) => {
        return star.type === "fill" ? (
          <FilledStar key={idx} />
        ) : (
          <Star key={idx} />
        );
      })}
    </div>
  );
};
