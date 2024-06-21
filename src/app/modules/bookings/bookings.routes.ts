import express from "express";
import { BookingController } from "./bookings.controller";
import authValidation from "../../middlewares/authValidation";
import { USER_ROLES } from "../auth/auth.constants";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "../user/user.validation";



const router = express.Router();

router.post(
    "/bookings",
    authValidation(USER_ROLES.user),
    requestValidator(UserValidation.UserValidationSchema),
    BookingController.createBooking
);

router.get(
    "/bookings",
    authValidation(USER_ROLES.admin),
    requestValidator(UserValidation.UserValidationSchema),
    BookingController.getAllBooking
);

router.get(
    "/bookings/user",
    authValidation(USER_ROLES.user),
    requestValidator(UserValidation.UserValidationSchema),
    BookingController.getAllBookingByUser
);

router.delete(
    "/bookings/:id",
    authValidation(USER_ROLES.user),
    requestValidator(UserValidation.UserValidationSchema),
    BookingController.cancelABooking
);

router.get(
    "/check-availability",
    authValidation(USER_ROLES.admin, USER_ROLES.user),
    requestValidator(UserValidation.UserValidationSchema),
    BookingController.checkAvailability
);


export const BookingsRouter = router;