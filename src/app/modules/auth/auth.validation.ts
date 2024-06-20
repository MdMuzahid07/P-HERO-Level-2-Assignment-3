import { z } from "zod";


const LoginDataValidation = z.object({
    email: z.string(),
    password: z.string(),
    role: z.string()
});


const refreshTokenValidationSchema = z.object({
    refreshToken: z.string({ required_error: "refresh is required" })
});


export const AuthValidation = {
    LoginDataValidation,
    refreshTokenValidationSchema
};