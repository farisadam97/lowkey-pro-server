require('dotenv').config()

const {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_USER
} = process.env

module.exports = {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASS,
    DB: DB_NAME,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
