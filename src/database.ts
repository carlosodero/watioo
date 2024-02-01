import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const { POSTGRESQL_URL } = process.env;

if (!POSTGRESQL_URL) {
  throw new Error('POSTGRESQL_URL is not set');
}

const sequelize = new Sequelize(POSTGRESQL_URL);
try {
  await sequelize.authenticate();
  console.log('DB Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
