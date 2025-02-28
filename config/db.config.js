require('dotenv').config();
module.exports = {
    development : {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'ph-adderss-api',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: process.env.DB_DIALECT || 'mysql',
        port: process.env.DB_PORT || 3306,
        dialectOptions: {
            connectTimeout: 60000,  // Increase the timeout to 60 seconds
          },
          pool: {
            max: 20,           // Increase maximum pool size to handle more connections
            min: 5,            // Minimum number of connections
            acquire: 60000,    // Maximum time (in ms) before throwing an error if a connection cannot be acquired
            idle: 10000        // Maximum idle time before considering a connection idle
          }
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT
    },
    production : {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT
    }
}
