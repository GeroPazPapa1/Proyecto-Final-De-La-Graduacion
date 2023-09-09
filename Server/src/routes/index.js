const { Router } = require("express");
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");
const sellRouter = require("./sellBuyRouter");

const routes = Router();

routes.use("/user", userRouter);
routes.use("/car", carRouter);
routes.use("/sell", sellRouter);

module.exports = routes;
