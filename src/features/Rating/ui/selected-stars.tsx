"use client";

import { useAddRating } from "../model/hooks/use-add-rating";
import { useGetSelectedRating } from "../model/hooks/use-get-selected-rating";
import { FilledStar } from "./filled-star";
import { Star } from "./star";

export const SelectedStars = ({
  myId,
  userId,
}: {
  myId: string;
  userId: string;
}) => {
  const stars = [];

  const { SelectedRating } = useGetSelectedRating(myId!, userId!);

  for (let i = 0; i < 5; i++) {
    if (i < (SelectedRating?.rating ?? 0)) {
      stars.push({ type: "fill" });
    } else {
      stars.push({ type: "empty" });
    }
  }
  const { addRatingMutate } = useAddRating();
  return (
    <div className="flex gap-1">
      {stars.map((star, idx) => {
        return star.type === "fill" ? (
          <FilledStar
            key={idx}
            onClick={() => {
              addRatingMutate({
                fromId: myId!,
                toId: userId!,
                ratingValue: idx + 1,
              });
            }}
          />
        ) : (
          <Star
            key={idx}
            onClick={() => {
              addRatingMutate({
                fromId: myId!,
                toId: userId!,
                ratingValue: idx + 1,
              });
            }}
          />
        );
      })}
    </div>
  );
};
