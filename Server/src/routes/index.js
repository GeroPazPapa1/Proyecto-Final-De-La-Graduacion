const { Router } = require("express");
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");

const routes = Router();

routes.use("/user", userRouter);
routes.use("/car", carRouter);

module.exports = routes;
