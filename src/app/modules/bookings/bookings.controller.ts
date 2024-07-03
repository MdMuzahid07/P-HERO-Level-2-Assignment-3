import { NextFunction, Request, Response } from "express";
import { BookingService } from "./bookings.service";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TBookings } from "./bookings.interface";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(" ", 2)[1];

    const decoded = jwt.verify(
      token as string,
      config.jwt_access_token_secret_key as string,
    );
    const userId = (decoded as JwtPayload)?.id;

    const responseAfterSave = await BookingService.createBookingIntoDB(req.body, userId);

    const result = responseAfterSave.toObject() as Partial<TBookings>;

    // removing some property property from response after saving in DB
    if (result) {
      delete result.__v;
      delete result.createdAt;
      delete result.updatedAt;
    };


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await BookingService.getAllBookingsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBookingByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(" ", 2)[1];

    const decoded = jwt.verify(
      token as string,
      config.jwt_access_token_secret_key as string,
    );
    const userId = (decoded as JwtPayload)?.id;

    const result = await BookingService.getAllBookingsByUserFromDB(userId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Bookings retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const cancelABooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await BookingService.cancelABookingFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking cancelled successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const checkAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];

    const result = await BookingService.checkAvailabilityFromDB(date);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Availability checked successfully",
      data: result,
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
  checkAvailability,
};
