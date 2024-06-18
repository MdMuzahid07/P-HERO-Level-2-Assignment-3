import mongoose from 'mongoose';
import { TUser } from './user.interface';

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
    type: String,
    enum: ["admin", "user"]
  },
  address: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});



// replacing password with empty string after saving it DB,  for not show in user end
UserSchema.post("save", function (doc, next) {
  // we get current data in post middleware in doc
  doc.password = " "
  next();
});


// method to control json data
// deleting password field from response to user
// methods.toJSON serves the purpose to customizing the JSON representation of the document when it converted to JSON
UserSchema.methods.toJSON = function () {
  // this.toObject(); convert mongoose document to plain JavaScript Object
  const user = this.toObject();
  delete user.password;
  return user;
};


// create user model
const UserModel = mongoose.model<TUser>('User', UserSchema)

export default UserModel;
