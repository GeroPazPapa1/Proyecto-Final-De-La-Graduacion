const { Router } = require("express");
//handlers importados
const { postUserHandler } = require("../handlers/postUserHandler");
const { deleteUserHandler } = require("../handlers/deleteUserHandler");
const { loginHandler } = require("../handlers/loginHandler");
const { getUsersHandler } = require("../handlers/getUsersHandler");
const { putUserHandler } = require("../handlers/putUserHandler");
const { googleLoginHandler } = require("../handlers/googleLoginHandler");
const { getUserbyEmailHandler } = require("../handlers/getUserbyEmailHandler");
const { verifyTokenHandler } = require("../handlers/verifyTokenHandler");
const router = Router();

//configuracion de rutas
router.get("/verify/:token", verifyTokenHandler);
router.post("/google", googleLoginHandler);
router.post("/create", postUserHandler);
router.delete("/delete/:id", deleteUserHandler);
router.get("/", getUsersHandler);
router.post("/", loginHandler);
router.put("/:id", putUserHandler);
router.get("/:email", getUserbyEmailHandler);

module.exports = router;
