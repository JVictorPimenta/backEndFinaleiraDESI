import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import User from "./User.js";

const Class = sequelize.define("Class", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  schedule: {
    type: DataTypes.STRING,
  },
  room: {
    type: DataTypes.STRING,
  },
});

Class.belongsTo(User, { foreignKey: "professorId", onDelete: "SET NULL" });
User.hasMany(Class, { foreignKey: "professorId" });

export default Class;
