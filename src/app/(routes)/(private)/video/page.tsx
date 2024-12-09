import { SocketProvider } from "@/features/Socket/ui/socket-provider";
import { VideoCall } from "@/features/VideoCall/ui/video-call";
import { useSession } from "next-auth/react";

const Page = () => {
  return <SocketProvider>Video</SocketProvider>;
};

export default Page;
