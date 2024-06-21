import { NextFunction, Request, Response } from "express";
import { BookingServices } from "./bookings.service";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";


const createAvailabilityTime = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await BookingServices.createAvailabilityTimeIntoDB(req.body);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Booking Available time slots added successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};


const getAllAvailabilityTime = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const result = await BookingServices.getAllAvailableTimes();

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


export const BookingControllers = {
    createAvailabilityTime,
    getAllAvailabilityTime
};