import { getAppSessionServer } from "@/features/Auth/model/lib/get-server-session";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export const AdminMiddleware = async ({
  children,
}: {
  children: ReactNode;
}) => {
  const session = await getAppSessionServer();

  if (session?.user.role !== "ADMIN") {
    return redirect("/");
  }
  return <>{children}</>;
};
