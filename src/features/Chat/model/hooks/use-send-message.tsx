import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sendMessage } from "../actions/send-message";
import { Message } from "@prisma/client";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (message: Message) => {
      return sendMessage(
        String(message.chatId),
        message.senderId,
        message.content
      );
    },

    onMutate: async (message: Message) => {
      await queryClient.cancelQueries({ queryKey: ["messages"] });

      const previousMessages = queryClient.getQueryData(["messages"]);

      queryClient.setQueryData(["messages"], (old: Message[] = []) => [
        ...old,
        message,
      ]);
      return { previousMessages };
    },

    onError(error, message, context) {
      queryClient.setQueryData(["messages"], context?.previousMessages);
    },

    onSettled: (message) => {
      queryClient.invalidateQueries({ queryKey: ["messages", message] });
    },
  });

  return {
    mutation,
  };
};
