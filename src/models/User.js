import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "professor", "aluno"),
    allowNull: false,
    defaultValue: "aluno",
  },
});

export default User;
