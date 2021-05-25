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

const userRoutes = require('./Routes/User')
app.get('/me', verification, userRoutes.getCurrentUser)
app.get('/make-me-admin', verification, userRoutes.changeUserRoleOnAdmin)
app.get('/user/:login', userRoutes.getSomeUser)

const postRoutes = require('./Routes/Post')
app.get('/posts', postRoutes.getNewPosts)
app.get('/posts/unverified', verification, postRoutes.unverifiedPosts)
app.get('/post/image/:path', postRoutes.getPostImage)
app.post('/post-image', verification, (req, res) => postRoutes.uploadPostImage(req, res, upload))
app.post('/post', verification, postRoutes.newPost)
app.get('/post/:id', postRoutes.getPost)
app.delete('/post/:id', verification, postRoutes.deletePost)
app.get('/post/verify/:id', verification, postRoutes.verifyPost)
app.get('/like/:id', verification, postRoutes.likePost)

// Starting a server
const port = 5001
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})