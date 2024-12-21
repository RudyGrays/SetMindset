import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
interface ChatContext {
  chat: string | undefined;
  setChat: Dispatch<SetStateAction<string | undefined>>;
}
export const ChatContext = createContext<ChatContext | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chat, setChat] = useState<string | undefined>();

  return (
    <ChatContext.Provider value={{ chat, setChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatId = () => {
  const context = useContext(ChatContext);
  if (context === null)
    throw new Error("useSocket must be used within a SocketContextProvider");

  return context;
};
