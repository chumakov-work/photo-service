const fs = require('fs')
const getCurrentUser = require('./../Utils/verification').getLoginFromToken
const PostModel = require('./../Models/Post')

// POST IMAGE
const uploadPostImage = async (req, res, upload) => {
  upload(req, res, (err) => {
    if(err) {
      res.status(501).json({error: true, message: "Произошла обшибка при обработке изображения, попробуйте еще раз."})
    } else {
      res.json(req.file);
    }
  })
}

const getPostImage = async (req, res) => {
  const path = req.params.path

  const img = fs.readFileSync('images/' + path);
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
}

// POSTS
const newPost = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const post = {...req.body, author: getCurrentUser(token)}

  await PostModel.create(post, (err, data) => {
    return err ? res.status(400).json({error: true, err}) : res.status(201).json(data)
  })
}

const getPost = async (req, res) => {
  const id = req.params.id

  await PostModel.findById(id).then(post => {
    res.json(post)
  }).catch(() => {
    res.status(404).json({error: true, message: "Пост не найден"})
  })
}

const getNewPosts = async (req, res) => {
  await PostModel.find()
    .sort({createdAt: -1})
    .then(result => res.json(result))
    .catch(err => res.status(500).json({error: true, message: err}))
}

module.exports = {
  uploadPostImage, newPost, getPostImage, getPost, getNewPosts
}
