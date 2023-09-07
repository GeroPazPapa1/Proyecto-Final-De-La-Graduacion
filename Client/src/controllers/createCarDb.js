// const { Car, Brand } = require('../db');
// const data = require('../../api/db.json'); 


// const createCarDb = async () => {
//  //  console.log(data.Cars.map((element) => element.models.map((element)=> element)))
//  const allCarsDb = data.Cars.map((element) => element.models.map((element)=> element));
//  // console.log(allCarsDb);
//  const allCarDb2 = [].concat.apply([],allCarsDb)
 
//  const newAllCar = await Car.bulkCreate(allCarDb2);

// }

// module.exports = {createCarDb,};


const { Car, Brand } = require('../db');
const data = require('../../api/db.json'); 

const createCarDb = async () => {
 //  console.log(data.Cars.map((element) => element.models.map((element)=> element)))
 const allCarsDb = data.Cars.map((element) => element.models.map((element)=> element));
 // console.log(allCarsDb);
 const allCarDb2 = [].concat.apply([],allCarsDb)

 console.log(allCarDb2);

 const newAllCar = await Car.bulkCreate(allCarDb2);

}

module.exports = {createCarDb,};






/*
 {
    "name": "MC20",
    "image": [
     " https://res.cloudinary.com/vehibuy/image/upload/v1693527738/Cars%20db/Maserati/MC20/2023-maserati-mc20-cielo-spyder-102-1653402017_nght73.jpg",
      "https://res.cloudinary.com/vehibuy/image/upload/v1693527754/Cars%20db/Maserati/MC20/2023-maserati-mc20-cielo-spyder-108-1653401843_v8qt6a.jpg",
     " https://res.cloudinary.com/vehibuy/image/upload/v1693527749/Cars%20db/Maserati/MC20/2023-maserati-mc20-cielo-spyder-105-1653401840_lvhurn.jpg",
      "https://res.cloudinary.com/vehibuy/image/upload/v1693527744/Cars%20db/Maserati/MC20/2023-maserati-mc20-cielo-spyder-104-1653402016_ro92zg.jpg",
      "https://res.cloudinary.com/vehibuy/image/upload/v1693527760/Cars%20db/Maserati/MC20/2023-maserati-mc20-cielo-spyder-110-1653401843_r1twub.jpg"
    ],
    "brand": "Maserati",
    "model": "2023",
    "state": "New",
    "price": "21000",
    "location": "Italy",
    "color": "White",
    "description": "The Maserati MC20 is a supercar introduced in 2020. It has a carbon fiber chassis, twin-turbo V6 engine, and over 600 horsepower. It can reach over 200 mph and accelerate from 0-60 mph in less than 3 seconds."
  }*/