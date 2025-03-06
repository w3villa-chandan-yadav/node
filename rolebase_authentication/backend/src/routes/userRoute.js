const express = require("express");
const { getAllUser, loginUser, createUser, createTask, getSingleTask, getAllTask, updateTask, deletTask } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.get("/user",getAllUser);
userRoute.put("/login",loginUser);
userRoute.put("/create",createUser);
userRoute.put("/createTask",createTask);
userRoute.get("/singleTask",getSingleTask);
userRoute.get("/getAllTask",getAllTask);
userRoute.patch("/updateTask",updateTask);
userRoute.delete("/deletTask",deletTask)





module.exports = userRoute ;