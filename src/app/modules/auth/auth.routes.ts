import express from "express";
import { AuthController } from "./auth.controller";
import requestValidator from "../../middlewares/requestValidator";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/auth/login",
  requestValidator(AuthValidation.LoginDataValidation),
  AuthController.LoginUser,
);

router.post(
  "/refresh-token",
  requestValidator(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshTokenController,
);

export const LoginRoute = router;
