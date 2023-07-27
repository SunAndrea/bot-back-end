import { CustomError } from "./createError";

import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(`asfasfasf`, err);
  if (err instanceof CustomError) {
    const { code, message } = err;
    res.status(code).json({ error: message });
  } else {
    res.status(500).json({ error: "Ethernal server error" });
  }
}
