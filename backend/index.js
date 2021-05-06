const express = require('express')
const app = express()
const cors = require('cors')
const port = 5000
require('./Utils/dataBase')()

app.use(express.json())
app.use(cors())

//Routes
const authRoutes = require('./Routes/Auth')
app.post('/login', authRoutes.login)
app.post('/signup', authRoutes.signup)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})