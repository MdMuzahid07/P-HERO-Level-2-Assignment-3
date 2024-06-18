import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { LoginServices } from "./auth.service";


const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, user } = await LoginServices.LoginUser(req.body);

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successfully",
            token: token,
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const LoginController = {
    LoginUser
};