import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import sendResponse from "../../utils/send.response";
import { UserService } from "./user.service";
import config from "../../config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken, user } = await UserService.createUserIntoDB(req.body);

    // saving refresh token in browser cookie
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });


    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User registered successfully",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
