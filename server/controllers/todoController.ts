import { Request, Response, NextFunction } from "express";
import Projects from "../models/Projects";
import Todo from "../models/Todos";
import { HttpStatus } from "../types/HttpStatus";

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
    const { id } = req.user;
    const { projectId } = req.params;

    const todos = await Todo.find({ _id: projectId, userId: id });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    next(error);
  }
};

export { getProjectWithTodos };
