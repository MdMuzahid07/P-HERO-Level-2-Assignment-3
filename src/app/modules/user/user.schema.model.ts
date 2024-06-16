import mongoose from 'mongoose'
import { TUser } from './user.interface'

const UserSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    enum: ["admin", "user"]
  },
  address: {
    type: String,
    required: true
  },
})

// create user model

const UserModel = mongoose.model<TUser>('User', UserSchema)

export default UserModel;
