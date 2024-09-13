import httpStatus from "http-status";
import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";
import config from "../../config";
import sendResponse from "../../utils/send.response";

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { accessToken, refreshToken, user } = await AuthServices.LoginUser(
      req.body,
    );

    // saving refresh token in browser cookie
    res.cookie("refreshToken", refreshToken, {
      secure: config.NODE_ENV === "production",
      httpOnly: true,
    });

    res.status(httpStatus.OK).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      token: accessToken,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshTokenService(refreshToken);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "token created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AuthController = {
  LoginUser,
  refreshTokenController,
};
