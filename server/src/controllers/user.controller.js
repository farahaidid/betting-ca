const Users = require("../models/user.model")
const Error = require("../middlewares/error.handler").ErrorHandler
const { BAD_REQUEST, OK, NOT_FOUND, INTERNAL_SERVER_ERROR, CONFLICT } = require("../js/http.status")
const DUPLICATE = "E11000"
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res, next) => {
   try {
      // Initializing Users model
      await Users.init()

      // Creating new user instance 
      let user = new Users(req.body)

      // Checking if user is valid
      let validationError = user.validateSync()
      if (validationError) throw new Error(BAD_REQUEST, validationError.message)

      // Hashing password
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(user.password, salt);

      // Replacing user password with hashed
      user.password = hashed

      // Lowercasing email address
      user.email = user.email.toLowerCase()

      try {
         // Saving user
         await user.save()

         // Sending response with new user
         res.status(OK).json({ message: "User created successfully!" })
      }
      catch (error) {
         // Checking if duplicate user
         if (error.message.includes(DUPLICATE)) {
            // Sending response with new user
            throw new Error(CONFLICT, 'User already exist!. Please signin with your credentials.')
         }
         else { throw new Error(BAD_REQUEST, error.message) }
      }
   }
   catch (error) { next(error) }
}
exports.loginUser = async ({ body: { email, password } }, res, next) => {
   try {

      if (!email || !password) throw new Error(BAD_REQUEST, 'Please provide credentials correctly!')

      // Finding user
      let user = await Users.findOne({ email: { $regex: `^${email}$`, $options: "i" } }).select('password')

      // User not found
      if (!user) throw new Error(NOT_FOUND, "User not found!")

      // Matcging password
      let matched = bcrypt.compareSync(password, user.password)

      // password not matched
      if (!matched) throw new Error(BAD_REQUEST, "Incorrect password!")

      // Json web token
      let token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '168h' })

      // Sending response
      res.status(OK).json({ _id: user._id, token })

   }
   catch (error) { next(error) }
}
exports.getUserProfile = async (req, res, next) => {
   try {
      let id = req.params.id || req.body._id

      if (!id) throw new Error(BAD_REQUEST, 'Please provide a user id')

      let user = await Users.findById(id).select("-__v -password -invitationCode")

      if (!user) throw new Error(NOT_FOUND, 'User not found!')

      return res.status(OK).json(user)
   }
   catch (error) { return next(error) }
}
exports.updateProfile = async (req, res, next) => {
   try {
      let _id = req.params.id || req.body._id
      let data = req.body
      let user = await Users.updateOne({ _id }, data)
      return res.status(OK).json({ message: "UPDATED" })
   }
   catch (error) { return next(error) }
}
exports.resetPassword = async (req, res, next) => {
   try {

      let { email, password } = req.body

      // Hashing password
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);

      let response = await Users.updateOne({ email }, { password: hashed })

      if (response.nModified === 0) throw new Error(INTERNAL_SERVER_ERROR, "Error reseting password")

      res.status(OK).json({ message: "RESET DONE" })
   }
   catch (error) { return next(error) }
}