const { Router } = require("express");
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");
const mercadoPagoRouter = require('./mercadoPagoRouter')
const sellRouter = require("./sellBuyRouter");
const adminRouter = require("./adminRouter");

const routes = Router();

routes.use("/user", userRouter);
routes.use("/car", carRouter);
routes.use("/admin", adminRouter);
routes.use('/create_preference', mercadoPagoRouter)
routes.use("/admin", adminRouter);

module.exports = routes;
