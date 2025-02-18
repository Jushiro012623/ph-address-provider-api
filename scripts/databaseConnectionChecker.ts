import 'dotenv/config';
import { Sequelize } from 'sequelize';
const dbConfig = require( '../config/db.config')

const init = async () => {
    const config = dbConfig.development
    const sequelize : Sequelize = new Sequelize(config.database, config.username, config.password, config);
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        console.log('Ok.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}
init()