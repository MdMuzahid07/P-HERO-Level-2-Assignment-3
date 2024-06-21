import { TAvailability } from "./bookings.interface";
import { AvailableTimeModel } from "./bookings.schema";

const createAvailabilityTimeIntoDB = async (payload: TAvailability) => {
    const result = await AvailableTimeModel.create(payload);
    return result;
};


const getAllAvailableTimes = async () => {
    const result = await AvailableTimeModel.find();
    return result;
};



export const BookingServices = {
    createAvailabilityTimeIntoDB,
    getAllAvailableTimes
};