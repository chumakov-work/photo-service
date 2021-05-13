const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const UserModel = require('./../Models/User')

const login = async (req, res) => {
  const login = req.body.login
  const password = req.body.password

  if (!login || !password) {
    res.status(400).json({error: true, message: "Логин и пароль - обязательны для заполнения"})
    return
  }

  const user = await UserModel.findOne({login})
  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jsonwebtoken.sign(
          {login: login},
          "secret-key",
          {expiresIn: 60 * 60 * 24 * 30}
        )

        res.status(200).json({error: false, data: {token}})
      } else {
        res.status(401).json({error: true, message: "Неверный логин или пароль"})
      }
    })
  } else {
    res.status(401).json({error: true, message: "Неверный логин или пароль"})
  }
}

const signup = async (req, res) => {
  const user = {
    login: req.body.login,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 5)
  }

  if (!user.login || !user.name || !user.password) {
    res.status(400).json({error: true, message: "Логин, Имя, и Пароль - обязательны для заполнения"})
    return
  }

  const findUserByLogin = await UserModel.findOne({login: user.login})

  if (!!findUserByLogin) {
    res.status(400).json({error: true, message: "Пользователь с таким логином уже существует"})
    return
  }

  await UserModel.create(user, (err, data) => {
    return err ? res.status(400).json(err) : res.status(201).json({error: false, data})
  })
}

module.exports = {
  login, signup
}