import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import CustomError from "../utils/customError";
import { HttpStatus } from "../types/HttpStatus";

// extending the request interface to include the user object in the req
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
// verify the token and validate user
export default async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(
      new CustomError("Your are not authenticated", HttpStatus.FORBIDDEN)
    );
  }
  const access_token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(
      access_token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = user;
    next();
  } catch (error) {
    next(new CustomError("Token is not valid", HttpStatus.FORBIDDEN));
  }
}
