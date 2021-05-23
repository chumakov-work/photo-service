const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  login: {type: String, required: true, index: { unique: true }},
  name: {type: String, required: true},
  password: {type: String, required: true},
  liked: {type: Array, default: null},
  isAdmin: {type: Boolean, default: false},
  posts: {type: Array, default: []}
}, {timestamps: true})

module.exports = mongoose.model('User', UserSchema)