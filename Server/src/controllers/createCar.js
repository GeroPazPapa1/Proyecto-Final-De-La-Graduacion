const { Car, Brand } = require('../db');

const createCar = async (
    name,
    image,
    brand,
    model,
    state,
    price,
    location,
    color,
    description,
  ) => {

const brandId = await Brand.findOne({
  where: 
    {
      name: brand
    }
})

if(!brandId) {
  const newBrand = Brand.create({name: brand});
  const newCar = await Car.create({
    name,
    image,
    brand,
    model,
    state,
    price,
    location,
    color,
    description,
    brandId: newBrand.id
});
return newCar;
}
else
{  
  const newCar = await Car.create({
        name,
        image,
        brand,
        model,
        state,
        price,
        location,
        color,
        description,
        brandId: brandId.id
    });
    return newCar;
  }    
};

  module.exports = {
    createCar,};