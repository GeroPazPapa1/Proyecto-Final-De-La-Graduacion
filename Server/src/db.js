require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require('sequelize');
const User = require("./models/User");
const Admin = require("./models/admin");
const Brand = require("./models/Brand");
const Car = require("./models/Car");

//conexión de sequelize
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

//se ejecutan los modelos
User(sequelize);
Admin(sequelize);
Brand(sequelize);
Car(sequelize);
//relacion de modelos


module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
