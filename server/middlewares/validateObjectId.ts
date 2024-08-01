import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { HttpStatus } from "../types/HttpStatus";
import CustomError from "../utils/customError";

export default function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const invalidIds = Object.entries(req.params)
    .filter(([key, value]) => !mongoose.isValidObjectId(value))
    .map(([key, value]) => `${key}: ${value}`);

  if (invalidIds.length > 0) {
    return next(
      new CustomError(
        `Invalid ObjectId(s): ${invalidIds.join(", ")}`,
        HttpStatus.BAD_REQUEST
      )
    );
  }
  next();
}
