const express = require("express")
const userRouter = express.Router();
const { hello, authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } = require("../controllers/users")


userRouter.post("/auth", authUser)
userRouter.post("/", registerUser)
userRouter.post("/logout", logoutUser)
userRouter.route("/profile").get(getUserProfile).patch(updateUserProfile)

module.exports = userRouter

