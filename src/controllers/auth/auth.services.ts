import { CustomError } from "../../helpers/createError";
import User from "../../models/users.model";
import { ILogin, IRegister } from "./auth.types";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET as string;
export default class AuthService {
  async registerUser(data: IRegister): Promise<object | string> {
    const { email, password, name } = data;
    const user = await User.findOne({ email });
    if (user) {
      return "User already registered";
    }
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    if (!newUser) {
      return "Something went wrong";
    }
    const newUserObject = newUser.toObject();
    const { password: pass, ...userWithPassword } = newUserObject;
    return userWithPassword;
  }
  async login(data: ILogin): Promise<any> {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(402, "Number or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      // return "Number or password is wrong";
      throw new CustomError(402, "Number or password is wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = Jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    const loginedUser = await User.findByIdAndUpdate(
      user._id,
      { token },
      { new: true }
    ).select("-password");

    return loginedUser;
  }
  async logout(req: any) {
    console.log("logout", req);
    const existingUser = await User.findById(req);
    console.log(`existingUser`, existingUser);
    if (!existingUser) {
      throw new CustomError(404, "User not found");
    } else {
      return await User.findByIdAndUpdate(
        req,
        { token: null },
        { new: true }
      ).select("-password");
    }
  }
}
