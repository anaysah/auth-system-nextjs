import mongoose from "mongoose";

type UserType = {
  name: string;
  email: string;
  password: string;
  date: Date;
};

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true,"Please enter your fullname"],
    minlength: [3, "Fullname must be at least 3 characters name"]
  },
  email: {
    type: String,
    required: [true,"Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true,"Please enter your password"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken:String,
  forgotPasswordExpiry:Date,
  verificationToken:String,
  verifyTokenExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;