import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();


const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD, {
    host: process.env.MYSQL_ADDON_HOST,
    dialect: 'mysql',
});

export default sequelize;
