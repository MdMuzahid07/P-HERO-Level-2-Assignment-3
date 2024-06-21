import mongoose from "mongoose";




const AvailableTimeSchema = new mongoose.Schema({
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});


export const AvailableTimeModel = mongoose.model("AvailableTime", AvailableTimeSchema);

