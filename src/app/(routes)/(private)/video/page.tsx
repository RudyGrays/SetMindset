"use client";

import VideoCall from "@/features/VideoCall/ui/video-call";
import { useSession } from "next-auth/react";

const Page = () => {
  return <VideoCall />;
};

export default Page;
