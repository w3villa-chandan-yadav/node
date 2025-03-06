const express = require("express");
const router = express.Router();
const { indexController , updatePost , deletePost ,getAllusers} = require("../controller/userController");
const { isValidUser } = require("../middlewares/authmiddelware");

router.get("/",getAllusers)
router.post("/addUser",indexController)
router.put("/update",isValidUser,updatePost)
router.delete("/delete" , deletePost)



module.exports = router