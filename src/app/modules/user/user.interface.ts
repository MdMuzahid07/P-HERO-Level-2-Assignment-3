export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  isDeleted: boolean;
  __v?: null;
  createdAt?: string;
  updatedAt?: string;
};
