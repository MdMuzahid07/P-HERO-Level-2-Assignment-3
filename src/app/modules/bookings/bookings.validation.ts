import { z } from "zod";

const bookingsValidationSchema = z.object({
    facility: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string()
});







export const BookingsValidation = {
    bookingsValidationSchema
};
