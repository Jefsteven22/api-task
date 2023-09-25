import { Router } from "express";
import {
  createUsers,
  deleteUserById,
  getUserById,
  getUserWithTask,
  updateAllUser,
  updateUserById,
} from "./users.controllers.js";

const router = Router();

router.route("/users")
  .get(getUserWithTask)
  .post(createUsers);

router.route("/users/:id")
  .put(updateAllUser)
  .patch(updateUserById)
  .delete(deleteUserById)
  .get(getUserById)

export default router;
