import { CustomError } from "../helpers/createError";
import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: string;
  updatedAt: string;
}

interface UserRequest extends Request {
  user?: IUser;
}

export async function authorizeMiddleware(
  req: UserRequest,
  _: Response,
  next: NextFunction
) {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    throw new CustomError(401, "Authhorization header is invalid");
  }

  try {
    const decodedToken = Jwt.verify(token, JWT_SECRET) as JwtPayload;
    const { id } = decodedToken;
    const user = await User.findById(id);
    // console.log(`id`, id);
    console.log(`user`, user);

    if (!user || !user.token) {
      throw new CustomError(401, "Not authorized");
    }

    req.user = user as unknown as IUser;
    console.log("req.user", req.user);
    next();
  } catch (error) {
    console.log(`error`, error);
  }
}
