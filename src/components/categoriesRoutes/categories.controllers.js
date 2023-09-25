import Category from "../../models/taskCRUD/categories.model.js";
import Task from "../../models/taskCRUD/tasks.model.js";


export const getAllCategories = async (req, res) => {
  try {
    const users = await Category.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { body } = req;
    await Category.findOrCreate({
      where: { name: body.name },
      defaults: body
    });
    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const addCategoryToTask = async (req, res) => {
  try {
    const { taskId, ...category } = req.body;
    const getTask = await Task.findAll({
      where: { id: taskId },
    });
    const [newCategory, created] = await Category.findOrCreate({
      where: { name: category.name },
      defaults: category,
    });
    await newCategory.addTask(getTask);
    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.destroy({ where: { id } });
    res.status(204).end()
  } catch (error) {
    res.status(400).json(error);
  }  
};

export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await Category.update(body, { where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};
