import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../actions/send-message";
import { Message } from "@prisma/client";

export const useSendMessage = (
  chatId: string,
  senderId: string,
  content: string
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => sendMessage(chatId, senderId, content),
    onMutate: async (message: Message) => {
      await queryClient.cancelQueries({ queryKey: ["messages"] });

      const previousMessages = queryClient.getQueryData(["messages"]);

      queryClient.setQueryData(["messages"], (old: Message[]) => [
        ...old,
        message,
      ]);
      return { previousMessages };
    },

    onError(error, message, context) {
      queryClient.setQueryData(["messages"], context?.previousMessages);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return mutation;
};
