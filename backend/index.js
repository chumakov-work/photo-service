const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const verification = require('./Utils/verification').verifyToken

//Multer presets
const upload = multer({
  dest: 'images'
}).single('post')

// Starting a database
require('./Utils/dataBase')()

// Using a middlewares
app.use(express.json())
app.use(cors())

// Routes
const authRoutes = require('./Routes/Auth')
app.post('/login', authRoutes.login)
app.post('/signup', authRoutes.signup)

const userRouters = require('./Routes/User')
app.get('/me', verification, userRouters.getCurrentUser)

const postRoutes = require('./Routes/Post')
app.get('/posts', postRoutes.getNewPosts)
app.get('/post/image/:path', postRoutes.getPostImage)
app.post('/post-image', verification, (req, res) => postRoutes.uploadPostImage(req, res, upload))
app.post('/post', verification, postRoutes.newPost)
app.get('/post/:id', verification, postRoutes.getPost)
app.get('/like/:id', verification, postRoutes.likePost)
app.get('/dislike/:id', verification, postRoutes.dislikePost)

// Starting a server
const port = 5000
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})