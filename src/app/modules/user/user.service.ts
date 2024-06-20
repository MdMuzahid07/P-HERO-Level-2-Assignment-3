import httpStatus from 'http-status';
import CustomAppError from '../../errors/CustomAppError';
import { TUser } from './user.interface';
import UserModel from './user.schema.model';
import bcrypt from "bcrypt";
import config from '../../config';


const createUserIntoDB = async (payload: TUser) => {

  const isUserExists = await UserModel.findOne({ email: payload?.email });

  // checking user exist or not
  if (isUserExists) {
    throw new CustomAppError(httpStatus.BAD_REQUEST, "this user is already exits");
  };

  const salt = bcrypt.genSaltSync(Number(config.bcrypt_salt_round));
  const hash = bcrypt.hashSync(payload?.password, salt);

  const user = <TUser>{
    ...payload,
    password: hash
  };

  const result = await UserModel.create(user)
  return result;
};

export const UserService = {
  createUserIntoDB,
};
