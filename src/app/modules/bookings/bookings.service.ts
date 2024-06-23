import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import FacilityModel from "../facility/facility.schema.model";
import { TBookings } from "./bookings.interface";
import BookingModel from "./bookings.schema.model";
import startEndTimeToHoursCalculate from "../../utils/startEndTimeToHoursCalculate";


const createBookingIntoDB = async (payload: TBookings, user: string) => {

    const isFacilityExists = await FacilityModel.findById(payload?.facility);

    if (!isFacilityExists) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "Facility not exists");
    };

    const startTime = payload?.startTime;
    const endTime = payload?.endTime;

    const totalHours = startEndTimeToHoursCalculate(startTime, endTime);

    const payableAmount = Number(isFacilityExists?.pricePerHour) * totalHours;

    const BookingData = {
        ...payload,
        user,
        payableAmount
    };

    const result = await BookingModel.create(BookingData);

    return result;
};

const getAllBookingsFromDB = async () => {
    const result = await BookingModel.find().populate("facility").populate("user");
    return result;
};

const getAllBookingsByUserFromDB = async (id: string) => {

    const result = await BookingModel.find({ user: id });
    return result;
};

const cancelABookingFromDB = async (id: string) => {
    const result = await BookingModel.findByIdAndUpdate(id, { isBooked: "canceled" });
    return result;
};

const checkAvailabilityFromDB = async () => {
    const result = " ";
    return result;
};


export const BookingService = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getAllBookingsByUserFromDB,
    cancelABookingFromDB,
    checkAvailabilityFromDB
};