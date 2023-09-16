const { putCarController } = require("../controllers/putCarController");
const { allCar } = require("../controllers/getAllCar");

const putCarHandler = async (req, res) => {
  try {
    const {name, image, brand, model, state, price, location, color, description } = req.body;
    const { id } = req.params;
    // An object is created with the modifications that arrive by body and, if there are modifications, they are added
    const modifications = {id};
    if (name) modifications.name = name;
    if (image) modifications.image = image;
    if (brand) modifications.brand = brand;
    if (model) modifications.model = model;
    if (state) modifications.state = state;
    if (price) modifications.price = price;
    if (location) modifications.location = location;
    if (color) modifications.color = color;
    if (description) modifications.description = description;

    console.log(modifications);
    // When all the modifications are ready, they are sent to the controller.
    const carModified = await putCarController(modifications);
    const allCarEdited = await allCar();

    return res.status(200).json(allCarEdited);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  putCarHandler,
}