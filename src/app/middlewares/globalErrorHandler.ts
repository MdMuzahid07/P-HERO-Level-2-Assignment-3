import { NextFunction, Request, Response } from "express";
import { TErrorMessages } from "../interface/error";
import config from "../config";

function globalErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    let statusCode = error.statusCode || 5000;
    let message = error.message || "Something went wrong!";

    let errorMessages: TErrorMessages = [{
        path: "",
        message: ""
    }];

    return res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        checkErrorPattern: error,
        stack: config.NODE_ENV === "development" ? error.stack : null
    })
};

export default globalErrorHandler;