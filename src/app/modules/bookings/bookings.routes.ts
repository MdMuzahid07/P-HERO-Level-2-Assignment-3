import express from "express";
import requestValidator from "../../middlewares/requestValidator";
import { bookingValidation } from "./bookings.validation";
import { BookingControllers } from "./bookings.controller";
import authValidation from "../../middlewares/authValidation";
import { USER_ROLES } from "../auth/auth.constants";


const router = express.Router();


router.post(
    "/check-availability",
    requestValidator(bookingValidation.availabilityValidationSchema),
    authValidation(USER_ROLES.admin),
    BookingControllers.createAvailabilityTime
);

router.get(
    "/check-availability",
    authValidation(USER_ROLES.admin),
    BookingControllers.getAllAvailabilityTime
);



export const BookingRouter = router;