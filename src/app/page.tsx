import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";

import { GuideContainer } from "@/widgets/UseCaseGuide/ui/guide-container";

import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAppSessionServer();

  if (!session) return redirect("/auth/sign-in");
  return (
    <div className=" rounded-xl border  border-blue-500 h-full max-w-full flex justify-center">
      <GuideContainer />
    </div>
  );
}
