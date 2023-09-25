import { DataTypes } from "sequelize";
import db from "../../utils/dataBase.js";

const Category = db.define(
  "categories",
  {
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: 'There is no description'
    },
  },
  { timestamps: false }
);

export default Category;