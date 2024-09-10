import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: " ",
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
},
  {
    timestamps: true
  }
);

// create an model for facility

const FacilityModel = mongoose.model("facility", FacilitySchema);

export default FacilityModel;
