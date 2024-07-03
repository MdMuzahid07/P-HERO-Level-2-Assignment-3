import express from "express";
import { UserController } from "./user.controller";
import requestValidator from "../../middlewares/requestValidator";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/auth/signup",
  requestValidator(UserValidation.UserValidationSchema),
  UserController.createUser,
);

export const UserRoutes = router;
