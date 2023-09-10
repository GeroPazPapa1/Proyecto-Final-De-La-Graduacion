const { Router } = require("express");
const userRouter = require("./userRouter");
const carRouter = require("./carRouter");
const mercadoPagoRouter = require('./mercadoPagoRouter')
const adminRouter = require("./adminRouter");
const reviewRouter = require('./reviewRouter');

const routes = Router();

routes.use("/user", userRouter);
routes.use("/car", carRouter);
routes.use('/create_preference', mercadoPagoRouter)
routes.use("/admin", adminRouter);
routes.use('/review', reviewRouter)

module.exports = routes;
