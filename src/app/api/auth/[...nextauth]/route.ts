import NextAuth from "next-auth";

import { authConfig } from "@/features/Auth/model/config/next-auth.config";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
