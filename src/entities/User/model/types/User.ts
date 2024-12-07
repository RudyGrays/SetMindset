export type UserId = string;
export type Role = "ADMIN" | "USER";

export type UserEntity = {
  id?: UserId;
  email: string;
  role?: Role;
  emailVerified?: Date | null;
  name?: string | null;
  image?: string | null;
};
