const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  author: {type: String, required: true},
  description: {type: String, default: null},
  imagePath: {type: String, required: true},
  location: {type: Object, default: null},
  likes: {type: Number, required: true, default: 0},
  likedBy: {type: Array, default: []},
  moderated: {type: Boolean, default: false}
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)