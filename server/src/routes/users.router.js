const userRouter = require('express').Router()
const usersRouter = require('express').Router()

const { verifyToken } = require("../middlewares/verifyToken")
const {
   createUser,
   loginUser,
   getUserProfile,
   updateProfile
} = require('../controllers/user.controller')

usersRouter.route("/").post(createUser)

userRouter.route("/login").post(loginUser)
userRouter.route("/:id")
   .get(verifyToken, getUserProfile)
   .patch(verifyToken, updateProfile)

exports.userRouter = userRouter
exports.usersRouter = usersRouter