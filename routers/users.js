const express = require("express")
const userRouter = express.Router();
const { hello, authUser, registerUser } = require("../controllers/users")

userRouter.post("/auth", authUser)
userRouter.post("/", registerUser)
userRouter.get("/hello", hello);

module.exports = userRouter

