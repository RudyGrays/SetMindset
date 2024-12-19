import { Chats } from "@/widgets/Chats/ui/chats";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Chats",
};
const page = () => {
  return <Chats />;
};

export default page;
