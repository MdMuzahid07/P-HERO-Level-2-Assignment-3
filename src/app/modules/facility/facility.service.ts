import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import { TFacility } from "./facility.interface";
import FacilityModel from "./facility.schema.model";

const createFacilityIntoDB = async (payload: TFacility) => {
  const isFacilityExists = await FacilityModel.findOne({
    name: payload?.name,
    description: payload?.description,
  });

  if (isFacilityExists) {
    throw new CustomAppError(
      httpStatus.CONFLICT,
      `${payload?.name} facility already exists`,
    );
  }

  const responseAfterSave = await FacilityModel.create(payload);

  const result = responseAfterSave.toObject() as Partial<TFacility>;

  // removing some property property from response after saving in DB
  if (result) {
    delete result.__v;
    delete result.createdAt;
    delete result.updatedAt;
  };

  return result;
};

const updateFacilityFromDB = async (id: string, payload: TFacility) => {
  const responseAfterUpdate = await FacilityModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  const result = responseAfterUpdate?.toObject() as Partial<TFacility>;

  // removing some property property from response after saving in DB
  if (result) {
    delete result.__v;
    delete result.createdAt;
    delete result.updatedAt;
  };

  return result;
};

const deleteFacilityFromDB = async (id: string) => {


  const isFacilityExists = await FacilityModel.findById(id);

  if (isFacilityExists && isFacilityExists?.isDeleted) {
    throw new CustomAppError(httpStatus.BAD_REQUEST, "Facility already deleted");
  };


  const responseAfterSoftDelete = await FacilityModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  const result = responseAfterSoftDelete?.toObject() as Partial<TFacility>;

  // removing some property property from response after saving in DB
  if (result) {
    delete result.__v;
    delete result.createdAt;
    delete result.updatedAt;
  };


  return result;
};

const getAllFacilitiesFromDB = async () => {
  const response = await FacilityModel.find({ isDeleted: false });

  /***
   * converting array of objects to object and making it also solid js object using toObject() method  because we are getting mongodb data
   * ***/

  const result = response?.map(facility => facility?.toObject() as Partial<TFacility>);

  // removing some property from object by looping them
  if (result) {
    result.forEach((result) => {
      delete result.__v;
      delete result.createdAt;
      delete result.updatedAt;
    });
  };

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
  getASingleFacilityFromDB,
};
