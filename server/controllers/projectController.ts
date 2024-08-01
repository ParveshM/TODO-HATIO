import { Request, Response, NextFunction } from "express";
import Project from "../models/Projects";
import { matchedData, validationResult } from "express-validator";
import { HttpStatus } from "../types/HttpStatus";
import CustomError from "../utils/customError";
import Todos from "../models/Todos";

/**
 * * METHOD : POST
 * * Create a new project
 */

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);

    const { id } = req.user;
    const { title } = matchedData(req);

    const existingProject = await Project.findOne({
      title: { $regex: `${title}`, $options: "i" },
    });

    if (existingProject) {
      return next(
        new CustomError(`${title} already exists`, HttpStatus.BAD_REQUEST)
      );
    }

    await Project.create({ title, userId: id });

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Project created successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD : GET
 * * Get all projects
 */
const projects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const projects = await Project.find({ userId: id });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    next(error);
  }
};
/**
 * * METHOD : PATCH
 * * Update the project title
 */
const updateProjectTitle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const { title } = req.body;
    const existingProject = await Project.findOne({
      title: { $regex: `${title}`, $options: "i" },
    });
    if (existingProject) {
      return next(
        new CustomError(`${title} already exists`, HttpStatus.BAD_REQUEST)
      );
    }

    const projects = await Project.findByIdAndUpdate(projectId, { title });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Project title updated successfully",
      projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * * METHOD : DELETE
 * * Delete a project
 */
const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    // delete the project a and its associated todo's
    await Project.findByIdAndDelete(projectId);
    await Todos.deleteMany({ projectId });

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createProject, projects, updateProjectTitle, deleteProject };
