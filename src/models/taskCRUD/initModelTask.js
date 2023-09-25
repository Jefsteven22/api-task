import Category from "./categories.model.js";
import Task from "./tasks.model.js";
import User from "./users.model.js";

const initModelTask = () => {
  User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
  Task.belongsTo(User, { foreignKey: "userId" });
  Task.belongsToMany(Category, { through: "TaskCategories" });
  Category.belongsToMany(Task, { through: "TaskCategories" });
};

export default initModelTask;
