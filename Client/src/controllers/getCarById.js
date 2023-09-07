const { Car } = require('../db');

const getCarById = async (id) => {

    const carIdDb = await Car.findByPk(id);
    
    console.log(carIdDb);
    if (!carIdDb) {
      return "Car not found";
    }
    return carIdDb;
  };

  module.exports = {getCarById};