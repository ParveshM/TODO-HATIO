import { Request, Response, NextFunction } from "express";
import Todo from "../models/Todos";
import { HttpStatus } from "../types/HttpStatus";
import { matchedData, validationResult } from "express-validator";

/**
 * * METHOD : GET
 * * Get Todos from a project
 */

const getProjectWithTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;

    const todos = await Todo.find({ projectId });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD : POST
 * * Get Todos from a project
 */
const createNewTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);
    const { projectId } = req.params;
    const { description } = matchedData(req);

    const existingTodo = await Todo.findOne({
      projectId,
      description: { $regex: `${description.trim()}`, $options: "i" },
    });

    if (existingTodo) {
      return res
        .status(HttpStatus.OK)
        .json({ success: false, message: "Todo already existing." });
    }

    const newTodo = await Todo.create({ projectId, description });
    return res.status(HttpStatus.OK).json({
      success: true,
      newTodo,
      message: "Todo created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD : PATCH
 * * Update Todo
 */
const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);
    const { todoId } = req.params;
    const data = matchedData(req);

    await Todo.findByIdAndUpdate(todoId, data);
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD : DELETE
 * * Update Todo
 */
const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);
    const { todoId } = req.params;

    await Todo.findByIdAndDelete(todoId);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { getProjectWithTodos, createNewTodo, updateTodo, deleteTodo };
