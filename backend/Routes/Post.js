const fs = require('fs')
const getCurrentUser = require('./../Utils/verification').getLoginFromToken
const PostModel = require('./../Models/Post')
const UserModel = require('./../Models/User')

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
  const post = {...req.body, author: getCurrentUser(req.headers.authorization.split(' ')[1])}

  await PostModel.create(post).then(async postData => {
    await UserModel.findOne({login: getCurrentUser(req.headers.authorization.split(' ')[1])}).then(async userData => {
      const posts = [...userData.posts]
      posts.push(postData._id)
      await UserModel.findByIdAndUpdate(userData._id, {$set: {posts: posts}}).then(result => res.json(result))
    })
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
  await PostModel.find({moderated: true})
    .sort({createdAt: -1})
    .catch(err => res.status(500).json({error: true, message: err}))
    .then(result => res.json(result))
}

const likePost = async (req, res) => {
  const id = req.params.id
  const login = getCurrentUser(req.headers.authorization.split(' ')[1])

  const likes = await PostModel.findById(id).then(post => {
    if (post.likedBy) {
      const filtering = post.likedBy.filter(user => user === login)
      if (filtering.length > 0) return false
      post.likedBy.push(login)
    }

    return {
      post,
      likes: post.likes + 1,
      likedBy: post.likedBy
    }
  })

  if (likes.likedBy) {
    await PostModel
      .updateMany({_id: id}, {$set: {likes: likes.likes, likedBy: likes.likedBy}})
      .then(() => {
        res.status(200).json({error: false, message: "Успешно", post: {...likes.post._doc, likes: likes.likes}})
      })
    
    const user = await UserModel.findOne({login})
    user.liked.push(likes.post._doc)
    await UserModel.updateMany({login}, {$set: {liked: user.liked}})
  } else {
    res.status(400).json({error: true, message: "Нельзя добавить в {liked} один и тот же пост два раза!"})
  }
}

const unverifiedPosts = async (req, res) => {
  await PostModel.find({moderated: false})
    .sort({createdAt: 1})
    .catch(err => res.status(500).json({error: true, message: err}))
    .then(result => res.json(result))
}

const verifyPost = async (req, res) => {
  const id = req.params.id

  if (id) {
    await PostModel.updateMany({_id: id}, {$set: {moderated: true}}).then(result => res.json({message: "Пост промодерирован"}))
  } else {
    res.status(400).json({error: true, message: "Неверный id поста"})
  }
}

const deletePost = async (req, res) => {
  const id = req.params.id

  if (id) {
    await PostModel.findOneAndDelete({_id: id}).then(result => result && res.json({message: "Удалено!"}))
  } else {
    res.status(400).json({error: true, message: "Неверный id поста"})
  }
}

module.exports = {
  uploadPostImage, newPost, getPostImage, getPost, getNewPosts, likePost, unverifiedPosts, verifyPost, deletePost
}
