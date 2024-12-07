"use client";
import { useAppSession } from "@/features/Auth/model/actions/use-app-session";
import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const Page = () => {
  const session = useAppSession();
  console.log(session);
  return <div>calendar</div>;
};

export default Page;
