import { useQuery } from "@tanstack/react-query";
import { getNotificationsForUser } from "../actions/actions"; // асинхронный экшен
import { Notification } from "@prisma/client";

export const useNotifications = (userId: string) => {
  const { data, isLoading, isError, error } = useQuery<Notification[], Error>({
    queryKey: ["notifications", userId],
    queryFn: () => {
      return getNotificationsForUser(userId);
    },
    enabled: !!userId,
  });

  return {
    notifications: data || [],
    isLoading,
    isError,
    error,
  };
};
