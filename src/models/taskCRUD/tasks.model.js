import { DataTypes } from "sequelize";
import db from "../../utils/dataBase.js";

const Task = db.define(
  "tasks",
  {
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: 'There is no description'
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'user_id'
    }
  },
  { timestamps: false }
);

export default Task;