import Category from "../../models/taskCRUD/categories.model.js";
import Task from "../../models/taskCRUD/tasks.model.js";
import User from "../../models/taskCRUD/users.model.js";

export const createTaskByUser = async (req, res) => {
  try {
    const { email, UserId, category, ...task } = req.body;

    const getUser = email
      ? await User.findOne({ where: { email } })
      : await User.findOne({ where: { id: UserId } });
    const createTask = await Task.create(task);
    const [createCategory, createdC] = await Category.findOrCreate({
      where: { name: category },
      defaults: category,
    });
    await getUser.addTask(createTask);
    await createTask.addCategory(createCategory);
    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await Task.update(body, { where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateAllTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const requiredFields = ["title", "description", "completed"];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return res
          .status(400)
          .json({ error: `the ${field} field is mandatory.` });
      }
    }
    await Task.update(body, { where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};
