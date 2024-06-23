import { TFacility } from "./facility.interface";
import FacilityModel from "./facility.schema.model";



const createFacilityIntoDB = async (payload: TFacility) => {
    const result = await FacilityModel.create(payload);
    return result;
};


const updateFacilityFromDB = async (id: string, payload: TFacility) => {
    const result = await FacilityModel.findByIdAndUpdate(id, payload);
    return result;
};


const deleteFacilityFromDB = async (id: string) => {
    const result = await FacilityModel.findByIdAndUpdate(id, { isDeleted: true });
    return result;
};


const getAllFacilitiesFromDB = async () => {
    const result = await FacilityModel.find();
    return result;
};

const getASingleFacilityFromDB = async (id: string) => {
    const result = await FacilityModel.findById(id);
    return result;
};


export const FacilityServices = {
    createFacilityIntoDB,
    updateFacilityFromDB,
    deleteFacilityFromDB,
    getAllFacilitiesFromDB,
    getASingleFacilityFromDB
};