import httpStatus from "http-status";
import CustomAppError from "../../errors/CustomAppError";
import UserModel from "../user/user.schema.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

const LoginUser = async (payload: TLogin) => {
    const { email, password } = payload;

    const isUserExistsOnDB = await UserModel.findOne({
        email
    });

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User not exists");
    };

    const isPasswordMatched = await bcrypt.compare(password, isUserExistsOnDB?.password);

    if (!isPasswordMatched) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User password not matched, please try again with right password");
    };

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User not exists");
    };

    // jwt token 

    const jwtPayload = {
        email: isUserExistsOnDB?.email,
        password: isUserExistsOnDB?.password,
        role: isUserExistsOnDB?.role
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_token_secret_key as string, { expiresIn: config.jwt_access_token_expires_in });
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_token_secret_key as string, { expiresIn: config.jwt_refresh_token_expires_in });


    return {
        accessToken,
        refreshToken,
        user: isUserExistsOnDB
    };
};


const refreshToken = async (token: string) => {

    const decoded = jwt.verify(token, config.jwt_refresh_token_secret_key as string) as JwtPayload;

    const { email } = decoded;

    const isUserExistsOnDB = await UserModel.findOne({
        email
    });

    if (!isUserExistsOnDB) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User not exists");
    };

    if (isUserExistsOnDB && isUserExistsOnDB?.isDeleted === true) {
        throw new CustomAppError(httpStatus.BAD_REQUEST, "User not exists");
    };


    const jwtPayload = {
        email: isUserExistsOnDB?.email,
        password: isUserExistsOnDB?.password,
        role: isUserExistsOnDB?.role
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_token_secret_key as string, { expiresIn: config.jwt_access_token_expires_in });

    return {
        accessToken
    };
};


export const AuthServices = {
    LoginUser,
    refreshToken
};