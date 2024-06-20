import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/send.response";
import httpStatus from "http-status";
import { FacilityServices } from "./facility.service";



const createFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await FacilityServices.createFacilityIntoDB(req.body);


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Facility added successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const updateFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        const updateData = req.body;

        const result = await FacilityServices.updateFacilityFromDB(id, updateData);


        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Updated outdoor tennis court with synthetic surface.",
            data: result
        });

    } catch (error) {
        next(error);
    }
};

const deleteFacility = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { id } = req.params;
        console.log(id);
        const result = await FacilityServices.deleteFacilityFromDB(id);

        // this delete will be an soft delete
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Facility deleted successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


const getAllFacilities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await FacilityServices.getAllFacilitiesFromDB();

        // this delete will be an soft delete
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "Facilities retrieved successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
};


export const FacilityController = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacilities
};