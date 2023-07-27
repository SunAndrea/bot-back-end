import {
  JsonController,
  Body,
  Res,
  Post,
  UseBefore,
} from "routing-controllers";
import AuthService from "./auth.services";
import { ILogin, IRegister } from "./auth.types";
import validationMiddleware from "middlewares/validation.middlewares";
import { registerSchema } from "models/users.model";

@JsonController("/auth")
export default class AuthController {
  public authService = new AuthService();

  @Post("/register")
  @UseBefore(validationMiddleware(registerSchema))
  async register(@Body() body: IRegister, @Res() res: any) {
    try {
      const result = await this.authService.registerUser(body);
      if (typeof result === "string") {
        return res.status(409).send(result);
      } else if (typeof result === "object") {
        console.log(result);
        return res.status(200).send(result);
      }
    } catch (error) {
      console.log(error);
    }
  }
  @Post("/login")
  async login(@Body() body: ILogin, @Res() res: any) {
    try {
      const result = await this.authService.login(body);
      return res.status(200).send(result);
    } catch (error) {
      console.log(error);
    }
  }
}
