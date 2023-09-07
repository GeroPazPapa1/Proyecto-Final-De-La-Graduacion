const { Car } = require('../db');

const allCar = async () => {
    try {
      const allCars = await Car.findAll();
      return allCars;
    } catch (error) {
      return "Car not found";
    }
  };

  module.exports = {allCar,};