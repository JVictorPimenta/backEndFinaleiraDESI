import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import Class from "./Class.js";

const Discipline = sequelize.define("Discipline", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
});

Discipline.belongsTo(Class, {
  foreignKey: {
    name: "classId",
    allowNull: false,
  },
  onDelete: "CASCADE",
});
Class.hasMany(Discipline, { foreignKey: "classId" });

export default Discipline;
