const express = require("express")
const userRouter = express.Router();
const { hello } = require("../controllers/users")

userRouter.get("/", hello);

module.exports = userRouter

