import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import Student from "./Student.js";
import Class from "./Class.js";

const Enrollment = sequelize.define("Enrollment", {
  enrollmentDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("active", "completed", "dropped"),
    defaultValue: "active",
  },
});

Enrollment.belongsTo(Student, { foreignKey: "studentId", onDelete: "CASCADE" });
Enrollment.belongsTo(Class, { foreignKey: "classId", onDelete: "CASCADE" });
Student.hasMany(Enrollment, { foreignKey: "studentId" });
Class.hasMany(Enrollment, { foreignKey: "classId" });

export default Enrollment;
