const { Router } = require("express");
const { getAllCarHandler, 
    getDetailCarHandler, 
    postCarHandler,
    createCarDbHandler,
    getFiltersHandler,
    deleteCarHandler } = require("../handlers/handlerCar");

const carRouter = Router();

carRouter.get("/", getAllCarHandler);
carRouter.get("/detail/:id", getDetailCarHandler);
carRouter.get("/search", getFiltersHandler);
carRouter.post("/create", postCarHandler);
carRouter.post("/creates", createCarDbHandler);
carRouter.delete("/delete/:id", deleteCarHandler);


module.exports = carRouter;