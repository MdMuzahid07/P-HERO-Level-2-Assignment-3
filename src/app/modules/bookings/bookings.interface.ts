import { Types } from "mongoose";

export type TBookings = {
    facility: Types.ObjectId,
    date: string,
    startTime: string,
    endTime: string,
    user: Types.ObjectId,
    payableAmount: number,
    isBooked: string
};




