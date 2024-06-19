import { NextFunction, Request, Response } from "express";
import CustomAppError from "../errors/CustomAppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const AuthValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized");
        };


        // checking the token, valid or invalid
        // invalid token
        jwt.verify(token, config.jwt_access_token_secret_key as string, function (err, decoded) {
            // err
            if (err) {
                throw new CustomAppError(httpStatus.UNAUTHORIZED, "you are not authorized");
            }

            // setting user in req
            req.user = decoded as JwtPayload;
            // if i get the token, and its valid then it will call next step
            next();
        });
    } catch (error) {
        // if any error occurs , it will send to the global error handler
        next(error);
    }
};

export default AuthValidation;