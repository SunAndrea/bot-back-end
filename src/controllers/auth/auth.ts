import {
  JsonController,
  Body,
  Req,
  Res,
  Post,
  UseBefore,
  Get,
} from "routing-controllers";
import AuthService from "./auth.services";
import { ILogin, IRegister } from "./auth.types";
import validationMiddleware from "middlewares/validation.middlewares";
import { loginSchema, registerSchema } from "models/users.model";
import { authorizeMiddleware } from "middlewares/authorize.middleware";
// interface IUser {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     password: string;
//     token: string;
//     createdAt: string;
//     updatedAt: string;
//   };
// }
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
        return res.status(200).send(result);
      }
    } catch (error) {}
  }
  @Post("/login")
  @UseBefore(validationMiddleware(loginSchema))
  async login(@Body() body: ILogin, @Res() res: any) {
    try {
      const result = await this.authService.login(body);
      return res.status(200).send(result);
    } catch (error) {}
  }
  @Get("/logout")
  @UseBefore(authorizeMiddleware)
  async logout(@Req() req: any, res: any) {
    try {
      console.log(`body`, req.user);
      console.log(`req.user._id`, req.user._id);

      const result = await this.authService.logout(req.user._id);
      console.log(`result`, result);
      if (result) {
        res.status(200).send(result);
      }
    } catch (error) {}
  }
}
