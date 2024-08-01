import { body } from "express-validator";

export const projectValidator = [
  body("title").isString().notEmpty().withMessage("Title is required"),
];

export const newTodoValidator = [
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Description is required"),
  body("status")
    .isString()
    .optional()
    .isIn(["active", "completed"])
    .withMessage("Status is required"),
];

export const updateTodoValidator = [
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("Description must be a non-empty string"),
  body("status")
    .optional()
    .isString()
    .isIn(["active", "completed"])
    .withMessage('Status must be "active" or "completed"'),
];
