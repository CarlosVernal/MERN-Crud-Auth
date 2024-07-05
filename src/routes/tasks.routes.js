import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controllers.js";

//middleware
import { authRequired } from "../middlewares/validateToken.js";
import { validatorSchema } from "../middlewares/validatorMiddleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();
//Tasks
router.get("/tasks", authRequired, getTasks);
router.get("/task/:id", authRequired, getTask);
router.delete("/task/:id", authRequired, deleteTask);
router.post(
  "/task",
  authRequired,
  validatorSchema(createTaskSchema),
  createTask
);
router.put("/task/:id", authRequired, updateTask);

export default router;
