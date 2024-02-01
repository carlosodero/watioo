import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { QueryTypes } from "sequelize";

dotenv.config();

const { POSTGRESQL_URL } = process.env;

if (!POSTGRESQL_URL) {
  throw new Error("POSTGRESQL_URL is not set");
}

const sequelize = new Sequelize(POSTGRESQL_URL);
try {
  sequelize.authenticate();
  console.log("DB Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
} 

sequelize.query("select * from users", { type: QueryTypes.SELECT})
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.error("Error en la consulta SQL:", err);
  });

export default sequelize;
