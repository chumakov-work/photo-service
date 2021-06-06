const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  author: {type: String, required: true},
  description: {type: String, default: null},
  imagePath: {type: String, required: true},
  location: {type: Object, default: null},
  likes: {type: Number, default: 0},
  likedBy: {type: Array, default: []},
  moderated: {type: Boolean, default: false},
  tags: {type: Array, default: []},
  category: {type: String, default: "None"}
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)