import { TFacility } from "./facility.interface";
import FacilityModel from "./facility.schema.model";



const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await FacilityModel.create(payload);
    return result;
};


const updateFacilityFromDB = async (payload: TFacility) => {
    const result = "";
    return result;
};


const deleteFacilityFromDB = async (payload: TFacility) => {
    const result = "";
    return result;
};


const getAllFacilitiesFromDB = async () => {
    const result = await FacilityModel.find();
    return result;
};

export const FacilityServices = {
    createFacilityIntoDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
    getAllFacilitiesFromDB
};