import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task.controllers.js";
const router = Router();
//Tasks
router.get("/tasks", authRequired, getTasks);
router.get("/task/:id", authRequired, getTask);
router.delete("/task/:id", authRequired, deleteTask);
router.post("/task", authRequired, createTask);
router.put("/task/:id", authRequired, updateTask);

export default router;
