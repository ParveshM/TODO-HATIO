import { body } from "express-validator";

export const projectValidator = [
  body("title").isString().notEmpty().withMessage("Title is required"),
];
