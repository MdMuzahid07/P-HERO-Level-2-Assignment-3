import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const NotFound = (req: Request, res: Response, next: NextFunction) => {
    res.send(httpStatus.NOT_FOUND).json({
        status: false,
        statusCode: httpStatus.NOT_FOUND,
        message: "Not Found"
    })
};

export default NotFound;