import express from "express";
import { FacilityController } from "./facility.controller";
import { FacilityValidation } from "./facility.validation";
import requestValidator from "../../middlewares/requestValidator";
import AuthValidation from "../../middlewares/authValidation";
import { USER_ROLES } from "../auth/auth.constants";


const router = express.Router();


router.post(
    "/facility",
    AuthValidation(USER_ROLES.admin),
    requestValidator(FacilityValidation.FacilityValidationSchema),
    FacilityController.createFacility
);

