const jsonwebtoken = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const result = jsonwebtoken.verify(req.headers.authorization.split(' ')[1], "secret-key")

      if (result && result.error) {
        res.status(498).json({error: true, message: "Сессия устарела"})
      } else {
        next()
      }
    } catch (e) {
      res.status(498).json({error: true, message: "Сессия устарела"})
      console.log(e)
    }
  } else {
    res.status(498).json({error: true, message: "Ошибка сессии"})
  }
}

const getLoginFromToken = token => {
  return jsonwebtoken.verify(token, "secret-key").login
}

module.exports = {verifyToken, getLoginFromToken}