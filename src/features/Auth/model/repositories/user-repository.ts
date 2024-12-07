import { dbClient } from "@/shared/db/prisma.client";
import { UserEntity, UserId } from "../types/User";

export class UserRepository {
  async getUserById(userId: UserId): Promise<UserEntity> {
    return dbClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await dbClient.user.create({
      data: user,
    });
  }
}

export const userRepository = new UserRepository();
