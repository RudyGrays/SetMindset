import { getServerSession } from "next-auth";

import { NeedAuthError } from "@/shared/lib/errors";
import { authConfig } from "../config/next-auth.config";

export const getAppSessionServer = () => getServerSession(authConfig);
export const getAppSessionStrictServer = async () => {
  const session = await getAppSessionServer();
  if (session === null) {
    throw new NeedAuthError();
  }
  return session;
};
