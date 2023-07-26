import User from "../../models/users.model";
import { IRegister } from "./auth.types";
import bcrypt from "bcryptjs";

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
}
