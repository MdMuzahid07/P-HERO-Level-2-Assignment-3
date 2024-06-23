import { NextFunction, Request, Response } from "express";
import { BookingService } from "./bookings.service";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";


const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;

        const decoded = jwt.verify(token as string, config.jwt_access_token_secret_key as string);
        const userId = (decoded as JwtPayload)?.id;

        const result = await BookingService.createBookingIntoDB(req.body, userId);


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Booking created successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const getAllBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BookingService.getAllBookingsFromDB();


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Bookings retrieved successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const getAllBookingByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization;

        const decoded = jwt.verify(token as string, config.jwt_access_token_secret_key as string);
        const userId = (decoded as JwtPayload)?.id;

        const result = await BookingService.getAllBookingsByUserFromDB(userId);


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Bookings retrieved successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


const cancelABooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BookingService.cancelABookingFromDB();


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Booking cancelled successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


const checkAvailability = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BookingService.checkAvailabilityFromDB();


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Availability checked successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


export const BookingController = {
    createBooking,
    getAllBooking,
    getAllBookingByUser,
    cancelABooking,
    checkAvailability
};