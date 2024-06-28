/* eslint-disable @typescript-eslint/no-explicit-any */
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

const checkAvailabilityFromDB = async (date: any) => {

    // creating 24 hours time slots
    const allSlots = [];
    for (let hours = 0; hours < 24; hours++) {
        const startH = hours.toString().padStart(2, "0");
        const endH = (hours + 1).toString().padStart(2, "0");
        allSlots.push({
            startTime: `${startH}:00`,
            endTime: `${endH}:00`,
        });
    }


    // retrieving already booked slots from database with an specific date
    const bookings = await BookingModel.find({ date });


    // filtering all available slots
    let availableSlots = [...allSlots];
    bookings.forEach(booking => {

        availableSlots = availableSlots.filter(slot => {
            return !(booking.startTime < slot.endTime && booking.endTime > slot.startTime);
        });

    });


    return availableSlots;
};


export const BookingService = {
    createBookingIntoDB,
    getAllBookingsFromDB,
    getAllBookingsByUserFromDB,
    cancelABookingFromDB,
    checkAvailabilityFromDB
};