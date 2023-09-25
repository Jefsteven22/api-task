import { DataTypes } from "sequelize";
import db from "../../utils/dataBase.js";

const User = db.define(
  "users",
  {
    username: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
  },
  { timestamps: false }
);

export default User;
