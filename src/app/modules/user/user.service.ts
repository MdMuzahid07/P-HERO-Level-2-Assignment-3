import { TUser } from './user.interface'
import UserModel from './user.schema.model'

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload)
  return result
};

export const UserService = {
  createUserIntoDB,
};
