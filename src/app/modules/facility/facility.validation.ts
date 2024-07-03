import { z } from "zod";

const FacilityValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  pricePerHour: z.number(),
  location: z.string(),
});

const UpdateFacilityValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  pricePerHour: z.number().optional(),
  location: z.string().optional(),
});

export const FacilityValidation = {
  FacilityValidationSchema,
  UpdateFacilityValidationSchema,
};
