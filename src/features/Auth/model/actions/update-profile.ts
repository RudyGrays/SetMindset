"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const updateProfile = async ({
  userId,
  image,
  name,
  isAdmin = false,
}: {
  userId: string;
  name?: string;
  image?: string;
  isAdmin?: boolean;
}) => {
  const updatedProfile = await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      image,
      name,
      isOk: isAdmin ? true : false,
    },
  });
  return updatedProfile;
};
