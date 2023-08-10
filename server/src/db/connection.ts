import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize-typescript";
import { Expediteur } from "./models/expediteur";
import { Courrier } from "./models/courrier";
import { Statut } from "./models/statut";
import { StatutCourrier } from "./models/statutCourrier";
import { Facteur } from "./models/facteur";

const connection = new Sequelize({
  dialect: "mariadb",
  dialectOptions: {
    socketPath: "/var/run/mysqld/mysqld.sock",
  },
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  logging: false,
  port: 3306,
  models: [Expediteur, Courrier, Facteur, Statut, StatutCourrier],
});

export default connection;
