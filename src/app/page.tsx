import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { GuideCarousel } from "@/widgets/UseCaseGuide/ui/guide-carousel";
import { GuideContainer } from "@/widgets/UseCaseGuide/ui/guide-container";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { useEffect } from "react";

export default async function Home() {
  const session = await getAppSessionServer();

  if (!session) return redirect("/auth/sign-in");
  return (
    <div className=" rounded-xl  h-[calc(100vh-60px-8px)] max-h-full flex justify-center">
      <GuideContainer />
    </div>
  );
}
