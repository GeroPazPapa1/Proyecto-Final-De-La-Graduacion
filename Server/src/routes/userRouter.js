const { Router } = require("express");
//handlers importados
const { postUserHandler } = require("../handlers/postUserHandler");
const { deleteUserHandler } = require("../handlers/deleteUserHandler");
const { loginHandler } = require("../handlers/loginHandler");
const { getUsersHandler } = require("../handlers/getUsersHandler");
const { putUserHandler } = require("../handlers/putUserHandler");
const { googleLoginHandler } = require("../handlers/googleLoginHandler");
<<<<<<< HEAD
const { getFiltersHandler } = require("../handlers/handlerUserFilter");
=======
const { checkUserRole } = require("../handlers/CheckUserRole");
const { getUsersInDashboard } = require("../controllers/getUsersInDashboard");
const { getUserbyEmailHandler } = require("../handlers/getUserbyEmailHandler");
const { verifyTokenHandler } = require("../handlers/verifyTokenHandler");
>>>>>>> 83523581cbf4d33889fac2bce244f11a1745e64c
const router = Router();

//configuracion de rutas
router.get("/verify/:token", verifyTokenHandler);
router.post("/google", googleLoginHandler);
router.post("/create", postUserHandler);
router.delete("/delete/:id", deleteUserHandler);
router.get("/", getUsersHandler);
router.post("/", loginHandler);
router.put("/:id", putUserHandler);
router.get("/dashboard/filter", getFiltersHandler)

//Configuracion de rutas de admi
router.get("/dashboard/users", checkUserRole("admin"), getUsersInDashboard);

module.exports = router;
