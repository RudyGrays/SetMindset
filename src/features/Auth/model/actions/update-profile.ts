"use server";

import { dbClient } from "@/shared/db/prisma.client";

export const updateProfile = async ({
  userId,
  image,
  name,
}: {
  userId: string;
  name?: string;
  image?: string;
}) => {
  const updatedProfile = await dbClient.user.update({
    where: {
      id: userId,
    },
    data: {
      image,
      name,
    },
  });
  return updatedProfile;
};
