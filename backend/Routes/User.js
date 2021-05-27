const jsonwebtoken = require('jsonwebtoken')
const UserModel = require('./../Models/User')
const PostModel = require('./../Models/Post')

const getCurrentUser = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const login = jsonwebtoken.verify(token, "secret-key").login

    await UserModel.findOne({login}).then(async userData => {
      if (userData && userData.posts) {
        const posts = []
        userData.posts.map(async id => await PostModel.findById(id).then(post => posts.push(post)))
        
        setTimeout(() => {
          userData.posts = posts
          res.json(userData)
        }, 1000)
      }
    })
  } else {
    res.status(498).json({error: true, message: "Токен не найден"})
    return {error: true, message: "Токен не найден"}
  }
}

const changeUserRoleOnAdmin = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const login = jsonwebtoken.verify(token, "secret-key").login

    await UserModel.updateMany({login}, {$set: {isAdmin: true}}).then(result => res.json({message: "New role is admin!"}))
  } else {
    res.status(498).json({error: true, message: "Токен не найден"})
    return {error: true, message: "Токен не найден"}
  }
}

const getSomeUser = async (req, res) => {
  const login = req.params.login

  await UserModel.findOne({login: login}).then(async userData => {
    if (userData.posts) {
      const posts = []
      userData.posts.map(async id => await PostModel.find({_id: id, moderated: true}).then(post => posts.push(post)))
      
      setTimeout(() => {
        userData.posts = posts
        res.json(userData)
      }, 1000)
    }
  })
}

module.exports = {
  getCurrentUser, changeUserRoleOnAdmin, getSomeUser
}