import { Schema, model } from "mongoose";
import { IUser } from "types/user";

import Joi from "joi";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["Admin", "User"],
    },
    status: {
      type: String,
      enum: ["Free", "Paid"],
      default: "Free",
    },

    token: String,
  },
  { versionKey: false, timestamps: true }
);

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

const User = model("user", userSchema);
export default User;
