const jsonwebtoken = require('jsonwebtoken')
const UserModel = require('./../Models/User')

const getCurrentUser = async (req, res) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    const login = jsonwebtoken.verify(token, "secret-key").login

    await UserModel.findOne({login}).then(result => {
      res.json(result)
      return result
    })
  } else {
    res.status(498).json({error: true, message: "Токен не найден"})
    return {error: true, message: "Токен не найден"}
  }
}

module.exports = {
  getCurrentUser
}