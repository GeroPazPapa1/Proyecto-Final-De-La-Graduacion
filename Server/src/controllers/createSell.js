const { Car, Sell, carSells} = require('../db') 

// Ruta para crear una venta con múltiples carros
const createSell = async (Cars, date, description, amount, price) => {
  try {
      console.log(date);
      const newSell = await Sell.create({date, description, amount, price});
      
      console.log(newSell)
    // Crear las relaciones entre la venta y los carros en la tabla intermedia
    // for (const carId of Cars) {
    //   await carSells.create({
    //     SellId: newSell.id,
    //     CarId: carId,
    //   });
    // }
    return carSells;
}catch(error){
    return error.message;
}
}

module.exports = {createSell}