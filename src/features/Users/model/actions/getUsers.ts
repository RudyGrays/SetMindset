"use server";

import { dbClient } from "@/shared/db/prisma.client";
import { UsersRepository } from "../repository/repository";
import { UserEntity } from "@/entities/User/model/types/User";

export const getUsers = async (
  userId: string,
  currentUserId: string,
  searchValue?: string
) => {
  const users = UsersRepository.getUsers(userId, currentUserId, searchValue);

  if (users) return users;

  return [];
};
