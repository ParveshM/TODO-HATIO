import { Router } from "express";
import authenticateUser from "../middlewares/auth";
import {
  newTodoValidator,
  projectValidator,
  updateTodoValidator,
} from "../validators/projectValidators";
import {
  createProject,
  deleteProject,
  projects,
  updateProjectTitle,
} from "../controllers/projectController";
import validateObjectId from "../middlewares/validateObjectId";
import {
  createNewTodo,
  deleteTodo,
  getProjectWithTodos,
  updateTodo,
} from "../controllers/todoController";
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
router.post(
  "/:projectId/todos",
  [authenticateUser, validateObjectId],
  newTodoValidator,
  createNewTodo
);
router.patch(
  "/:projectId/todos/:todoId",
  [authenticateUser, validateObjectId],
  updateTodoValidator,
  updateTodo
);
router.delete("/:projectId/todos/:todoId", [
  authenticateUser,
  validateObjectId,
  deleteTodo,
]);

export default router;
