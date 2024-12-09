import { useQuery } from "@tanstack/react-query";
import { addFriend } from "../actions/addFriend";

export const useAddFriend = (requesterId: string, responderId: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["add-friend", requesterId, responderId],
    queryFn: () => addFriend(requesterId, responderId),
  });

  return {
    data,
    isPending,
    error,
  };
};
