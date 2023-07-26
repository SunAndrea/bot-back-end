import {
  JsonController,
  Get,
  Body,
  Res,
  // Req,
  //  Post,  Param
} from "routing-controllers";
// import { App } from "app";
import AuthService from "./auth.services";
import { IRegister } from "./auth.types";

@JsonController("/auth")
export default class AuthController {
  // public app = new App();
  public authService = new AuthService();

  @Get("/register")
  async register(@Body() body: IRegister, @Res() res: any) {
    try {
      const result = await this.authService.registerUser(body);
      if (typeof result === "string") {
        res.status(409).send(result);
      } else {
        console.log(result);
        res.status(200).send("User successfully registered");
      }
    } catch (error) {
      // console.log(error);
    }
  }
}
