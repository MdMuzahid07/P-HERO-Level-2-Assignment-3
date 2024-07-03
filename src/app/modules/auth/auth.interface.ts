import { USER_ROLES } from "./auth.constants";

export type TLogin = {
  email: string;
  password: string;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: null;
};

export type TUserRole = keyof typeof USER_ROLES;
