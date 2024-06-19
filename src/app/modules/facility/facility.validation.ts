import { z } from "zod";


const FacilityValidationSchema = z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number(),
    location: z.string()
});


export const FacilityValidation = {
    FacilityValidationSchema
};