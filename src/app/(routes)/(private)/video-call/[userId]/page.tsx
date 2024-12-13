import { SocketProvider } from "@/features/Socket/ui/socket-provider";
import { VideoCall } from "@/features/VideoCall/ui/video-call";
import { useSession } from "next-auth/react";

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params;

  return (
    <div className="w-full h-full flex justify-center">
      <VideoCall userId={userId} />
    </div>
  );
};

export default Page;
