import authenticateUser from "../middlewares/auth";
import { projectValidator } from "../validators/projectValidators";
import {
  createProject,
  deleteProject,
  projects,
  updateProjectTitle,
} from "../controllers/projectController";
import { Router } from "express";
import validateObjectId from "../middlewares/validateObjectId";
import { getProjectWithTodos } from "../controllers/todoController";
const router = Router();

router.get("/", authenticateUser, projects);
router.post("/", authenticateUser, projectValidator, createProject);
router.patch(
  "/:projectId",
  [authenticateUser, validateObjectId],
  projectValidator,
  updateProjectTitle
);
router.delete(
  "/:projectId",
  [authenticateUser, validateObjectId],
  deleteProject
);

/**
 ** Todo Routes
 */
router.get(
  "/:projectId/todos",
  [authenticateUser, validateObjectId],
  getProjectWithTodos
);
router.post("/:projectId/todos", [authenticateUser, validateObjectId]);
router.patch("/:projectId/todos/:todoId", [authenticateUser, validateObjectId]);
router.delete("/:projectId/todos/:todoId", [
  authenticateUser,
  validateObjectId,
]);

export default router;
