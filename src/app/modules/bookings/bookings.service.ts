import { TBookings } from "./bookings.interface";
import BookingModel from "./bookings.schema";


const createBookingIntoDB = async (payload: TBookings) => {
    const result = await BookingModel.create(payload);
    return result;
};

const getAllBookingsFromDB = async () => {
    const result = await BookingModel.find();
    return result;
};

const getAllBookingsByUserFromDB = async () => {
    const result = await BookingModel.find();
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