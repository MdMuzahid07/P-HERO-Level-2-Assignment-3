import mongoose from "mongoose";
import { TBookings } from "./bookings.interface";


const BookingSchema = new mongoose.Schema<TBookings>({
    facility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "facility"
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const BookingModel = mongoose.model("bookings", BookingSchema);

export default BookingModel;