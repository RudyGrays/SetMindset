import { ReactNode } from "react";
import {
  getAppSessionServer,
  getAppSessionStrictServer,
} from "../lib/get-server-session";
import { redirect } from "next/navigation";

export const AuthMiddleware = async ({ children }: { children: ReactNode }) => {
  const session = await getAppSessionServer();
  if (!session) return redirect("/auth/sign-in");
  return <>{children}</>;
};
