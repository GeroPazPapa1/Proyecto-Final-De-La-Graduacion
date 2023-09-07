const { Router } = require("express");
//handlers importados
const { postUserHandler } = require("../handlers/postUserHandler");
const { deleteUserHandler } = require("../handlers/deleteUserHandler");
const { loginHandler } = require("../handlers/loginHandler");
const { getUsersHandler } = require("../handlers/getUsersHandler");
const { putUserHandler } = require("../handlers/putUserHandler");
const { googleLoginHandler } = require("../handlers/googleLoginHandler");
const { checkUserRole } = require("../handlers/CheckUserRole");
const { getUsersInDashboard } = require("../controllers/getUsersInDashboard");
const router = Router();

//configuracion de rutas
router.post("/google", googleLoginHandler);
router.post("/create", postUserHandler);
router.delete("/delete/:id", deleteUserHandler);
router.get("/", getUsersHandler);
router.post("/", loginHandler);
router.put("/:id", putUserHandler);

//Configuracion de rutas de admi
router.get("/dashboard/users", checkUserRole("admin"), getUsersInDashboard)

module.exports = router;
