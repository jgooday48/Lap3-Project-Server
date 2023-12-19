const express = require("express")
const userRouter = express.Router();
const { hello, authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } = require("../controllers/users")
const protect = require("../middleware/authMiddleware")

userRouter.post("/auth", authUser)
userRouter.post("/", registerUser)
userRouter.post("/logout", logoutUser)
userRouter.route("/profile").get(getUserProfile).patch(updateUserProfile)
userRouter.get("/hello", hello);

module.exports = userRouter

