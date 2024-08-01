import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../types/HttpStatus";
import User from "../models/Users";
import CustomError from "../utils/customError";
import { matchedData, validationResult } from "express-validator";
import { comparePassword } from "../utils/hashPassword";
import { generateToken } from "../utils/generateToken";

/**
 * * METHOD: POST
 * * Signup a new User
 */
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist)
      return next(
        new CustomError("Email already exists", HttpStatus.BAD_REQUEST)
      );

    await User.create(req.body);
    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD: POST
 * * Signup a new User
 */

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);

    const { email, password } = matchedData(req);

    // if role is customer
    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist)
      return next(
        new CustomError("Invalid credentials", HttpStatus.BAD_REQUEST)
      ); // if email does not exist returning error

    const isPasswordMatched = await comparePassword(
      password,
      isEmailExist?.password
    );
    if (!isPasswordMatched)
      return next(
        new CustomError("Invalid credentials", HttpStatus.BAD_REQUEST)
      ); // if password does not match returning error

    const access_token = generateToken({ email, id: isEmailExist?.id });
    return res.status(HttpStatus.OK).json({
      success: true,
      access_token,
      message: "Login success",
    });
  } catch (error) {
    next(error);
  }
};

export { signup, login };
