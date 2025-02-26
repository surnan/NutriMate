// backend/config/database.js
const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;
const schema = db.schema;

console.log('Password type:', typeof password);

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        // dialect: 'sqlite',
        dialect: 'postgres',
        seederStorage: 'sequelize'
    },
    production: {
        use_env_variable: 'DATABASE_URL',
        dialect: 'postgres',
        seederStorage: 'sequelize',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            schema
        }
    }
};
