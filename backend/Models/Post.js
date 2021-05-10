const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  author: {type: String, required: true},
  description: {type: String, required: false},
  imagePath: {type: String, required: true},
  location: {type: Object, required: false}
}, {timestamps: true})

module.exports = mongoose.model('Post', PostSchema)