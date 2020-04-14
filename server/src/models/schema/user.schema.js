const mongoose = require('mongoose')

const validEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const schema = new mongoose.Schema({
   userName: {
      type: String,
      maxlength: 16,
      minlength: 3
   },
   email: {
      type: String,
      required: true,
      match: validEmail,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
   country: {
      name: {
         type: String,
         required: true
      },
      code: {
         type: String,
         maxlength: 2,
         required: true
      }
   },
   invitationCode: {
      type: String,
      required: true
   },
   balance: {
      type: Number,
      default: 20
   },
   bets: {
      type: Number,
      default: 3,
   },
   createdAt: {
      type: Date,
      default: Date.now()
   }
})

module.exports = schema