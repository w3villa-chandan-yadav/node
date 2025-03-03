const express = require("express");
const router = express.Router();
const { indecController } = require("../controller/userController");


router.get("/",indecController)


module.exports = router