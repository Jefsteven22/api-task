import Category from "../../models/taskCRUD/categories.model.js";
import Task from "../../models/taskCRUD/tasks.model.js";
import User from "../../models/taskCRUD/users.model.js";

export const getUserWithTask = async (req, res) => {
  try {
    const userTask = await User.findAll({
      include: [
        {
          model: Task,
          attributes: ["id", "title", "description", "completed"],
          include: {
            model: Category,
            attributes: ["id", "name", "description"],
            through: { attributes: [] },  
          },
        },
      ],
    });
    res.json(userTask);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createUsers = async (req, res) => {
  try {
    const { body } = req;
    await User.create(body);
    res.status(201).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await User.update(body, { where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const updateAllUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const requiredFields = ["username", "email", "password"];
    for (const field of requiredFields) {
      if (!(field in body)) {
        return res
          .status(400)
          .json({ error: `the ${field} field is mandatory.` });
      }
    }
    await User.update(body, {
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.destroy({ where: { userId: id } });
    await User.destroy({ where: { id } });
    res.status(204).end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getUserById = async ( req, res ) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id, {
      include: [
        {
          model: Task,
          attributes: ["id", "title", "description", "completed"],
          include: {
            model: Category,
            attributes: ["id", "name", "description"],
            through: { attributes: [] },  
          },
        },
      ],
    });
    res.json(user)
  } catch (error) {
    res.status(400).json(error);
  }
}