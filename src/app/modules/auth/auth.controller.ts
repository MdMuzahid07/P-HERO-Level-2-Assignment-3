import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import config from "../../config";


const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken, user } = await AuthServices.LoginUser(req.body);


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


const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { refreshToken } = req.cookies;
        const result = await AuthServices.refreshToken(refreshToken);


        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const AuthController = {
    LoginUser,
    refreshToken
};