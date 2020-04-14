'use strict'
const router = require('express').Router()

// Routers
const { userRouter, usersRouter } = require("./users.router")

// Controllers
const { resetPassword } = require("../controllers/user.controller")

// Use routers
router.use("/api/user", userRouter)
router.use("/api/users", usersRouter)

// Root route
router.get("/", (req, res) => {
   res.json({ message: "Hello from server" })
})

// Authentications routes
router.post("/api/reset-password", resetPassword)

// Export
module.exports = router