require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  { logging: false, native: false }
);

const basename = path.basename(__filename);
const modelDefiners = [];

fs.readdirSync(path.join(__dirname, 'models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, 'models', file));
    modelDefiners.push(model);
  });

try {
  modelDefiners.forEach((model) => model(sequelize));

  // Capitalizamos los nombres de los modelos, por ejemplo: product => Product
  const entries = Object.entries(sequelize.models);
  const capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
  ]);

  sequelize.models = Object.fromEntries(capsEntries);
} catch (error) {
  console.error('Error cargando modelos:', error);
}

const { Admin, Brand, Buy, Car, Review, User, Sell } = sequelize.models;

// Relacion Car-Review;
Car.hasMany(Review, { foreignKey: 'carId' });
Review.belongsTo(Car, { foreignKey: 'carId' });
// Relacion User-Review;
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
// Relacion Brand-Car;
Brand.hasMany(Car, { foreignKey: 'brandId' });
Car.belongsTo(Brand, { foreignKey: 'brandId' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
