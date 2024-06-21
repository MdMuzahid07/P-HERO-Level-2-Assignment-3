import { NextFunction, Request, Response } from "express";
import { BookingService } from "./bookings.service";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";


const createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await BookingService.createBookingIntoDB(req.body);


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
        const result = await BookingService.createBookingIntoDB(req.body);


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
        const result = await BookingService.createBookingIntoDB(req.body);


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
        const result = await BookingService.createBookingIntoDB(req.body);


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
        const result = await BookingService.createBookingIntoDB(req.body);


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