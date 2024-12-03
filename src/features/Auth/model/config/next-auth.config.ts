import { dbClient } from "@/shared/db/prisma.client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
      },
      async authorize(credentials, req) {
        if (!credentials?.email) return null;
        const currentUser = dbClient.user.findFirst({
          where: { email: credentials.email },
        });
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
};
