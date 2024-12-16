"use server";

import { getTeachFriends } from "../repo/repo";

export const getFriendsWithCanTeach = async (userId: string) => {
  const users = await getTeachFriends(userId);

  if (!users) return;

  return users;
};
