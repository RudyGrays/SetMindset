import { Message } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useMessages = (messages: any[]) => {
  const { data } = useQuery({
    queryKey: ["messages", messages],
    initialData: messages,
  });
  return {
    messages: data,
  };
};
