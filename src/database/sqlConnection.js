import { existsSync } from "node:fs";
import { Sequelize } from "sequelize";

const envFilePath = existsSync(".env")
  ? ".env"
  : existsSync("src/.env")
  ? "src/.env"
  : null;

if (envFilePath) {
  process.loadEnvFile?.(envFilePath);
}

const sequelize = new Sequelize(
  process.env.DB_NAME || "finaleiradesi",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexão com o banco de dados estabelecida!");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    throw error;
  }
}

export { sequelize, connect };
