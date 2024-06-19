import { z } from "zod";


const LoginDataValidation = z.object({
    email: z.string(),
    password: z.string(),
    role: z.string()
});


export const LoginValidation = {
    LoginDataValidation
};