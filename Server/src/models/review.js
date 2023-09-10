const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'Reviews',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      rating: {
        type: DataTypes.INTEGER
      },
      tittle: {
        type: DataTypes.STRING
      },
      review: {
        type: DataTypes.TEXT
      },
    },
    {
      timestamps: false,
    }
  );
};