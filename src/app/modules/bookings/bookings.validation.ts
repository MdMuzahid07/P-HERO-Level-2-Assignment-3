import { z } from "zod";

const bookingsValidationSchema = z.object({
  facility: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  user: z.string().optional(),
  payableAmount: z.number().optional(),
  isBooked: z.string().optional(),
});

export const BookingsValidation = {
  bookingsValidationSchema,
};
