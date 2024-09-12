import express from "express";
import { BookingController } from "./bookings.controller";
import authValidation from "../../middlewares/authValidation";
import { USER_ROLES } from "../auth/auth.constants";
import requestValidator from "../../middlewares/requestValidator";
import { BookingsValidation } from "./bookings.validation";

const router = express.Router();

router.post(
  "/bookings",
  authValidation(USER_ROLES.user),
  requestValidator(BookingsValidation.bookingsValidationSchema),
  BookingController.createBooking,
);

router.get(
  "/bookings",
  authValidation(USER_ROLES.admin),
  BookingController.getAllBooking,
);

router.get(
  "/bookings/user",
  authValidation(USER_ROLES.user),
  BookingController.getAllBookingByUser,
);

router.delete(
  "/bookings/:id",
  authValidation(USER_ROLES.user),
  BookingController.cancelABooking,
);

router.get(
  "/check-availability",
  // authValidation(USER_ROLES.admin, USER_ROLES.user),
  BookingController.checkAvailability,
);

export const BookingsRoutes = router;
