import mongoose from "mongoose";
import { TName, TUser } from "./user.interface";


const UserName = new mongoose.Schema<TName>({
    firstName: {
        type: String,
        required: [true, "first name is required, please add your first name"]
    },
    middleName: {
        type: String,
        required: [true, "middle name is required, please add your middle name"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required, please add your last name"]
    }
});


const UserSchema = new mongoose.Schema<TUser>({
    name: {
        type: UserName,
        required: [true, "name is required, please add an username"]
    },
    email: {
        type: String,
        required: [true, "user email is required, please add an email address"]
    },
    password: {
        type: String,
        required: [true, "please add an user password"]
    },
    phone: {
        type: Number,
        required: [true, "user contact number is required"]
    },
    role: {
        type: String,
        required: [true, "please add an user role"]
    },
    address: {
        type: String,
        required: [true, "user address is required"]
    }
});



// create user model 

const UserModel = mongoose.model<TUser>("User", UserSchema);

export default UserModel;


