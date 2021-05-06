const mongoose = require('mongoose')

const connect = () => {
  console.log('Trying connect to database')

  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

  const _URL = `mongodb+srv://admin:admin@cluster0.nczvf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  mongoose.connect(_URL, dbOptions).then(() => console.log("Successfully connected to database")).catch(err => console.log(err))
}

module.exports = connect