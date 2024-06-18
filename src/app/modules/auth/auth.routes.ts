import express from "express";
import { LoginController } from "./auth.controller";
import requestValidator from "../../middlewares/requestValidator";
import { LoginValidation } from "./auth.validation";

const router = express.Router();


router.post(
    "/auth/login",
    requestValidator(LoginValidation.LoginDataValidation),
    LoginController.LoginUser
);

export const LoginRoute = router;