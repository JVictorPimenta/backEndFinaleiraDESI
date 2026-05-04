import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import Student from "./Student.js";
import Discipline from "./Discipline.js";

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
Grade.belongsTo(Discipline, { foreignKey: "disciplineId", onDelete: "CASCADE" });
Student.hasMany(Grade, { foreignKey: "studentId" });
Discipline.hasMany(Grade, { foreignKey: "disciplineId" });

export default Grade;
