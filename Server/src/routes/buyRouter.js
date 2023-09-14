const { Router } = require("express");
const { postBuyHandler } = require("../handlers/postBuyHandler");
const {
  getBuysByuserIdHandler,
} = require("../handlers/getBuysByuserIdHandler");
const router = Router();

router.post("/create", postBuyHandler);
router.get("/getByuser/:userId", getBuysByuserIdHandler);
module.exports = router;
