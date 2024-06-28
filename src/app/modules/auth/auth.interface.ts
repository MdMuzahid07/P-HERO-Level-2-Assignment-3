import { USER_ROLES } from "./auth.constants";


export type TLogin = {
    email: string,
    password: string,
};

export type TUserRole = keyof typeof USER_ROLES;