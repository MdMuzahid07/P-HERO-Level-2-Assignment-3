import { NextFunction, Request, Response } from "express";
import { BookingService } from "./bookings.service";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TBookings } from "./bookings.interface";
import UserModel from "../user/user.schema.model";
import FacilityModel from "../facility/facility.schema.model";
import startEndTimeToHoursCalculate from "../../utils/startEndTimeToHoursCalculate";
import { initiatePayment } from "../../utils/payment.utils";

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenWithBearer = req.headers.authorization;
    const token = tokenWithBearer?.split(" ", 2)[1];

    if (!token) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You are not authorized"
      });
    }

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




    // payment 
    const startTime = req?.body?.startTime;
    const endTime = req?.body?.endTime;
    const totalHours = startEndTimeToHoursCalculate(startTime, endTime);
    const isFacilityExists = await FacilityModel.findById(req?.body?.facility);
    const userInfo = await UserModel.findById({ _id: userId });
    const transactionId = `TSXID${Math.random() * 10} ${Date.now()}`;
    const payableAmount = Number(isFacilityExists?.pricePerHour) * totalHours;

    const paymentData = {
      transactionId,
      payableAmount,
      name: userInfo?.name as string,
      email: userInfo?.email as string,
      address: userInfo?.address as string,
      phone: userInfo?.phone as string
    };

    const paymentSession = await initiatePayment(paymentData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking created successfully",
      data: { result, paymentSession },
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

    if (!date) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Invalid date format",
      });
    }

    const facilityId = req.query.facility as string;
    if (!facilityId) {
      return sendResponse(res, {
        success: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: "Facility ID is required",
      });
    }

    const result = await BookingService.checkAvailabilityFromDB(date, facilityId);

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


const getASingleBookingByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await BookingService.getASingleBookingByUserFromDB(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking retrieve successfully by user",
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
  getASingleBookingByUser
};
