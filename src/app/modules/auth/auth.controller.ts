import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { LoginServices } from "./auth.service";
import config from "../../config";


const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken, user } = await LoginServices.LoginUser(req.body);


        // saving refresh token in browser cookie
        res.cookie("refreshToken", refreshToken, {
            secure: config.NODE_ENV === "production",
            httpOnly: true
        });


        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successfully",
            token: accessToken,
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const LoginController = {
    LoginUser
};