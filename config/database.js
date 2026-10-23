
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "assignment5",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);
