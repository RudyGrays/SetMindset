import { UserEntity } from "@/entities/User/model/types/User";
import { Role } from "@/features/Auth/model/types/User";

export enum FriendshipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type Friend = UserEntity;

export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: FriendshipStatus;
  friend: Friend;
}

export interface GetFriendsResponse {
  friends: (Friendship & { friend: Friend })[];
}
