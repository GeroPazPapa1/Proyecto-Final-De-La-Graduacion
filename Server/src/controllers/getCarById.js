const { Car, Reviews, Brand } = require('../db');

const getCarById = async (id) => {

    const carIdDb = await Car.findByPk(id,
      {
        include: [
          {
            model: Reviews,
          }
      ]
    });
    
    const brand = await Brand.findByPk(carIdDb.brandId)
    
    const carById = {
      name: carIdDb.name,
      color: carIdDb.color,
      description: carIdDb.description,
      id: carIdDb.id,
      image: carIdDb.image,
      brand: brand.name,
      location: carIdDb.location,
      model: carIdDb.model,
      price: carIdDb.price,
      state: carIdDb.state,
      reviews: carIdDb.Reviews
    }
    
    if (!carIdDb) {
      return "Car not found";
    }
    return carById;
  };

  module.exports = {getCarById};