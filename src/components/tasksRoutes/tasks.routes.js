import { Router } from "express";
import {
  createTaskByUser,
  deleteTaskById,
  updateAllTask,
  updateTask,
} from "./tasks.controllers.js";

const router = Router();

router.route("/task")
  .post(createTaskByUser);

router.route("/task/:id")
  .put(updateAllTask)
  .patch(updateTask)
  .delete(deleteTaskById);

export default router;
