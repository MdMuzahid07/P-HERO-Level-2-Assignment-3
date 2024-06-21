import { z } from "zod";


const availabilityValidationSchema = z.object({
    startTime: z.string(),
    endTime: z.string()
});










export const bookingValidation = {
    availabilityValidationSchema
};