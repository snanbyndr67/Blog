const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate
const expressSession = require("express-session");
const mongoStore = require('connect-mongo') //Connect-Mongo 1. adım


mongoose.connect('mongodb://127.0.0.1:27017/nodeblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(expressSession({
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  store: mongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/nodeblog' }) // ConnectMongo 2.adım
}))

//Flash - Message Middleware
app.use(function (req, res, next) {
  res.locals.sessionFlash = req.session.sessionFlash
  delete req.session.sessionFlash
  next()
})


app.use(fileUpload())
app.use(express.static('public'))

app.engine('handlebars', exphbs.engine({ helpers: { generateDate: generateDate } }))
app.set('view engine', 'handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Display Link Middleware
app.use(function (req, res, next) {
  const { userId } = req.session
  if (userId) {
    res.locals = {
      displayLink: true
    }
  } else {
    res.locals = {
      displayLink: false
    }
  }
  next()
})

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')

app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)
app.use('/admin', admin)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

