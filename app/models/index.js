const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.client = client;

db.users = require("./user.model.js")(client, Sequelize);
db.game_histories = require("./gamehistory.model.js")(client, Sequelize);
db.gamers = require("./game.model.js")(client, Sequelize);
db.achievements = require("./achievement.model.js")(client, Sequelize);

module.exports = db;
