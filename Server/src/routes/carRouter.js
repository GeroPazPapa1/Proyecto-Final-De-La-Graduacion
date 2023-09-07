const { Router } = require("express");
const { getAllCarHandler,
    getDetailCarHandler,
    postCarHandler,
    createCarDbHandler,
    getFiltersHandler,
    deleteCarHandler } = require("../handlers/handlerCar");
const carRouter = Router();
const { getAllBrand } = require("../controllers/getAllBrand");
const { getAllColor } = require("../controllers/getAllColors");
const { getAllLocation } = require("../controllers/getAllLocation");

carRouter.get("/", getAllCarHandler);
carRouter.get("/detail/:id", getDetailCarHandler);
carRouter.get("/search", getFiltersHandler);
carRouter.post("/create", postCarHandler);
carRouter.post("/creates", createCarDbHandler);
carRouter.delete("/delete/:id", deleteCarHandler);
carRouter.get("/brand", getAllBrand);
carRouter.get("/color", getAllColor);
carRouter.get("/location", getAllLocation);


module.exports = carRouter;