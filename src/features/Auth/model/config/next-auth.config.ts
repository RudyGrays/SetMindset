import { dbClient } from "@/shared/db/prisma.client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import Email from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
    Email({}),
  ],
  secret: process.env.SECRET,
};
