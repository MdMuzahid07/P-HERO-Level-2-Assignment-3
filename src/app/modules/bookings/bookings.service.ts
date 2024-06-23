import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import FacilityModel from "../facility/facility.schema.model";
import { TBookings } from "./bookings.interface";
import BookingModel from "./bookings.schema.model";


const createBookingIntoDB = async (payload: TBookings, user: string) => {

    const isFacilityExists = await FacilityModel.findById(payload?.facility);


    if (!isFacilityExists) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "Facility not exists");
    };

    const BookingData = {
        ...payload,
        user,
        payableAmount: 90,
        isBooked: "confirmed"
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

const cancelABookingFromDB = async () => {
    const result = await BookingModel.find();
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