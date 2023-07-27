import { CustomError } from "./createError";

import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.code).json({ error: err.message });
  } else {
    // Обробка інших типів помилок тут
    console.error(`err`, err);
    return res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
}
