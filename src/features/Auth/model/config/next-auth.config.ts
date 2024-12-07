import { dbClient } from "@/shared/db/prisma.client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { AuthOptions, User } from "next-auth";

import Email from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

export const authConfig: AuthOptions = {
  adapter: PrismaAdapter(dbClient),
  debug: true,
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role,
          id: user.id,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/sign-in",

    newUser: "/profile/new",
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: +process.env.EMAIL_SERVER_PORT!,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET,
};
