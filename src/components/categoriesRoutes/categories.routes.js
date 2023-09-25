import { Router } from "express";
import {
  addCategoryToTask,
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "./categories.controllers.js";

const router = Router();

router.route("/categories")
  .get(getAllCategories)
  .post(createCategory);
  
router.post("/categories/task", addCategoryToTask);

router
  .route("/categories/:id")
  .delete(deleteCategoryById)
  .patch(updateCategoryById);

export default router;
