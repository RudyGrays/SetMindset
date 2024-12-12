import { dbClient } from "@/shared/db/prisma.client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { nanoid } from "nanoid";
import type { AuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

import Email from "next-auth/providers/email";
import GitHubProvider from "next-auth/providers/github";

export const authConfig: AuthOptions = {
  adapter: {
    ...PrismaAdapter(dbClient),
    createUser: async (user: AdapterUser) => {
      const id = nanoid(40);
      const newUser = await dbClient.user.create({
        data: {
          ...user,
          id,
          name: `guest${id.substring(0, 8)}`,
          role:
            user.email.toLocaleLowerCase() ===
            process.env.ADMIN_EMAIL?.toLocaleLowerCase()
              ? "ADMIN"
              : "USER",
        },
      });
      console.log(user.email, process.env.ADMIN_EMAIL);
      return {
        ...newUser,
      };
    },
  },

  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role,
          id: user.id,
          name: session.user.name
            ? session.user.name
            : `guest@${user.id.split("").slice(0, 7).join("")}`,
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
        connectionTimeout: 60000,
      },

      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET,
};
