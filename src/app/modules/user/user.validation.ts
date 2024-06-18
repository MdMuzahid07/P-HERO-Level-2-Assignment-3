import { z } from "zod"

const UserValidationSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().max(
        20,
        { message: "password can't be more than 20 character" }
    ),
    phone: z.string(),
    role: z.enum(["admin", "user"]),
    address: z.string(),
    isDeleted: z.boolean().optional()
});


export const UserValidation = {
    UserValidationSchema
};


