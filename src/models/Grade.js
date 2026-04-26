import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import Student from "./Student.js";
import Class from "./Class.js";

const Grade = sequelize.define("Grade", {
  score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 10,
    },
  },
  semester: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

Grade.belongsTo(Student, { foreignKey: "studentId", onDelete: "CASCADE" });
Grade.belongsTo(Class, { foreignKey: "classId", onDelete: "CASCADE" });
Student.hasMany(Grade, { foreignKey: "studentId" });
Class.hasMany(Grade, { foreignKey: "classId" });

export default Grade;
