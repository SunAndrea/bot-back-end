import { Request, Response, NextFunction } from "express";
import Joi from "joi";

type MiddlewareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

function validationMiddleware(schema: Joi.Schema): MiddlewareFunction {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      console.log("Validation error:", error);
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
    return;
  };
}

export default validationMiddleware;
