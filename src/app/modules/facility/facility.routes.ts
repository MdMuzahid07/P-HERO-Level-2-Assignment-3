import express from "express";
import { FacilityController } from "./facility.controller";
import { FacilityValidation } from "./facility.validation";
import requestValidator from "../../middlewares/requestValidator";
import authValidation from "../../middlewares/authValidation";
import { USER_ROLES } from "../auth/auth.constants";
// import { USER_ROLES } from "../auth/auth.constants";

const router = express.Router();

router.post(
  "/facility",
  authValidation(USER_ROLES.admin),
  requestValidator(FacilityValidation.FacilityValidationSchema),
  FacilityController.createFacility,
);

router.patch(
  "/facility/:id",
  authValidation(USER_ROLES.admin),
  requestValidator(FacilityValidation.UpdateFacilityValidationSchema),
  FacilityController.updateFacility,
);

router.delete(
  "/facility/:id",
  authValidation(USER_ROLES.admin),
  FacilityController.deleteFacility,
);

router.get("/facility", FacilityController.getAllFacilities);

router.get("/facility/:id", FacilityController.getAFacilityUsingID);

export const FacilityRoutes = router;
