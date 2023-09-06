const { Car, Brand } = require('../db');
const data = require('../../api/db.json'); 

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

  //  console.log(data.Cars.map((element) => element.models.map((element)=> element)))
// const allCarsDb = data.Cars.map((element) => element.models.map((element)=> element));
// console.log(allCarsDb);
// const allCarDb2 = [].concat.apply([],allCarsDb)

// const newAllCar = await Car.bulkCreate(allCarDb2);
// console.log(allCarDb2);
// allCarDb2.map((element) => {
//  Car.create(
//     element.name,
//         element.image,
//         element.brand,
//        element.model,
//         element.state,
//         element.price,
//         element.location,
//         element.color,
//         element.description
//  )
// })

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
    });
  
    // const BrandAll = await Brand.findAll({
    //   where: {
    //     name: brand,
    //   },
    // });
    // await newCar.addBrand(BrandAll.map((brand) => brand.id));
  
    return newCar;
  };

  module.exports = {
    createCar,};