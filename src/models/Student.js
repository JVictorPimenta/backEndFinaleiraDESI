import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";
import User from "./User.js";

const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registration: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
});

Student.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasOne(Student, { foreignKey: "userId" });

export default Student;
