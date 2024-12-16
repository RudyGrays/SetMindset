import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { useEffect } from "react";

export default async function Home() {
  const session = await getAppSessionServer();

  if (!session) return redirect("/auth/sign-in");
  return <div className="">Home</div>;
}
