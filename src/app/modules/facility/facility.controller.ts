import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import { FacilityServices } from "./facility.service";

const createFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await FacilityServices.createFacilityIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Facility added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await FacilityServices.updateFacilityFromDB(id, updateData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Facility updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFacility = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await FacilityServices.deleteFacilityFromDB(id);

    // this delete will be an soft delete
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Facility deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllFacilities = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await FacilityServices.getAllFacilitiesFromDB();

    // this delete will be an soft delete
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `${result.length > 0 ? "Facilities retrieved successfully" : "not data found"}`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAFacilityUsingID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await FacilityServices.getASingleFacilityFromDB(id);

    // this delete will be an soft delete
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Facility retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacilities,
  getAFacilityUsingID,
};
